import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "src/lib/auth";
import { CallView } from "src/modules/call/ui/views/call-view";
import { getQueryClient, trpc } from "src/trpc/server";

interface Props{
    params : Promise<{
        meetingId : string;
    }>
}

const Page = async({params}:Props)=>{
    const session = await auth.api.getSession({
        headers: await headers(),
      });
        if(!session){
            redirect("/auth/sign-in");
        }
      
      
    const {meetingId} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({
            id: meetingId,
        }),
    );

    return(
        <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CallView meetingId={meetingId} />
        </HydrationBoundary>
        </>
    )

}

export default Page;