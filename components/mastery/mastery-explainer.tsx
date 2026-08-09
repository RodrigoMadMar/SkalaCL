"use client";

import { useI18n } from "@/i18n/provider";
import type { EvidenceBreakdown } from "@/content/mastery/explanations";

export function MasteryExplainer({ data, compact = false }: { data: EvidenceBreakdown; compact?: boolean }) {
  const { locale, t } = useI18n();
  const formattedDate = data.lastEvidence
    ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(data.lastEvidence))
    : null;
  return (
    <details className={`mastery-explainer ${compact ? "compact" : ""}`}>
      <summary aria-label={t("mastery.inspect")}><span aria-hidden="true">i</span>{compact ? null : t("mastery.inspect")}</summary>
      <div className="mastery-popover">
        <strong>{t("mastery.basedOn", { count: data.evidenceCount })}</strong>
        <ul>
          <li>{t("mastery.conceptChecks", { count: data.conceptChecks })}</li>
          <li>{t("mastery.appliedDecisions", { count: data.appliedDecisions })}</li>
          <li>{t("mastery.retainedChecks", { count: data.retainedChecks })}</li>
        </ul>
        <small>{formattedDate ? t("mastery.lastEvidence", { date: formattedDate }) : t("mastery.noEvidenceDate")}</small>
        <p>{t("mastery.distinction")}</p>
      </div>
    </details>
  );
}
