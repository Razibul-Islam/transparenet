import { useState } from "react";
import { Header } from "../../Components/Dashboard/Header";
import { Outlet } from "react-router";
import { Sidebar } from "../../Components/Dashboard/Sidebar";
import { RoleModal } from "../../Components/Dashboard/RoleModal";
import { UseCompContext } from "../../../context/ComContext";

export const DrugSupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentRole, setCurrentRole] = useState("ADMIN");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setIsModalOpen, handleSubmit, isModalOpen } = UseCompContext();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />

          <RoleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            title="Enter User Address"
            placeholder="Address"
            submitText="Save"
            cancelText="Cancel"
          />
        </main>
      </div>
    </div>
  );
};
