"use client";

import { useI18n } from "@/i18n/provider";

export default function CasesPage() {
  const { t } = useI18n();
  return (
    <div className="cases-page page-frame">
      <header className="editorial-header"><p className="eyebrow">{t("cases.eyebrow")}</p><h1>{t("cases.titleLine1")}<br />{t("cases.titleLine2")}</h1><p>{t("cases.intro")}</p></header>
      <div className="case-preview-grid">
        <article><span>{t("common.caseCode")} 001</span><h2>{t("cases.case001.title")}</h2><p>{t("cases.case001.skills")}</p><small>{t("cases.structureMapped")}</small></article>
        <article className="featured"><span>{t("common.caseCode")} 002 · {t("cases.priority")}</span><h2>{t("cases.case002.title")}</h2><p>{t("cases.case002.skills")}</p><small>{t("cases.phase3Entry")}</small></article>
        <article><span>{t("common.caseCode")} 003</span><h2>{t("cases.case003.title")}</h2><p>{t("cases.case003.skills")}</p><small>{t("cases.structureMapped")}</small></article>
      </div>
    </div>
  );
}
