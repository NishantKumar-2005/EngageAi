"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "src/components/ui/button";

export const MeetingsListHeader = () => {

return(
    <>

    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Meetings</h5>
            <Button onClick={()=> {}}>
                <PlusIcon> </PlusIcon>
            New Meeting
            </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
            TODO: Filters, Search bar etc
        </div>
    </div>
    </>
);

};