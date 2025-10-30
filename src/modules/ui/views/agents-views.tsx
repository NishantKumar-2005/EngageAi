"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "src/trpc/client";
import LoadingState from "src/components/loadingState";
import AlertState from "src/components/errorState";

export const AgentsView = () => {
    const trpc = useTRPC();
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
    

    return (
        <div>
            {JSON.stringify(data,null,2)}
        </div>
    );
};

export const LoadingStateWithTitle = () => (
    <LoadingState title="Loading Agents..." description="Please wait while we fetch the agents." />
);

export const ErrorStateWithTitle = () => (
    <AlertState title="Error Loading Agents" description="There was an error fetching the agents. Please try again." />
);