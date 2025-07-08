import { AlertCircle, Factory, ShoppingCart, Store, Truck } from "lucide-react";
import { RoleCard } from "../../Components/Dashboard/RoleCard";

export const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <RoleCard
        title="Manufacturers"
        icon={Factory}
        color="border-blue-500"
        count="12"
        description="Active manufacturers"
      />
      <RoleCard
        title="Distributors"
        icon={Truck}
        color="border-green-500"
        count="28"
        description="Active distributors"
      />
      <RoleCard
        title="Wholesalers"
        icon={Store}
        color="border-yellow-500"
        count="45"
        description="Active wholesalers"
      />
      <RoleCard
        title="Retailers"
        icon={ShoppingCart}
        color="border-purple-500"
        count="156"
        description="Active retailers"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Batches
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium">Batch #{1000 + i}</p>
                <p className="text-sm text-gray-600">Aspirin 500mg</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                In Transit
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Incidents
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
            >
              <div>
                <p className="font-medium">Incident #{200 + i}</p>
                <p className="text-sm text-gray-600">Temperature deviation</p>
              </div>
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          System Status
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">System Health</span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database</span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Blockchain</span>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Synced
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
