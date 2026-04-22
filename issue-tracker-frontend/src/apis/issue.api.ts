import type { GetIssuesData, GetIssuesParams, Issue, IssueCountData, IssueData } from "../types/issue.types";
import type { Response } from "../types/response.types";
import axiosInstance from "../utils/axios";

export const getAllIssues = async (params?: GetIssuesParams): Promise<Response<GetIssuesData>> => {
    try {
        const response = await axiosInstance.get("/issues", {params});
        return {
            success: true,
            data: response.data,
            message: "Issues fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching issues:", error);
        return {
            success: false,
            data: {} as GetIssuesData,
            message: error instanceof Error ? error.message : "Failed to fetch issues",
        };
    }
}

export const createIssue = async (data: Partial<Issue>): Promise<Response<IssueData>> => {
    try {
        const response = await axiosInstance.post("/issues/create", data);
        return {
            success: true,
            data: response.data,
            message: "Issue created successfully",
        };
    } catch (error) {
        console.error("Error creating issue:", error);
        return {
            success: false,
            data: {} as IssueData,
            message: error instanceof Error ? error.message : "Failed to create issue",
        };
    }
}

export const getIssueById = async (id: string): Promise<Response<Issue>> => {
    try {
        const response = await axiosInstance.get(`/issues/${id}`);
        return {
            success: true,
            data: response.data,
            message: "Issue fetched successfully",
        };
    } catch (error) {
        console.error("Error fetching issue:", error);
        return {
            success: false,
            data: {} as Issue,
            message: error instanceof Error ? error.message : "Failed to fetch issue",
        };
    }
}

export const editIssue = async (id: string, editIssueData: Partial<Issue>): Promise<Response<IssueData>> => {
    try {
        const response = await axiosInstance.patch(`/issues/edit/${id}`, editIssueData);
        return {
            success: true,
            data: response.data,
            message: "Issue edited successfully",
        };
    } catch (error) {
        console.error("Error editing issue:", error);
        return {
            success: false,
            data: {} as IssueData,
            message: error instanceof Error ? error.message : "Failed to edit issue",
        };
    }
}

export const deleteIssue = async (id: string): Promise<Response<Partial<IssueData>>> => {
    try {
        const response = await axiosInstance.delete(`/issues/delete/${id}`);
        return {
            success: true,
            data: response.data,
            message: "Issue deleted successfully",
        };
    } catch (error) {
        console.error("Error deleting issue:", error);
        return {
            success: false,
            data: {} as Partial<IssueData>,
            message: error instanceof Error ? error.message : "Failed to delete issue",
        };
    }
}

export const getIssueCounts = async (): Promise<Response<IssueCountData>> => {
    try {
        const response = await axiosInstance.get("/issues/count");
        return {
            success: true,
            data: response.data,
            message: "Issue counts obtained successfully",
        };
    } catch (error) {
        console.error("Error getting issue counts:", error);
        return {
            success: false,
            data: {} as IssueCountData,
            message: error instanceof Error ? error.message : "Failed to get issue counts",
        };
    }
}

export const updateIssueStatus = async (id: string, status: string): Promise<Response<Issue>> => {
    try {
        const response = await axiosInstance.patch(`/issues/status/update/${id}`, {status});
        return {
            success: true,
            data: response.data,
            message: "Issue status updated successfully",
        };
    } catch (error) {
        console.error("Error updating issue status", error);
        return {
            success: false,
            data: {} as Issue,
            message: error instanceof Error ? error.message : "Failed to update issue status",
        };
    }
}