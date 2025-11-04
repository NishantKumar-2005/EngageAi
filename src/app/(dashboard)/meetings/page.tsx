import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "src/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "src/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MeetingsListHeader } from "src/modules/meetings/ui/components/meetings-list-header";

const Page = async () => {

    
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if(!session){
    redirect("/auth/sign-in");
  }

  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  );

  return (
   <>
   <MeetingsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewLoading />}>
      <ErrorBoundary fallback={<MeetingsViewError />}>
        <MeetingsView />
      </ErrorBoundary>
    </Suspense>
    </HydrationBoundary>
   </>
  );
  };

export default Page;


