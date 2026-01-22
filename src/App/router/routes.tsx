import { createBrowserRouter, Navigate } from "react-router-dom"

import AppLayout from "@/layouts/AppLayout"
import AuthLayout from "@/layouts/AuthLayout"

import DashboardPage from "@/pages/Dashboard/DashboardPage"
import LoginPage from "@/pages/auth/LoginPage"

import ProtectedRoute from "@/pages/auth/ProtectedRoute"
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute"

// Sotuv module
import SotuvLayout from "@/pages/sotuv/SotuvLayout"
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard"

// Sotuv pages
import SotuvQoshish from "@/pages/components/SotuvQoshish"
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati"
import TolovOynasi from "@/pages/components/TolovOynasi"
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar"

// Finance pages
import Kassa from "@/pages/components/Kassa"
import KunlikTopshirish from "@/pages/components/KunlikTopshirish"
import Qarzdozlik from "@/pages/components/Qarzdozlik"

// Ombor pages
import Kirim from "@/pages/components/Kirim"
import Kochirish from "@/pages/components/Kochirish"
import Inventarizatsiya from "@/pages/components/Inventarizatsiya"
import Qoldiqlash from "@/pages/components/Qoldiqlash"

// Ombor layout/pages (seniki)
import Navbar4 from "@/widgets/topbar4/Topbar4" 
import QoldiqlashProduct from "@/pages/components/Qoldiqlaw1"
import QoldiqlashIngredient from "@/pages/components/qoldiqlash2"

export const router = createBrowserRouter([
  // 🔒 PROTECTED APP
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

              { path: "*", element: <Navigate to="/sotuv" replace /> }
            ]
          },

          // ✅ OMBOR (nested)
          {
            path: "ombor",
            element: <Navbar4 />, // ⚠️ Navbar4 ichida <Outlet/> bo‘lishi shart
            children: [
              { index: true, element: <Navigate to="qoldiqlash" replace /> },

              {
                path: "qoldiqlash",
                element: <Qoldiqlash />, // ⚠️ layout ichida ham <Outlet/> bo‘lsin
                children: [
                  { index: true, element: <Navigate to="product" replace /> }, // ✅ bitta default
                  { path: "product", element: <QoldiqlashProduct /> },
                  { path: "ingredient", element: <QoldiqlashIngredient /> }
                ]
              },

              { path: "kirim", element: <Kirim /> },
              { path: "kochirish", element: <Kochirish /> },
              { path: "inventarizatsiya", element: <Inventarizatsiya /> },

              { path: "*", element: <Navigate to="/ombor" replace /> }
            ]
          },

          // ✅ eski pathlar redirect
          { path: "qoldiqlash", element: <Navigate to="/ombor/qoldiqlash" replace /> },
          { path: "kirim", element: <Navigate to="/ombor/kirim" replace /> },
          { path: "kochirish", element: <Navigate to="/ombor/kochirish" replace /> },
          { path: "inventarizatsiya", element: <Navigate to="/ombor/inventarizatsiya" replace /> },

          // app fallback
          { path: "*", element: <Navigate to="/dashboard" replace /> }
        ]
      }
    ]
  },

  // 🔓 AUTH
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
