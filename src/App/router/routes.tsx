import AppLayout from "../../layouts/AppLayout";
import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/auth/LoginPage";
import AuthLayout from "../../layouts/AuthLayout";
import Topbar2 from "../../widgets/topbar_2/Topbar2";
import Topbar3 from "../../widgets/topbar_3/Topbar3";
import { createBrowserRouter, Navigate } from "react-router-dom";
import SotuvQoshish from "@/pages/components/SotuvQoshish";
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati";
import TolovOynasi from "@/pages/components/TolovOynasi";
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar";
import Kassa from "@/pages/components/Kassa";
import Qarzdozlik from "@/pages/components/Qarzdozlik";
import KunlikYopish from "@/pages/components/KunlikYopish";
import SotuvQoshishRight from "@/pages/components/SotuvQoshishRight";

export const router = createBrowserRouter([
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
  {
    path: "/topbar2",
    element: <Topbar2 />,
  },
  {
    path: "/topbar3",
    element: <Topbar3 />,
  },
  {
    path: "/SotuvQoshish",
    element: <SotuvQoshish />,
  },
  {
    path: "/SotuvlarRoyhati",
    element: <SotuvlarRoyhati />,
  },
  {
    path: "/TolovOynasi",
    element: <TolovOynasi />,
  },
  {
    path: "/QaytarilganTovarlar",
    element: <QaytarilganTovarlar />,
  },
  {
    path: "/Kassa",
    element: <Kassa />,
  },
  {
    path: "/KunlikYopish",
    element: <KunlikYopish />,
  },
  {
    path: "/Qarzdozlik",
    element: <Qarzdozlik />,
  },
  {
    path: "/SotuvQoshishRight",
    element: <SotuvQoshishRight />,
  },
]);
