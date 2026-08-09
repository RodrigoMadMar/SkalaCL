"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { buildVsBuySkill, challengePatterns, decisionLabel, getBuildVsBuyCopy } from "@/content/skills/ai/build-vs-buy";
import { seedEvidence } from "@/content/mastery/seed";
import { useI18n } from "@/i18n/provider";
import { challengeLearningResponse, evaluateSkillApplication } from "@/lib/ai/learning";
import { trackLearningEvent } from "@/lib/analytics/learning";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { calculateMastery, type EvidenceEvent } from "@/lib/mastery/engine";
import { recommendNextSkill } from "@/lib/recommendation/engine";
import { type LearningDecision, type LearningBlockType } from "@/lib/learning/schemas";
import {
  buildVsBuySessionStorageKey, readBuildVsBuySession, type BuildVsBuySession,
} from "@/lib/learning/session";
import { useSkalaState } from "@/lib/state/provider";

type BlockProps = {
  session: BuildVsBuySession;
  update: (patch: Partial<BuildVsBuySession>, advance?: boolean) => void;
  error: string;
  setError: (error: string) => void;
};

const decisions: LearningDecision[] = ["build", "buy", "hybrid", "defer"];

function DecisionPicker({ value, onChange }: { value?: LearningDecision; onChange: (value: LearningDecision) => void }) {
  const { locale } = useI18n();
  return <div className="learning-decision-picker">{decisions.map((decision) => <button type="button" className={value === decision ? "selected" : ""} onClick={() => onChange(decision)} key={decision}>{decisionLabel(locale, decision)}</button>)}</div>;
}

function ContinueButton({ children, disabled = false }: { children: React.ReactNode; disabled?: boolean }) {
  return <button className="primary-action learning-continue" disabled={disabled}>{children}<ArrowIcon /></button>;
}

function EntryBlock({ update }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).entry;
  return <section className="learning-block entry-block"><p className="section-label"><SparkIcon />{c.eyebrow}</p><h1>{c.title}</h1><p className="learning-lede">{c.body}</p><button className="primary-action learning-continue" onClick={() => { trackLearningEvent("skill_started", { skillId: buildVsBuySkill.id, blockId: "entry", locale }); update({}, true); }}>{c.cta}<ArrowIcon /></button></section>;
}

function ThinkBlock({ session, update, error, setError }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).diagnostic;
  const [decision, setDecision] = useState(session.diagnosticDecision); const [rationale, setRationale] = useState(session.diagnosticRationale ?? "");
  const submit = (event: FormEvent) => { event.preventDefault(); if (!decision) return setError(getBuildVsBuyCopy(locale).validation.choose); if (rationale.trim().length < 12) return setError(getBuildVsBuyCopy(locale).validation.reason); setError(""); trackLearningEvent("think_submitted", { skillId: buildVsBuySkill.id, blockId: "diagnostic", locale, decision }); update({ diagnosticDecision: decision, diagnosticRationale: rationale.trim() }, true); };
  return <section className="learning-block think-block"><p className="eyebrow">{c.eyebrow}</p><blockquote>{c.scenario}</blockquote><form onSubmit={submit}><h1>{c.prompt}</h1><DecisionPicker value={decision} onChange={setDecision} /><label>{c.reason}<textarea value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder={c.placeholder} rows={3} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton>{c.cta}</ContinueButton></form></section>;
}

function RevealBlock({ session, update }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).reveal;
  return <section className="learning-block reveal-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="learning-lede">{c.body}</p><div className="lens-system" aria-label={c.expand}>{c.lenses.map(([title, body], index) => <button key={title} className={session.activeLens === index ? "active" : ""} onClick={() => update({ activeLens: index })}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong>{session.activeLens === index && <small>{body}</small>}</button>)}</div><button className="primary-action learning-continue" onClick={() => update({}, true)}>{c.cta}<ArrowIcon /></button></section>;
}

function VisualBlock({ session, update }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).field;
  const [x, setX] = useState(session.fieldX); const [y, setY] = useState(session.fieldY); const [moved, setMoved] = useState(session.fieldMoved);
  const savePosition = () => { trackLearningEvent("visual_interacted", { skillId: buildVsBuySkill.id, blockId: "field", locale, x, y }); update({ fieldX: x, fieldY: y, fieldPlaced: true }); };
  return <section className="learning-block visual-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p>{c.body}</p><div className="decision-field"><span className="field-label build">{c.build}</span><span className="field-label buy">{c.buy}</span><span className="field-label hybrid">{c.hybrid}</span><i className="field-point" style={{ left: `${x}%`, bottom: `${y}%` }} /><span className="field-axis x">{c.xAxis}</span><span className="field-axis y">{c.yAxis}</span></div><div className="field-controls"><label>{c.xAxis}<input type="range" min="5" max="95" value={x} onChange={(event) => setX(Number(event.target.value))} /></label><label>{c.yAxis}<input type="range" min="5" max="95" value={y} onChange={(event) => setY(Number(event.target.value))} /></label></div>{!session.fieldPlaced ? <button className="primary-action learning-continue" onClick={savePosition}>{c.firstCta}<ArrowIcon /></button> : <div className="field-reveal"><strong>{c.factsTitle}</strong><ul>{c.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><p>{c.movePrompt}</p><div className="binary-picker"><button className={moved === true ? "selected" : ""} onClick={() => setMoved(true)}>{c.move}</button><button className={moved === false ? "selected" : ""} onClick={() => setMoved(false)}>{c.keep}</button></div><button className="primary-action learning-continue" disabled={moved === undefined} onClick={() => { update({ fieldX: x, fieldY: y, fieldMoved: moved }, true); }}>{c.cta}<ArrowIcon /></button></div>}</section>;
}

function ExampleBlock({ update }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).contrast;
  return <section className="learning-block example-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><div className="contrast-grid">{c.examples.map((example) => <article key={example.label}><span>{example.label}</span><h2>{example.title}</h2><p>{example.body}</p></article>)}</div><blockquote>{c.insight}</blockquote><button className="primary-action learning-continue" onClick={() => update({}, true)}>{c.cta}<ArrowIcon /></button></section>;
}

function OpenResponseBlock({ session, update, error, setError }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).application;
  const [decision, setDecision] = useState(session.applicationDecision); const [response, setResponse] = useState(session.applicationResponse ?? ""); const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!decision) return setError(getBuildVsBuyCopy(locale).validation.choose); if (response.trim().length < 55) return setError(getBuildVsBuyCopy(locale).validation.response); setError(""); setBusy(true); const evaluation = await evaluateSkillApplication({ locale, decision, response: response.trim() }); const challenge = await challengeLearningResponse({ locale, skillId: buildVsBuySkill.id, objective: buildVsBuySkill.objective[locale], scenarioFacts: [...c.facts], initialDiagnostic: { decision: session.diagnosticDecision!, rationale: session.diagnosticRationale! }, applicationResponse: response.trim(), detectedAssumptions: evaluation.assumptionsDetected, omittedRelevantFactors: evaluation.omittedRelevantFactors, allowedChallengePatterns: Object.keys(challengePatterns), maxTurnsRemaining: 2 }); trackLearningEvent("application_submitted", { skillId: buildVsBuySkill.id, blockId: "recommendation", locale, decision }); trackLearningEvent("ai_challenge_shown", { skillId: buildVsBuySkill.id, blockId: "challenge", locale, challengeType: challenge.challengeType }); update({ applicationDecision: decision, applicationResponse: response.trim(), initialEvaluation: evaluation, challenge }, true); setBusy(false); };
  return <section className="learning-block response-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><ul className="scenario-facts">{c.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul><form onSubmit={submit}><h2>{c.prompt}</h2><DecisionPicker value={decision} onChange={setDecision} /><label>{c.helper}<textarea rows={6} value={response} onChange={(event) => setResponse(event.target.value)} placeholder={c.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton disabled={busy}>{c.cta}</ContinueButton></form></section>;
}

function ChallengeBlock({ session, update, error, setError }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).challenge; const [response, setResponse] = useState(session.challengeResponse ?? "");
  const submit = (event: FormEvent) => { event.preventDefault(); if (response.trim().length < 30) return setError(getBuildVsBuyCopy(locale).validation.response); setError(""); trackLearningEvent("ai_challenge_answered", { skillId: buildVsBuySkill.id, blockId: "challenge", locale, challengeType: session.challenge!.challengeType }); update({ challengeResponse: response.trim() }, true); };
  const challenge = challengePatterns[session.challenge!.challengeType as keyof typeof challengePatterns]?.[locale] ?? session.challenge!.challenge;
  return <section className="learning-block challenge-block"><p className="section-label"><SparkIcon />{c.eyebrow}</p><p className="challenge-context">{c.context}</p><blockquote>{challenge}</blockquote><form onSubmit={submit}><textarea rows={5} value={response} onChange={(event) => setResponse(event.target.value)} placeholder={c.placeholder} />{error && <p className="learning-error">{error}</p>}<ContinueButton>{c.cta}</ContinueButton></form></section>;
}

function FinalDecisionBlock({ session, update, error, setError }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).final; const [decision, setDecision] = useState(session.finalDecision ?? session.applicationDecision); const [rationale, setRationale] = useState(session.finalRationale ?? ""); const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => { event.preventDefault(); if (!decision) return setError(getBuildVsBuyCopy(locale).validation.choose); if (rationale.trim().length < 45) return setError(getBuildVsBuyCopy(locale).validation.response); setError(""); setBusy(true); const evaluation = await evaluateSkillApplication({ locale, decision, response: rationale.trim(), challengeType: session.challenge!.challengeType, challengeResponse: session.challengeResponse, final: true }); trackLearningEvent("final_decision_submitted", { skillId: buildVsBuySkill.id, blockId: "final-decision", locale, decision }); update({ finalDecision: decision, finalRationale: rationale.trim(), finalEvaluation: evaluation }, true); setBusy(false); };
  return <section className="learning-block response-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><p className="learning-lede">{c.body}</p><form onSubmit={submit}><h2>{c.prompt}</h2><DecisionPicker value={decision} onChange={setDecision} /><label>{c.rationale}<textarea rows={5} value={rationale} onChange={(event) => setRationale(event.target.value)} placeholder={c.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton disabled={busy}>{c.cta}</ContinueButton></form></section>;
}

function RecallBlock({ session, update, error, setError }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).recall; const { evidence, completions, addEvidence, completeSkill } = useSkalaState(); const [answer, setAnswer] = useState(session.recallAnswer); const graph = useMemo(() => loadGraph(locale), [locale]);
  const submit = (event: FormEvent) => { event.preventDefault(); if (answer === undefined) return setError(getBuildVsBuyCopy(locale).validation.recall); setError(""); const occurredAt = new Date().toISOString(); const recallPerformance = answer === 0 ? 1 : 0.35; const applicationEvent: EvidenceEvent = { id: `${session.sessionId}:application`, skillId: buildVsBuySkill.id, type: "application", performance: session.finalEvaluation!.overallPerformance, occurredAt, sourceId: session.sessionId, dimensions: session.finalEvaluation!.dimensions, metadata: { initialDecision: session.diagnosticDecision, finalDecision: session.finalDecision, challengeType: session.challenge!.challengeType, rationaleSummary: session.finalRationale!.slice(0, 180), evaluatorVersion: session.finalEvaluation!.evaluatorVersion } }; const recallEvent: EvidenceEvent = { id: `${session.sessionId}:recall`, skillId: buildVsBuySkill.id, type: "recall", performance: recallPerformance, occurredAt: new Date(Date.now() + 1).toISOString(), sourceId: session.sessionId, metadata: { answerId: String(answer), evaluatorVersion: "objective-transfer-v1" } }; const nextEvidence = [...evidence, applicationEvent, recallEvent]; const masteryAfter = calculateMastery(buildVsBuySkill.id, [...seedEvidence, ...nextEvidence]).mastery; const masteryMap = buildMasteryMap(graph.nodes, nextEvidence); const updatedCompleted = [...completions.map((item) => item.skillId), buildVsBuySkill.id]; const weakestDimension = Object.entries(session.finalEvaluation!.dimensions).sort((a, b) => a[1] - b[1])[0]?.[0]; const next = recommendNextSkill(graph.nodes, masteryMap, "ai", buildVsBuySkill.id, { completedSkillIds: updatedCompleted, weakestDimension }); addEvidence([applicationEvent, recallEvent]); completeSkill({ skillId: buildVsBuySkill.id, sessionId: session.sessionId, completedAt: occurredAt, version: buildVsBuySkill.version, weakestDimension }); trackLearningEvent("recall_submitted", { skillId: buildVsBuySkill.id, blockId: "transfer", locale, correct: answer === 0 }); trackLearningEvent("skill_completed", { skillId: buildVsBuySkill.id, blockId: "summary", locale, sessionId: session.sessionId }); trackLearningEvent("mastery_updated", { skillId: buildVsBuySkill.id, blockId: "summary", locale, before: session.initialMastery, after: masteryAfter }); update({ recallAnswer: answer, recallPerformance, masteryAfter, nextSkillId: next?.skill.id, completedAt: occurredAt }, true); };
  return <section className="learning-block recall-block"><p className="eyebrow">{c.eyebrow}</p><h1>{c.title}</h1><form onSubmit={submit}><p className="recall-prompt">{c.prompt}</p><div className="recall-options">{c.options.map((option, index) => <button type="button" className={answer === index ? "selected" : ""} onClick={() => setAnswer(index)} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{error && <p className="learning-error">{error}</p>}<ContinueButton>{c.cta}</ContinueButton></form></section>;
}

function SummaryBlock({ session }: BlockProps) {
  const { locale } = useI18n(); const c = getBuildVsBuyCopy(locale).summary; const graph = loadGraph(locale); const next = graph.nodes.find((node) => node.id === session.nextSkillId); const router = useRouter();
  const application = Math.round((session.finalEvaluation?.overallPerformance ?? 0) * 100); const adaptability = Math.round((session.finalEvaluation?.dimensions.adaptability ?? 0) * 100); const recall = Math.round((session.recallPerformance ?? 0) * 100);
  return <section className="learning-block summary-block"><p className="section-label"><SparkIcon />{c.eyebrow}</p><h1>{buildVsBuySkill.title[locale]}</h1><div className="summary-scores"><div><span>{c.application}</span><strong>{application}</strong></div><div><span>{c.adaptability}</span><strong>{adaptability}</strong></div><div><span>{c.recall}</span><strong>{recall}</strong></div></div><div className="skala-update"><p>{c.updated}</p><div><span>{c.mastery}</span><strong>{session.initialMastery}<i>→</i>{session.masteryAfter}</strong></div><small>{c.evidence}</small><small>{c.connection}</small></div><p className="completion-distinction">{c.completionNote}</p>{next && <p className="next-recommendation"><span>{c.next}</span><strong>{next.title}</strong></p>}<button className="primary-action learning-continue" onClick={() => { trackLearningEvent("next_move_opened", { skillId: buildVsBuySkill.id, blockId: "summary", locale }); router.push(`/skala?focus=${encodeURIComponent(buildVsBuySkill.id)}&updated=1`); }}>{c.cta}<ArrowIcon /></button></section>;
}

const blockRegistry: Record<LearningBlockType, React.ComponentType<BlockProps>> = {
  editorial: EntryBlock, think: ThinkBlock, visual: VisualBlock, example: ExampleBlock,
  open_response: OpenResponseBlock, ai_challenge: ChallengeBlock, application: FinalDecisionBlock,
  recall_check: RecallBlock, mastery_summary: SummaryBlock,
};

export function BuildVsBuyLearningSession() {
  const { locale } = useI18n(); const { evidence } = useSkalaState(); const copy = getBuildVsBuyCopy(locale); const graph = useMemo(() => loadGraph(locale), [locale]); const mastery = buildMasteryMap(graph.nodes, evidence)[buildVsBuySkill.id]?.mastery ?? 0;
  const [session, setSession] = useState<BuildVsBuySession | null>(null); const [error, setError] = useState("");
  const currentBlock = session?.currentBlock;
  useEffect(() => { const task = window.setTimeout(() => setSession(readBuildVsBuySession(mastery)), 0); return () => window.clearTimeout(task); }, [mastery]);
  useEffect(() => { if (session) window.localStorage.setItem(buildVsBuySessionStorageKey, JSON.stringify(session)); }, [session]);
  useEffect(() => { if (currentBlock !== undefined) window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentBlock]);
  if (!session) return <div className="learning-loading" />;
  const block = buildVsBuySkill.blocks[session.currentBlock] ?? buildVsBuySkill.blocks.at(-1)!;
  const update = (patch: Partial<BuildVsBuySession>, advance = false) => setSession((current) => current ? { ...current, ...patch, currentBlock: advance ? Math.min(current.currentBlock + 1, buildVsBuySkill.blocks.length - 1) : current.currentBlock, updatedAt: new Date().toISOString() } : current);
  const ActiveBlock = block.id === "reveal" ? RevealBlock : blockRegistry[block.type];
  return <div className="learning-session page-frame"><header className="learning-header"><Link href="/skala">{copy.meta.back}</Link><div><span>{copy.meta.sequence}</span><strong>{String(session.currentBlock + 1).padStart(2, "0")} / {String(buildVsBuySkill.blocks.length).padStart(2, "0")}</strong></div><small>{copy.meta.save}</small></header><div className="learning-progress"><span style={{ width: `${((session.currentBlock + 1) / buildVsBuySkill.blocks.length) * 100}%` }} /></div><ActiveBlock session={session} update={update} error={error} setError={setError} /></div>;
}
