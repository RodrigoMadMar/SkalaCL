"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CaseStageMap,
  DecisionRail,
  DecisionWorkspace,
  EvidenceCanvas,
  TrajectorySignal,
} from "@/components/cases/ai-copilot-decision-workspace";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { aiCopilotEconomicsCase, caseDimensionOrder, getAICopilotCaseCopy } from "@/content/cases/ai-copilot-economics";
import { seedEvidence } from "@/content/mastery/seed";
import { useI18n } from "@/i18n/provider";
import { challengeCaseDecision, evaluateCaseDecision } from "@/lib/ai/cases";
import { trackCaseEvent } from "@/lib/analytics/cases";
import {
  aiCopilotCaseStorageKey,
  caseStages,
  createAICopilotCaseSession,
  nextCaseStage,
  parseAICopilotCaseSession,
  type AICopilotCaseSession,
} from "@/lib/cases/session";
import type { CaseDecision, CaseStage } from "@/lib/cases/schemas";
import { getDecisionReadiness } from "@/lib/cases/workspace";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { calculateMastery, type EvidenceEvent } from "@/lib/mastery/engine";
import { useSkalaState } from "@/lib/state/provider";

type CaseBlockProps = {
  session: AICopilotCaseSession;
  update: (patch: Partial<AICopilotCaseSession>, advance?: boolean) => void;
  error: string;
  setError: (value: string) => void;
};

const decisions: CaseDecision[] = ["vendor", "build", "hybrid", "defer"];
const local = <T extends Record<"es-CL" | "en", string>>(value: T, locale: "es-CL" | "en") => value[locale];

function DecisionPicker({ value, onChange }: { value?: CaseDecision; onChange: (decision: CaseDecision) => void }) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  return <div className="case-decision-picker">{decisions.map((decision) => <button type="button" key={decision} className={value === decision ? "selected" : ""} onClick={() => onChange(decision)}>{copy.decisions[decision]}</button>)}</div>;
}

function IntroBlock({ update }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const definition = aiCopilotEconomicsCase;
  return <section className="case-opening">
    <p className="section-label"><SparkIcon />{copy.intro.eyebrow}</p>
    <p className="case-opening-code">{copy.meta.caseCode} · {definition.estimatedMinutes} {copy.meta.minutesShort}</p>
    <h1>{local(definition.title, locale)}</h1>
    <p className="case-opening-subtitle">{local(definition.subtitle, locale)}</p>
    <div className="case-role"><span>{copy.intro.youAre}</span><strong>{local(definition.context.role, locale)}</strong><p>{local(definition.context.premise, locale)}</p></div>
    <small>{copy.intro.synthetic}</small>
    <button className="primary-action case-action" onClick={() => {
      trackCaseEvent("case_started", { caseId: definition.id, version: definition.version, locale });
      update({ evidenceViewed: [definition.sections[0].id] }, true);
    }}>{copy.intro.enter}<ArrowIcon /></button>
  </section>;
}

function EvidenceBlock({ session, update }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const [active, setActive] = useState(session.evidenceViewed.at(-1) ?? aiCopilotEconomicsCase.sections[0].id);
  const citations = session.citedEvidence ?? [];
  const readiness = getDecisionReadiness(session.evidenceViewed, citations);
  const select = (id: string) => {
    setActive(id);
    if (!session.evidenceViewed.includes(id)) {
      trackCaseEvent("case_evidence_viewed", { caseId: session.caseId, sectionId: id, locale });
      update({ evidenceViewed: [...session.evidenceViewed, id] });
    }
  };
  const toggleCitation = () => {
    const cited = citations.includes(active);
    const next = cited ? citations.filter((id) => id !== active) : [...citations, active];
    trackCaseEvent("case_evidence_cited", { caseId: session.caseId, sectionId: active, locale, cited: !cited });
    update({ citedEvidence: next });
  };

  return <div className="case-workspace-block case-decision-experience">
    <div className="case-block-heading"><p className="eyebrow">{copy.evidence.eyebrow}</p><h1>{copy.evidence.title}</h1><p>{copy.evidence.body}</p></div>
    <div className="case-evidence-tabs" role="tablist">{aiCopilotEconomicsCase.sections.map((item) => {
      const viewed = session.evidenceViewed.includes(item.id);
      const cited = citations.includes(item.id);
      return <button type="button" role="tab" aria-selected={active === item.id} className={`${active === item.id ? "active" : ""} ${cited ? "cited" : ""}`} key={item.id} onClick={() => select(item.id)}><span>{cited ? copy.evidence.cited : viewed ? copy.evidence.viewed : copy.evidence.unread}</span>{local(item.label, locale)}</button>;
    })}</div>
    <DecisionWorkspace
      className="evidence-decision-workspace"
      main={<EvidenceCanvas sectionId={active} cited={citations.includes(active)} onToggleCitation={toggleCitation} />}
      aside={<DecisionRail session={session} citations={citations} readiness={readiness} />}
    />
    <div className="case-workspace-action"><p className="case-requirement">{copy.evidence.requirement}</p><button className="primary-action case-action" disabled={!readiness.readyToAdvance} onClick={() => update({}, true)}>{copy.evidence.continue}<ArrowIcon /></button></div>
  </div>;
}

