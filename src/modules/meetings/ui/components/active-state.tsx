import { EmptyState } from "src/components/empty-state";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { VideoIcon,BanIcon } from "lucide-react";

interface Props {
    meetingId: string;
}


export const ActiveState = ({ meetingId}: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
    <EmptyState
      title="Meeting is Active"
      description="Meeting will end when all participants leave."
      imageSrc="/upcoming.svg"
    />
    <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
            <Button asChild className="w-full lg:w-auto">
                <Link href={`/call/${meetingId}`}>
                    <VideoIcon>
                        Join Meeting
                    </VideoIcon>
                </Link>
            </Button>
        
        </div>
    </div>
  );
};