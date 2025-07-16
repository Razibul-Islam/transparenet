import { UseCompContext } from "../../../context/ComContext";
import { UseTNContext } from "../../../context/TransparenetContext";
import { FunctionCard } from "./FunctionCard";

export const BatchManagement = () => {
  const { IsDistributor, IsManufacturer, IsWholesaler, IsRetailer, Isowner } =
    UseTNContext();
  const {
    setIsProductModalOpen,
    setIsStatusModalOpen,
    setIsGetDetailsOpen,
    setIsAllBatch,
    getAllBatches,
    setOwnedBatches,
    getOwnedBatches,
    setStatusBatches,
  } = UseCompContext();

  let currentRole = null;

  if (Isowner) {
    currentRole = "ADMIN";
  } else if (IsManufacturer) {
    currentRole = "MANUFACTURER";
  } else if (IsDistributor) {
    currentRole = "DISTRIBUTOR";
  } else if (IsWholesaler) {
    currentRole = "WHOLESALER";
  } else if (IsRetailer) {
    currentRole = "RETAILER";
  } else {
    currentRole = "NO_ROLE";
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Batch Management Functions
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunctionCard
            title="Register Batch"
            description="Register a new batch in the supply chain"
            requiredRoles={["ADMIN", "MANUFACTURER"]}
            onExecute={() => setIsProductModalOpen(true)}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Update Status"
            description="Update the status of a batch"
            requiredRoles={[
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => setIsStatusModalOpen(true)}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Get Batch Details"
            description="Get detailed information about a specific batch"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => setIsGetDetailsOpen(true)}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Get All Batches"
            description="Get all batches in the system"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => {
              setIsAllBatch(true);
              getAllBatches();
            }}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Get Batches By Owner"
            description="Get batches owned by a specific entity"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => {
              setOwnedBatches(true);
              getOwnedBatches();
            }}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Get Batches By Status"
            description="Get batches filtered by status"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => {
              setStatusBatches(true);
              getAllBatches();
            }}
            currentRole={currentRole}
          />
        </div>
      </div>
    </div>
  );
};
