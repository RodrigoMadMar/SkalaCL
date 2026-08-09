"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { EvidenceEvent } from "@/lib/mastery/engine";

export const skalaStateStorageKey = "skala.user-state.v1";

export type SkillCompletion = {
  skillId: string;
  sessionId: string;
  completedAt: string;
  version: string;
  weakestDimension?: string;
};

export type CaseCompletion = {
  caseId: string;
  sessionId: string;
  completedAt: string;
  version: string;
  initialDecision: string;
  finalDecision: string;
  overallPerformance: number;
};

export type CheckpointCompletion = {
  checkpointId: string;
  sessionId: string;
  completedAt: string;
  version: string;
  overallPerformance: number;
};

type PersistentState = { evidence: EvidenceEvent[]; completions: SkillCompletion[]; caseCompletions: CaseCompletion[]; checkpointCompletions: CheckpointCompletion[] };
type StateContext = PersistentState & {
  hydrated: boolean;
  addEvidence: (events: EvidenceEvent[]) => void;
  completeSkill: (completion: SkillCompletion) => void;
  completeCase: (completion: CaseCompletion) => void;
  completeCheckpoint: (completion: CheckpointCompletion) => void;
};

const emptyState: PersistentState = { evidence: [], completions: [], caseCompletions: [], checkpointCompletions: [] };
const Context = createContext<StateContext | null>(null);

function validEvidence(event: unknown): event is EvidenceEvent {
  if (!event || typeof event !== "object") return false;
  const candidate = event as Partial<EvidenceEvent>;
  return typeof candidate.id === "string" && typeof candidate.skillId === "string"
    && ["exposure", "recall", "application", "case", "delayed"].includes(candidate.type ?? "")
    && typeof candidate.performance === "number" && candidate.performance >= 0 && candidate.performance <= 1
    && typeof candidate.occurredAt === "string" && typeof candidate.sourceId === "string";
}

function validCompletion(item: unknown): item is SkillCompletion {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<SkillCompletion>;
  return typeof candidate.skillId === "string" && typeof candidate.sessionId === "string"
    && typeof candidate.completedAt === "string" && typeof candidate.version === "string";
}

function validCaseCompletion(item: unknown): item is CaseCompletion {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<CaseCompletion>;
  return typeof candidate.caseId === "string" && typeof candidate.sessionId === "string"
    && typeof candidate.completedAt === "string" && typeof candidate.version === "string"
    && typeof candidate.initialDecision === "string" && typeof candidate.finalDecision === "string"
    && typeof candidate.overallPerformance === "number" && candidate.overallPerformance >= 0 && candidate.overallPerformance <= 1;
}

function validCheckpointCompletion(item: unknown): item is CheckpointCompletion {
  if (!item || typeof item !== "object") return false;
  const candidate = item as Partial<CheckpointCompletion>;
  return typeof candidate.checkpointId === "string" && typeof candidate.sessionId === "string"
    && typeof candidate.completedAt === "string" && typeof candidate.version === "string"
    && typeof candidate.overallPerformance === "number" && candidate.overallPerformance >= 0 && candidate.overallPerformance <= 1;
}

export function parsePersistentState(raw: string | null): PersistentState {
  try {
    const parsed = JSON.parse(raw ?? "null") as Partial<PersistentState> | null;
    return {
      evidence: Array.isArray(parsed?.evidence) ? parsed.evidence.filter(validEvidence) : [],
      completions: Array.isArray(parsed?.completions) ? parsed.completions.filter(validCompletion) : [],
      caseCompletions: Array.isArray(parsed?.caseCompletions) ? parsed.caseCompletions.filter(validCaseCompletion) : [],
      checkpointCompletions: Array.isArray(parsed?.checkpointCompletions) ? parsed.checkpointCompletions.filter(validCheckpointCompletion) : [],
    };
  } catch {
    return emptyState;
  }
}

function readState() {
  return parsePersistentState(window.localStorage.getItem(skalaStateStorageKey));
}

export function SkalaStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistentState>(emptyState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const task = window.setTimeout(() => { setState(readState()); setHydrated(true); }, 0);
    return () => window.clearTimeout(task);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(skalaStateStorageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const addEvidence = useCallback((events: EvidenceEvent[]) => setState((current) => {
    const ids = new Set(current.evidence.map((event) => event.id));
    return { ...current, evidence: [...current.evidence, ...events.filter((event) => !ids.has(event.id))] };
  }), []);

  const completeSkill = useCallback((completion: SkillCompletion) => setState((current) => ({
    ...current,
    completions: current.completions.some((item) => item.sessionId === completion.sessionId)
      ? current.completions
      : [...current.completions, completion],
  })), []);

  const completeCase = useCallback((completion: CaseCompletion) => setState((current) => ({
    ...current,
    caseCompletions: current.caseCompletions.some((item) => item.sessionId === completion.sessionId)
      ? current.caseCompletions
      : [...current.caseCompletions, completion],
  })), []);

  const completeCheckpoint = useCallback((completion: CheckpointCompletion) => setState((current) => ({
    ...current,
    checkpointCompletions: current.checkpointCompletions.some((item) => item.sessionId === completion.sessionId)
      ? current.checkpointCompletions
      : [...current.checkpointCompletions, completion],
  })), []);

  const value = useMemo(() => ({ ...state, hydrated, addEvidence, completeSkill, completeCase, completeCheckpoint }), [state, hydrated, addEvidence, completeSkill, completeCase, completeCheckpoint]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSkalaState() {
  const value = useContext(Context);
  if (!value) throw new Error("useSkalaState must be used inside SkalaStateProvider");
  return value;
}
