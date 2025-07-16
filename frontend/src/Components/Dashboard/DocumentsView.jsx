import { UseCompContext } from "../../../context/ComContext";
import { UseTNContext } from "../../../context/TransparenetContext";
import { FunctionCard } from "./FunctionCard";

export const DocumentsView = () => {
  const { IsDistributor, IsManufacturer, IsWholesaler, IsRetailer, Isowner } =
    UseTNContext();
  const { setAddDocumentOpen } = UseCompContext();

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
          onExecute={() => setAddDocumentOpen(true)}
          currentRole={currentRole}
        />
      </div>
    </div>
  );
};
