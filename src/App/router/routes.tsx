import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../../layouts/AppLayout";
import AuthLayout from "../../layouts/AuthLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import LoginPage from "../../pages/auth/LoginPage";

// pages/components
import SotuvQoshish from "@/pages/components/SotuvQoshish";
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati";
import TolovOynasi from "@/pages/components/TolovOynasi";
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar";

import Kassa from "@/pages/components/Kassa";
import KunlikTopshirish from "@/pages/components/KunlikTopshirish";
import Qarzdozlik from "@/pages/components/Qarzdozlik";

import Qoldiqlash from "@/pages/components/Qoldiqlash";
import Kirim from "@/pages/components/Kirim";
import Kochirish from "@/pages/components/Kochirish";

export const router = createBrowserRouter([
  // ✅ APP (hamma asosiy page'lar AppLayout ichida)
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // saytga kirganda dashboardga olib boradi
      { index: true, element: <Navigate to="/dashboard" replace /> },

      // ✅ Dashboard
      { path: "dashboard", element: <DashboardPage /> },

      // ✅ Finance tabs (Topbar tab'laringiz shu yerga o'tadi)
      { path: "kassa", element: <Kassa /> },
      { path: "kunlik-yopish", element: <KunlikTopshirish /> },
      { path: "qarzdorlik", element: <Qarzdozlik /> },

      // ✅ boshqa bo'limlar (sizdagi pathlarni kichik qilib berdim)
      { path: "sotuv-qoshish", element: <SotuvQoshish /> },
      { path: "sotuvlar-royhati", element: <SotuvlarRoyhati /> },
      { path: "tolov-oynasi", element: <TolovOynasi /> },
      { path: "qaytarilgan-tovarlar", element: <QaytarilganTovarlar /> },

      { path: "qoldiqlash", element: <Qoldiqlash /> },
      { path: "kirim", element: <Kirim /> },
      { path: "kochirish", element: <Kochirish /> },

      // ✅ topilmasa dashboardga qaytarib yubor
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },

  // ✅ AUTH
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
]);
