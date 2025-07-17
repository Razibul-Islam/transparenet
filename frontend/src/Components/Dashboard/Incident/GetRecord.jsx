import { useState } from "react";
import {
  X,
  Search,
  Clock,
  User,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { UseCompContext } from "../../../../context/ComContext";

export const GetRecords = ({ isOpen, onClose, onSubmit }) => {
  const [searchBatchId, setSearchBatchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { batches } = UseCompContext();

  const handleSearch = async () => {
    if (!searchBatchId.trim()) return;

    setLoading(true);
    setSearched(true);
    console.log("Loading...");
    await onSubmit(searchBatchId);
    setLoading(false);
  };

  const handleClose = () => {
    setSearchBatchId("");
    setSearched(false);
    setLoading(false);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(Number(timestamp)).toLocaleDateString();
  };

  const getSeverityColor = (severity) => {
    switch (Number(severity)) {
      case 0:
        return "bg-red-100 text-red-800 border-red-200";
      case 1:
        return "bg-orange-100 text-orange-800 border-orange-200";
      case 2:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 3:
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (Number(status)) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "under review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const setSeverity = (severity) => {
    console.log(severity);
    switch (Number(severity)) {
      case 0:
        return "Critical";
      case 1:
        return "High";
      case 2:
        return "Medium";
      case 3:
        return "Low";
      default:
        return "Unknown";
    }
  };

  console.log(batches);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Search Incidents by Batch ID
          </h2>
          <button
            onClick={() => {
              onClose();
              handleClose();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search section */}
        <div className="p-6 border-b">
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                value={searchBatchId}
                onChange={(e) => setSearchBatchId(e.target.value)}
                placeholder="Enter Batch ID"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !searchBatchId.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results section */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
          ) : searched && batches.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
              <p>No incidents found for batch ID: "{searchBatchId}"</p>
            </div>
          ) : batches.length > 0 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Found {batches.length} incident(s) for batch ID: "
                {searchBatchId}"
              </h3>
              {batches?.map((incident, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left column */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Batch ID
                        </label>
                        <p className="text-gray-800 font-mono">{incident[0]}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Reason
                        </label>
                        <p className="text-gray-800">{incident[1]}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Status
                        </label>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              incident.status
                            )}`}
                          >
                            {incident[2]}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Severity Level
                        </label>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(
                              incident[5]
                            )}`}
                          >
                            {setSeverity(incident[5])}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <Clock size={14} />
                          Timestamp
                        </label>
                        <p className="text-gray-800 font-mono text-sm">
                          {formatTimestamp(incident[3])}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                          <User size={14} />
                          Reported By
                        </label>
                        <p className="text-gray-800 font-mono text-sm break-all">
                          {incident[4]}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">
                          Resolved
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                          {incident.resolved ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <XCircle size={16} className="text-red-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              incident[6] ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {incident[6] ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Enter a Batch ID to search for incidents</p>
            </div>
          )}
        </div>

        {/* Modal footer */}
        <div className="flex justify-end p-6 border-t">
          <button
            onClick={() => {
              onClose();
              handleClose();
            }}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