function InitialDecisionBlock({ session, update, error, setError }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const [decision, setDecision] = useState(session.initialDecision);
  const [rationale, setRationale] = useState(session.initialRationale ?? "");
  const [selected, setSelected] = useState<string[]>(session.citedEvidence ?? []);
  const [risk, setRisk] = useState(session.primaryRisk ?? "");
  const [busy, setBusy] = useState(false);
  const readiness = getDecisionReadiness(session.evidenceViewed, selected, Boolean(decision));
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!decision) return setError(copy.errors.decision);
    if (rationale.trim().length < 70) return setError(copy.errors.rationale);
    if (selected.length < 2) return setError(copy.errors.evidence);
    if (risk.trim().length < 25) return setError(copy.errors.risk);
    setError("");
    setBusy(true);
    const challenge = await challengeCaseDecision({ locale, caseId: session.caseId, caseVersion: session.version, decision, rationale: rationale.trim(), citedEvidence: selected, primaryRisk: risk.trim() });
    trackCaseEvent("case_decision_submitted", { caseId: session.caseId, locale, decision });
    update({ initialDecision: decision, initialRationale: rationale.trim(), citedEvidence: selected, primaryRisk: risk.trim(), challenge }, true);
    setBusy(false);
  };
  const form = <form className="workspace-form" onSubmit={submit}>
    <h2>{copy.initial.prompt}</h2>
    <DecisionPicker value={decision} onChange={setDecision} />
    <label>{copy.initial.rationale}<textarea rows={5} value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder={copy.initial.rationalePlaceholder} /></label>
    <fieldset className="case-evidence-select"><legend>{copy.initial.evidencePrompt}</legend>{aiCopilotEconomicsCase.sections.map((section) => <label key={section.id}><input type="checkbox" checked={selected.includes(section.id)} onChange={() => toggle(section.id)} /><span>{local(section.label, locale)}</span></label>)}</fieldset>
    <label>{copy.initial.risk}<textarea rows={3} value={risk} onChange={(event) => setRisk(event.target.value)} placeholder={copy.initial.riskPlaceholder} /></label>
    {error && <p className="learning-error">{error}</p>}
    <button className="primary-action case-action" disabled={busy}>{copy.initial.submit}<ArrowIcon /></button>
  </form>;
  return <div className="case-form-block case-decision-experience">
    <p className="eyebrow">{copy.initial.eyebrow}</p><h1>{copy.initial.title}</h1><p className="case-lede">{copy.initial.body}</p>
    <DecisionWorkspace main={form} aside={<DecisionRail session={session} decision={decision} thesis={rationale} risk={risk} citations={selected} readiness={readiness} />} />
  </div>;
}

