import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@/index.css"; // yoki "./index.css
import { router } from "./App/router/routes";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./App/providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
    </QueryProvider>
  </React.StrictMode>
)
