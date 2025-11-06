"use client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "src/components/error-state";
import { LoadingState } from "src/components/loading-state";
import { useTRPC } from "src/trpc/client";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "src/modules/agents/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";

interface Props{
    meetingId:string;
}

export const MeetingIdView = ({meetingId}:Props) => {

    const trpc = useTRPC();
    const router = useRouter();
    const [UpdateMeetingDialogOpen,setUpdateMeetingDialogOpen] =useState(false);
    const [RemoveConfirmation,setRemoveConfirmation] = useConfirm(
        "Are you sure you want to remove this meeting?",
        "This action cannot be undone."
    );
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({id:meetingId}));
    const queryClient = useQueryClient();
    const removeMeeting = useMutation(trpc.meetings.remove.mutationOptions(
        {
            onSuccess: () => {
                queryClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({}),
                    
                );
                router.push("/meetings");
            },
            
        }
    ));

    const handelRemoveMeeting= async()=>{
        const ok = await setRemoveConfirmation();

        if (ok){
            try {
                await removeMeeting.mutateAsync({id:meetingId});
            } catch (error) {
                console.error("Error removing meeting:", error);
                // The error toast will be handled by the mutation's onError callback
            }
        }

    }
    return(
       <>
       <RemoveConfirmation/>
       <UpdateMeetingDialog
        open={UpdateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValue={data}
       />
        <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
            <MeetingIdViewHeader 
              meetingId={data.id}
              meetingName={data.name}
              onEdit={() => {
                setUpdateMeetingDialogOpen(true);
              }}
              onRemove={handelRemoveMeeting}
            />
            {JSON.stringify(data,null,2)}
        </div>
       </>
    )
};

  export const MeetingsIdViewLoading = () => (
    <LoadingState
      title="Loading Meetings..."
      description="Please wait while we fetch the meetings."
    />
  );

  export const MeetingsIdViewError = () => (
    <ErrorState
      title="Error Loading Meetings"
      description="There was an error fetching the meetings. Please try again."
    />
  );