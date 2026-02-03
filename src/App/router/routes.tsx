import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";


import LoginPage from "@/pages/auth/LoginPage";

import ProtectedRoute from "@/pages/auth/ProtectedRoute";
import PublicOnlyRoute from "@/pages/auth/PublicOnlyRoute";
import Topbar4 from "@/widgets/topbar4/Topbar4";


// ✅ XODIMLAR
import Xodimlar from "@/pages/xodimlar/Xodimlar";
import Form from "@/pages/xodimlar/Form";

// ✅ Simple wrapper (nested route uchun)
function XodimlarWrapper() {
  return <Outlet />;
}

export const router = createBrowserRouter([
  // 🔒 Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },

          // ✅ NOTIFICATION (asosiy route)
          { path: "notification", element: <NotificationPage /> },
          { path: "volume", element: <VolumePage /> },

          // ✅ eski url sinmasin (agar oldin /notifications bo'lgan bo'lsa)
          {
            path: "notifications",
            element: <Navigate to="/notification" replace />,
          },

          // ✅ XODIMLAR (modul)
          {
            path: "xodimlar",
            element: <XodimlarWrapper />,
            children: [
              { index: true, element: <Xodimlar /> },
              { path: "form", element: <Form /> },
              { path: "*", element: <Navigate to="/xodimlar" replace /> },
            ],
          },

          // ✅ MOLIYA
          {
            path: "moliya",
            element: <FinanceLayout />,
            children: [
              { index: true, element: <FinanceDashboard /> },
              { path: "kassa", element: <Kassa /> },
              { path: "kassa-jadvali-form", element: <KassaJadvaliForm /> },
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
            path: "kassa-jadvali-form",
            element: <Navigate to="/moliya/kassa-jadvali-form" replace />,
          },

          {
            path: "qarzdorlik",
            element: <Navigate to="/moliya/qarzdorlik" replace />,
          },

          // ✅ SOTUV
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
            ],
          },

          // ✅ OMBOR
          {
            path: "ombor",
            element: <OmborLayout />,
            children: [
              { index: true, element: <Navigate to="qoldiqlash" replace /> },
              {
                path: "qoldiqlash",
                element: <QoldiqlashLayout />,
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
          // afdafafagfsagag
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
            path: "kochirish",
            element: <Navigate to="/ombor/kochirish" replace />,
          },
          {
            path: "inventarizatsiya",
            element: <Navigate to="/ombor/inventarizatsiya" replace />,
          },

          // ✅ ixtiyoriy eski url
          { path: "rasm", element: <Navigate to="/xodimlar" replace /> },

          // fallback
          { path: "*", element: <Navigate to="/dashboard" replace /> },
        ],
      },
    ],
  },

  // 🔓 Auth routes
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

  // test route
  { path: "topbar4", element: <Topbar4 /> },

  { path: "*", element: <Navigate to="/dashboard" replace /> },
]);
