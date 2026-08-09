import { aiCopilotEconomicsCase } from "@/content/cases/ai-copilot-economics";
import type { Locale } from "@/i18n/config";
import {
  caseChallengeSchema, caseEvaluationSchema, type CaseChallenge, type CaseDecision, type CaseEvaluation,
} from "@/lib/cases/schemas";

export type CaseChallengeInput = {
  locale: Locale;
  caseId: string;
  caseVersion: string;
  decision: CaseDecision;
  rationale: string;
  citedEvidence: string[];
  primaryRisk: string;
};

export type CaseEvaluationInput = CaseChallengeInput & {
  challenge: CaseChallenge;
  challengeResponse: string;
  finalDecision: CaseDecision;
  revisedRationale: string;
  recommendation: string;
  reviewTrigger: string;
};

export interface CaseAIAdapter {
  challengeCaseDecision(input: CaseChallengeInput): Promise<unknown>;
  evaluateCaseDecision(input: CaseEvaluationInput): Promise<unknown>;
}

const markerGroups = {
  economics: ["cost", "margin", "price", "usage", "scale", "unit", "costo", "margen", "precio", "uso", "escala", "unitaria"],
  strategy: ["value", "customer", "competitive", "different", "learn", "valor", "cliente", "compet", "diferenci", "aprend"],
  quality: ["quality", "acceptance", "reliab", "threshold", "calidad", "aceptación", "confiab", "umbral"],
  capability: ["team", "build", "operate", "ml ops", "talent", "equipo", "constru", "operar", "talento"],
  reversibility: ["portable", "switch", "lock", "routing", "evaluation", "portab", "cambiar", "lock-in", "evaluaci"],
  speed: ["week", "month", "launch", "window", "delay", "semana", "mes", "lanz", "ventana", "espera"],
};

const feedback = {
  "es-CL": {
    reasons: {
      problemDiagnosis: "Distingue el valor que genera el copiloto de la arquitectura necesaria para capturarlo.",
      evidenceUse: "Conecta las fuentes del caso con la recomendación, aunque aún puede ordenar mejor las señales y los supuestos.",
      strategicReasoning: "Expone con claridad las tensiones entre velocidad, aprendizaje, control y ventaja futura.",
      decisionCoherence: "La recomendación, el riesgo aceptado y la condición de revisión forman una tesis consistente.",
      adaptability: "Procesa la nueva información sin premiar el cambio de opinión por sí mismo.",
      communication: "La tesis es ejecutiva, específica y permite entender qué se decide.",
      financialReasoning: "Relaciona precio, uso, costo variable y margen en vez de mirar una cifra aislada.",
    },
    strengths: { economics: "Integraste la economía unitaria con la decisión de producto, en lugar de tratar el margen como una métrica posterior.", evidence: "Usaste evidencia concreta para sostener una tesis y no sólo para describir el caso.", adaptability: "Incorporaste la nueva información sin romper la lógica central de tu recomendación.", coherence: "Tu decisión mantiene una relación clara entre tesis, riesgo aceptado y condición de revisión." },
    improvements: { economics: "Modela explícitamente qué ocurre con el margen en segmentos de uso intensivo y qué palanca lo corrige.", evidence: "Jerarquiza las evidencias: separa hechos decisivos, señales débiles y datos que todavía faltan.", boundary: "Define con precisión qué compra NexoDesk, qué conserva y dónde queda la capacidad de cambiar de proveedor.", quality: "Conecta un umbral de calidad por segmento con precio, alcance y costo de servir.", trigger: "Convierte la revisión futura en un umbral medible, con responsable y horizonte temporal." },
    trajectory: (initial: string, final: string) => `Comenzaste con ${initial}; pusiste a prueba su supuesto principal y terminaste con ${final}, dejando explícita una condición de revisión.`,
  },
  en: {
    reasons: {
      problemDiagnosis: "Separates the copilot's value from the architecture required to capture it.",
      evidenceUse: "Connects case sources to the recommendation, with room to prioritize signals and assumptions more sharply.",
      strategicReasoning: "Makes the trade-offs between speed, learning, control and future advantage visible.",
      decisionCoherence: "The recommendation, accepted risk and review condition form a consistent thesis.",
      adaptability: "Processes new information without rewarding a change of mind by itself.",
      communication: "The thesis is executive, specific and makes the decision understandable.",
      financialReasoning: "Connects price, usage, variable cost and margin instead of reading one figure in isolation.",
    },
    strengths: { economics: "You integrated unit economics into the product decision instead of treating margin as a downstream metric.", evidence: "You used concrete evidence to support a thesis rather than merely describe the case.", adaptability: "You incorporated new information without breaking the central logic of your recommendation.", coherence: "Your decision maintains a clear relationship between thesis, accepted risk and review condition." },
    improvements: { economics: "Model explicitly what happens to margin in high-usage segments and which lever corrects it.", evidence: "Prioritize the evidence: separate decisive facts, weak signals and data that is still missing.", boundary: "Define precisely what NexoDesk buys, what it retains and where the ability to switch vendors lives.", quality: "Connect a segment-level quality threshold to pricing, scope and cost-to-serve.", trigger: "Turn the future review into a measurable threshold with an owner and time horizon." },
    trajectory: (initial: string, final: string) => `You began with ${initial}, pressured its main assumption and closed with ${final}, making a review condition explicit.`,
  },
};

