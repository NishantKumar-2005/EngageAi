import { EmptyState } from "src/components/empty-state";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { VideoIcon,BanIcon } from "lucide-react";

interface Props {
    meetingId: string;
    onCancelMeeting : () => void;
    isCancelling : boolean;
}


export const MeetingIdUpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
    <EmptyState
      title="No Upcoming Meetings"
      description="You have no upcoming meetings scheduled. Schedule a new meeting to get started."
      imageSrc="/upcoming.svg"
    />
    <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
         variant="secondary"
         className="w-full lg:w-auto"
         onClick={onCancelMeeting}
         disabled={isCancelling}
        >
                <BanIcon>
                    Cancel Meeting
                </BanIcon>
            </Button>
            <Button disabled={isCancelling} asChild className="w-full lg:w-auto">
                <Link href={`call/${meetingId}`}>
                    <VideoIcon>
                        Join Meeting
                    </VideoIcon>
                </Link>
            </Button>
        
        </div>
    </div>
  );
};