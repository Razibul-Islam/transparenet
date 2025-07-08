import { FunctionCard } from "./FunctionCard";

export const BatchManagement = ({ currentRole }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Batch Management Functions
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunctionCard
          title="registerBatch"
          description="Register a new batch in the supply chain"
          requiredRoles={["ADMIN", "MANUFACTURER"]}
          onExecute={() => console.log("Register Batch")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="updateStatus"
          description="Update the status of a batch"
          requiredRoles={[
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Update Status")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="getBatchDetails"
          description="Get detailed information about a specific batch"
          requiredRoles={[
            "ADMIN",
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Get Batch Details")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="getAllBatches"
          description="Get all batches in the system"
          requiredRoles={[
            "ADMIN",
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Get All Batches")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="getBatchesByOwner"
          description="Get batches owned by a specific entity"
          requiredRoles={[
            "ADMIN",
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Get Batches By Owner")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="getBatchesByStatus"
          description="Get batches filtered by status"
          requiredRoles={[
            "ADMIN",
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Get Batches By Status")}
          currentRole={currentRole}
        />
      </div>
    </div>
  </div>
);
