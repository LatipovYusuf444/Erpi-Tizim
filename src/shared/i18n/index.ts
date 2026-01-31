import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/shared/i18n/Resources";

const savedLang = localStorage.getItem("lang") || "uz";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang,
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;