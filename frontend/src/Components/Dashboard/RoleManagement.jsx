import { UseCompContext } from "../../../context/ComContext";
import { UseTNContext } from "../../../context/TransparenetContext";
import { FunctionCard } from "./FunctionCard";

export const RoleManagement = () => {
  const { IsDistributor, IsManufacturer, IsWholesaler, IsRetailer, Isowner } =
    UseTNContext();
  const { setIsModalOpen, setTitle,setIsRevokeModalOpen,setIsGetRoleMember } = UseCompContext();

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
          Role Management Functions
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunctionCard
            title="_makeManufacturer"
            description="Create a new manufacturer entity in the supply chain"
            requiredRoles={["ADMIN"]}
            onExecute={() => setIsModalOpen(true)}
            getTitle={setTitle}
            currentRole={currentRole}
          />
          <FunctionCard
            title="_makeDistributor"
            description="Create a new distributor entity"
            requiredRoles={["ADMIN", "MANUFACTURER"]}
            onExecute={() => setIsModalOpen(true)}
            getTitle={setTitle}
            currentRole={currentRole}
          />
          <FunctionCard
            title="_makeWholesaler"
            description="Create a new wholesaler entity"
            requiredRoles={["ADMIN", "MANUFACTURER", "DISTRIBUTOR"]}
            onExecute={() => setIsModalOpen(true)}
            getTitle={setTitle}
            currentRole={currentRole}
          />
          <FunctionCard
            title="_makeRetailer"
            description="Create a new retailer entity"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
            ]}
            onExecute={() => setIsModalOpen(true)}
            getTitle={setTitle}
            currentRole={currentRole}
          />
          <FunctionCard
            title="revokeRole"
            description="Revoke roles from entities"
            requiredRoles={["ADMIN"]}
            onExecute={() => setIsRevokeModalOpen(true)}
            getTitle={setTitle}
            currentRole={currentRole}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Query Functions
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FunctionCard
            title="getRoleMembers"
            description="Get all members of a specific role"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            getTitle={setTitle}
            onExecute={() => setIsGetRoleMember(true)}
            currentRole={currentRole}
          />
          <FunctionCard
            title="hasAnyRole"
            description="Check if an entity has any of the specified roles"
            requiredRoles={[
              "ADMIN",
              "MANUFACTURER",
              "DISTRIBUTOR",
              "WHOLESALER",
              "RETAILER",
            ]}
            getTitle={setTitle}
            onExecute={() => setIsModalOpen(true)}
            currentRole={currentRole}
          />
        </div>
      </div>
    </div>
  );
};
