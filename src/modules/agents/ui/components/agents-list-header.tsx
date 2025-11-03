"use client";

import { PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "src/components/ui/button";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilters } from "./agents-search-filter";
import { DEFAULT_PAGE } from "src/constants";

export const AgentsListHeader = () => {

    const [filters, setFilters] =  useAgentsFilters()
    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({ search: "", page: DEFAULT_PAGE });
    };
    const [isDialogOpen, setIsDialogOpen] =   useState(false);

return(
    <>
    <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}></NewAgentDialog>
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Agents</h5>
            <Button onClick={()=> setIsDialogOpen(true)}>
                <PlusIcon> </PlusIcon>
            New Agent
            </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
            <AgentsSearchFilters/>
            {isAnyFilterModified && (
            <Button variant={"outline"} size={"sm"} onClick={onClearFilters}>
              <XCircleIcon />
              Clear
            </Button>
          )}
        </div>
    </div>
    </>
);

};