const decisionNames: Record<Locale, Record<CaseDecision, string>> = {
  "es-CL": { vendor: "un lanzamiento con proveedor", build: "un desarrollo interno", hybrid: "una combinación de capacidades internas y externas", defer: "postergar la decisión" },
  en: { vendor: "a vendor-led launch", build: "an internal build", hybrid: "a hybrid model", defer: "deferring the commitment" },
};

function includesAny(text: string, markers: string[]) { return markers.some((marker) => text.includes(marker)); }
function countGroups(text: string) { return Object.values(markerGroups).filter((markers) => includesAny(text, markers)).length; }
function clamp(value: number) { return Number(Math.max(0, Math.min(1, value)).toFixed(2)); }

function fallbackChallenge(input: CaseChallengeInput): CaseChallenge {
  const text = `${input.rationale} ${input.primaryRisk}`.toLowerCase();
  const hasEconomics = includesAny(text, markerGroups.economics);
  const hasSpeed = includesAny(text, markerGroups.speed);
  const hasBoundary = includesAny(text, markerGroups.reversibility);
  const hasQuality = includesAny(text, markerGroups.quality);
  const type = input.decision === "vendor" && !hasEconomics ? "usageEconomics"
    : input.decision === "build" && !hasSpeed ? "speedWindow"
      : input.decision === "hybrid" && !hasBoundary ? "hybridBoundary"
        : !hasQuality ? "qualityThreshold" : "usageEconomics";
  const prompts = {
    "es-CL": {
      usageEconomics: "Tu recomendación usa el promedio del piloto. ¿Qué harías si los usuarios intensivos costaran más que el precio del add-on?",
      speedWindow: "Tu recomendación protege capacidad futura. ¿Qué aprendizaje, ingreso o posición competitiva justifica perder siete meses?",
      hybridBoundary: "Llamas ‘híbrido’ al camino elegido. ¿Qué capa debe poseer NexoDesk para que no sea simplemente dependencia del proveedor con otro nombre?",
      qualityThreshold: "Tu tesis asume que 88% de aceptación representa al mercado objetivo. ¿Qué umbral de calidad exigirías por segmento antes de escalar?",
    },
    en: {
      usageEconomics: "Your recommendation relies on the pilot average. What would you do if intensive users cost more than the add-on price?",
      speedWindow: "Your recommendation protects future capability. What learning, revenue or competitive position justifies giving up seven months?",
      hybridBoundary: "You call the chosen path ‘hybrid’. Which layer must NexoDesk own so this is not vendor dependence by another name?",
      qualityThreshold: "Your thesis assumes 88% acceptance represents the target market. What quality threshold would you require by segment before scaling?",
    },
  };
  const newInformationId = type === "usageEconomics" ? "usageShock" : type === "speedWindow" ? "competitorWindow" : type === "hybridBoundary" ? "portabilityTest" : "qualityGap";
  return caseChallengeSchema.parse({ type, prompt: { "es-CL": prompts["es-CL"][type], en: prompts.en[type] }, targetedAssumption: type, newInformationId, evaluatorVersion: "deterministic-case-challenge-v1" });
}

