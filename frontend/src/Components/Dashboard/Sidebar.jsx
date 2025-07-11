import {
  Activity,
  AlertTriangle,
  BarChart3,
  FileText,
  Package,
  Search,
  Users,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { id: "", label: "Dashboard", icon: BarChart3 },
    { id: "role-management", label: "Role Management", icon: Users },
    { id: "batch-management", label: "Batch Management", icon: Package },
    { id: "status-tracking", label: "Status Tracking", icon: Activity },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "incidents", label: "Incidents", icon: AlertTriangle },
    { id: "reports", label: "Reports", icon: Search },
  ];

  return (
    <aside
      className={`fixed h-screen inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b lg:hidden">
        <span className="text-lg font-semibold text-gray-900">Menu</span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
            key={item.id}
              to={item.id}
              className={({ isActive }) =>
                `w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                    : "text-gray-700"
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
