import {
  MeetingsView,
  MeetingsViewError,
  MeetingsViewLoading,
} from "src/modules/meetings/ui/views/meetings-view";
import { SearchParams } from "nuqs/server";
import { loadSearchParams } from "src/modules/meetings/params";
import { getQueryClient, trpc } from "src/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MeetingsListHeader } from "src/modules/meetings/ui/components/meetings-list-header";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {

  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if(!session){
    redirect("/auth/sign-in");
  }

  
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
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


