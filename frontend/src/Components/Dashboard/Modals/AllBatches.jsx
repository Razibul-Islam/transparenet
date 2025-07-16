import { useState } from "react";
import {
  X,
  Package,
  Calendar,
  User,
  Hash,
  Search,
  ArrowLeft,
  Building,
  FileText,
  Clock,
  Shield,
} from "lucide-react";
import { UseTNContext } from "../../../../context/TransparenetContext";

export const AllBatches = ({ isOpen, handleClose }) => {
  const { AllBatchess, isLoading } = UseTNContext();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const selectBatch = (batch) => {
    setSelectedBatch(batch);
  };

  const backToList = () => {
    setSelectedBatch(null);
  };

  const getStatusInfo = (status) => {
    switch (Number(status)) {
      case 0:
        return { label: "REGISTERED", color: "bg-yellow-100 text-yellow-800" };
      case 1:
        return { label: "SHIPPED", color: "bg-green-100 text-green-800" };
      case 2:
        return { label: "IN_TRANSIT", color: "bg-red-100 text-red-800" };
      case 3:
        return { label: "DELIVERED", color: "bg-purple-100 text-purple-800" };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-800" };
    }
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const filteredBatches = AllBatchess.filter(
    (batch) =>
      batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!isOpen) return null;
  console.log(filteredBatches);
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {selectedBatch && (
                <button
                  onClick={backToList}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedBatch ? "Batch Details" : "Blockchain Batches"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Modal Content */}
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(90vh - 140px)" }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">
                  Loading batch data from blockchain...
                </span>
              </div>
            ) : selectedBatch ? (
              // Individual Batch Details View
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Hash className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Batch ID
                      </span>
                    </div>
                    <p className="text-sm font-mono text-gray-800 break-all">
                      {selectedBatch.batchId}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Product Name
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedBatch.name}
                    </p>
                  </div>
                </div>

                {/* Manufacturer and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Building className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Manufacturer
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {selectedBatch.manufacturer}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Status
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusInfo(selectedBatch.currentStatus).color
                      }`}
                    >
                      {getStatusInfo(selectedBatch.currentStatus).label}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Manufacture Date
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatTimestamp(selectedBatch.manufactureDate)}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-600">
                        Expiry Date
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {formatTimestamp(selectedBatch.expiryDate)}
                    </p>
                  </div>
                </div>

                {/* Current Owner */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Current Owner
                    </span>
                  </div>
                  <p className="text-sm font-mono text-gray-800 break-all">
                    {formatAddress(selectedBatch.currentOwnerr)}
                  </p>
                </div>

                {/* Composition */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Composition
                    </span>
                  </div>
                  <p className="text-gray-800">{selectedBatch.composition}</p>
                </div>

                {/* IPFS Documents */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">
                      IPFS Documents
                    </span>
                  </div>
                  <div className="space-y-2">
                    {selectedBatch.ipfsDocuments.map((hash, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <p className="text-xs text-gray-500">
                          Document {index + 1}
                        </p>
                        <p className="text-sm font-mono text-blue-600 break-all">
                          {hash}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* History */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">
                      Transaction History
                    </span>
                  </div>
                  <div className="space-y-3">
                    {selectedBatch.history.map((event, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium`}
                            >
                              {getStatusInfo(event[2]).label}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 font-medium">
                            {formatTimestamp(event[4])}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-white p-3 rounded border">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Previous Owner
                            </label>
                            <p className="font-mono text-sm text-gray-800 break-all">
                              {formatAddress(event[0])}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded border">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Current Owner
                            </label>
                            <p className="font-mono text-sm text-gray-800 break-all">
                              {formatAddress(event[1])}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 bg-white p-3 rounded border">
                          <label className="block text-xs font-medium text-gray-500 mb-1">
                            Updated By
                          </label>
                          <p className="font-mono text-sm text-gray-800 break-all">
                            {formatAddress(event[3])}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Batch List View
              <div className="p-6">
                {/* Search Bar */}
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search batches by ID, name, or manufacturer..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Batch Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredBatches.map((batch) => (
                    <div
                      key={batch.batchId}
                      onClick={() => selectBatch(batch)}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusInfo(batch.currentStatus).color
                          }`}
                        >
                          {getStatusInfo(batch.currentStatus).label}
                        </span>
                      </div>

                      <p className="text-sm text-gray-800 font-medium mb-2">
                        {batch.name}
                      </p>
                      <p className="text-xs text-gray-600 mb-3">
                        {batch.manufacturer}
                      </p>

                      <div className="space-y-1 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Manufactured:</span>{" "}
                          {formatTimestamp(batch.manufactureDate)}
                        </div>
                        <div>
                          <span className="font-medium">Expires:</span>{" "}
                          {formatTimestamp(batch.expiryDate)}
                        </div>
                        <div>
                          <span className="font-medium">Owner:</span>{" "}
                          {formatAddress(batch.currentOwnerr)}
                        </div>
                        <div>
                          <span className="font-medium">Documents:</span>{" "}
                          {batch.ipfsDocuments.length} IPFS files
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredBatches.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">
                      No batches found matching your search.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-200 px-6 py-4">
            <button
              onClick={handleClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
