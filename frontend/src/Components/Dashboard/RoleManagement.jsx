import { FunctionCard } from "./FunctionCard";

export const RoleManagement = ({ currentRole }) => {
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
            onExecute={() => console.log("Make Manufacturer")}
            currentRole={currentRole}
          />
          <FunctionCard
            title="_makeDistributor"
            description="Create a new distributor entity"
            requiredRoles={["ADMIN", "MANUFACTURER"]}
            onExecute={() => console.log("Make Distributor")}
            currentRole={currentRole}
          />
          <FunctionCard
            title="_makeWholesaler"
            description="Create a new wholesaler entity"
            requiredRoles={["ADMIN", "MANUFACTURER", "DISTRIBUTOR"]}
            onExecute={() => console.log("Make Wholesaler")}
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
            onExecute={() => console.log("Make Retailer")}
            currentRole={currentRole}
          />
          <FunctionCard
            title="revokeRole"
            description="Revoke roles from entities"
            requiredRoles={["ADMIN"]}
            onExecute={() => console.log("Revoke Role")}
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
            onExecute={() => console.log("Get Role Members")}
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
            onExecute={() => console.log("Has Any Role")}
            currentRole={currentRole}
          />
        </div>
      </div>
    </div>
  );
};
