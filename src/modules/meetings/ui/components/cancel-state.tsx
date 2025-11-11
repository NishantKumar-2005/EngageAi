import { EmptyState } from "src/components/empty-state";


export const CancelState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center">
    <EmptyState
      title="Meeting cancelled"
      description="This meeting has been cancelled and is no longer active."
      imageSrc="/cancelled.svg"
    />
    </div>
  );
};