function fallbackEvaluation(input: CaseEvaluationInput): CaseEvaluation {
  const allText = `${input.rationale} ${input.primaryRisk} ${input.challengeResponse} ${input.revisedRationale} ${input.recommendation} ${input.reviewTrigger}`.toLowerCase();
  const factSignals = ["8.000", "8000", "45", "82", "62", "18%", "88", "12", "7,80", "7.80", "38", "65", "120", "180", "900", "3,2", "3.2", "13,40", "13.40", "71"].filter((marker) => allText.includes(marker)).length;
  const groups = countGroups(allText);
  const tradeoff = includesAny(allText, [" but ", " however", "although", "trade-off", "tradeoff", " pero ", "aunque", "sin embargo", "a cambio"]);
  const conditional = includesAny(allText, [" if ", " unless", "when ", "threshold", " si ", "cuando ", "umbral", "revis"]);
  const changed = input.decision !== input.finalDecision;
  const challengeIntegrated = input.challengeResponse.length >= 70 && input.revisedRationale.length >= 90;
  const economics = includesAny(allText, markerGroups.economics);
  const strategy = includesAny(allText, markerGroups.strategy);
  const quality = includesAny(allText, markerGroups.quality);
  const boundary = includesAny(allText, markerGroups.reversibility);
  const reason = (dimension: keyof typeof feedback.en.reasons) => ({ "es-CL": feedback["es-CL"].reasons[dimension], en: feedback.en.reasons[dimension] });
  const dimensions = {
    problemDiagnosis: { score: clamp(0.34 + groups * 0.07 + (strategy ? 0.13 : 0) + (economics ? 0.12 : 0)), reason: reason("problemDiagnosis") },
    evidenceUse: { score: clamp(0.28 + input.citedEvidence.length * 0.09 + Math.min(0.3, factSignals * 0.055)), reason: reason("evidenceUse") },
    strategicReasoning: { score: clamp(0.32 + (strategy ? 0.2 : 0) + (tradeoff ? 0.18 : 0) + (boundary ? 0.12 : 0) + (quality ? 0.08 : 0)), reason: reason("strategicReasoning") },
    decisionCoherence: { score: clamp(0.4 + (tradeoff ? 0.17 : 0) + (conditional ? 0.17 : 0) + (input.primaryRisk.length >= 35 ? 0.1 : 0) + (input.recommendation.length >= 100 ? 0.08 : 0)), reason: reason("decisionCoherence") },
    adaptability: { score: clamp(0.38 + (challengeIntegrated ? 0.25 : 0) + (conditional ? 0.14 : 0) + (tradeoff ? 0.1 : 0) + (changed ? 0.04 : 0.04)), reason: reason("adaptability") },
    communication: { score: clamp(0.35 + (input.recommendation.length >= 120 ? 0.22 : 0.1) + (input.reviewTrigger.length >= 45 ? 0.18 : 0) + (tradeoff ? 0.12 : 0)), reason: reason("communication") },
    financialReasoning: { score: clamp(0.27 + (economics ? 0.28 : 0) + Math.min(0.25, factSignals * 0.05) + (conditional ? 0.1 : 0)), reason: reason("financialReasoning") },
  };
  const dimensionEntries = Object.entries(dimensions) as [keyof typeof dimensions, { score: number; reason: { "es-CL": string; en: string } }][];
  const sorted = [...dimensionEntries].sort((a, b) => b[1].score - a[1].score);
  const strongestKey = sorted[0][0];
  const weakestKey = sorted.at(-1)![0];
  const strengthKey = strongestKey === "financialReasoning" ? "economics" : strongestKey === "evidenceUse" ? "evidence" : strongestKey === "adaptability" ? "adaptability" : "coherence";
  const improvementKey = weakestKey === "financialReasoning" ? "economics" : weakestKey === "evidenceUse" ? "evidence" : !boundary ? "boundary" : !quality ? "quality" : "trigger";
  const strength = { "es-CL": feedback["es-CL"].strengths[strengthKey], en: feedback.en.strengths[strengthKey] };
  const improvement = { "es-CL": feedback["es-CL"].improvements[improvementKey], en: feedback.en.improvements[improvementKey] };
  const overallPerformance = clamp(dimensionEntries.reduce((sum, [, value]) => sum + value.score, 0) / dimensionEntries.length);
  return caseEvaluationSchema.parse({
    dimensions,
    strength,
    improvement,
    trajectory: {
      "es-CL": feedback["es-CL"].trajectory(decisionNames["es-CL"][input.decision], decisionNames["es-CL"][input.finalDecision]),
      en: feedback.en.trajectory(decisionNames.en[input.decision], decisionNames.en[input.finalDecision]),
    },
    overallPerformance,
    skillEvidence: [
      { skillId: "ai-inference-economics", performance: clamp((dimensions.financialReasoning.score + dimensions.evidenceUse.score) / 2), dimensions: ["financialReasoning", "evidenceUse"] },
      { skillId: "ai-pricing", performance: clamp((dimensions.financialReasoning.score + dimensions.strategicReasoning.score) / 2), dimensions: ["financialReasoning", "strategicReasoning"] },
      { skillId: "economics.unit-economics", performance: dimensions.financialReasoning.score, dimensions: ["financialReasoning"] },
      { skillId: "ai.build-vs-buy", performance: clamp((dimensions.decisionCoherence.score + dimensions.strategicReasoning.score) / 2), dimensions: ["decisionCoherence", "strategicReasoning"] },
      { skillId: "ai-cost-quality", performance: clamp((dimensions.problemDiagnosis.score + dimensions.evidenceUse.score) / 2), dimensions: ["problemDiagnosis", "evidenceUse"] },
    ],
    evaluatorVersion: "deterministic-ai-copilot-economics-v1",
  });
}

export async function challengeCaseDecision(input: CaseChallengeInput, adapter?: CaseAIAdapter) {
  if (adapter) {
    try { return caseChallengeSchema.parse(await adapter.challengeCaseDecision(input)); } catch { /* deterministic fallback */ }
  }
  return fallbackChallenge(input);
}

export async function evaluateCaseDecision(input: CaseEvaluationInput, adapter?: CaseAIAdapter) {
  if (adapter) {
    try { return caseEvaluationSchema.parse(await adapter.evaluateCaseDecision(input)); } catch { /* deterministic fallback */ }
  }
  return fallbackEvaluation(input);
}

export function getCaseNewInformation(id: string) { return aiCopilotEconomicsCase.newInformation[id]; }
