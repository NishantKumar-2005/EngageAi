import { getQueryClient,trpc } from "src/trpc/server";

import { AgentsView, AgentsViewError, AgentsViewLoading } from "src/modules/agents/ui/views/agents-views";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentsListHeader } from "src/modules/agents/ui/components/agents-list-header";
import { auth } from "src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "src/modules/agents/params";


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
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
        ...filters,
    }));
    // const dehydratedState = dehydrate(queryClient);


    return (
        <>
        <AgentsListHeader></AgentsListHeader>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<AgentsViewLoading/>}>
          <ErrorBoundary fallback={<AgentsViewError/>}>
            <AgentsView/> 
          </ErrorBoundary>
          </Suspense>
              
        </HydrationBoundary>
        </>
    );
}

export default Page;
