import { MeetingGetOne } from "../../types";
import { useTRPC } from "src/trpc/client";

import { useQueryClient ,useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { meetingsInsertSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";


import { CommandSelect } from "src/components/command-select";
import { GeneratedAvatar } from "src/components/generated-avatar";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { toast } from "sonner";

import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "src/components/ui/form";
import { useState } from "react";
import { NewAgentDialog } from "src/modules/agents/ui/components/new-agent-dialog";


interface MeetingFormProps {
    onSuccess?: (id?: string) => void;
    onCancel?: () => void;
    initialValues?: MeetingGetOne;
};


export const MeetingForm = ({
onSuccess,
onCancel,
initialValues,
}: MeetingFormProps) => {
const trpc = useTRPC();
const queryClient = useQueryClient();
const [openNewAgentDialog , setNewOpenAgentDialog] = useState(false);
const [agentSearch,setAgentSearch] = useState("")
const agents = useQuery(
    trpc.agents.getMany.queryOptions({
        pageSize: 100,
        search:agentSearch
    }),

);

const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
        onSuccess: async (data: { id: string }) => {
           await queryClient.invalidateQueries(
                trpc.meetings.getMany.queryOptions({}),
            );
            onSuccess?.(data?.id);
        },
        onError: (error) => {
            toast.error(error.message);

            //TODO : CHECK FOR VALIDATION ERRORS
        }
    }),
);

const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        if (initialValues?.id) {
          await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }));
        }

        onSuccess?.();
      },
      onError: (error) => {
        toast.error(`Error updating agent: ${error.message}`);
        // TODO: Check if error code is 'CONFLICT' and show a specific message
        // TODO: Check if error code is FORBIDDEN, redirect to "/upgrade"
      },
    })
  );

   const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues:{
        name:initialValues?.name ?? "",
        agentId: initialValues?.agentId ?? "",
    },
   }); 

   const isEdit = !! initialValues ?. id;
   const isPending = createMeeting.isPending || updateMeeting.isPending;

    const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit && initialValues?.id) {
        updateMeeting.mutate({
        id: initialValues.id,
        ...values,
        });
    } else {
    createMeeting.mutate(values);
    }
};

   return(
    <>
    <NewAgentDialog open={openNewAgentDialog} onOpenChange={setNewOpenAgentDialog}/>
    <Form {...form}>
      <form className ="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        
            <FormField
            name="name"
            control={form. control}
            render={({ field }) => (
            <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
            <Input {...field} placeholder="e.g. Math Consultation" />
            </FormControl>
            <FormMessage />
            </FormItem>
            )}
        />

        <FormField
            name="agentId"
            control={form. control}
            render={({ field }) => (
            <FormItem>
            <FormLabel>Agent</FormLabel>
            <FormControl>
                <CommandSelect options={(agents.data?.items ?? [])
                    .filter(agent => agent && agent.id && agent.name)
                    .map(agent => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                        <div className="flex items-center gap-x-2">
                            <GeneratedAvatar 
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="border size-6"
                            />
                            <span>{agent.name}</span>
                        </div>
                    )
                }))} 
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an Agent "
                />
            </FormControl>
            <FormDescription>
                Not Found what you&apos;re looking for?{" "}
                <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={()=> setNewOpenAgentDialog(true)}
                    >Create New Agent</button>
            </FormDescription>
            <FormMessage />
            </FormItem>
            )}
        />
        <div className ="flex justify-between gap-x-2">
            {onCancel && (
            <Button
                variant="ghost"
                disabled={isPending}
                type="button"
                onClick={() => onCancel()}
            >
            Cancel
            </Button>
            )}
            <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
            </Button>
        </div>
      </form>
    </Form>
    </>
   );

};