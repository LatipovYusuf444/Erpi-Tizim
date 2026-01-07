import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css"; // yoki "./index.css"
import QueryProvider from "./App/providers/QueryProvider";
import AppRouter from "./App/router/AppRouter";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  </React.StrictMode>
);
