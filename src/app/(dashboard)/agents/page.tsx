import { getQueryClient,trpc } from "src/trpc/server";

import { AgentsView, ErrorStateWithTitle, LoadingStateWithTitle } from "src/modules/ui/views/agents-views";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";


const Page = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<LoadingStateWithTitle/>}>
          <ErrorBoundary fallback={<ErrorStateWithTitle/>}>
            <AgentsView/>
          </ErrorBoundary>
          </Suspense>
              
        </HydrationBoundary>
    );
}

export default Page;