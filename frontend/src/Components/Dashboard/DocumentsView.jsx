import { FunctionCard } from "./FunctionCard";

export const DocumentsView = ({ currentRole }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Document Management
      </h3>
      <FunctionCard
        title="addDocument"
        description="Add a new document to a batch"
        requiredRoles={[
          "MANUFACTURER",
          "DISTRIBUTOR",
          "WHOLESALER",
          "RETAILER",
        ]}
        onExecute={() => console.log("Add Document")}
        currentRole={currentRole}
      />
    </div>
  </div>
);
