export const getSeverityStyles = (severity: string) => {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "bg-red-100 text-red-700 border border-red-300";
    case "high":
      return "bg-orange-100 text-orange-700 border border-orange-300";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    case "low":
      return "bg-green-100 text-green-700 border border-green-300"; 
    case "info":
      return "bg-blue-100 text-blue-700 border border-blue-300";
    default:
      return "bg-blue-100 text-blue-700 border border-blue-300";
  }
};

export const getStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
        case "open":
            return "text-blue-700";
        case "in_progress":
            return "text-yellow-700";
        case "resolved":
            return "text-green-700";
        default:
            return "bg-gray-700";
    }
}