function ChallengeBlock({ session, update, error, setError }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const [response, setResponse] = useState(session.challengeResponse ?? "");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (response.trim().length < 55) return setError(copy.errors.challenge);
    setError("");
    trackCaseEvent("case_challenge_answered", { caseId: session.caseId, locale, challengeType: session.challenge!.type });
    update({ challengeResponse: response.trim() }, true);
  };
  const main = <div className="challenge-workspace-main"><p className="section-label"><SparkIcon />{copy.challenge.eyebrow}</p><h1>{copy.challenge.title}</h1><p>{copy.challenge.context}</p><blockquote>{session.challenge && local(session.challenge.prompt, locale)}</blockquote><form onSubmit={submit}><textarea aria-label={copy.challenge.placeholder} rows={5} value={response} onChange={(event) => setResponse(event.target.value)} placeholder={copy.challenge.placeholder} />{error && <p className="learning-error">{error}</p>}<button className="primary-action case-action">{copy.challenge.submit}<ArrowIcon /></button></form></div>;
  return <div className="case-challenge-block case-decision-experience"><DecisionWorkspace className="challenge-decision-workspace" main={main} aside={<DecisionRail session={session} />} /></div>;
}

function NewInformationBlock({ session, update }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const info = aiCopilotEconomicsCase.newInformation[session.challenge!.newInformationId];
  const main = <div className="new-signal-main"><p className="eyebrow">{copy.newInfo.eyebrow}</p><h1>{copy.newInfo.title}</h1><article><span>+</span><h2>{local(info.title, locale)}</h2><p>{local(info.body, locale)}</p><strong>{local(info.implication, locale)}</strong></article><p>{copy.newInfo.notCorrection}</p><button className="primary-action case-action" onClick={() => update({ newInformationAcknowledged: true }, true)}>{copy.newInfo.continue}<ArrowIcon /></button></div>;
  return <div className="case-new-info case-decision-experience"><DecisionWorkspace className="new-signal-workspace" main={main} aside={<DecisionRail session={session} />} /></div>;
}

function RevisionBlock({ session, update, error, setError }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const [decision, setDecision] = useState(session.finalDecision ?? session.initialDecision);
  const [rationale, setRationale] = useState(session.revisedRationale ?? "");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!decision) return setError(copy.errors.decision);
    if (rationale.trim().length < 80) return setError(copy.errors.revision);
    setError("");
    trackCaseEvent("case_revision_submitted", { caseId: session.caseId, locale, changed: decision !== session.initialDecision });
    update({ finalDecision: decision, revisedRationale: rationale.trim() }, true);
  };
  const form = <form className="workspace-form" onSubmit={submit}><DecisionPicker value={decision} onChange={setDecision} /><label>{copy.revision.rationale}<textarea rows={5} value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder={copy.revision.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<button className="primary-action case-action">{copy.revision.submit}<ArrowIcon /></button></form>;
  return <div className="case-form-block case-decision-experience"><p className="eyebrow">{copy.revision.eyebrow}</p><h1>{copy.revision.title}</h1><p className="case-lede">{copy.revision.body}</p><DecisionWorkspace className="revision-workspace" main={form} aside={<DecisionRail session={session} decision={decision} thesis={rationale || session.initialRationale} signal={<TrajectorySignal session={session} decision={decision} />} />} /></div>;
}

