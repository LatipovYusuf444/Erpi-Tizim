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
import KassaPage from "@/pages/components/Kassa";
import KunlikTopshirish from "@/pages/components/KunlikTopshirish";
import Qarzdozlik from "@/pages/components/Qarzdozlik";

// Warehouse
import Qoldiqlash from "@/pages/components/Qoldiqlash";
import Kirim from "@/pages/components/Kirim";
import Kochirish from "@/pages/components/Kochirish";
import Inventarizatsiya from "@/pages/components/Inventarizatsiya";
import QoldiqlashLayout from "@/pages/components/Qoldiqlash"
import QoldiqlashProduct from "@/pages/components/Qoldiqlaw1"
import QoldiqlashIngredient from "@/pages/components/qoldiqlash2"


import Topbar2 from '@/widgets/topbar_2/Topbar2'
import Topbar3 from '@/widgets/topbar_3/Topbar3'
import Navbar4 from "@/widgets/topbar4/Topbar4";

// Finance module
import MoliyaLayout from "@/pages/finance/FinanceLayout";
import MoliyaDashboard from "@/pages/finance/FinanceDashboard";
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
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },

          { path: "dashboard", element: <DashboardPage /> },

          // Finance
          { path: "kassa", element: <Kassa /> },
          { path: "kunlik-yopish", element: <KunlikTopshirish /> },
          { path: "qarzdorlik", element: <Qarzdozlik /> },

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
{
  path: "ombor",
  element: <Navbar4 />,
  children: [
    { index: true, element: <Navigate to="qoldiqlash" replace /> },

    {
      path: "qoldiqlash",
      element: <QoldiqlashLayout />,
      children: [
        { index: true, element: <Navigate to="product" replace /> }, // ✅ default
        { index: true, element: <Navigate to="ingredient" replace /> }, // ✅ default
        { path: "product", element: <QoldiqlashProduct /> },         // ✅ Qoldiqlaw1
        { path: "ingredient", element: <QoldiqlashIngredient /> },   // ✅ Qoldiqlaw2
      ],
    },

    { path: "kirim", element: <Kirim /> },
    { path: "kochirish", element: <Kochirish /> },
    { path: "inventarizatsiya", element: <Inventarizatsiya /> },
  ],
},


  // ✅ eski pathlar redirect (YECHIM 1)
  { path: "qoldiqlash", element: <Navigate to="/ombor/qoldiqlash" replace /> },
  { path: "kirim", element: <Navigate to="/ombor/kirim" replace /> },
  { path: "kochirish", element: <Navigate to="/ombor/kochirish" replace /> },
  { path: "inventarizatsiya", element: <Navigate to="/ombor/inventarizatsiya" replace /> },

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
