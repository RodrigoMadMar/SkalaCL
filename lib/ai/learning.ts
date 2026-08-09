import { challengePatterns } from "@/content/skills/ai/build-vs-buy";
import type { Locale } from "@/i18n/config";
import {
  applicationEvaluationSchema, challengeResultSchema, type ApplicationEvaluation, type ChallengeResult, type LearningDecision,
} from "@/lib/learning/schemas";

export type ChallengeInput = {
  locale: Locale;
  skillId: "ai.build-vs-buy";
  objective: string;
  scenarioFacts: string[];
  initialDiagnostic: { decision: LearningDecision; rationale: string };
  applicationResponse: string;
  detectedAssumptions: string[];
  omittedRelevantFactors: string[];
  allowedChallengePatterns: string[];
  maxTurnsRemaining: number;
};

export type EvaluationInput = {
  locale: Locale;
  decision: LearningDecision;
  response: string;
  challengeType?: string;
  challengeResponse?: string;
  final?: boolean;
};

export interface LearningAIAdapter {
  challengeLearningResponse(input: ChallengeInput): Promise<unknown>;
  evaluateSkillApplication(input: EvaluationInput): Promise<unknown>;
}

const markerGroups = {
  speed: ["speed", "week", "weeks", "launch", "time", "velocidad", "semana", "lanz", "tiempo"],
  economics: ["cost", "usage", "scale", "margin", "economic", "costo", "uso", "escala", "margen", "econom"],
  differentiation: ["different", "strateg", "advantage", "customer", "diferenci", "estrateg", "ventaja", "cliente"],
  control: ["control", "data", "legal", "audit", "privacy", "datos", "privacidad"],
  capability: ["team", "talent", "ml ops", "operation", "equipo", "talento", "operaci"],
  reversibility: ["switch", "lock", "migrat", "portable", "revers", "cambiar", "portab"],
};

function includesAny(text: string, markers: string[]) { return markers.some((marker) => text.includes(marker)); }
function clamp(value: number) { return Number(Math.max(0, Math.min(1, value)).toFixed(2)); }

function fallbackEvaluation(input: EvaluationInput): ApplicationEvaluation {
  const text = `${input.response} ${input.challengeResponse ?? ""}`.toLowerCase();
  const present = Object.entries(markerGroups).filter(([, markers]) => includesAny(text, markers)).map(([name]) => name);
  const tradeoffSignals = [" but ", " however ", "although", "trade-off", "tradeoff", "pero", "aunque", "sin embargo", "a cambio"].filter((marker) => text.includes(marker)).length;
  const factSignals = ["600", "six", "seis", "tripl", "usage", "uso", "legal", "backend", "ml ops", "migrat", "semana"].filter((marker) => text.includes(marker)).length;
  const boundary = includesAny(text, ["layer", "boundary", "capa", "frontera", "infrastructure", "infraestructura"]);
  const conditional = includesAny(text, [" if ", "unless", "would review", "si ", "revisaría", "depende", "threshold", "umbral"]);
  const tradeoffRecognition = clamp(0.25 + present.length * 0.11 + tradeoffSignals * 0.14 + (boundary ? 0.1 : 0));
  const evidenceUse = clamp(0.22 + factSignals * 0.12 + (present.length >= 3 ? 0.12 : 0));
  const economicReasoning = clamp(0.2 + (present.includes("economics") ? 0.35 : 0) + (includesAny(text, ["scale", "escala", "tripl", "usage", "uso"]) ? 0.2 : 0) + (present.includes("reversibility") ? 0.15 : 0));
  const strategicCoherence = clamp(0.3 + (present.includes("differentiation") ? 0.22 : 0) + (tradeoffSignals ? 0.18 : 0) + (input.decision === "hybrid" && boundary ? 0.2 : 0) + (input.decision !== "hybrid" ? 0.08 : 0));
  const adaptability = input.final ? clamp(0.3 + (input.challengeResponse && input.challengeResponse.length > 45 ? 0.25 : 0) + (conditional ? 0.22 : 0) + (tradeoffSignals ? 0.15 : 0)) : undefined;
  const dimensions = { tradeoffRecognition, evidenceUse, economicReasoning, strategicCoherence, ...(adaptability === undefined ? {} : { adaptability }) };
  const omittedRelevantFactors = Object.keys(markerGroups).filter((name) => !present.includes(name));
  const strongestReason = present[0] ?? "unprioritized";
  const challengeTarget = input.decision === "hybrid" && !boundary ? "boundary"
    : input.decision === "build" && !present.includes("capability") ? "capability"
      : input.decision === "buy" && !present.includes("reversibility") ? "lockIn"
        : strongestReason === "economics" ? "cost" : strongestReason === "control" ? "control" : "speed";
  const values = Object.values(dimensions);
  return applicationEvaluationSchema.parse({
    decision: input.decision,
    dimensions,
    assumptionsDetected: present.length ? [`priority:${strongestReason}`] : ["priority:implicit"],
    omittedRelevantFactors,
    strongestReason,
    challengeTarget,
    overallPerformance: clamp(values.reduce((sum, value) => sum + value, 0) / values.length),
    evaluatorVersion: "deterministic-build-vs-buy-v1",
  });
}

function fallbackChallenge(input: ChallengeInput): ChallengeResult {
  const evaluation = fallbackEvaluation({ locale: input.locale, decision: input.initialDiagnostic.decision, response: input.applicationResponse });
  const requested = evaluation.challengeTarget as keyof typeof challengePatterns;
  const challengeType = input.allowedChallengePatterns.includes(requested) ? requested : "speed";
  return challengeResultSchema.parse({
    challengeType,
    challenge: challengePatterns[challengeType][input.locale],
    targetedAssumption: evaluation.strongestReason,
    requiresFollowUp: false,
  });
}

export async function evaluateSkillApplication(input: EvaluationInput, adapter?: LearningAIAdapter): Promise<ApplicationEvaluation> {
  if (adapter) {
    try { return applicationEvaluationSchema.parse(await adapter.evaluateSkillApplication(input)); } catch { /* deterministic fallback */ }
  }
  return fallbackEvaluation(input);
}

export async function challengeLearningResponse(input: ChallengeInput, adapter?: LearningAIAdapter): Promise<ChallengeResult> {
  if (adapter) {
    try { return challengeResultSchema.parse(await adapter.challengeLearningResponse(input)); } catch { /* deterministic fallback */ }
  }
  return fallbackChallenge(input);
}