function FinalRecommendationBlock({ session, update, error, setError }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const { evidence, addEvidence, completeCase } = useSkalaState();
  const [recommendation, setRecommendation] = useState(session.recommendation ?? "");
  const [trigger, setTrigger] = useState(session.reviewTrigger ?? "");
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (recommendation.trim().length < 100) return setError(copy.errors.recommendation);
    if (trigger.trim().length < 35) return setError(copy.errors.trigger);
    setError("");
    setBusy(true);
    const evaluation = await evaluateCaseDecision({ locale, caseId: session.caseId, caseVersion: session.version, decision: session.initialDecision!, rationale: session.initialRationale!, citedEvidence: session.citedEvidence!, primaryRisk: session.primaryRisk!, challenge: session.challenge!, challengeResponse: session.challengeResponse!, finalDecision: session.finalDecision!, revisedRationale: session.revisedRationale!, recommendation: recommendation.trim(), reviewTrigger: trigger.trim() });
    const occurredAt = new Date().toISOString();
    const numericDimensions = Object.fromEntries(Object.entries(evaluation.dimensions).map(([name, value]) => [name, value.score]));
    const caseEvents: EvidenceEvent[] = evaluation.skillEvidence.map((item, index) => ({ id: `${session.sessionId}:${item.skillId}`, skillId: item.skillId, type: "case", performance: item.performance, occurredAt: new Date(Date.now() + index).toISOString(), sourceId: session.sessionId, dimensions: Object.fromEntries(item.dimensions.map((name) => [name, numericDimensions[name]])), metadata: { initialDecision: session.initialDecision, finalDecision: session.finalDecision, challengeType: session.challenge!.type, rationaleSummary: recommendation.trim().slice(0, 180), evaluatorVersion: evaluation.evaluatorVersion, caseId: session.caseId, caseVersion: session.version, trajectory: local(evaluation.trajectory, locale) } }));
    const nextLedger = [...seedEvidence, ...evidence, ...caseEvents];
    const masteryAfter = Object.fromEntries(evaluation.skillEvidence.map((item) => [item.skillId, calculateMastery(item.skillId, nextLedger).mastery]));
    addEvidence(caseEvents);
    completeCase({ caseId: session.caseId, sessionId: session.sessionId, completedAt: occurredAt, version: session.version, initialDecision: session.initialDecision!, finalDecision: session.finalDecision!, overallPerformance: evaluation.overallPerformance });
    trackCaseEvent("case_completed", { caseId: session.caseId, locale, performance: evaluation.overallPerformance });
    trackCaseEvent("case_mastery_updated", { caseId: session.caseId, locale, evidenceCount: caseEvents.length });
    update({ recommendation: recommendation.trim(), reviewTrigger: trigger.trim(), evaluation, masteryAfter, completedAt: occurredAt }, true);
    setBusy(false);
  };
  const form = <form className="workspace-form" onSubmit={submit}><label>{copy.final.recommendation}<textarea rows={6} value={recommendation} onChange={(event) => setRecommendation(event.target.value)} placeholder={copy.final.recommendationPlaceholder} /></label><label>{copy.final.trigger}<textarea rows={3} value={trigger} onChange={(event) => setTrigger(event.target.value)} placeholder={copy.final.triggerPlaceholder} /></label>{error && <p className="learning-error">{error}</p>}<button className="primary-action case-action" disabled={busy}>{busy ? copy.final.evaluating : copy.final.submit}<ArrowIcon /></button></form>;
  return <div className="case-form-block case-final-block case-decision-experience"><p className="eyebrow">{copy.final.eyebrow}</p><h1>{copy.final.title}</h1><p className="case-lede">{copy.final.body}</p><DecisionWorkspace main={form} aside={<DecisionRail session={session} thesis={recommendation || session.revisedRationale} signal={<TrajectorySignal session={session} />} />} /></div>;
}

function ResultBlock({ session }: CaseBlockProps) {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const router = useRouter();
  const graph = useMemo(() => loadGraph(locale), [locale]);
  const evaluation = session.evaluation!;
  const focusSkill = evaluation.skillEvidence.reduce((best, item) => ((session.masteryAfter?.[item.skillId] ?? 0) - (session.masteryBefore[item.skillId] ?? 0)) > ((session.masteryAfter?.[best.skillId] ?? 0) - (session.masteryBefore[best.skillId] ?? 0)) ? item : best).skillId;
  return <section className="case-result"><p className="section-label"><SparkIcon />{copy.result.eyebrow}</p><h1>{copy.result.title}</h1><div className="case-overall"><span>{copy.result.overall}</span><strong>{Math.round(evaluation.overallPerformance * 100)}</strong></div><div className="case-dimension-grid">{caseDimensionOrder.map((dimension) => <article key={dimension}><div><span>{copy.dimensions[dimension]}</span><strong>{Math.round(evaluation.dimensions[dimension].score * 100)}</strong></div><i><b style={{ width: `${evaluation.dimensions[dimension].score * 100}%` }} /></i><p>{local(evaluation.dimensions[dimension].reason, locale)}</p></article>)}</div><div className="case-feedback"><article><span>{copy.result.strength}</span><p>{local(evaluation.strength, locale)}</p></article><article><span>{copy.result.improvement}</span><p>{local(evaluation.improvement, locale)}</p></article></div><div className="case-trajectory"><span>{copy.result.trajectory}</span><p><strong>{copy.decisions[session.initialDecision!]}</strong><i>→</i><strong>{copy.decisions[session.finalDecision!]}</strong></p><small>{local(evaluation.trajectory, locale)}</small></div><section className="case-evidence-result"><p className="eyebrow">{copy.result.evidence}</p>{evaluation.skillEvidence.map((item) => { const node = graph.nodes.find((candidate) => candidate.id === item.skillId); const before = session.masteryBefore[item.skillId] ?? 0; const after = session.masteryAfter?.[item.skillId] ?? before; return <div key={item.skillId}><span>{node?.title ?? item.skillId}</span><small>{copy.result.mastery}</small><strong>{before}<i>→</i>{after}</strong></div>; })}</section><p className="completion-distinction">{copy.result.distinction}</p><div className="case-result-actions"><button className="primary-action" onClick={() => router.push(`/skala?focus=${encodeURIComponent(focusSkill)}&updated=1`)}>{copy.result.openGraph}<ArrowIcon /></button><Link className="text-action" href="/cases">{copy.result.backCases}</Link></div></section>;
}

