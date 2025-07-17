import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home/Home";
import { RoleManagement } from "../Components/Dashboard/RoleManagement";
import { BatchManagement } from "../Components/Dashboard/BatchManagement";
import { StatusTracking } from "../Components/Dashboard/StatusTracking";
import { DocumentsView } from "../Components/Dashboard/DocumentsView";
import { IncidentsView } from "../Components/Dashboard/IncidentsView";
import { ReportsView } from "../Components/Dashboard/ReportsView";
import { DrugSupplyChainDashboard } from "../Pages/Dashboard/DrugSupplyChainDashboard";
import { Dashboard } from "../Components/Dashboard/Dashboard";
import { Verification } from "../Pages/Home/Verification";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "verification",
        element: <Verification />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DrugSupplyChainDashboard />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "role-management",
        element: <RoleManagement />,
      },

      {
        path: "batch-management",
        element: <BatchManagement />,
      },
      {
        path: "status-tracking",
        element: <StatusTracking />,
      },
      {
        path: "documents",
        element: <DocumentsView />,
      },
      {
        path: "incidents",
        element: <IncidentsView />,
      },
      {
        path: "reports",
        element: <ReportsView />,
      },
    ],
  },
]);
