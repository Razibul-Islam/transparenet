import { useState } from "react";
import { X, Package, Calendar, Hash, User, Eye } from "lucide-react";
import { UseTNContext } from "../../../../context/TransparenetContext";

export const GetBatchesOwner = ({ isOpen, onClose }) => {
  const { account, AllOwnedBatchess, isLoading } = UseTNContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Status enum mapping
  const STATUS_ENUM = {
    0: "REGISTERED",
    1: "SHIPPED",
    2: "IN_TRANSIT",
    3: "DELIVERED",
  };

  // Helper functions
  const formatTimestamp = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const filteredBatches = AllOwnedBatchess.filter(
    (batch) =>
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Batch Ownership</h2>
              <p className="text-blue-100 mt-1">
                <User className="inline w-4 h-4 mr-1" />
                Address: {account || "0x1234...5678"}
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

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search batches by name, ID, or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Batch List */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {filteredBatches.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No batches found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredBatches.map((batch) => (
                <div
                  key={batch.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedBatch(batch)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Package className="w-5 h-5 text-blue-600" />
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
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
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
            <p className="text-sm text-gray-600">
              Total Batches: {filteredBatches.length}
            </p>
            <div className="flex gap-2">
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto product">
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
                    {selectedBatch.currentOwnerr}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    History
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedBatch.history.map((entry, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              entry.status
                            )}`}
                          >
                            {STATUS_ENUM[entry.status]}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(entry.timestamp)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">From:</span>{" "}
                            {shortenAddress(entry.previousOwner)}
                          </p>
                          <p>
                            <span className="font-medium">To:</span>{" "}
                            {shortenAddress(entry.currentOwner)}
                          </p>
                          <p>
                            <span className="font-medium">Updated by:</span>{" "}
                            {shortenAddress(entry.updatedBy)}
                          </p>
                        </div>
                      </div>
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
