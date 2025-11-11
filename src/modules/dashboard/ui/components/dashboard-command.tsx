import { 
    CommandResponsiveDialog,
     CommandInput,
      CommandItem,
       CommandList, 
       CommandEmpty
     } from "src/components/ui/command";
import { Dispatch, SetStateAction,useState } from "react";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "src/trpc/client";
import { GeneratedAvatar } from "src/components/generated-avatar";
import { CommandGroup } from "cmdk";


interface Props{
    open:boolean;
    setOpen:Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({open, setOpen}:Props) =>{

    const router = useRouter();
    const [search , setSearch] = useState("");
    
    const trpc = useTRPC();

    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            pageSize:100,
            search:search
        })
    );
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize:100,
            search
        })
    );
    return(
        <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
            <CommandInput
            placeholder="Find a meeting or agent"
            value={search}
            onValueChange={(value)=> setSearch(value)}
            />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No meetings found
                        </span>
                    </CommandEmpty>
                    {meetings.data?.items.map((meetings)=>(
                        <CommandItem
                        onSelect={()=>{
                            router.push(`/meetings/${meetings.id}`);
                            setOpen(false);
                        }}
                        key={meetings.id}
                    >
                        {meetings.name}
                        </CommandItem>
                    ))}

                </CommandGroup>

                <CommandGroup heading="Agents">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No agents found
                        </span>
                    </CommandEmpty>
                    {agents.data?.items.map((agents)=>(
                        <CommandItem
                        onSelect={()=>{
                            router.push(`/agents/${agents.id}`);
                            setOpen(false);
                        }}
                        key={agents.id}
                    >
                        <GeneratedAvatar
                        variant="botttsNeutral"
                        className="size-5"
                        seed={agents.name}
                        />
                        {agents.name}
                        </CommandItem>
                    ))}

                </CommandGroup>
                
            </CommandList>
        </CommandResponsiveDialog>
    );
};