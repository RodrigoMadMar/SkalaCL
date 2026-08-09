"use client";

import { useI18n } from "@/i18n/provider";
import { localeLabels } from "@/i18n/config";

export function LanguageSwitch() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div className="language-switch" role="group" aria-label={t("language.label")}>
      <button type="button" className={locale === "es-CL" ? "active" : ""} onClick={() => setLocale("es-CL")} aria-pressed={locale === "es-CL"}>{localeLabels["es-CL"]}</button>
      <span aria-hidden="true">/</span>
      <button type="button" className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")} aria-pressed={locale === "en"}>{localeLabels.en}</button>
    </div>
  );
}
