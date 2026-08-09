"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { ArrowIcon, SparkIcon } from "@/components/layout/icons";
import { economicsUnit } from "@/content/programs/business-core";
import { getEconomicsSkill, interactionCopy, lt, unitExperienceCopy, type UnitInteraction } from "@/content/programs/economics-unit";
import { seedEvidence } from "@/content/mastery/seed";
import { useI18n } from "@/i18n/provider";
import { loadGraph } from "@/lib/content/load-content";
import { buildMasteryMap } from "@/lib/demo/state";
import { calculateMastery, type EvidenceEvent } from "@/lib/mastery/engine";
import { createUnitSkillSession, nextUnitSkillStage, parseUnitSkillSession, unitSkillStages, unitSkillStorageKey, type UnitSkillSession } from "@/lib/programs/unit-session";
import { useSkalaState } from "@/lib/state/provider";

function Interaction({ type, value, setValue }: { type: UnitInteraction; value: number; setValue: (value: number) => void }) {
  const { locale } = useI18n();
  const c = interactionCopy[locale];
  if (type === "market-model") {
    const shock = value % c.shocks.length; const price = [1, 1, -1, -1, 1][shock]; const quantity = [1, 1, 1, 1, -1][shock];
    return <div className="unit-market-model"><div className="unit-shock-tabs">{c.shocks.map((item, index) => <button type="button" className={shock === index ? "active" : ""} onClick={() => setValue(index)} key={item}>{item}</button>)}</div><div className="market-plane"><i className="market-demand" /><i className="market-supply" /><span className="market-point" style={{ left: `${48 + price * 12}%`, top: `${48 - quantity * 11}%` }} /><small className="axis-price">{c.price}</small><small className="axis-quantity">{c.quantity}</small></div><div className="unit-live-metrics"><span>{c.price}<strong>{price > 0 ? "↑" : "↓"}</strong></span><span>{c.quantity}<strong>{quantity > 0 ? "↑" : "↓"}</strong></span></div></div>;
  }
  if (type === "forced-choice") return <div className="unit-alternative-grid">{c.alternatives.map((item, index) => <button type="button" className={value === index ? "active" : ""} onClick={() => setValue(index)} key={item}><span>0{index + 1}</span><strong>{item}</strong></button>)}</div>;
  if (type === "incremental-table") {
    const contributions = [80, 75, 68, value === 4 ? 82 : 60, 52]; const costs = [45, 55, 66, 72, 85];
    return <div className="unit-incremental"><div className="incremental-table"><header><span>{c.bands}</span><span>{c.contribution}</span><span>{c.acquisition}</span></header>{contributions.map((item, index) => <button type="button" onClick={() => setValue(index)} className={value === index ? "active" : ""} key={index}><span>{String.fromCharCode(65 + index)}</span><span>{item}</span><span>{costs[index]}</span><i className={item >= costs[index] ? "positive" : "negative"} /></button>)}</div><button type="button" className="unit-toggle" onClick={() => setValue(value === 4 ? 2 : 4)}>{c.improved}</button></div>;
  }
  if (type === "cost-simulator") {
    const customers = 1000 + value * 1000; const step = customers >= 12000 ? 18000 : 0; const total = 42000 + customers * 3.4 + step; const average = total / customers; const marginal = 3.4 + (customers === 12000 ? 18 : 0);
    return <div className="unit-simulator"><input aria-label={c.customers} type="range" min="0" max="19" value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="simulator-scale"><span>1.000</span><strong>{customers.toLocaleString(locale)}</strong><span>20.000</span></div><p className={customers >= 12000 ? "threshold active" : "threshold"}>{c.threshold}</p><div className="unit-live-metrics"><span>{c.totalCost}<strong>${Math.round(total / 1000)}k</strong></span><span>{c.averageCost}<strong>${average.toFixed(1)}</strong></span><span>{c.marginalCost}<strong>${marginal.toFixed(1)}</strong></span></div></div>;
  }
  if (type === "elasticity-simulator") {
    const change = value - 10; const segments = [[c.business, .35], [c.occasional, .9], [c.substitutes, 1.6]] as const;
    return <div className="unit-simulator"><input aria-label={c.price} type="range" min="0" max="20" value={value} onChange={(event) => setValue(Number(event.target.value))} /><div className="simulator-scale"><span>-10%</span><strong>{change > 0 ? "+" : ""}{change}%</strong><span>+10%</span></div><div className="elasticity-lines">{segments.map(([name, elasticity]) => { const volume = Math.round(100 - change * elasticity); const revenue = Math.round((100 + change) * volume); return <div key={name}><header><span>{name}</span><strong>{volume}% · {c.revenue} {revenue}</strong></header><i><b style={{ width: `${Math.min(100, volume)}%` }} /></i></div>; })}</div></div>;
  }
  if (type === "incentive-lab") {
    const speed = value; const resolution = 100 - value; const outcome = Math.round((resolution * .7) + 20); return <div className="unit-incentives"><label>{c.speed}<input type="range" min="0" max="100" value={speed} onChange={(event) => setValue(Number(event.target.value))} /></label><label>{c.resolution}<input type="range" min="0" max="100" value={resolution} onChange={(event) => setValue(100 - Number(event.target.value))} /></label><div className="unit-live-metrics"><span>{c.outcome}<strong>{outcome}</strong></span><span>{c.repeats}<strong>{Math.round(speed * .62)}</strong></span><span>{c.avoidance}<strong>{Math.round(speed * .48)}</strong></span></div></div>;
  }
  if (type === "market-classification") return <div className="unit-market-rank"><button type="button" className="unit-toggle" onClick={() => setValue(value ? 0 : 1)}>{value ? c.broad : c.narrow}</button>{c.markets.map((market, index) => { const score = [78, 28, 64, value ? 34 : 72][index]; return <div key={market}><span>{market}</span><i><b style={{ width: `${score}%` }} /></i><strong>{score}</strong></div>; })}</div>;
  if (type === "pricing-lab") {
    const mode = value % 3; const adoption = [82, 70, 76][mode]; const contribution = [58, 76, 69][mode]; const fairness = [15, 34, 24][mode];
    return <div className="unit-pricing"><div className="unit-shock-tabs">{c.pricingModes.map((item, index) => <button type="button" className={mode === index ? "active" : ""} onClick={() => setValue(index)} key={item}>{item}</button>)}</div><div className="unit-live-metrics"><span>{c.adoption}<strong>{adoption}</strong></span><span>{c.contributionShort}<strong>{contribution}</strong></span><span>{c.fairness}<strong>{fairness}</strong></span></div><button type="button" className="unit-toggle" onClick={() => setValue((mode + 1) % 3)}>{c.resale}</button></div>;
  }
  const rounds = value; const cut = rounds % 2 === 1; return <div className="unit-game"><div className="payoff-matrix"><span /><strong>{c.rival} · {c.hold}</strong><strong>{c.rival} · {c.cut}</strong><strong>{c.you} · {c.hold}</strong><span>8 / 8</span><span>3 / 12</span><strong>{c.you} · {c.cut}</strong><span>12 / 3</span><span className={cut ? "active" : ""}>5 / 5</span></div><div className="unit-game-action"><p>{c.round} {rounds + 1} · {c.payoff}: <strong>{cut ? "5 / 5" : "8 / 8"}</strong></p><button type="button" className="unit-toggle" onClick={() => setValue(Math.min(3, rounds + 1))}>{c.play}</button></div></div>;
}

