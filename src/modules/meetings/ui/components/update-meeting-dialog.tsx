'use client';

import { ResponsiveDialog } from "src/components/responsive-dialogue";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";


interface UpdateMeetingDialogProps {
open: boolean;
onOpenChange: (open: boolean) => void;
initialValue: MeetingGetOne;
}
export const UpdateMeetingDialog = ({
open,
onOpenChange,
initialValue,
}: UpdateMeetingDialogProps) => {

return (
  <ResponsiveDialog
    title="Update Meeting"
    description="Update the meeting details"
    open={open}
    onOpenChange={onOpenChange}
  >
    <MeetingForm
      initialValues={initialValue}
      onSuccess={() => {
        onOpenChange(false);
      }}
      onCancel={() => {
        onOpenChange(false);
      }}
    />
  </ResponsiveDialog>
);
};