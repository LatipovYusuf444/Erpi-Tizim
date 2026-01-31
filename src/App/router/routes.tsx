
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";

import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute";
import Topbar4 from "@/widgets/topbar4/Topbar4";

// ✅ SOTUV (modul)

// Sotuv
import SotuvLayout from "@/pages/sotuv/SotuvLayout";
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard";
import SotuvlarRoyhati from "@/pages/sotuv/SotuvlarRoyhati";
import SotuvQoshishFormNew from "@/pages/sotuv/SotuvQoshishFormNew";
import QaytarilganTovarlar from "@/pages/sotuv/QaytarilganTovarlar";

// ✅ MOLIYA (modul)
import FinanceLayout from "@/pages/finance/FinanceLayout";
import FinanceDashboard from "@/pages/finance/FinanceDashboard";
import Kassa from "@/pages/components/Kassa";
import KunlikTopshirish from "@/pages/components/KunlikTopshirish";
import Qarzdozlik from "@/pages/components/Qarzdozlik";

// ✅ OMBOR (modul)
import OmborLayout from "@/pages/ombor/OmborLayout";
import QoldiqlashLayout from "@/pages/ombor/QoldiqlashLayout";
import ProductForm from "@/pages/ombor/ProductForm";
import IngredientForm from "@/pages/ombor/IngredientForm";
import KirimForm from "@/pages/ombor/KirimForm";
import Inventarizatsiya from "@/pages/ombor/Inventarizatsiya";
import Kochirish from "@/pages/components/Kochirish";
// ✅ NOTIFICATION & VOLUME
import NotificationPage from "@/pages/notification/notification";
import VolumePage from "@/pages/notification/VolumePage";

// ✅ XODIMLAR
import Xodimlar from "@/pages/xodimlar/Xodimlar";
import Form from "@/pages/xodimlar/Form";

// ✅ Simple wrapper (nested route uchun)
=======
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom"

import AppLayout from "@/layouts/AppLayout"
import AuthLayout from "@/layouts/AuthLayout"

import DashboardPage from "@/pages/Dashboard/DashboardPage"
import LoginPage from "@/pages/auth/LoginPage"

import ProtectedRoute from "@/pages/auth/ProtectedRoute"
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute"

import SotuvLayout from "@/pages/sotuv/SotuvLayout"
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard"
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati"
import SotuvQoshishForm from "@/pages/components/SotuvQoshishFormNew"

import FinanceLayout from "@/pages/finance/FinanceLayout"
import FinanceDashboard from "@/pages/finance/FinanceDashboard"
import Kassa from "@/pages/components/Kassa"
import KunlikTopshirish from "@/pages/components/KunlikTopshirish"
import Qarzdozlik from "@/pages/components/Qarzdozlik"

import OmborLayout from "@/pages/ombor/OmborLayout"
import QoldiqlashLayout from "@/pages/ombor/QoldiqlashLayout"
import ProductForm from "@/pages/ombor/ProductForm"
import IngredientForm from "@/pages/ombor/IngredientForm"
import KirimForm from "@/pages/ombor/KirimForm"
import Inventarizatsiya from "@/pages/ombor/Inventarizatsiya"
import Kochirish from "@/pages/components/Kochirish"

import NotificationPage from "@/pages/notification/notification"
import VolumePage from "@/pages/notification/VolumePage"

import Xodimlar from "@/pages/xodimlar/Xodimlar"
import Form from "@/pages/xodimlar/Form"

import Profile from "@/pages/profile/profile"
import Topbar4 from "@/widgets/topbar4/Topbar4"
function XodimlarWrapper() {
  return <Outlet />
}

export const router = createBrowserRouter([
  // 🔒 PROTECTED
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },

          { path: "notification", element: <NotificationPage /> },
          { path: "volume", element: <VolumePage /> },

          {
            path: "xodimlar",
            element: <XodimlarWrapper />,
            children: [
              { index: true, element: <Xodimlar /> },
              { path: "form", element: <Form /> },
            ],
          },

          {
            path: "moliya",
            element: <FinanceLayout />,
            children: [
              { index: true, element: <FinanceDashboard /> },
              { path: "kassa", element: <Kassa /> },
              { path: "kunlik-yopish", element: <KunlikTopshirish /> },
              { path: "qarzdorlik", element: <Qarzdozlik /> },
            ],
          },

          {
            path: "sotuv",
            element: <SotuvLayout />, 
            children: [
              { index: true, element: <SotuvDashboard /> },
              { path: "sotuvlar-royhati", element: <SotuvlarRoyhati /> },
              {
                path: "qaytarilgan-tovarlar",
                element: <QaytarilganTovarlar />,
              },
              {
                path: "sotuv-qoshish-form",
                element: <SotuvQoshishFormNew />,
              },
              { path: "*", element: <Navigate to="/sotuv" replace /> },
              { path: "sotuv-qoshish-form", element: <SotuvQoshishForm /> },
            ],
          },

          {
            path: "ombor",
            element: <OmborLayout />,
            children: [
              {
                path: "qoldiqlash",
                element: <QoldiqlashLayout />,
                children: [
                  { path: "product", element: <ProductForm /> },
                  { path: "ingredient", element: <IngredientForm /> },
                ],
              },
              { path: "kirim", element: <KirimForm /> },
              { path: "kochirish", element: <Kochirish /> },
              { path: "inventarizatsiya", element: <Inventarizatsiya /> },
            ],
          },
        ],
      },

      // ✅ PROFILE (protected)
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },

  // 🔓 AUTH
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          { path: "login", element: <LoginPage /> },
        ],
      },
    ],
  },

  // 🧪 TEST
  { path: "/topbar4", element: <Topbar4 /> },

  // ❌ FALLBACK
  { path: "*", element: <Navigate to="/dashboard" replace /> },
])
