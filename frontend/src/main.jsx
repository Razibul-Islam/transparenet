import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import TransparenetContext from "../context/TransparenetContext.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import ComContext from "../context/ComContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TransparenetContext>
      <ComContext>
        <RouterProvider router={router} />
      </ComContext>
    </TransparenetContext>
  </StrictMode>
);
