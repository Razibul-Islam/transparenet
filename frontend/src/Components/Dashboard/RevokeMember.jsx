import { X } from "lucide-react";
import { useState } from "react";

export const RevokeMember = ({
  isOpen,
  onClose,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [addressValue, setAddressValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && addressValue.trim()) {
      onSubmit({
        role: inputValue,
        address: addressValue,
      });
      setInputValue("");
      setAddressValue("");
      onClose();
    }
  };

  const handleClose = () => {
    setInputValue("");
    setAddressValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Get Role Address
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="ADMIN_ROLE">ADMIN</option>
              <option value="MANUFACTURER">MANUFACTURER</option>
              <option value="DISTRIBUTOR">DISTRIBUTOR</option>
              <option value="WHOLESALER">WHOLESALER</option>
              <option value="RETAILER">RETAILER</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter wallet address (0x...)"
              value={addressValue}
              onChange={(e) => setAddressValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!inputValue.trim() || !addressValue.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
