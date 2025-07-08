import { FunctionCard } from "./FunctionCard";

export const IncidentsView = ({ currentRole }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Incident Management
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunctionCard
          title="recordIncident"
          description="Record a new incident for a batch"
          requiredRoles={["DISTRIBUTOR", "WHOLESALER", "RETAILER"]}
          onExecute={() => console.log("Record Incident")}
          currentRole={currentRole}
        />
        <FunctionCard
          title="getIncidentByBatch"
          description="Get all incidents for a specific batch"
          requiredRoles={[
            "ADMIN",
            "MANUFACTURER",
            "DISTRIBUTOR",
            "WHOLESALER",
            "RETAILER",
          ]}
          onExecute={() => console.log("Get Incident By Batch")}
          currentRole={currentRole}
        />
      </div>
    </div>
  </div>
);
