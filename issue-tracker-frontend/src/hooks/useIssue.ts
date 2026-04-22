import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import type { GetIssuesData, GetIssuesParams, Issue, IssueCountData, IssueData } from "../types/issue.types";
import type { Response } from "../types/response.types";
import { createIssue, deleteIssue, editIssue, getAllIssues, getIssueById, getIssueCounts, updateIssueStatus } from "../apis/issue.api";

const POLLING_INTERVAL = 30 * 1000;

interface UseIssuesReturn {
    issues: Issue[];
    loading: boolean;
    isFetching: boolean;
    isRefetching: boolean;
    error: string | null;
    total: number;
    currentPage: number;
    params?: GetIssuesParams;
    setParams?: (params: GetIssuesParams) => void;
    useIssueById: (issueId: string) => UseQueryResult<Response<Issue>>;
    createIssueMutation: ReturnType<typeof useMutation<Response<IssueData>, Error, Partial<Issue>>>;
    updateIssueMutation: ReturnType<typeof useMutation<Response<IssueData>, Error, {issueId: string; editData: Partial<Issue> }>>;
    deleteIssueMutation: ReturnType<typeof useMutation<Response<Partial<IssueData>>, Error, {issueId: string}>>;
    updateIssueStatusMutation: ReturnType<typeof useMutation<Response<Issue>, Error, { issueId: string; status: string; }>>;
    issueCounts: IssueCountData | null;
    countsLoading: boolean;
    countError: string | null;
}

export const useIssues = (
    params?: GetIssuesParams,
    setParams?: (params: GetIssuesParams) => void,
    pollingInterval: number = POLLING_INTERVAL,
): UseIssuesReturn => {
    const queryClient = useQueryClient();

    const {
        data: issueData,
        isLoading,
        error: queryError,
        isFetching,
        isRefetching,
    } = useQuery<GetIssuesData>({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await getAllIssues(params);
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        staleTime: 10 * 1000,
        refetchInterval: pollingInterval,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    })

    const {
        data: issueCountData,
        isLoading: isCountsLoading,
        error: queryCountError,
    } = useQuery<IssueCountData>({
        queryKey: ['issue-counts'],
        queryFn: async () => {
            const res = await getIssueCounts();
            if (!res.success) throw new Error(res.message);
            return res.data;
        },
        staleTime: 10 * 1000,
        refetchInterval: pollingInterval,
        refetchIntervalInBackground: false,
        refetchOnWindowFocus: true,
    })

    const createIssueMutation = useMutation({
        mutationFn: createIssue,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['issue-counts'] });
        }
    })
    
    const updateIssueMutation = useMutation({
        mutationFn: ({issueId, editData} : { issueId: string; editData: Partial<Issue> }) => 
            editIssue(issueId, editData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['issue-counts'] });
        }
    })

    const useIssueById = (issueId: string) => {
        return useQuery({
            queryKey: ['issues', issueId],
            queryFn: () => getIssueById(issueId),
            enabled: !!issueId,
            staleTime: 10 * 1000,
            refetchOnWindowFocus: true,
        })
    }

    const updateIssueStatusMutation = useMutation({
        mutationFn: ({ issueId, status }: { issueId: string; status: string; }) =>
            updateIssueStatus(issueId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['issue-counts'] });
        },
    });

    const deleteIssueMutation = useMutation({
        mutationFn: ({issueId}: {issueId: string}) => deleteIssue(issueId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['issues'] });
            queryClient.invalidateQueries({ queryKey: ['issue-counts'] });
        },
    });
    return {
        issues: issueData?.data ?? [],
        loading: isLoading,
        isFetching,
        isRefetching,
        error: queryError?.message ?? null,
        total: issueData?.total ?? 0,
        currentPage: issueData?.page ?? 1,
        params,
        setParams: setParams ?? (() => {}),
        issueCounts: issueCountData ?? null,
        countsLoading: isCountsLoading,
        countError: queryCountError?.message ?? null,
        createIssueMutation,
        updateIssueMutation,
        useIssueById,
        deleteIssueMutation,
        updateIssueStatusMutation,
    }
} 