"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "src/trpc/client";
import { LoadingState } from "src/components/loading-state";
import ErrorState from "src/components/error-state";
import { useEffect, useState } from "react";
import { DataTable } from "../components/data-table";
// import { ResponsiveDialog } from "src/components/responsive-dialogue";
// import { Button } from "src/components/ui/button";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  
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
    <div>
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
      {JSON.stringify(data, null, 2)}
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
