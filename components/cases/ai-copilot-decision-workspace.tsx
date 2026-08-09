"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { aiCopilotEconomicsCase, getAICopilotCaseCopy } from "@/content/cases/ai-copilot-economics";
import { aiCopilotEvidenceViews, getAICopilotWorkspaceCopy } from "@/content/cases/ai-copilot-workspace";
import { useI18n } from "@/i18n/provider";
import type { AICopilotCaseSession } from "@/lib/cases/session";
import type { CaseDecision, CaseStage } from "@/lib/cases/schemas";
import type { DecisionReadiness } from "@/lib/cases/workspace";

const local = <T extends Record<"es-CL" | "en", string>>(value: T, locale: "es-CL" | "en") => value[locale];

export function CaseStageMap({ currentStage, stages }: { currentStage: CaseStage; stages: CaseStage[] }) {
  const { locale } = useI18n();
  const copy = getAICopilotWorkspaceCopy(locale);
  const currentIndex = stages.indexOf(currentStage);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    navRef.current?.querySelector(".active")?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [currentStage]);
  return <nav ref={navRef} className="case-stage-map" aria-label={copy.trajectory}>
    {stages.map((stage, index) => <span key={stage} className={index < currentIndex ? "complete" : index === currentIndex ? "active" : "pending"}>
      <i />
      <small>{copy.stageLabels[stage]}</small>
    </span>)}
  </nav>;
}

export function DecisionWorkspace({ main, aside, className = "" }: { main: ReactNode; aside: ReactNode; className?: string }) {
  return <section className={`decision-workspace ${className}`}><div className="decision-canvas">{main}</div><aside className="decision-rail">{aside}</aside></section>;
}

function EvidenceVisualization({ sectionId }: { sectionId: keyof typeof aiCopilotEvidenceViews }) {
  const { locale } = useI18n();
  const copy = getAICopilotWorkspaceCopy(locale);
  const view = aiCopilotEvidenceViews[sectionId];

  if (view.kind === "signal-bars") return <div className="evidence-visual signal-bars" aria-label={local(view.caption, locale)}>
    <p><span>{copy.visualLabel}</span>{local(view.caption, locale)}</p>
    {view.items.map((item) => <div key={local(item.label, locale)}><header><span>{local(item.label, locale)}</span><strong>{item.value}</strong></header><i><b style={{ width: `${item.magnitude}%` }} /></i></div>)}
  </div>;

  if (view.kind === "unit-economics") return <div className="evidence-visual unit-economics" aria-label={local(view.caption, locale)}>
    <p><span>{copy.visualLabel}</span>{local(view.caption, locale)}</p>
    {view.items.map((item) => <div className={item.tone} key={local(item.label, locale)}><header><span>{local(item.label, locale)}</span><strong>{item.value}</strong></header><i><b style={{ width: `${item.magnitude}%` }} /></i></div>)}
  </div>;

  if (view.kind === "option-system") return <div className="evidence-visual option-system" aria-label={local(view.caption, locale)}>
    <p><span>{copy.visualLabel}</span>{local(view.caption, locale)}</p>
    <div>{view.columns.map((column) => <article key={local(column.title, locale)}><h3>{local(column.title, locale)}</h3>{column.facts.map((fact) => <small key={local(fact, locale)}>{local(fact, locale)}</small>)}</article>)}</div>
  </div>;

  return <div className={`evidence-visual ${view.kind}`} aria-label={local(view.caption, locale)}>
    <p><span>{copy.visualLabel}</span>{local(view.caption, locale)}</p>
    <div>{view.items.map((item) => <article key={local(item.label, locale)}><small>{local(item.label, locale)}</small><strong>{local(item.value, locale)}</strong><span>{local(item.note, locale)}</span></article>)}</div>
  </div>;
}

