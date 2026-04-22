import type { User } from "./user.types";

export type StatusType = "open" | "resolved" | "in_progress";

export interface Issue {
    _id: string;
    title: string;
    description: string;
    status: StatusType;
    severity: string;
    priority: string;
    user: Partial<User> | string;
    createdAt: string;
    updatedAt: string;
}

export interface GetIssuesData {
    data: Issue[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IssueData {
    data: Issue;
    message: string;
}

export interface GetIssuesParams {
    status?: string;
    page?: number;
    limit?: number;
    search?: string;
    severity?: string;
    priority?: string;
}

export interface IssueCountData {
    open: number;
    in_progress: number;
    resolved: number;
}