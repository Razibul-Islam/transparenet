import { X } from "lucide-react";
import { useState } from "react";
import { UseCompContext } from "../../../../context/ComContext";
import { UseTNContext } from "../../../../context/TransparenetContext";

export const UpdateStatus = ({ isOpen, handleClose, onSubmit }) => {
  const [batchId, setBatchId] = useState("");
  const { getBatchDetails } = UseCompContext();
  const { IsRetailer, IsWholesaler, IsDistributor, IsManufacturer } =
    UseTNContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = Number(await getDetails(batchId));
    console.log(status);

    if (
      (IsDistributor && status >= 1) ||
      (IsWholesaler && status !== 1) ||
      (IsRetailer && status !== 2) ||
      (IsManufacturer && status !== 3)
    ) {
      alert("You Already Update your status");
      return;
    }

    if (batchId.trim()) {
      await onSubmit(batchId);
      setBatchId("");
      handleClose();
      alert("Status Updated Successfully");
    }
  };

  const getDetails = async (batchId) => {
    const details = await getBatchDetails(batchId);
    return details.history[details.history.length - 1][2];
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Update Batch Status
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Batch ID Input */}
            <div>
              <label
                htmlFor="batchId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Batch ID
              </label>
              <input
                type="text"
                id="batchId"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter batch ID"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md transition-colors duration-200"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
