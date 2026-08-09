"use client";

import Link from "next/link";
import { ArrowIcon, GraphIcon, SparkIcon } from "@/components/layout/icons";
import { MasteryRing } from "@/components/mastery/mastery-ring";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { recommendNextSkill, type RecommendationFactor } from "@/lib/recommendation/engine";
import { useI18n } from "@/i18n/provider";
import type { TranslationKey } from "@/i18n/config";
import { useSkalaState } from "@/lib/state/provider";

const recommendationKeys: Record<RecommendationFactor, TranslationKey> = {
  activeDomain: "recommendation.activeDomain",
  prerequisites: "recommendation.prerequisites",
  available: "recommendation.available",
  continuity: "recommendation.continuity",
  rubricGap: "recommendation.rubricGap",
};

export default function HomePage() {
  const { locale, t } = useI18n();
  const { evidence, completions } = useSkalaState();
  const graph = loadGraph(locale);
  const mastery = buildMasteryMap(graph.nodes, evidence);
  const latest = completions.at(-1);
  const next = recommendNextSkill(graph.nodes, mastery, "ai", latest?.skillId ?? "ai.model-landscape", {
    completedSkillIds: completions.map((item) => item.skillId), weakestDimension: latest?.weakestDimension,
  });
  if (!next) return null;
  const cluster = graph.nodes.find((node) => node.id === next.skill.parentId);
  const reasonKey = recommendationKeys[next.factors[0] ?? "available"];

  return (
    <div className="home-page page-frame">
      <header className="home-header">
        <div><p className="eyebrow">{t("home.date")}</p><h1>{t("home.greeting")}</h1><p>{t("home.intro")}</p></div>
        <div className="system-status"><span />{t("home.systemOnline")}</div>
      </header>

      <section className="next-move" aria-labelledby="next-move-title">
        <div className="next-ambient" aria-hidden="true" />
        <div className="next-copy">
          <div className="section-label"><SparkIcon /> {t("home.nextMove")}</div>
          <p className="skill-code">{t("common.skill")} {next.skill.id.toUpperCase().replaceAll("-", ".")}</p>
          <h2 id="next-move-title">{next.skill.title}</h2>
          <p className="next-summary">{t("home.nextSummary", { summary: next.skill.summary })}</p>
          <div className="meta-line">
            <span>{cluster?.title}</span><i />
            <span>{t("common.difficulty")} {next.skill.difficulty}</span><i />
            <span>{t("common.minutes", { count: next.skill.estimatedMinutes ?? 0 })}</span>
          </div>
          <Link href={`/learn/${next.skill.id}`} className="primary-action">{t("home.start")} <ArrowIcon /></Link>
          <p className="reason-line">{t("home.selectedReason", { reason: t(reasonKey) })}</p>
        </div>
        <div className="next-visual" aria-label={t("home.pathLabel")}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <span className="path-node mastered"><b>{t("home.models")}</b><small>✓</small></span>
          <span className="path-node learning"><b>{t("home.economics")}</b><small>◐</small></span>
          <span className="path-node target"><b>{next.skill.title}</b><small>{t("home.next")}</small></span>
          <p className="path-proof"><strong>{t("home.foundationReady")}</strong>{t("home.pathConnection")}</p>
        </div>
      </section>

      <section className="home-lower">
        <div className="progress-strip">
          <MasteryRing value={38} label={t("home.yourSkala")} />
          <div className="progress-copy"><p className="eyebrow">{t("home.yourSkala")}</p><h3>{t("home.evolving")}</h3><p>{t("home.progress")}</p></div>
          <div className="domain-pulse"><span>{t("common.aiAbbr")}</span><strong>44</strong><small>{t("common.mastery")}</small></div>
          <div className="domain-pulse"><span>{t("home.core")}</span><strong>31</strong><small>{t("common.mastery")}</small></div>
          <Link href="/skala" className="text-action"><GraphIcon /> {t("home.openMap")} <ArrowIcon /></Link>
        </div>
        <Link href="/cases/ai-copilot-economics" className="case-tease">
          <p className="eyebrow">{t("home.weeklyCase")}</p>
          <p className="case-number">{t("common.caseCode")} 002 · {t("common.minutes", { count: 18 })}</p>
          <h3>{t("home.caseTitle")}</h3>
          <p>{t("home.caseSummary")}</p>
          <span>{t("home.openCase")} <ArrowIcon /></span>
        </Link>
      </section>
    </div>
  );
}