export function EvidenceCanvas({ sectionId, cited, onToggleCitation }: { sectionId: string; cited: boolean; onToggleCitation: () => void }) {
  const { locale } = useI18n();
  const copy = getAICopilotWorkspaceCopy(locale);
  const section = aiCopilotEconomicsCase.sections.find((item) => item.id === sectionId)!;
  return <article className={`case-evidence-panel evidence-canvas-panel ${cited ? "cited" : ""}`} role="tabpanel" key={section.id}>
    <header className="evidence-canvas-header">
      <div><p className="eyebrow">{local(section.label, locale)}</p><h2>{local(section.title, locale)}</h2></div>
      <button type="button" aria-pressed={cited} onClick={onToggleCitation}><i />{cited ? copy.unpin : copy.pin}<small>{cited ? copy.pinned : null}</small></button>
    </header>
    <p>{local(section.body, locale)}</p>
    <EvidenceVisualization sectionId={section.id as keyof typeof aiCopilotEvidenceViews} />
    <div className="case-metrics">{section.metrics.map((metric) => <div key={local(metric.label, locale)}><span>{local(metric.label, locale)}</span><strong>{metric.value}</strong><small>{local(metric.note, locale)}</small></div>)}</div>
  </article>;
}

function ReadinessCheck({ ready, children }: { ready: boolean; children: ReactNode }) {
  return <li className={ready ? "ready" : "pending"}><i>{ready ? "✓" : "·"}</i>{children}</li>;
}

export function DecisionRail({
  session,
  decision,
  thesis,
  risk,
  citations = session.citedEvidence ?? [],
  readiness,
  signal,
}: {
  session: AICopilotCaseSession;
  decision?: CaseDecision;
  thesis?: string;
  risk?: string;
  citations?: string[];
  readiness?: DecisionReadiness;
  signal?: ReactNode;
}) {
  const { locale } = useI18n();
  const copy = getAICopilotWorkspaceCopy(locale);
  const caseCopy = getAICopilotCaseCopy(locale);
  const position = decision ?? session.finalDecision ?? session.initialDecision;
  const thesisText = thesis ?? session.revisedRationale ?? session.initialRationale;
  const riskText = risk ?? session.primaryRisk;
  const citedSections = citations.flatMap((id) => {
    const section = aiCopilotEconomicsCase.sections.find((item) => item.id === id);
    return section ? [section] : [];
  });
  return <div className="decision-rail-inner">
    <p className="eyebrow">{copy.railEyebrow}</p>
    <h2>{copy.railTitle}</h2>
    <section className="rail-position"><span>{copy.currentPosition}</span><strong>{position ? caseCopy.decisions[position] : copy.decisionPending}</strong><p>{thesisText || copy.thesisEmpty}</p></section>
    <section className="rail-citations"><span>{copy.citedEvidence}</span>{citedSections.length ? <div>{citedSections.map((section) => <small key={section.id}><i />{local(section.label, locale)}</small>)}</div> : <p>{copy.noCitations}</p>}</section>
    <section className="rail-risk"><span>{copy.acceptedRisk}</span><p>{riskText || copy.riskEmpty}</p></section>
    {signal ?? <section className="rail-assumption"><span>{copy.criticalAssumption}</span><p>{session.challenge ? local(session.challenge.prompt, locale) : copy.assumptionEmpty}</p></section>}
    {readiness && <section className="rail-readiness">
      <header><span>{copy.readiness}</span><strong>{copy.readinessCount.replace("{count}", String(readiness.completed))}</strong></header>
      <ul><ReadinessCheck ready={readiness.sourcesReady}>{copy.sourceCheck}</ReadinessCheck><ReadinessCheck ready={readiness.citationsReady}>{copy.citationCheck}</ReadinessCheck><ReadinessCheck ready={readiness.decisionReady}>{copy.decisionCheck}</ReadinessCheck></ul>
      <p>{copy.readinessBody}</p>
    </section>}
  </div>;
}

export function TrajectorySignal({ session, decision }: { session: AICopilotCaseSession; decision?: CaseDecision }) {
  const { locale } = useI18n();
  const copy = getAICopilotWorkspaceCopy(locale);
  const caseCopy = getAICopilotCaseCopy(locale);
  const current = decision ?? session.finalDecision ?? session.initialDecision;
  const changed = Boolean(current && session.initialDecision && current !== session.initialDecision);
  return <section className="rail-trajectory">
    <span>{copy.trajectory}</span>
    <div><small>{copy.initialThesis}</small><strong>{session.initialDecision ? caseCopy.decisions[session.initialDecision] : copy.decisionPending}</strong></div>
    <i />
    <div><small>{copy.currentPosition}</small><strong>{current ? caseCopy.decisions[current] : copy.decisionPending}</strong><em>{changed ? copy.changed : copy.maintained}</em></div>
  </section>;
}
