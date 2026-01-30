import { useState } from "react";
import { getLang, setLang } from "@/shared/i18n/lang";

export function LangToggle() {
  const [lang, setLangState] = useState(getLang());

  const toggle = () => {
    const next = lang === "uz" ? "ru" : "uz";
    setLang(next);
    setLangState(next);
  };

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 rounded-lg bg-gray-600 text-white"
    >
      {lang === "uz" ? "RU" : "UZ"}
    </button>
  );
}
