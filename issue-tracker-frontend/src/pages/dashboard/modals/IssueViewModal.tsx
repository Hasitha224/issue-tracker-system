import { CircleX } from "lucide-react"
import type { Issue } from "../../../types/issue.types";
import { getSeverityStyles, getStatusStyles } from "../../../constants/style.constants";
import { formatDateTime, formatLabel } from "../../../utils/functions";

interface IssueViewModalProps {
  onClose: () => void;
  issue: Issue
}

const IssueViewModal = ({
  onClose,
  issue,
}: IssueViewModalProps) => {
  const email = typeof issue.user === "object" && issue.user !== null
    ? issue.user.email ?? "N/A"
    : "N/A";
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full border border-panel-border">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 h-6 w-6 rounded-full cursor-pointer flex items-center justify-center z-50"
          >
            <CircleX className="w-6 h-6 text-red-600" />
          </button>

          <div className="flex flex-col gap-5 p-4">
            <h1 className="text-base md:text-xl text-center underline text-foreground font-semibold">Issue Details</h1>
            
            <div className="flex flex-col gap-4 md:gap-3">
              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Issue Title</span>
                <p className="text-muted-foreground text-sm">{issue.title}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Issue Description</span>
                <p className="text-muted-foreground text-sm">{issue.description}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Status</span>
                <p className={`${getStatusStyles(issue.status)} text-sm`}>{formatLabel(issue.status) ?? "Open"}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Severity</span>
                <p className={`${getSeverityStyles(issue.severity)} rounded-full px-2 y-1 capitalize text-sm`}>{issue.severity}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Priority</span>
                <p className={`${getSeverityStyles(issue.priority)} rounded-full px-2 y-1 capitalize text-sm`}>{issue.priority}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Created Time</span>
                <p className="text-muted-foreground text-sm">{formatDateTime(issue.createdAt)}</p>
              </div>

              <div className="flex items-center justify-between gap-1 text-sm md:text-base">
                <span className="text-foreground">Created By</span>
                <p className="text-muted-foreground text-sm">{email}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default IssueViewModal
