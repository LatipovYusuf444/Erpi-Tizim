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
