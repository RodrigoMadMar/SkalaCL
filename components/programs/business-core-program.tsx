"use client";

import Link from "next/link";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { businessCoreProgram, localizedProgramText, programCopy } from "@/content/programs/business-core";
import { useI18n } from "@/i18n/provider";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { deriveProgramProgress } from "@/lib/programs/progress";
import { useSkalaState } from "@/lib/state/provider";

export function BusinessCoreProgram() {
  const { locale } = useI18n();
  const copy = programCopy[locale];
  const { evidence, completions, checkpointCompletions } = useSkalaState();
  const mastery = buildMasteryMap(loadGraph(locale).nodes, evidence);
  const progress = deriveProgramProgress(businessCoreProgram, completions, checkpointCompletions, mastery);
  const firstUnit = businessCoreProgram.units[0];

  return <div className="program-page page-frame">
    <header className="program-hero">
      <p className="section-label"><SparkIcon />{copy.eyebrow} · 01</p>
      <h1>{localizedProgramText(businessCoreProgram.title, locale)}</h1>
      <p>{localizedProgramText(businessCoreProgram.description, locale)}</p>
      <div className="program-hero-stats">
        <span><strong>{progress.completion}%</strong>{copy.progress}</span>
        <span><strong>10</strong>{copy.units}</span>
        <span><strong>01</strong>{copy.mapped}</span>
      </div>
    </header>
    <section className="program-current">
      <div><p className="eyebrow">{copy.current}</p><h2>{localizedProgramText(firstUnit.title, locale)}</h2><p>{localizedProgramText(firstUnit.coreQuestion, locale)}</p></div>
      <Link className="primary-action" href={`/programs/business-core/units/${firstUnit.id}`}>{copy.open}<ArrowIcon /></Link>
    </section>
    <section className="program-unit-list">
      {progress.units.map(({ unit, progress: unitProgress }, index) => {
        const active = unit.implementationStatus !== "structural";
        return <article className={active ? "active" : "structural"} key={unit.id}>
          <span className="program-unit-number">{String(index + 1).padStart(2, "0")}</span>
          <div><p className="eyebrow">{index === 9 ? copy.capstone : `${copy.unit} ${String(index + 1).padStart(2, "0")}`}</p><h2>{localizedProgramText(unit.title, locale)}</h2><p>{localizedProgramText(unit.coreQuestion, locale)}</p></div>
          <div className="program-unit-state"><strong>{active ? `${unitProgress.completion}%` : "—"}</strong><span>{active ? copy.statusActive : copy.statusPlanned}</span>{active && <Link href={`/programs/business-core/units/${unit.id}`}>{copy.open}<ArrowIcon /></Link>}</div>
        </article>;
      })}
    </section>
  </div>;
}

