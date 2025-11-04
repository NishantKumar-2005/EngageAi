"use client";

// import { ErrorState } from "src/components/error-state";
import { LoadingState } from "src/components/loading-state";
import { useTRPC } from "src/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import ErrorState from "src/components/error-state";
import { DataTable } from "src/components/data-table";
import { columns } from "../components/columns";



export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

    return(
        <div className="overflow-x-scroll">
          <DataTable data={data.items} columns={columns}/>
        </div>
    );
  };

  export const MeetingsViewLoading = () => {
    return <LoadingState title="Loading Meetings" description="This may take a few seconds" />;
  };
  
  export const MeetingsViewError = () => {
    return (
      <ErrorState
        title="Error loading Meetings"
        description="Something went wrong while loading the agents"
      />
    );
  };