import { useState } from "react";
import {
  Search,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  Calendar,
  FileText,
  History,
} from "lucide-react";
import { UseCompContext } from "../../../../context/ComContext";
import { UseTNContext } from "../../../../context/TransparenetContext";

export const GetDetails = ({ isOpen, handleClose, onSubmit }) => {
  const [batchId, setBatchId] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { batchDetails } = UseCompContext();
  const { isLoading } = UseTNContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!batchId.trim()) {
      alert("Please enter a batch ID");
      return;
    }
    onSubmit(batchId);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // eslint-disable-next-line no-unused-vars
  const AccordionItem = ({ title, children, icon: Icon, section }) => (
    <div className="border border-gray-200 rounded-lg mb-2">
      <button
        onClick={() => toggleAccordion(section)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-blue-600" />
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {activeAccordion === section ? (
          <ChevronUp size={18} className="text-gray-500" />
        ) : (
          <ChevronDown size={18} className="text-gray-500" />
        )}
      </button>
      {activeAccordion === section && (
        <div className="px-4 pb-4 border-t border-gray-100">{children}</div>
      )}
    </div>
  );

  const getStatusColor = (status) => {
    const colors = {
      REGISTERED: "bg-blue-100 text-blue-800",
      IN_TRANSIT: "bg-yellow-100 text-yellow-800",
      DELIVERED: "bg-green-100 text-green-800",
      EXPIRED: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  function checkStatus(status) {
    switch (status) {
      case 0n:
        return "REGISTERED";
      case 1n:
        return "SHIPPED";
      case 2n:
        return "IN_TRANSIT";
      case 3n:
        return "DELIVERED";
      default:
        return "Loading...";
    }
  }

  if (!isOpen) return null;
  return (
    <div className="p-6">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Batch Details</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Search Input */}
            <div className="mb-6">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    placeholder="Enter Batch ID (e.g., BATCH001, BATCH002)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    disabled={isLoading}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Batch Details Accordion */}
            {batchDetails && (
              <div className="space-y-2">
                <AccordionItem
                  title="Basic Information"
                  icon={Package}
                  section="basic"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Batch ID
                      </label>
                      <p className="text-gray-800 font-mono bg-gray-50 px-3 py-2 rounded">
                        {batchDetails.batchId}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Product Name
                      </label>
                      <p className="text-gray-800">{batchDetails.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Manufacturer
                      </label>
                      <p className="text-gray-800">
                        {batchDetails.manufacturer}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Current Status
                      </label>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          batchDetails.currentStatus
                        )}`}
                      >
                        {checkStatus(batchDetails.currentStatus)}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Composition
                      </label>
                      <p className="text-gray-800">
                        {batchDetails.composition}
                      </p>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title="Dates & Ownership"
                  icon={Calendar}
                  section="dates"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Manufacture Date
                      </label>
                      <p className="text-gray-800">
                        {new Date(
                          Number(batchDetails.manufactureDate) * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Expiry Date
                      </label>
                      <p className="text-gray-800">
                        {new Date(
                          Number(batchDetails.expiryDate) * 1000
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Current Owner
                      </label>
                      <p className="text-gray-800 font-mono bg-gray-50 px-3 py-2 rounded">
                        {batchDetails.currentOwnerr}
                      </p>
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem
                  title="Documents"
                  icon={FileText}
                  section="documents"
                >
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      IPFS Documents
                    </label>
                    <div className="space-y-2">
                      {batchDetails?.ipfsDocuments?.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-mono text-sm text-gray-700">
                            {doc}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View Document
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionItem>

                <AccordionItem title="History" icon={History} section="history">
                  <div className="mt-3">
                    <div className="space-y-3">
                      {batchDetails?.history?.map((entry, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                              <span
                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                  entry[2]
                                )}`}
                              >
                                {checkStatus(entry[2])}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500 font-medium">
                              {new Date(Number(entry[4])).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-white p-3 rounded border">
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Previous Owner
                              </label>
                              <p className="font-mono text-sm text-gray-800 break-all">
                                {entry[0]}
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border">
                              <label className="block text-xs font-medium text-gray-500 mb-1">
                                Current Owner
                              </label>
                              <p className="font-mono text-sm text-gray-800 break-all">
                                {entry[1]}
                              </p>
                            </div>
                          </div>

                          <div className="mt-3 bg-white p-3 rounded border">
                            <label className="block text-xs font-medium text-gray-500 mb-1">
                              Updated By
                            </label>
                            <p className="font-mono text-sm text-gray-800 break-all">
                              {entry[3]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionItem>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
