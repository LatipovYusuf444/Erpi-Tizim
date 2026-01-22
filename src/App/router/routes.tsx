<<<<<<< HEAD
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
// import Topbar2 from '@/widgets/topbar_2/Topbar2'
// import Topbar3 from '@/widgets/topbar_3/Topbar3'
//   import Navbar4 from "@/widgets/topbar4/Topbar4";

// Finance module
import MoliyaLayout from "@/pages/finance/FinanceLayout";
import MoliyaDashboard from "@/pages/finance/FinanceDashboard";

// Sales module
import SotuvLayout from "@/pages/sotuv/SotuvLayout";
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard";


import Topbar2 from "@/widgets/topbar_2/Topbar2";
import Topbar3 from "@/widgets/topbar_3/Topbar3";

// pages/components

import Kassa from "@/pages/components/Kassa";

import Navbar4 from "@/widgets/topbar4/Topbar4";

export const router = createBrowserRouter([
  // ✅ APP (hamma asosiy page'lar AppLayout ichida)
=======
import React from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"

import AppLayout from "@/layouts/AppLayout"
import AuthLayout from "@/layouts/AuthLayout"

import DashboardPage from "@/pages/Dashboard/DashboardPage"
import LoginPage from "@/pages/auth/LoginPage"

import ProtectedRoute from "@/pages/auth/ProtectedRoute"
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute"

// Sales module
import SotuvLayout from "@/pages/sotuv/SotuvLayout"
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard"

// Sales pages
import SotuvQoshish from "@/pages/components/SotuvQoshish"
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati"
import TolovOynasi from "@/pages/components/TolovOynasi"
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar"

// Finance pages
import Kassa from "@/pages/components/Kassa"
import KunlikTopshirish from "@/pages/components/KunlikTopshirish"
import Qarzdozlik from "@/pages/components/Qarzdozlik"

// Warehouse pages
import Qoldiqlash from "@/pages/components/Qoldiqlash"
import Kirim from "@/pages/components/Kirim"
import Kochirish from "@/pages/components/Kochirish"
import Inventarizatsiya from "@/pages/components/Inventarizatsiya"

export const router = createBrowserRouter([
  // 🔒 PROTECTED APP (faqat login bo‘lsa)
>>>>>>> 560c8d7fbc88aeb48f23144c8cd5706538c7d3d8
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
          // Finance
          { path: "kassa", element: <Kassa /> },
          { path: "kunlik-yopish", element: <KunlikTopshirish /> },
          { path: "qarzdorlik", element: <Qarzdozlik /> },

<<<<<<< HEAD
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
    element: <Kochirish />,
  },
  {
    path: "/Inventarizatsiya",
    element: <Inventarizatsiya />,
  },
]);
=======
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

              { path: "qoldiqlash", element: <Qoldiqlash /> },
              { path: "kirim", element: <Kirim /> },
              { path: "kochirish", element: <Kochirish /> },
              { path: "inventarizatsiya", element: <Inventarizatsiya /> },

              // sotuv ichidagi fallback
              { path: "*", element: <Navigate to="/sotuv" replace /> }
            ]
          },

          // app ichidagi fallback
          { path: "*", element: <Navigate to="/dashboard" replace /> }
        ]
      }
    ]
  },

  // 🔓 AUTH (faqat login bo‘lmaganlar ko‘radi)
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="/auth/login" replace /> },
          { path: "login", element: <LoginPage /> }
        ]
      }
    ]
  },

  // global fallback
  { path: "*", element: <Navigate to="/dashboard" replace /> }
])
>>>>>>> 560c8d7fbc88aeb48f23144c8cd5706538c7d3d8
