import { Menu, Shield } from "lucide-react";
import { Link } from "react-router";

export const Header = ({
  currentRole,
  setCurrentRole,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const roles = [
    "ADMIN",
    "MANUFACTURER",
    "DISTRIBUTOR",
    "WHOLESALER",
    "RETAILER",
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-xl font-semibold text-gray-900 ml-2">
              Drug Supply Chain Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {currentRole.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
