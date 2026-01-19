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
import Kochirish from "@/pages/components/Kochirish"
import Inventarizatsiya from "@/pages/components/Inventarizatsiya";
import Topbar2 from '@/widgets/topbar_2/Topbar2'
import Topbar3 from '@/widgets/topbar_3/Topbar3'
  import Navbar4 from "@/widgets/topbar4/Topbar4";

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
  {
    path: "/Inventarizatsiya",
    element: <Inventarizatsiya/>,
  }
]);
