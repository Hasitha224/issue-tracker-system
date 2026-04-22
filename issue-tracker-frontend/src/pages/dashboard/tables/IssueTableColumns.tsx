import { CheckSquare, Clock, Edit, Eye, FileText, Trash2 } from "lucide-react";
import type { Column } from "../../../components/ui/DataTable"
import type { Issue } from "../../../types/issue.types"
import CopyableText from "../../../components/ui/CopyableText";
import type { User } from "../../../types/user.types";
import { formatDateTime, formatLabel } from "../../../utils/functions";
import { getSeverityStyles, getStatusStyles } from "../../../constants/style.constants";

export const createIssueTableColumns = (
    handleViewIssue: (issue: Issue) => void,
    handleEditIssue: (issue: Issue) => void,
    handleDeleteIssue: (issue: Issue) => void,
    handleResolveIssue: (issue: Issue) => void,
): Column<Issue>[] => {
    return [
        {
            key: "_id",
            label: "Issue ID",
            className: "min-w-[120px]",
            render: (value: string) => (
                <div className="flex items-center gap-2">
                    <FileText size={14} className="text-muted-foreground" />
                    <span className="text-foreground text-xs flex justify-end text-left">
                        <CopyableText text={value} truncate iconClassName="!translate-y-0" />
                    </span>
                </div>
            ),
        },
        {
            key: "title",
            label: "Issue Title",
            className: "min-w-[120px]",
            render: (value: string) => (
                <span className="text-foreground text-xs text-left">
                    <CopyableText text={value} truncate iconClassName="!translate-y-0" />
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            className: "min-w-[120px]",
            render: (value: string) => (
                <span className={`font-bold ${getStatusStyles(value)}`}>
                    {formatLabel(value) ?? "Open"}
                </span>
            ),
        },
        {
            key: "severity",
            label: "Severity",
            className: "min-w-[120px]",
            render: (value: string) => (
                <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getSeverityStyles(value)}`}
                >
                    {value || "Medium"}
                </span>
            ),
        },
        {
            key: "priority",
            label: "Priority",
            className: "min-w-[120px]",
            render: (value: string) => (
                <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getSeverityStyles(value)}`}
                >
                    {value || "Medium"}
                </span>
            ),
        },
        {
            key: "user",
            label: "Performed By",
            className: "min-w-[120px]",
            render: (value: User) => (
                <span>
                    {value?.email ?? "-"}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Timestamp",
            className: "min-w-[120px]",
            render: (date = '-') => {
                return (
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-muted-foreground" />
                        <span className="text-foreground text-xs font-mono">{formatDateTime(date)}</span>
                    </div>
                );
            },
        },
        {
            key: "action",
            label: "Actions",
            className: "text-right min-w-[100px]",
            render: (_value: string, row: Issue) => (
                <div className="flex items-center gap-2 justify-end">
                    {row.status !== "resolved" && (
                        <button
                        onClick={() => handleResolveIssue(row)}
                        className="px-2 py-1 bg-green-100 text-green-700 border border-green-300 rounded-lg hover:bg-green-200 cursor-pointer transition-all text-sm font-medium flex items-center gap-2"
                        >
                            <CheckSquare size={16} />
                            <span>Mark as Resolved</span>
                        </button>
                    )}
                    {handleViewIssue && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleViewIssue(row)}
                        >
                            <Eye size={18} />
                        </button>
                    )}
                    {handleEditIssue && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleEditIssue(row)}
                        >
                            <Edit size={18} />
                        </button>
                    )}
                    {handleDeleteIssue && (
                        <button
                        className="flex h-6 w-6 cursor-pointer items-center justify-center p-0.5 text-foreground"
                        onClick={() => handleDeleteIssue(row)}
                        >
                            <Trash2 size={18} className="text-red-500"/>
                        </button>
                    )}
                </div>
            ),
        },
    ]
}