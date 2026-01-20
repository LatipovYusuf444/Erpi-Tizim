import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";

// Sales pages
import SotuvQoshish from "@/pages/components/SotuvQoshish";
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati";
import TolovOynasi from "@/pages/components/TolovOynasi";
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar";

// Finance pages
import KassaPage from "@/pages/components/Kassa";
import KunlikTopshirish from "@/pages/components/KunlikTopshirish";
import Qarzdozlik from "@/pages/components/Qarzdozlik";

// Warehouse
import Qoldiqlash from "@/pages/components/Qoldiqlash";
import Kirim from "@/pages/components/Kirim";
import Kochirish from "@/pages/components/Kochirish";
import Inventarizatsiya from "@/pages/components/Inventarizatsiya";

// Finance module
import MoliyaLayout from "@/pages/finance/FinanceLayout";
import MoliyaDashboard from "@/pages/finance/FinanceDashboard";

// Sales module
import SotuvLayout from "@/pages/sotuv/SotuvLayout";
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // root -> dashboard
      { index: true, element: <Navigate to="dashboard" replace /> },

      // Dashboard
      { path: "dashboard", element: <DashboardPage /> },

      // ✅ MOLIYA (nested)
      {
        path: "moliya",
        element: <MoliyaLayout />,
        children: [
          { index: true, element: <MoliyaDashboard /> },
          { path: "kassa", element: <KassaPage /> },
          { path: "kunlik-yopish", element: <KunlikTopshirish /> },
          { path: "qarzdorlik", element: <Qarzdozlik /> },
        ],
      },

      // ✅ SOTUV (nested)
      {
        path: "sotuv",
        element: <SotuvLayout />,
        children: [
          { index: true, element: <SotuvDashboard /> },
          { path: "sotuv-qoshish", element: <SotuvQoshish /> },
          { path: "sotuvlar-royhati", element: <SotuvlarRoyhati /> },
          { path: "tolov-oynasi", element: <TolovOynasi /> },
          { path: "qaytarilgan-tovarlar", element: <QaytarilganTovarlar /> },
        ],
      },

      // Warehouse
      { path: "qoldiqlash", element: <Qoldiqlash /> },
      { path: "kirim", element: <Kirim /> },
      { path: "kochirish", element: <Kochirish /> },
      { path: "inventarizatsiya", element: <Inventarizatsiya /> },

      // 404 -> dashboard
      { path: "*", element: <Navigate to="dashboard" replace /> },
    ],
  },

  // Auth (no sidebar)
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
]);
