import { useState } from "react";
import { Header } from "../../Components/Dashboard/Header";
import { Outlet } from "react-router";
import { Sidebar } from "../../Components/Dashboard/Sidebar";
import { RoleModal } from "../../Components/Dashboard/Modals/RoleModal";
import { UseCompContext } from "../../../context/ComContext";
import { GetRoleMembers } from "../../Components/Dashboard/Modals/GetRoleMembers";
import { RevokeMember } from "../../Components/Dashboard/RevokeMember";
import { ProductModal } from "../../Components/Dashboard/Modals/ProductModal";
import { UpdateStatus } from "../../Components/Dashboard/Modals/UpdateStatus";
import { GetDetails } from "../../Components/Dashboard/Modals/GetDetails";
import { AllBatches } from "../../Components/Dashboard/Modals/AllBatches";
import { GetBatchesOwner } from "../../Components/Dashboard/Modals/GetBatchesOwner";
import { BatchByStatus } from "../../Components/Dashboard/Modals/BatchByStatus";
import { AddDocument } from "../../Components/Dashboard/Document/AddDocument";

export const DrugSupplyChainDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentRole, setCurrentRole] = useState("ADMIN");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    setIsModalOpen,
    handleSubmit,
    isModalOpen,
    isGetRoleMember,
    isRevokeModalOpen,
    setIsGetRoleMember,
    setIsRevokeModalOpen,
    isProductModalOpen,
    setIsProductModalOpen,
    handleRegister,
    isStatusModalOpen,
    setIsStatusModalOpen,
    handleUpdateStatus,
    getBatchDetails,
    setIsGetDetailsOpen,
    isGetDetailsOpen,
    isAllBatch,
    setIsAllBatch,
    ownedBatches,
    setOwnedBatches,
    statusBatches,
    setStatusBatches,
    setAddDocumentOpen,
    addDocumentOpen,
  } = UseCompContext();

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
          <GetRoleMembers
            isOpen={isGetRoleMember}
            onClose={() => setIsGetRoleMember(false)}
            onSubmit={handleSubmit}
            submitText="Submit"
            cancelText="Cancel"
          />
          <RevokeMember
            isOpen={isRevokeModalOpen}
            onClose={() => setIsRevokeModalOpen(false)}
            onSubmit={handleSubmit}
            submitText="Submit"
            cancelText="Cancel"
          />
          <ProductModal
            isOpen={isProductModalOpen}
            onClose={() => setIsProductModalOpen(false)}
            onSubmit={handleRegister}
            submitText="Submit"
            cancelText="Cancel"
          />
          <UpdateStatus
            isOpen={isStatusModalOpen}
            handleClose={() => setIsStatusModalOpen(false)}
            onSubmit={handleUpdateStatus}
          />
          <GetDetails
            isOpen={isGetDetailsOpen}
            handleClose={() => setIsGetDetailsOpen(false)}
            onSubmit={getBatchDetails}
          />
          <AllBatches
            isOpen={isAllBatch}
            handleClose={() => setIsAllBatch(false)}
          />
          <GetBatchesOwner
            isOpen={ownedBatches}
            onClose={() => setOwnedBatches(false)}
          />
          <BatchByStatus
            isOpen={statusBatches}
            onClose={() => setStatusBatches(false)}
          />
          <AddDocument
            isOpen={addDocumentOpen}
            onClose={() => setAddDocumentOpen(false)}
          />
        </main>
      </div>
    </div>
  );
};
