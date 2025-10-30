import { AlertCircleIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

const AlertState: React.FC<Props> = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <AlertCircleIcon className="w-12 h-12 text-red-500" />
            <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>
            {description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
        </div>
    );
};

export default AlertState;
