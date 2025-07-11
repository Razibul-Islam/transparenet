import { X } from "lucide-react";
import { useState } from "react";

export const RoleModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Enter Information",
  placeholder = "Enter value...",
  inputType = "text",
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue("");
      onClose();
    }
  };

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
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
            <input
              type={inputType}
              value={inputValue}
              name="address"
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              autoFocus
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
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
              disabled={!inputValue.trim()}
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
