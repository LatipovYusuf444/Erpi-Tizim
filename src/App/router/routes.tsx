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
import Navbar4 from "@/widgets/topbar4/Topbar4";
import Qoldiqlash from "@/pages/components/Qoldiqlash";
import Kirim from "@/pages/components/Kirim";
import Kochirish from "@/pages/components/Kochirish"
import KunlikTopshirish from "@/pages/components/KunlikTopshirish";

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
    path: "/topbar4",
    element: <Navbar4 />,
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
    path: "/KunlikTopshirish",
    element: <KunlikTopshirish />,
  },
  {
    path: "/Qarzdozlik",
    element: <Qarzdozlik />,
  },
  {
    path: "/Qoldiqlash",
    element: <Qoldiqlash />,
  },
    {
    path: "/Kirim",
    element: <Kirim />,
  },
      {
    path: "/Kochirish",
    element: <Kochirish/>,
  },
]);
