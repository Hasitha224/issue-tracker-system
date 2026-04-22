import "ldrs/react/Hatch.css";
import { Loader, File, CheckCircle2, Inbox } from "lucide-react"
import SummaryCard from "../../components/ui/SummaryCard"
import { useMemo, useState } from "react"
import { DataTable } from "../../components/ui/DataTable";
import type { GetIssuesParams, Issue } from "../../types/issue.types";
import { createIssueTableColumns } from "./tables/IssueTableColumns";
import PaginationControls from "../../components/ui/PaginationControls";
import { useIssues } from "../../hooks/useIssue";
import { getTotalPages } from "../../utils/functions";
import IssueFilterControl from "./modals/IssueFilterControl";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { Hatch } from "ldrs/react";
import IssueViewModal from "./modals/IssueViewModal";
import ConfirmationModal from "../../components/ui/models/ConfirmationModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showIssueViewModal, setShowIssueViewModal] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showDeleteConfirmationModal , setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [showStatusConfirmationModal , setShowStatusConfirmationModal] = useState<boolean>(false);

  // Use nuqs for filter state
  const [searchTerm] = useQueryState("search",parseAsString.withDefault(""));
  const [severity] = useQueryState("severity",parseAsString.withDefault(""));
  const [status] = useQueryState("status",parseAsString.withDefault(""));
  const [priority] = useQueryState("priority",parseAsString.withDefault(""));
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10)
  );

  const queryParams = useMemo<GetIssuesParams>(() => {
    const params: GetIssuesParams = {
      page: currentPage,
      limit: pageSize,
    }
    if(searchTerm) {
      params.search = searchTerm;
    }
    if(status) {
      params.status = status;
    }
    if(severity) {
      params.severity = severity;
    }
    if(priority) {
      params.priority = priority;
    }
    return params;
  },[currentPage, pageSize, searchTerm, status, severity, priority]);

  const {
    issues,
    issueCounts,
    total,
    isFetching,
    deleteIssueMutation,
    updateIssueStatusMutation,
  } = useIssues(
    queryParams,
    () => {},
  );

  const viewIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setShowIssueViewModal(true);
  }

  const editIssue = (issue: Issue) => {
    navigate(`/issue/edit/${issue._id}`)
  }

  const deleteIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setShowDeleteConfirmationModal(true);
  }

  const handleDeleteIssue = async () => {
    try {
      if(selectedIssue) {
        await deleteIssueMutation.mutateAsync({issueId: selectedIssue?._id});
        toast.success("Issue deleted successfully");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setShowDeleteConfirmationModal(false);
    };
  }

  const resolveIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setShowStatusConfirmationModal(true);
  }

  const handleResolveIssueStatus = async () => {
    try {
      if(selectedIssue) {
        await updateIssueStatusMutation.mutateAsync({
          issueId: selectedIssue._id,
          status: "resolved",
        });
        toast.success("Issue status updated successfully");
      }
    } catch (error: unknown) {
      if(error) {
        console.error("Failed to update issue status", error);
        toast.error("Failed to update issue status");
      }
    } finally {
      setShowStatusConfirmationModal(false);
    };
  }
  
  const columns = createIssueTableColumns(viewIssue, editIssue, deleteIssue, resolveIssue);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  const handlePageSizeChange = (page: number) => {
    setPageSize(page);
    setCurrentPage(1);
  }

  const hasActiveFilters = useMemo(() => {
    return (
      searchTerm !== "" ||
      status !== "" ||
      priority !== "" ||
      severity !== ""
    );
  }, [searchTerm, priority, severity, status]);

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-muted-foreground mb-2">Issue Dashboard</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SummaryCard 
          title="Open" 
          description="Issues waiting to be addressed" 
          mainColor="blue" 
          value={issueCounts?.open ?? 0} 
          icon={Inbox}
        />
        <SummaryCard 
          title="In Progress" 
          description="Issues currently being worked on" 
          mainColor="orange" 
          value={issueCounts?.in_progress ?? 0} 
          icon={Loader}/>
        <SummaryCard 
          title="Resolved" 
          description="Issues resolved successfully" 
          mainColor="green" 
          value={issueCounts?.resolved ?? 0} 
          icon={CheckCircle2}
        />
      </div>
      
      <IssueFilterControl loading={isFetching}/>

      {isFetching ? (
        <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center text-muted-foreground">
          <div className="flex gap-5 justify-center items-center space-x-2">
            <Hatch size={35} speed={2.75} color="#3d5a5c" stroke={4} />
            Loading Issues...
          </div>
        </div>
      ) : (
        <>
          {issues &&
            (issues.length > 0 || hasActiveFilters) ? (
              <div className="flex flex-col gap-1">
                {issues.length > 0 && (
                  <DataTable
                    data={issues}
                    columns={columns}
                  />
                )}
                {issues.length > 0 && (
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={getTotalPages(total, pageSize)}
                    pageSize={pageSize}
                    totalRecords={total}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                )}
                
                {issues.length === 0 && hasActiveFilters && (
                  <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center">
                    <File
                      className="mx-auto text-muted-foreground mb-4"
                      size={48}
                    />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Matched Issues found
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        No issues match your current filters. Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center">
                <File
                  className="mx-auto text-muted-foreground mb-4"
                  size={48}
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    No Issues Found
                </h3>
                <p className="text-muted-foreground mb-4">
                    There are no issues to display.
                </p>
              </div>
            )}
        </>
      )}
      {showIssueViewModal && selectedIssue && (
        <IssueViewModal
          onClose={() => setShowIssueViewModal(false)}
          issue={selectedIssue}
        />
      )}
      {showDeleteConfirmationModal && selectedIssue && (
        <ConfirmationModal
          onCancel={() => setShowDeleteConfirmationModal(false)}
          onConfirm={handleDeleteIssue}
          title="Delete Issue"
          description="Are you sure to delete this issue?"
          isLoading={deleteIssueMutation.isPending}
        />
      )}
      {showStatusConfirmationModal && selectedIssue && (
        <ConfirmationModal
          onCancel={() => setShowStatusConfirmationModal(false)}
          onConfirm={handleResolveIssueStatus}
          title="Update Issue Status to Resolved"
          description="Are you sure to mark this issue as resolved?"
          isLoading={updateIssueStatusMutation.isPending}
        />
      )}
    </div>
  )
}

export default Dashboard
