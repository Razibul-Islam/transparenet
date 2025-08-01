import { useState } from "react";
import { X } from "lucide-react";

export const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  title = "Add Product Details",
}) => {
  const [formData, setFormData] = useState({
    batchId: "",
    name: "",
    manufacturer: "",
    composition: "",
    expiryDate: "",
    ipfsDocuments: "",
  });

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "ipfsDocuments" && files && files[0]) {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await fetch("/pinata-api/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
          pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        setFormData((prev) => ({
          ...prev,
          [name]: result.IpfsHash,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "batchId",
      "name",
      "manufacturer",
      "composition",
      "expiryDate",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (isFormValid) {
      await onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      batchId: "",
      name: "",
      manufacturer: "",
      composition: "",
      expiryDate: "",
      ipfsDocuments: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-auto product">
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
        <form onSubmit={handleSubmit} className="p-6">
          {/* Batch ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="batchId"
              value={formData.batchId}
              onChange={handleInputChange}
              placeholder="Enter batch ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Manufacturer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manufacturer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              placeholder="Enter manufacturer name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Composition */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Composition <span className="text-red-500">*</span>
            </label>
            <textarea
              name="composition"
              value={formData.composition}
              onChange={handleInputChange}
              placeholder="Enter product composition"
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
              required
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* IPFS Documents */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IPFS Documents
            </label>
            <input
              type="file"
              name="ipfsDocuments"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx,.txt,.json"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">
              Optional: Upload file to IPFS
            </p>
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
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
