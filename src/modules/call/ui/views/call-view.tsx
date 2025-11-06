'use client';

import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "src/components/error-state";
import { useTRPC } from "src/trpc/client";

interface Props{
    meetingId: string;
 };

 export const CallView = ({meetingId}:Props)=>{

    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.meetings.getOne.queryOptions({
        id: meetingId
    }))

    if(data.status == "completed")
    {
        return(
            <div className="flex h-screen items-center justify-center">
                <ErrorState
                    title="Meeting has ended"
                    description="The meeting has been completed. You can no longer join."
                />
            </div>
        )
     }

    return(
        <div>
            Call View for meeting : {JSON.stringify(data,null,2)}
        </div>
    )
};