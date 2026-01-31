import i18n from "./index";

export type Lang = "uz" | "ru";

export function setLang(lang: Lang) {
  i18n.changeLanguage(lang);
  localStorage.setItem("lang", lang);
}

export function getLang(): Lang {
  return (localStorage.getItem("lang") as Lang) || "uz";
}