export function EconomicsSkillSession({ skillId }: { skillId: string }) {
  const { locale } = useI18n(); const copy = unitExperienceCopy[locale]; const skill = getEconomicsSkill(skillId)!;
  const graph = useMemo(() => loadGraph(locale), [locale]); const graphSkill = graph.nodes.find((item) => item.id === skillId)!;
  const { evidence, completions, hydrated, addEvidence, completeSkill } = useSkalaState();
  const masteryBefore = buildMasteryMap(graph.nodes, evidence)[skillId]?.mastery ?? 0;
  const [session, setSession] = useState<UnitSkillSession | null>(null); const [error, setError] = useState("");
  useEffect(() => { if (!hydrated || session) return; const task = window.setTimeout(() => setSession(parseUnitSkillSession(window.localStorage.getItem(unitSkillStorageKey(skillId)), skillId, masteryBefore)), 0); return () => window.clearTimeout(task); }, [hydrated, masteryBefore, session, skillId]);
  useEffect(() => { if (session) window.localStorage.setItem(unitSkillStorageKey(skillId), JSON.stringify(session)); }, [session, skillId]);
  if (!session) return <div className="learning-loading" />;
  const stageIndex = unitSkillStages.indexOf(session.stage);
  const update = (patch: Partial<UnitSkillSession>, advance = false) => setSession((current) => current ? { ...current, ...patch, stage: advance ? nextUnitSkillStage(current.stage) : current.stage, updatedAt: new Date().toISOString() } : current);
  const restart = () => { window.localStorage.removeItem(unitSkillStorageKey(skillId)); setError(""); setSession(createUnitSkillSession(skillId, masteryBefore)); };
  const chooseAndAdvance = () => { if (session.diagnosticChoice === undefined) return setError(copy.select); setError(""); update({}, true); };
  const submitText = (field: "applicationResponse" | "challengeResponse", event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const value = new FormData(event.currentTarget).get(field)?.toString().trim() ?? ""; if (value.length < 60) return setError(copy.validation); setError(""); update({ [field]: value }, true); };
  const finish = () => {
    if (session.transferChoice === undefined) return setError(copy.select);
    const occurredAt = new Date().toISOString(); const occurredMs = new Date(occurredAt).getTime(); const diagnostic = session.diagnosticChoice === skill.correctChoice ? 1 : .45; const recall = session.transferChoice === skill.correctTransfer ? 1 : .35;
    const quantitativeScore = skill.interaction !== "elasticity-simulator" || Math.abs((session.quantitativeAnswer ?? 0) - .4) <= .05 ? .1 : 0;
    const applicationPerformance = Math.min(.92, .4 + quantitativeScore + ((session.applicationResponse?.length ?? 0) / 600) + ((session.challengeResponse?.length ?? 0) / 900));
    const events: EvidenceEvent[] = [
      { id: `${session.sessionId}:diagnostic`, skillId, type: "exposure", performance: diagnostic, occurredAt, sourceId: session.sessionId, metadata: { programId: "business-core", unitId: economicsUnit.id, evaluatorVersion: "objective-diagnostic-v1" } },
      { id: `${session.sessionId}:application`, skillId, type: "application", performance: applicationPerformance, occurredAt: new Date(occurredMs + 1).toISOString(), sourceId: session.sessionId, dimensions: Object.fromEntries(skill.evidenceDimensions.map((item) => [item, applicationPerformance])), metadata: { programId: "business-core", unitId: economicsUnit.id, evaluatorVersion: "deterministic-managerial-reasoning-v1" } },
      { id: `${session.sessionId}:recall`, skillId, type: "recall", performance: recall, occurredAt: new Date(occurredMs + 2).toISOString(), sourceId: session.sessionId, metadata: { programId: "business-core", unitId: economicsUnit.id, evaluatorVersion: "objective-transfer-v1" } },
    ];
    const masteryAfter = calculateMastery(skillId, [...seedEvidence, ...evidence, ...events]).mastery;
    addEvidence(events); completeSkill({ skillId, sessionId: session.sessionId, completedAt: occurredAt, version: session.version, weakestDimension: applicationPerformance < .7 ? skill.evidenceDimensions[0] : undefined });
    setError(""); update({ masteryAfter, completedAt: occurredAt }, true);
  };
  const refIndex = economicsUnit.skillReferences.findIndex((item) => item.graphNodeId === skillId); const nextSkillId = economicsUnit.skillReferences[refIndex + 1]?.graphNodeId;
  return <div className="learning-session unit-learning page-frame"><header className="learning-header"><Link href={`/programs/business-core/units/${economicsUnit.id}`}>{copy.back}</Link><div><span>UNIT 01</span><strong>{graphSkill.title}</strong></div><small>{stageIndex + 1} / {unitSkillStages.length}</small><button type="button" className="learning-restart" onClick={restart}>{copy.restart}</button></header><div className="learning-progress"><span style={{ width: `${((stageIndex + 1) / unitSkillStages.length) * 100}%` }} /></div>
    {session.stage === "diagnostic" && <section className="learning-block unit-diagnostic"><p className="eyebrow">{copy.capability}</p><p className="unit-capability">{lt(skill.capability, locale)}</p><h1>{lt(skill.coldOpen, locale)}</h1><div className="unit-choice-grid">{skill.choices.map((choice, index) => <button type="button" className={session.diagnosticChoice === index ? "selected" : ""} onClick={() => update({ diagnosticChoice: index })} key={choice[locale]}><span>0{index + 1}</span>{lt(choice, locale)}</button>)}</div>{error && <p className="learning-error">{error}</p>}<button className="primary-action learning-continue" onClick={chooseAndAdvance}>{copy.commit}<ArrowIcon /></button></section>}
    {session.stage === "model" && <section className="learning-block unit-model"><p className="section-label"><SparkIcon />{copy.reveal}</p><div className={session.diagnosticChoice === skill.correctChoice ? "unit-verdict correct" : "unit-verdict"}>{session.diagnosticChoice === skill.correctChoice ? copy.correct : copy.reconsider}</div><h1>{graphSkill.title}</h1><p className="learning-lede">{lt(skill.explanation, locale)}</p><button className="primary-action learning-continue" onClick={() => update({}, true)}>{copy.continue}<ArrowIcon /></button></section>}
    {session.stage === "interaction" && <section className="learning-block unit-interaction"><p className="eyebrow">{copy.interact}</p><h1>{lt(skill.interactionTitle, locale)}</h1><p className="learning-lede">{lt(skill.interactionPrompt, locale)}</p><Interaction type={skill.interaction} value={session.interactionValue} setValue={(value) => update({ interactionValue: value })} />{skill.interaction === "elasticity-simulator" && <label className="unit-quantitative-input">{copy.quantitativePrompt}<span>{copy.quantitativeUnit}<input type="number" min="0" max="5" step="0.1" value={session.quantitativeAnswer ?? ""} onChange={(event) => update({ quantitativeAnswer: Number(event.target.value) })} /></span></label>}<button className="primary-action learning-continue" onClick={() => update({}, true)}>{copy.continue}<ArrowIcon /></button></section>}
    {session.stage === "application" && <section className="learning-block unit-response"><p className="eyebrow">{copy.apply}</p><h1>{lt(skill.application, locale)}</h1><form onSubmit={(event) => submitText("applicationResponse", event)}><label>{copy.applicationHelp}<textarea rows={6} name="applicationResponse" defaultValue={session.applicationResponse} /></label>{error && <p className="learning-error">{error}</p>}<button className="primary-action learning-continue">{copy.continue}<ArrowIcon /></button></form></section>}
    {session.stage === "challenge" && <section className="learning-block unit-challenge"><p className="section-label"><SparkIcon />{copy.challenge}</p><h1>{lt(skill.aiChallenge, locale)}</h1><form onSubmit={(event) => submitText("challengeResponse", event)}><label>{copy.challengeHelp}<textarea rows={5} name="challengeResponse" defaultValue={session.challengeResponse} /></label>{error && <p className="learning-error">{error}</p>}<button className="primary-action learning-continue">{copy.continue}<ArrowIcon /></button></form></section>}
    {session.stage === "transfer" && <section className="learning-block unit-transfer"><p className="eyebrow">{copy.transfer}</p><h1>{lt(skill.transfer, locale)}</h1><div className="unit-choice-grid">{skill.transferChoices.map((choice, index) => <button type="button" className={session.transferChoice === index ? "selected" : ""} onClick={() => update({ transferChoice: index })} key={choice[locale]}><span>0{index + 1}</span>{lt(choice, locale)}</button>)}</div>{error && <p className="learning-error">{error}</p>}<button className="primary-action learning-continue" onClick={finish}>{copy.finish}<ArrowIcon /></button></section>}
    {session.stage === "summary" && <section className="learning-block unit-summary"><p className="section-label"><SparkIcon />{copy.summary}</p><h1>{graphSkill.title}</h1><div className="unit-summary-metrics"><div><span>{copy.mastery}</span><strong>{session.initialMastery}<i>→</i>{session.masteryAfter}</strong></div><div><span>{copy.evidence}</span><strong>+3</strong></div></div><div className="case-result-actions">{nextSkillId ? <Link className="primary-action" href={`/programs/business-core/units/${economicsUnit.id}/skills/${nextSkillId}`}>{copy.next}<ArrowIcon /></Link> : <Link className="primary-action" href={`/programs/business-core/units/${economicsUnit.id}/checkpoint`}>{copy.next}<ArrowIcon /></Link>}<Link className="text-action" href={`/skala?focus=${skillId}&updated=1`}>{copy.map}<ArrowIcon /></Link></div>{completions.some((item) => item.skillId === skillId) && <span className="unit-completion-stamp">✓</span>}</section>}
  </div>;
}
