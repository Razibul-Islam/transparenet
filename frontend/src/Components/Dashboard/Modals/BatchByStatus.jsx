import { useState } from "react";
import {
  X,
  Package,
  Calendar,
  Hash,
  Eye,
  Filter,
  ChevronDown,
} from "lucide-react";
import { UseTNContext } from "../../../../context/TransparenetContext";

export const BatchByStatus = ({ isOpen, onClose }) => {
  const { AllBatchess } = UseTNContext();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Status enum mapping
  const STATUS_ENUM = {
    0: "REGISTERED",
    1: "SHIPPED",
    2: "IN_TRANSIT",
    3: "DELIVERED",
  };

  const STATUS_OPTIONS = [
    { value: "", label: "All Status" },
    { value: 0, label: "REGISTERED" },
    { value: 1, label: "SHIPPED" },
    { value: 2, label: "IN_TRANSIT" },
    { value: 3, label: "DELIVERED" },
  ];

  // Helper functions
  const formatTimestamp = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0: // REGISTERED
        return "bg-yellow-100 text-yellow-800";
      case 1: // SHIPPED
        return "bg-blue-100 text-blue-800";
      case 2: // IN_TRANSIT
        return "bg-purple-100 text-purple-800";
      case 3: // DELIVERED
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter batches based on selected status and search term
  const filteredBatches = AllBatchess?.filter((batch) => {
    const matchesStatus =
      selectedStatus === "" || batch.currentStatus === selectedStatus;
    const matchesSearch =
      searchTerm === "" ||
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Get count for each status
  const getStatusCount = (status) => {
    if (status === "") return AllBatchess.length;
    return AllBatchess.filter((batch) => Number(batch.currentStatus) === status)
      .length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Batch Status Filter</h2>
              <p className="text-indigo-100 mt-1">
                <Filter className="inline w-4 h-4 mr-1" />
                Filter and search batches by status
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Status Selector */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(
                      e.target.value === "" ? "" : parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({getStatusCount(option.value)})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Batches
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, ID, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Status Summary */}
          <div className="mt-4 flex flex-wrap gap-2">
            {STATUS_OPTIONS.slice(1).map((option) => (
              <div
                key={option.value}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  option.value
                )}`}
              >
                {option.label}: {getStatusCount(option.value)}
              </div>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedStatus !== ""
                ? `${STATUS_ENUM[selectedStatus]} Batches`
                : "All Batches"}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredBatches.length} batch
              {filteredBatches.length !== 1 ? "es" : ""} found
            </span>
          </div>
        </div>

        {/* Batch List */}
        <div className="p-6 overflow-y-auto max-h-96">
          {filteredBatches.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No batches found</p>
              <p>Try adjusting your status filter or search terms.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredBatches.map((batch) => (
                <div
                  key={batch.batchId}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-indigo-300"
                  onClick={() => setSelectedBatch(batch)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-semibold text-gray-900">
                          {batch.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            batch.currentStatus
                          )}`}
                        >
                          {STATUS_ENUM[batch.currentStatus]}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Batch ID:</span>{" "}
                          {batch.batchId}
                        </div>
                        <div>
                          <span className="font-medium">Manufacturer:</span>{" "}
                          {batch.manufacturer}
                        </div>
                        <div>
                          <span className="font-medium">Manufacture Date:</span>{" "}
                          {formatTimestamp(batch.manufactureDate)}
                        </div>
                        <div>
                          <span className="font-medium">Expiry Date:</span>{" "}
                          {formatTimestamp(batch.expiryDate)}
                        </div>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedStatus !== "" && (
                <span className="mr-4">
                  Status:{" "}
                  <span className="font-medium">
                    {STATUS_ENUM[selectedStatus]}
                  </span>
                </span>
              )}
              <span>
                Showing {filteredBatches.length} of {AllBatchess.length} batches
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedStatus("");
                  setSearchTerm("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed View Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Batch Details
                </h3>
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batch ID
                    </label>
                    <p className="text-gray-900 font-mono">
                      {selectedBatch.batchId}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedBatch.currentStatus
                      )}`}
                    >
                      {STATUS_ENUM[selectedBatch.currentStatus]}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name
                  </label>
                  <p className="text-gray-900">{selectedBatch.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer
                  </label>
                  <p className="text-gray-900">{selectedBatch.manufacturer}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Composition
                  </label>
                  <p className="text-gray-900">{selectedBatch.composition}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Manufacture Date
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatTimestamp(selectedBatch.manufactureDate)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <p className="text-gray-900 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatTimestamp(selectedBatch.expiryDate)}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Owner
                  </label>
                  <p className="text-gray-900 font-mono">
                    {shortenAddress(selectedBatch.currentOwnerr)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IPFS Documents
                  </label>
                  <div className="space-y-1">
                    {selectedBatch.ipfsDocuments.map((doc, index) => (
                      <p
                        key={index}
                        className="text-gray-900 font-mono text-sm bg-gray-50 p-2 rounded"
                      >
                        {doc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedBatch(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
