"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { MasteryExplainer } from "@/components/mastery/mastery-explainer";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap, getVisualState } from "@/lib/demo/state";
import { useI18n } from "@/i18n/provider";
import type { TranslationKey } from "@/i18n/config";
import { BuildVsBuyLearningSession } from "@/components/learning/build-vs-buy-session";
import { ExpandedSkillSession } from "@/components/learning/expanded-skill-session";
import { getExpandedSkill } from "@/content/skills/expanded";
import { useSkalaState } from "@/lib/state/provider";
import { getEconomicsSkill } from "@/content/programs/economics-unit";
import { EconomicsSkillSession } from "@/components/programs/economics-skill-session";

const contentKeys: Record<string, TranslationKey> = {
  mapped: "content.mapped",
  outlined: "content.outlined",
  playable: "content.playable",
  validated: "content.validated",
};

export default function SkillPreviewPage() {
  const params = useParams<{ skillId: string }>();
  const { locale, t } = useI18n();
  const { evidence: userEvidence } = useSkalaState();
  if (params.skillId === "ai.build-vs-buy" || params.skillId === "ai-build-buy") return <BuildVsBuyLearningSession />;
  if (getEconomicsSkill(params.skillId)) return <EconomicsSkillSession skillId={params.skillId} />;
  if (getExpandedSkill(params.skillId)) return <ExpandedSkillSession skillId={params.skillId} />;
  const graph = loadGraph(locale);
  const skill = graph.nodes.find((node) => node.id === params.skillId && node.type === "skill");
  if (!skill) return <div className="page-frame"><p>{t("learn.notFound")}</p></div>;
  const masteryMap = buildMasteryMap(graph.nodes, userEvidence);
  const mastery = masteryMap[skill.id];
  const cluster = graph.nodes.find((node) => node.id === skill.parentId);
  const prereqs = skill.prerequisites.map((id) => graph.nodes.find((node) => node.id === id)).filter(Boolean);
  const state = getVisualState(skill, masteryMap);
  const evidenceBreakdown = {
    evidenceCount: mastery.evidenceCount,
    conceptChecks: Math.min(2, mastery.evidenceCount),
    appliedDecisions: Math.max(0, mastery.evidenceCount - 2),
    retainedChecks: mastery.lastValidatedAt ? 1 : 0,
    lastEvidence: mastery.lastEvidenceAt?.slice(0, 10),
  };

  return (
    <div className="skill-preview-page page-frame">
      <Link href="/skala" className="back-link">{t("learn.back")}</Link>
      <div className="skill-preview-layout">
        <main>
          <p className="skill-code">{t("common.skill")} {skill.id.toUpperCase().replaceAll("-", ".")}</p>
          <p className="eyebrow">{cluster?.title} · {t("common.difficulty")} {skill.difficulty}</p>
          <h1>{skill.title}</h1>
          <p className="skill-lede">{skill.summary}</p>
          <div className="objective-block"><span>{t("learn.objective")}</span><p>{t("learn.objectiveBody")}</p></div>
          <div className="preview-note"><SparkIcon /><p><strong>{t("learn.previewTitle")}</strong>{t("learn.previewBody")}</p></div>
          <button className="primary-action disabled" disabled>{t("learn.phase2")}</button>
        </main>
        <aside>
          <div className="preview-stat"><span>{t("learn.currentMastery")}</span><strong>{mastery.mastery}</strong><small>{t(`common.${state === "demonstrated" ? "demonstrated" : state}` as TranslationKey)}</small></div>
          <MasteryExplainer data={evidenceBreakdown} />
          <dl className="skill-facts"><div><dt>{t("drawer.estimatedTime")}</dt><dd>{t("common.minutesLong", { count: skill.estimatedMinutes ?? 0 })}</dd></div><div><dt>{t("drawer.evidence")}</dt><dd>{t("common.recorded", { count: mastery.evidenceCount })}</dd></div><div><dt>{t("drawer.contentState")}</dt><dd>{t(contentKeys[skill.contentStatus])}</dd></div></dl>
          <div className="prerequisite-list"><p className="eyebrow">{t("drawer.prerequisites")}</p>{prereqs.length ? prereqs.map((item) => item && <span key={item.id}><i className="ready" />{item.title}</span>) : <span><i className="ready" />{t("drawer.openEntry")}</span>}</div>
          <Link href="/skala" className="text-action">{t("learn.inspectGraph")} <ArrowIcon /></Link>
        </aside>
      </div>
    </div>
  );
}
