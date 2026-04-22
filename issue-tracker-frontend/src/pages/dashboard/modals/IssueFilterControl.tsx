import { Select } from "antd"
import { useState } from "react";
import { PRIORITY_OPTIONS, SEVERITY_OPTIONS, STATUS_OPTIONS } from "../../../constants/filter.constants";
import { ChevronDown, Filter, Plus, Search, XCircle } from "lucide-react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { useNavigate } from "react-router-dom";

// Filter parsers configuration for useQueryStates
const filterParsers = {
  page: parseAsInteger.withDefault(1),
  search: parseAsString.withDefault(""),
  severity: parseAsString.withDefault(""),
  status: parseAsString.withDefault(""),
  priority: parseAsString.withDefault(""),
};

interface IssueFilterControlProps {
    loading: boolean;
}

const IssueFilterControl = ({
    loading = false,
}: IssueFilterControlProps) => {
    const navigate = useNavigate();
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [filters, setFilters] = useQueryStates(filterParsers);

    const {
        search: searchTerm,
        severity,
        priority,
        status,
    } = filters;

    const handleSearchChange = (value: string) => {
        setFilters({ search: value || null, page: 1 });
    };

    const handleSeverity = (value: string) => {
        setFilters({ severity: value || null, page: 1 });
    }

    const handlePriority = (value: string) => {
        setFilters({ priority: value || null, page: 1 });
    }

    const handleStatusChange = (value: string) => {
        setFilters({ status: value || null, page: 1 });
    }

    const handleCreateIssue = () => {
        navigate("/issue/create");
    }

    const activeFilterCount = [
        searchTerm,
        severity,
        priority,
        status,
    ].filter((f) => f !== "").length
    
    const handleClearFilters = () => {
        setFilters({
            search: null,
            priority: null,
            severity: null,
            status: null,
            page: 1,
        });
    };

    return (
        <div className="bg-card rounded-xl border border-panel-border shadow-sm p-4 mb-3">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                    />
                    <input
                    type="text"
                    placeholder="Search by Issue ID, Issue Title..."
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full bg-card border border-panel-border rounded-lg pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                </div>
                <div className="flex flex-col sm:flex-row lg:w-105 gap-4">
                    <button
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                        className={`flex flex-1 justify-center items-center gap-2 px-4 py-2.5 cursor-pointer border border-panel-border rounded-lg hover:bg-gray-50 transition-all duration-300 ease-in-out text-sm font-medium text-gray-700 bg-white shadow-sm ${
                        activeFilterCount > 0 ? "bg-gray-50" : ""
                        }`}
                    >
                        <Filter size={16} />
                        <span>{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
                        {activeFilterCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.5 bg-[#1A5276] text-white text-xs rounded-full">
                            {activeFilterCount}
                        </span>
                        )}
                        <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ease-in-out ${
                            isFilterOpen ? "rotate-180" : "rotate-0"
                        }`}
                        />
                    </button>
                    <button
                        onClick={handleCreateIssue}
                        className="flex flex-1 justify-center items-center gap-2 px-4 py-2.5 cursor-pointer border border-panel-border rounded-lg hover:bg-gray-50 transition-all duration-300 ease-in-out text-sm font-medium text-gray-700 bg-white shadow-sm"
                    >
                        <Plus size={20} />
                        <span>Create Issue</span>
                    </button>
                </div>
            </div>
            <div
                className={
                "overflow-hidden transition-all duration-300 ease-in-out " +
                (isFilterOpen
                    ? "max-h-125 opacity-100 mt-4 pointer-events-auto"
                    : "max-h-0 opacity-0 mt-0 pointer-events-none")
                }
                aria-live="polite"
            >
                <div className="bg-card border border-panel-border px-4 py-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="issue-status"
                                className="block text-sm font-medium text-foreground"
                            >
                                Issue Status
                            </label>
                            <Select
                                id="issue-status"
                                placeholder="Select Issue Status"
                                value={status || undefined}
                                onChange={handleStatusChange}
                                style={{
                                    minWidth: 160,
                                    height: 42,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                maxTagCount="responsive"
                                options={STATUS_OPTIONS}
                                allowClear
                                disabled={loading}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="severity"
                                className="block text-sm font-medium text-foreground"
                            >
                                Severity
                            </label>
                            <Select
                                id="severity"
                                placeholder="Select Severity Level"
                                value={severity || undefined}
                                onChange={handleSeverity}
                                style={{
                                    minWidth: 160,
                                    height: 42,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                maxTagCount="responsive"
                                options={SEVERITY_OPTIONS}
                                allowClear
                                disabled={loading}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-foreground"
                            >
                                Priority
                            </label>
                            <Select
                                id="priority"
                                placeholder="Select Priority Level"
                                value={priority || undefined}
                                onChange={handlePriority}
                                style={{
                                    minWidth: 160,
                                    height: 42,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                                maxTagCount="responsive"
                                options={PRIORITY_OPTIONS}
                                allowClear
                                disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4">
                {activeFilterCount > 0 && (
                    <button
                        onClick={handleClearFilters}
                        className="flex items-center gap-2 bg-white hover:bg-gray-50 px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border border-panel-border rounded-lg"
                    >
                        <XCircle size={16} />
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    )
}

export default IssueFilterControl
