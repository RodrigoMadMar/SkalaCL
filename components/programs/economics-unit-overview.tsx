"use client";

import Link from "next/link";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { economicsUnit, localizedProgramText, programCopy } from "@/content/programs/business-core";
import { useI18n } from "@/i18n/provider";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { deriveUnitProgress } from "@/lib/programs/progress";
import { useSkalaState } from "@/lib/state/provider";

export function EconomicsUnitOverview() {
  const { locale } = useI18n();
  const copy = programCopy[locale];
  const { evidence, completions, checkpointCompletions } = useSkalaState();
  const graph = loadGraph(locale);
  const mastery = buildMasteryMap(graph.nodes, evidence);
  const progress = deriveUnitProgress(economicsUnit, completions, checkpointCompletions, mastery);
  const nextHref = progress.nextSkillId ? `/programs/business-core/units/${economicsUnit.id}/skills/${progress.nextSkillId}` : `/programs/business-core/units/${economicsUnit.id}/checkpoint`;

  return <div className="unit-overview page-frame">
    <Link className="back-link" href="/programs/business-core">{copy.back}</Link>
    <header className="unit-hero">
      <div><p className="section-label"><SparkIcon />{copy.unit} 01 · {copy.foundation}</p><h1>{localizedProgramText(economicsUnit.title, locale)}</h1><p>{localizedProgramText(economicsUnit.coreQuestion, locale)}</p></div>
      <div className="unit-progress-dial" style={{ "--progress": `${progress.completion * 3.6}deg` } as React.CSSProperties}><strong>{progress.completion}%</strong><span>{copy.progress}</span></div>
    </header>
    <section className="unit-progress-strip"><span><strong>{progress.mastery}</strong>{copy.mastery}</span><span><strong>{progress.coverage}%</strong>{copy.coverage}</span><span><strong>{progress.completedSkills}/{progress.totalSkills}</strong>{copy.skills}</span><p>{copy.existing}</p></section>
    <section className="unit-next"><div><p className="eyebrow">{copy.nextStep}</p><h2>{progress.nextSkillId ? graph.nodes.find((node) => node.id === progress.nextSkillId)?.title : localizedProgramText(economicsUnit.checkpoint!.title, locale)}</h2><p>{localizedProgramText(economicsUnit.exitCapability, locale)}</p></div><Link className="primary-action" href={nextHref}>{progress.completedSkills ? copy.continue : copy.begin}<ArrowIcon /></Link></section>
    <section className="unit-syllabus">
      {economicsUnit.skillReferences.map((ref) => {
        const id = ref.graphNodeId!; const done = completions.some((item) => item.skillId === id); const nodeMastery = mastery[id];
        return <Link key={ref.id} href={`/programs/business-core/units/${economicsUnit.id}/skills/${id}`} className={done ? "complete" : ""}><span>{String(ref.order).padStart(2, "0")}</span><div><h3>{localizedProgramText(ref.title, locale)}</h3><p>{ref.estimatedMinutes} min · {nodeMastery?.evidenceCount ?? 0} {copy.evidence}</p></div><strong>{done ? "✓" : nodeMastery?.mastery ?? 0}</strong><ArrowIcon /></Link>;
      })}
      {progress.checkpointReady || progress.checkpointCompleted
        ? <Link href={`/programs/business-core/units/${economicsUnit.id}/checkpoint`} className={`checkpoint ${progress.checkpointCompleted ? "complete" : ""}`}><span>10</span><div><p className="section-label"><SparkIcon />{copy.checkpointTitle}</p><h3>{localizedProgramText(economicsUnit.checkpoint!.title, locale)}</h3><p>{economicsUnit.checkpoint!.estimatedMinutes} min · {copy.ready}</p></div><strong>{progress.checkpointCompleted ? "✓" : "→"}</strong><ArrowIcon /></Link>
        : <div className="checkpoint unit-checkpoint-locked"><span>10</span><div><p className="section-label"><SparkIcon />{copy.checkpointTitle}</p><h3>{localizedProgramText(economicsUnit.checkpoint!.title, locale)}</h3><p>{economicsUnit.checkpoint!.estimatedMinutes} min · {copy.locked}</p></div><strong>·</strong></div>}
    </section>
  </div>;
}
