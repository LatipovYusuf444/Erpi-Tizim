import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import LoginPage from "@/pages/auth/LoginPage";

import ProtectedRoute from "@/pages/auth/ProtectedRoute"
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute"
import Topbar4 from '@/widgets/topbar4/Topbar4'

// Sotuv
import SotuvLayout from "@/pages/sotuv/SotuvLayout";
import SotuvDashboard from "@/pages/sotuv/SotuvDashboard";
import SotuvQoshish from "@/pages/components/SotuvQoshish";
import SotuvlarRoyhati from "@/pages/components/SotuvlarRoyhati";
import TolovOynasi from "@/pages/components/TolovOynasi";
import QaytarilganTovarlar from "@/pages/components/QaytarilganTovarlar";

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
import KirimForm from "@/pages/components/Kirim";
import Inventarizatsiya from "@/pages/ombor/Inventarizatsiya";
import Kochirish from "@/pages/components/Kochirish";
import Notification from "@/pages/notification/notification";
import VolumePage from "@/pages/notification/VolumePage"
import NotificationPage from "@/pages/notification/notification"

// ...


export const router = createBrowserRouter([
  // 🔒 Protected
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },

          // ✅ MOLIYA
          {
            path: "moliya",
            element: <FinanceLayout />, // ichida <Outlet/>
            children: [
              { index: true, element: <FinanceDashboard /> }, // birinchi ochiladigan dashboard
              { path: "kassa", element: <Kassa /> },
              { path: "kunlik-yopish", element: <KunlikTopshirish /> },
              { path: "qarzdorlik", element: <Qarzdozlik /> },
              { path: "*", element: <Navigate to="/moliya" replace /> },
            ],
          },

          // ✅ eski finance url’lar sinmasin
          { path: "kassa", element: <Navigate to="/moliya/kassa" replace /> },
          {
            path: "kunlik-yopish",
            element: <Navigate to="/moliya/kunlik-yopish" replace />,
          },
          {
            path: "qarzdorlik",
            element: <Navigate to="/moliya/qarzdorlik" replace />,
          },
          { path: "volume", element: <VolumePage /> },
          { path: "notifications", element: <NotificationPage /> },

          // ✅ SOTUV
          {
            path: "sotuv",
            element: <SotuvLayout />,
            children: [
              { index: true, element: <SotuvDashboard /> },
              { path: "sotuv-qoshish", element: <SotuvQoshish /> },
              { path: "sotuvlar-royhati", element: <SotuvlarRoyhati /> },
              { path: "tolov-oynasi", element: <TolovOynasi /> },
              {
                path: "qaytarilgan-tovarlar",
                element: <QaytarilganTovarlar />,
              },
              { path: "*", element: <Navigate to="/sotuv" replace /> },
            ],
          },

          // ✅ OMBOR
          {
            path: "ombor",
            element: <OmborLayout />, // ichida <Outlet/>
            children: [
              { index: true, element: <Navigate to="qoldiqlash" replace /> },

              {
                path: "qoldiqlash",
                element: <QoldiqlashLayout />, // ichida <Outlet/>
                children: [
                  { index: true, element: <Navigate to="product" replace /> },
                  { path: "product", element: <ProductForm /> },
                  { path: "ingredient", element: <IngredientForm /> },
                ],
              },

              { path: "kirim", element: <KirimForm /> },
              { path: "kochirish", element: <Kochirish /> },
              { path: "inventarizatsiya", element: <Inventarizatsiya /> },

              { path: "*", element: <Navigate to="/ombor" replace /> },
            ],
          },
          {
            path: "notifications",
            element: <Notification />,
          },

          // ✅ eski ombor url’lar sinmasin
          {
            path: "qoldiqlash",
            element: <Navigate to="/ombor/qoldiqlash" replace />,
          },
          { path: "kirim", element: <Navigate to="/ombor/kirim" replace /> },
          {
            path: "kochirish",
            element: <Navigate to="/ombor/kochirish" replace />,
          },
          {
            path: "inventarizatsiya",
            element: <Navigate to="/ombor/inventarizatsiya" replace />,
          },

          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },

  // 🔓 Auth
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

  { path: "topbar4", element: <Topbar4 /> },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
