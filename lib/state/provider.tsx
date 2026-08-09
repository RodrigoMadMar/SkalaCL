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

type PersistentState = { evidence: EvidenceEvent[]; completions: SkillCompletion[] };
type StateContext = PersistentState & {
  hydrated: boolean;
  addEvidence: (events: EvidenceEvent[]) => void;
  completeSkill: (completion: SkillCompletion) => void;
};

const emptyState: PersistentState = { evidence: [], completions: [] };
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

export function parsePersistentState(raw: string | null): PersistentState {
  try {
    const parsed = JSON.parse(raw ?? "null") as Partial<PersistentState> | null;
    return {
      evidence: Array.isArray(parsed?.evidence) ? parsed.evidence.filter(validEvidence) : [],
      completions: Array.isArray(parsed?.completions) ? parsed.completions.filter(validCompletion) : [],
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

  const value = useMemo(() => ({ ...state, hydrated, addEvidence, completeSkill }), [state, hydrated, addEvidence, completeSkill]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useSkalaState() {
  const value = useContext(Context);
  if (!value) throw new Error("useSkalaState must be used inside SkalaStateProvider");
  return value;
}