const registry: Record<CaseStage, React.ComponentType<CaseBlockProps>> = {
  intro: IntroBlock,
  evidence: EvidenceBlock,
  initial_decision: InitialDecisionBlock,
  challenge: ChallengeBlock,
  new_information: NewInformationBlock,
  revision: RevisionBlock,
  final_recommendation: FinalRecommendationBlock,
  result: ResultBlock,
};

export function AICopilotEconomicsSession() {
  const { locale } = useI18n();
  const copy = getAICopilotCaseCopy(locale);
  const { evidence, hydrated } = useSkalaState();
  const graph = useMemo(() => loadGraph(locale), [locale]);
  const masteryMap = buildMasteryMap(graph.nodes, evidence);
  const masteryBefore = useMemo(() => Object.fromEntries(aiCopilotEconomicsCase.skills.map((id) => [id, masteryMap[id]?.mastery ?? 0])), [masteryMap]);
  const [session, setSession] = useState<AICopilotCaseSession | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!hydrated || session) return;
    const task = window.setTimeout(() => setSession(parseAICopilotCaseSession(window.localStorage.getItem(aiCopilotCaseStorageKey), masteryBefore)), 0);
    return () => window.clearTimeout(task);
  }, [hydrated, masteryBefore, session]);
  useEffect(() => { if (session) window.localStorage.setItem(aiCopilotCaseStorageKey, JSON.stringify(session)); }, [session]);
  useEffect(() => { if (session?.currentStage) window.scrollTo({ top: 0, behavior: "smooth" }); }, [session?.currentStage]);
  if (!session) return <div className="learning-loading" />;
  const update = (patch: Partial<AICopilotCaseSession>, advance = false) => setSession((current) => current ? { ...current, ...patch, currentStage: advance ? nextCaseStage(current.currentStage) : current.currentStage, updatedAt: new Date().toISOString() } : current);
  const restart = () => {
    const fresh = createAICopilotCaseSession(masteryBefore);
    window.localStorage.setItem(aiCopilotCaseStorageKey, JSON.stringify(fresh));
    setSession(fresh);
    setError("");
  };
  const ActiveBlock = registry[session.currentStage];
  const stageIndex = caseStages.indexOf(session.currentStage);
  return <div className="case-session page-frame"><header className="case-session-header"><Link href="/cases">{copy.meta.back}</Link><div><span>{copy.meta.caseCode}</span><strong>{copy.meta.stage} {String(stageIndex + 1).padStart(2, "0")} / {String(caseStages.length).padStart(2, "0")}</strong></div><small>{copy.meta.progress}</small><button type="button" onClick={restart}>{copy.meta.restart}</button></header><div className="learning-progress"><span style={{ width: `${((stageIndex + 1) / caseStages.length) * 100}%` }} /></div><CaseStageMap currentStage={session.currentStage} stages={caseStages} /><ActiveBlock session={session} update={update} error={error} setError={setError} /></div>;
}
