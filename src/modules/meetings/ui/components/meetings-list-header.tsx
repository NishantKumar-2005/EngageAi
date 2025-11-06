"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "src/components/ui/button";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilters } from "./meetings-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { set } from "better-auth";
import { is } from "drizzle-orm";
import { ScrollArea, ScrollBar } from "src/components/ui/scroll-area";

export const MeetingsListHeader = () => {

    const [isDialogOpen, setIsDialogOpen] =   useState(false);
    const[filters,setFilters] = useMeetingsFilters();

    const isanyFilterModified =
      !!filters.status || !!filters.agentId || !!filters.search

    const onClearFilters = () => {
        setFilters(
            { search: "", status: null, agentId: "", page: 1 }
        );
    };

      
return(
    <>
    <NewMeetingDialog onOpenChange={setIsDialogOpen} open={isDialogOpen} />
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <ScrollArea>
        <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Meetings</h5>
            <Button onClick={()=> {
                setIsDialogOpen(true);
            }}>
                <PlusIcon> </PlusIcon>
            New Meeting
            </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilters />
            <StatusFilter />
            <AgentIdFilter />

            {isanyFilterModified && (
            <Button variant={"outline"} size={"sm"} onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}

        </div>
        <ScrollBar orientation="horizontal" />
        </ScrollArea>
    </div>
    </>
);

};