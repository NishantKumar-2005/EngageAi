import { useState } from "react";
import {format} from "date-fns";
import { SearchIcon } from "lucide-react";
import  Highlighter  from "react-highlight-words";

import {useQuery} from "@tanstack/react-query";
import { useTRPC } from "src/trpc/client";
import {Input} from "src/components/ui/input";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";

import { generateAvatarUri } from "src/lib/avatar";

interface Props{
    meetingId: string;
}

export const Transcript = ({meetingId}:Props)=>{
    const trpc = useTRPC();
    
    const {data} = useQuery(
        trpc.meetings.getTranscript.queryOptions({
            id : meetingId
        })
    );
    const [searchQuery,setSearchQuery] = useState("")

    const filterData = (data?? []).filter((item)=>
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return(
        <div className= "bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
            <p className="text-sm font-medium">Transcript</p>
            <div className="relative">
              <Input
                  placeholder="Search transcript..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
              />
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <ScrollArea>
                <div className="flex flex-col gap-y-4 p-2">
                                        {filterData.map((item)=>{
                                                const displayName = item.user?.name || "Unknown";
                                                const initials = displayName
                                                    .split(" ")
                                                    .filter(Boolean)
                                                    .slice(0, 2)
                                                    .map((n) => n[0]?.toUpperCase())
                                                    .join("") || "?";
                        return(
                            <div key={item.start_ts} className="flex flex-col-reverse gap-y-2 hover:bg-muted p-4 rounded-md border">
                                <div className="flex gap-x-2 items-center">
                                                                        <Avatar className="size-6">
                                                                                <AvatarImage
                                                                                    alt={`${displayName} avatar`}
                                                                                    src={item.user?.image ?? generateAvatarUri({
                                                                                        seed: displayName,
                                                                                        variant: "initials"
                                                                                    })}
                                                                                />
                                                                                <AvatarFallback className="text-[10px] font-medium">
                                                                                    {initials}
                                                                                </AvatarFallback>
                                                                        </Avatar>
                                                                        <div className="flex flex-col">
                                                                            <span className="text-xs font-medium">{displayName}</span>
                                                                            {item.start_ts && (
                                                                                <span className="text-[10px] text-muted-foreground">
                                                                                    {format(new Date(item.start_ts), "PPpp")}
                                                                                </span>
                                                                            )}
                                                                        </div>

                                                                        <Highlighter
                                                                            highlightClassName="bg-yellow-200"
                                                                            searchWords={[searchQuery]}
                                                                            autoEscape={true}
                                                                            textToHighlight={item.text}
                                                                            className="mt-2 text-sm leading-relaxed"
                                                                        />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
                    
        </div>
    )

}
