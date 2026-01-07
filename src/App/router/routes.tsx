import { Navigate } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/auth/LoginPage";
import AuthLayout from "../../layouts/AuthLayout";

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
];

