"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/layout/icons";
import { useI18n } from "@/i18n/provider";
import { useSkalaState } from "@/lib/state/provider";

export default function CasesPage() {
  const { t } = useI18n();
  const { caseCompletions } = useSkalaState();
  const completed = (caseId: string) => caseCompletions.some((item) => item.caseId === caseId);
  const card = (code: string, caseId: string, slug: string, titleKey: "cases.case001.title" | "cases.case002.title" | "cases.case003.title", skillsKey: "cases.case001.skills" | "cases.case002.skills" | "cases.case003.skills", featured = false) => (
    <article className={`${featured ? "featured " : ""}playable`}>
      <span>{t("common.caseCode")} {code} · {completed(caseId) ? t("cases.completed") : t("cases.available")}</span>
      <h2>{t(titleKey)}</h2><p>{t(skillsKey)}</p>
      <small>{featured ? t("cases.case002.summary") : t("cases.caseReady")}</small>
      <Link href={`/cases/${slug}`} className="text-action">{completed(caseId) ? t("cases.reopen") : t("cases.enter")} <ArrowIcon /></Link>
    </article>
  );
  return <div className="cases-page page-frame"><header className="editorial-header"><p className="eyebrow">{t("cases.eyebrow")}</p><h1>{t("cases.titleLine1")}<br />{t("cases.titleLine2")}</h1><p>{t("cases.intro")}</p></header><div className="case-preview-grid">{card("001", "case.pricing-pressure", "pricing-pressure", "cases.case001.title", "cases.case001.skills")}{card("002", "case.ai-copilot-economics", "ai-copilot-economics", "cases.case002.title", "cases.case002.skills", true)}{card("003", "case.ai-native-challenger", "ai-native-challenger", "cases.case003.title", "cases.case003.skills")}</div></div>;
}
