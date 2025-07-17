import { UseCompContext } from "../../../context/ComContext";
import { UseTNContext } from "../../../context/TransparenetContext";
import { FunctionCard } from "./FunctionCard";

export const IncidentsView = () => {
  const { IsDistributor, IsManufacturer, IsWholesaler, IsRetailer, Isowner } =
    UseTNContext();
  const { setRecordIncidentOpen, setGetRecordsOpen } = UseCompContext();

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
          Incident Management
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunctionCard
            title="Record Incident"
            description="Record a new incident for a batch"
            requiredRoles={["DISTRIBUTOR", "WHOLESALER", "RETAILER"]}
            onExecute={() => setRecordIncidentOpen(true)}
            currentRole={currentRole}
          />
          <FunctionCard
            title="Get Incident By Batch"
            description="Get all incidents for a specific batch"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            onExecute={() => setGetRecordsOpen(true)}
            currentRole={currentRole}
          />
        </div>
      </div>
    </div>
  );
};
