import { useState } from "react";
import { create } from "ipfs-http-client";
import { UseCompContext } from "../../../../context/ComContext";

const ipfs = create({
  host: "localhost",
  port: "5002",
  protocol: "http",
});

export const AddDocument = ({ isOpen, onClose }) => {
  const { addDocument } = UseCompContext();
  const [batchId, setBatchId] = useState("");
  const [document, setDocument] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = document;
    if (!file || !batchId) {
      alert("Please provide both Batch ID and Document.");
      return;
    }
    const added = await ipfs.add(file);
    const cid = added.cid.toString();

    await addDocument(batchId, cid);
    alert("Document added successfully!");

    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Add Document to Batch</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Batch ID</label>
            <input
              type="text"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter Batch ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Document</label>
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
              className="w-full mt-1"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
            >
              Submit
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
