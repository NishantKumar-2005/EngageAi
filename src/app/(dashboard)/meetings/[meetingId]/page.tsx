import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "src/lib/auth";
import { getQueryClient, trpc } from "src/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MeetingIdView, MeetingsIdViewError, MeetingsIdViewLoading } from "src/modules/meetings/ui/views/meeting-id-view";


interface Props {
  params: Promise<{ meetingId: string }>;

}

const Page = async({ params }: Props) => {
    const { meetingId } = await params;
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      
      if(!session){
        redirect("/auth/sign-in");
      }

      const queryClient = getQueryClient();
      void queryClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
      );
    return(
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsIdViewLoading />}>
          <MeetingIdView meetingId={meetingId} />
          <ErrorBoundary fallback={<MeetingsIdViewError/>}>
            {/* MeetingDetailView component can be placed here */}
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
      
    )
  };

  export default Page;