import { CircleQuestionMark } from "lucide-react"

interface ConfirmationModalProps {
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title: string;
  description: string;
}
const ConfirmationModal = ({
  onCancel,
  onConfirm,
  isLoading = false,
  title,
  description,
}: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-lg shadow-2xl max-w-md w-full p-6 border border-panel-border">
            <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-red-100 rounded-full">
                    <CircleQuestionMark className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-foreground text-center">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center px-16">
                    {description}
                  </p>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                >
                Cancel
                </button>
                <button
                onClick={onConfirm}
                disabled={isLoading}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer"
                >
                {isLoading ? "Updating..." : "Confirm"}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal