"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { getExpandedSkillCopy } from "@/content/skills/expanded-copy";
import { expandedSkillText, getExpandedSkill } from "@/content/skills/expanded";
import { seedEvidence } from "@/content/mastery/seed";
import { useI18n } from "@/i18n/provider";
import { evaluateExpandedApplication } from "@/lib/ai/expanded-learning";
import { trackLearningEvent } from "@/lib/analytics/learning";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import {
  createExpandedSession,
  expandedSessionStorageKey,
  expandedSteps,
  nextExpandedStep,
  parseExpandedSession,
  type ExpandedSkillSession as Session,
} from "@/lib/learning/expanded-session";
import { calculateMastery, type EvidenceEvent } from "@/lib/mastery/engine";
import { recommendNextSkill } from "@/lib/recommendation/engine";
import { useSkalaState } from "@/lib/state/provider";

type Props = { skillId: string };

function ContinueButton({ children, disabled = false }: { children: React.ReactNode; disabled?: boolean }) {
  return <button className="primary-action learning-continue" disabled={disabled}>{children}<ArrowIcon /></button>;
}

export function ExpandedSkillSession({ skillId }: Props) {
  const skill = getExpandedSkill(skillId)!;
  const { locale } = useI18n();
  const copy = getExpandedSkillCopy(locale);
  const text = expandedSkillText(skill, locale);
  const graph = useMemo(() => loadGraph(locale), [locale]);
  const graphSkill = graph.nodes.find((node) => node.id === skillId)!;
  const { evidence, completions, hydrated, addEvidence, completeSkill } = useSkalaState();
  const masteryBefore = buildMasteryMap(graph.nodes, evidence)[skillId]?.mastery ?? 0;
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!hydrated || session) return;
    const task = window.setTimeout(() => setSession(parseExpandedSession(window.localStorage.getItem(expandedSessionStorageKey(skillId)), skillId, skill.version, masteryBefore)), 0);
    return () => window.clearTimeout(task);
  }, [hydrated, masteryBefore, session, skill.version, skillId]);
  useEffect(() => { if (session) window.localStorage.setItem(expandedSessionStorageKey(skillId), JSON.stringify(session)); }, [session, skillId]);
  useEffect(() => { if (session?.currentStep) window.scrollTo({ top: 0, behavior: "smooth" }); }, [session?.currentStep]);

  if (!session) return <div className="learning-loading" />;
  const update = (patch: Partial<Session>, advance = false) => setSession((current) => current ? { ...current, ...patch, currentStep: advance ? nextExpandedStep(current.currentStep) : current.currentStep, updatedAt: new Date().toISOString() } : current);
  const restart = () => { window.localStorage.removeItem(expandedSessionStorageKey(skillId)); setError(""); setSession(createExpandedSession(skillId, skill.version, buildMasteryMap(graph.nodes, evidence)[skillId]?.mastery ?? 0)); };
  const stepIndex = expandedSteps.indexOf(session.currentStep);

  const entry = <section className="learning-block entry-block expanded-entry"><p className="section-label"><SparkIcon />{copy.entry.eyebrow}</p><p className="skill-code">{graphSkill.id}</p><h1>{graphSkill.title}</h1><p className="learning-lede">{graphSkill.summary}</p><p className="expanded-entry-note">{copy.entry.body}</p><button className="primary-action learning-continue" onClick={() => { trackLearningEvent("skill_started", { skillId, blockId: "entry", locale }); update({}, true); }}>{copy.entry.cta}<ArrowIcon /></button></section>;

  const thinkSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const value = new FormData(event.currentTarget).get("diagnostic")?.toString().trim() ?? "";
    if (value.length < 45) return setError(copy.validation.response);
    setError(""); trackLearningEvent("think_submitted", { skillId, blockId: "think", locale }); update({ diagnosticResponse: value }, true);
  };
  const think = <section className="learning-block think-block expanded-think"><p className="eyebrow">{copy.think.eyebrow}</p><h1>{copy.think.title}</h1><blockquote>{text.diagnosticScenario}</blockquote><form onSubmit={thinkSubmit}><label>{copy.think.helper}<textarea name="diagnostic" rows={5} defaultValue={session.diagnosticResponse} placeholder={copy.think.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton>{copy.think.cta}</ContinueButton></form></section>;

  const layers = [text.misconception, text.principle, text.boundary];
  const reveal = <section className="learning-block reveal-block expanded-model"><p className="eyebrow">{copy.reveal.eyebrow}</p><h1>{copy.reveal.title}</h1><p className="learning-lede">{copy.reveal.body}</p><div className="lens-system">{layers.map((body, index) => { const active = session.activeLens === index; return <button type="button" key={copy.reveal.labels[index]} className={active ? "active" : ""} aria-expanded={active} onClick={() => update({ activeLens: index })}><span>{String(index + 1).padStart(2, "0")}</span><strong>{copy.reveal.labels[index]}</strong><em>{active ? copy.reveal.body : copy.reveal.labels[(index + 1) % layers.length]}</em>{active && <span className="lens-detail"><span className="lens-explanation">{body}</span></span>}</button>; })}</div><button className="primary-action learning-continue" onClick={() => update({}, true)}>{copy.reveal.cta}<ArrowIcon /></button></section>;

  const applicationSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const value = new FormData(event.currentTarget).get("application")?.toString().trim() ?? "";
    if (value.length < 70) return setError(copy.validation.response);
    setError(""); const evaluation = await evaluateExpandedApplication({ skill, locale, diagnosticResponse: session.diagnosticResponse!, applicationResponse: value });
    trackLearningEvent("application_submitted", { skillId, blockId: "application", locale }); trackLearningEvent("ai_challenge_shown", { skillId, blockId: "challenge", locale, challengeType: "counterfactual" });
    update({ applicationResponse: value, initialEvaluation: evaluation }, true);
  };
  const application = <section className="learning-block response-block expanded-application"><p className="eyebrow">{copy.application.eyebrow}</p><h1>{copy.application.title}</h1><blockquote>{text.applicationScenario}</blockquote><form onSubmit={applicationSubmit}><label>{copy.application.prompt}<textarea name="application" rows={6} defaultValue={session.applicationResponse} placeholder={copy.application.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton>{copy.application.cta}</ContinueButton></form></section>;

  const challengeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const value = new FormData(event.currentTarget).get("challenge")?.toString().trim() ?? "";
    if (value.length < 60) return setError(copy.validation.response);
    setError(""); const evaluation = await evaluateExpandedApplication({ skill, locale, diagnosticResponse: session.diagnosticResponse!, applicationResponse: session.applicationResponse!, challengeResponse: value });
    trackLearningEvent("ai_challenge_answered", { skillId, blockId: "challenge", locale, challengeType: "counterfactual" }); update({ challengeResponse: value, finalEvaluation: evaluation }, true);
  };
  const challenge = <section className="learning-block challenge-block expanded-challenge"><p className="section-label"><SparkIcon />{copy.challenge.eyebrow}</p><p className="challenge-context">{copy.challenge.context}</p><h1>{copy.challenge.title}</h1><blockquote>{text.counterfactual}</blockquote><form onSubmit={challengeSubmit}><label>{copy.challenge.answer}<textarea name="challenge" rows={5} defaultValue={session.challengeResponse} placeholder={copy.challenge.placeholder} /></label>{error && <p className="learning-error">{error}</p>}<ContinueButton>{copy.challenge.cta}</ContinueButton></form></section>;

  const correctIndex = [...skillId].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4;
  const options = [...copy.transfer.distractors]; options.splice(correctIndex, 0, text.transferCorrect);
  const transferSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (session.recallAnswer === undefined) return setError(copy.validation.transfer);
    setError(""); const occurredAt = new Date().toISOString(); const recallPerformance = session.recallAnswer === correctIndex ? 1 : 0.35;
    const applicationEvent: EvidenceEvent = { id: `${session.sessionId}:application`, skillId, type: "application", performance: session.finalEvaluation!.overallPerformance, occurredAt, sourceId: session.sessionId, dimensions: session.finalEvaluation!.dimensions, metadata: { challengeType: "counterfactual", rationaleSummary: session.challengeResponse!.slice(0, 180), evaluatorVersion: session.finalEvaluation!.evaluatorVersion } };
    const recallEvent: EvidenceEvent = { id: `${session.sessionId}:recall`, skillId, type: "recall", performance: recallPerformance, occurredAt: new Date(Date.now() + 1).toISOString(), sourceId: session.sessionId, metadata: { answerId: String(session.recallAnswer), evaluatorVersion: "objective-transfer-v1" } };
    const nextEvidence = [...evidence, applicationEvent, recallEvent]; const masteryAfter = calculateMastery(skillId, [...seedEvidence, ...nextEvidence]).mastery; const masteryMap = buildMasteryMap(graph.nodes, nextEvidence);
    const next = recommendNextSkill(graph.nodes, masteryMap, graphSkill.primaryDomain, skillId, { completedSkillIds: [...completions.map((item) => item.skillId), skillId], weakestDimension: Object.entries(session.finalEvaluation!.dimensions).sort((a, b) => a[1] - b[1])[0]?.[0] });
    addEvidence([applicationEvent, recallEvent]); completeSkill({ skillId, sessionId: session.sessionId, completedAt: occurredAt, version: skill.version });
    trackLearningEvent("recall_submitted", { skillId, blockId: "transfer", locale, correct: recallPerformance === 1 }); trackLearningEvent("skill_completed", { skillId, blockId: "summary", locale, sessionId: session.sessionId }); trackLearningEvent("mastery_updated", { skillId, blockId: "summary", locale, before: session.initialMastery, after: masteryAfter });
    update({ recallPerformance, masteryAfter, nextSkillId: next?.skill.id, completedAt: occurredAt }, true);
  };
  const transfer = <section className="learning-block recall-block expanded-transfer"><p className="eyebrow">{copy.transfer.eyebrow}</p><h1>{copy.transfer.title}</h1><form onSubmit={transferSubmit}><p className="recall-prompt">{text.transferScenario}</p><div className="recall-options">{options.map((option, index) => <button type="button" className={session.recallAnswer === index ? "selected" : ""} onClick={() => update({ recallAnswer: index })} key={option}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{error && <p className="learning-error">{error}</p>}<ContinueButton>{copy.transfer.cta}</ContinueButton></form></section>;

  const nextSkill = graph.nodes.find((node) => node.id === session.nextSkillId);
  const summary = <section className="learning-block summary-block expanded-summary"><p className="section-label"><SparkIcon />{copy.summary.eyebrow}</p><h1>{copy.summary.updated}</h1><div className="summary-scores"><div><span>{copy.summary.application}</span><strong>{Math.round((session.finalEvaluation?.overallPerformance ?? 0) * 100)}</strong></div><div><span>{copy.summary.adaptability}</span><strong>{Math.round((session.finalEvaluation?.dimensions.adaptability ?? 0) * 100)}</strong></div><div><span>{copy.summary.transfer}</span><strong>{Math.round((session.recallPerformance ?? 0) * 100)}</strong></div></div><div className="skala-update"><p>{graphSkill.title}</p><div><span>{copy.summary.mastery}</span><strong>{session.initialMastery}<i>→</i>{session.masteryAfter}</strong></div><small>{copy.summary.evidence}</small></div><p className="completion-distinction">{copy.summary.distinction}</p>{nextSkill && <p className="next-recommendation"><span>{copy.summary.next}</span><strong>{nextSkill.title}</strong></p>}<button className="primary-action learning-continue" onClick={() => { trackLearningEvent("next_move_opened", { skillId, blockId: "summary", locale }); router.push(`/skala?focus=${encodeURIComponent(skillId)}&updated=1`); }}>{copy.summary.graph}<ArrowIcon /></button></section>;

  const stages = { entry, think, reveal, application, challenge, transfer, summary };
  return <div className="learning-session page-frame"><header className="learning-header"><Link href="/skala">{copy.meta.back}</Link><div><span>{copy.meta.sequence}</span><strong>{String(stepIndex + 1).padStart(2, "0")} / {String(expandedSteps.length).padStart(2, "0")}</strong></div><small>{copy.meta.saved}</small><button type="button" className="learning-restart" onClick={restart}>{copy.meta.restart}</button></header><div className="learning-progress"><span style={{ width: `${((stepIndex + 1) / expandedSteps.length) * 100}%` }} /></div>{stages[session.currentStep]}</div>;
}
