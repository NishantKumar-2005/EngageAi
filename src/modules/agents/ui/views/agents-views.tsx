"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "src/trpc/client";
import { LoadingState } from "src/components/loading-state";
import ErrorState from "src/components/error-state";
import { useEffect, useState } from "react";
import { columns,  } from "../components/columns";
import { DataTable } from "../components/data-table";
import { EmptyState } from "src/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";
// import { ResponsiveDialog } from "src/components/responsive-dialogue";
// import { Button } from "src/components/ui/button";

export const AgentsView = () => {
  const [filters,setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));
  
  // Local loading delay simulation (non-async)
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setDelayed(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (delayed) {
    return (
      <LoadingState
        title="Loading Agents..."
        description="Please wait while we fetch the agents."
      />
    );
  }

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* <ResponsiveDialog
       title = "Responsive test"
       description = "Responsive desc"
       open
       onOpenChange={()=>{}}
      >
        <Button>
          Some action
        </Button>
      </ResponsiveDialog> */}
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(newPage) => setFilters({ page: newPage })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings.
          Each agent will follow your instructions and can interact with your meeting participants."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents..."
    description="Please wait while we fetch the agents."
  />
);

export const AgentsViewError = () => (
  <ErrorState
    title="Error Loading Agents"
    description="There was an error fetching the agents. Please try again."
  />
);
