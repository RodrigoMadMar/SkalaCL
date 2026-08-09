import { z } from "zod";
import type { Locale } from "@/i18n/config";

const dimensions = ["economicFraming", "marginalReasoning", "elasticity", "incentives", "marketStructure", "strategicInteraction", "decisionCoherence", "adaptability"] as const;
const evaluationSchema = z.object({ dimensions: z.record(z.enum(dimensions), z.number().min(0).max(1)), overallPerformance: z.number().min(0).max(1), strength: z.object({ "es-CL": z.string(), en: z.string() }), improvement: z.object({ "es-CL": z.string(), en: z.string() }), evaluatorVersion: z.string() });
export type SurviaEvaluation = z.infer<typeof evaluationSchema>;
export type SurviaEvaluationInput = { locale: Locale; initialDecision: number; finalDecision: number; economicsResponse: string; initialRationale: string; competitorResponse: string; incentiveResponse: string; finalRecommendation: string; uncertainty: string };
export interface SurviaAIAdapter { evaluate(input: SurviaEvaluationInput): Promise<unknown>; }
const clamp = (value: number) => Number(Math.min(1, Math.max(0, value)).toFixed(2));
const includes = (text: string, markers: string[]) => markers.some((marker) => text.includes(marker));

export function fallbackSurviaEvaluation(input: SurviaEvaluationInput): SurviaEvaluation {
  const text = `${input.economicsResponse} ${input.initialRationale} ${input.competitorResponse} ${input.incentiveResponse} ${input.finalRecommendation} ${input.uncertainty}`.toLowerCase();
  const decisionChanged = input.initialDecision !== input.finalDecision;
  const scores = {
    economicFraming: clamp(.38 + (includes(text, ["demand", "demanda", "capacity", "capacidad", "price response", "respuesta al precio"]) ? .32 : 0) + (input.economicsResponse.length > 120 ? .12 : 0)),
    marginalReasoning: clamp(.34 + (includes(text, ["marginal", "incremental", "asiento", "seat", "salida", "departure"]) ? .4 : 0)),
    elasticity: clamp(.34 + (includes(text, ["elastic", "segment", "flexible", "sustitut", "substitut"]) ? .4 : 0)),
    incentives: clamp(.35 + (includes(text, ["bonus", "bono", "volume", "volumen", "contribution", "contribución", "metric", "métrica"]) ? .42 : 0)),
    marketStructure: clamp(.35 + (includes(text, ["capacity", "capacidad", "entrant", "entrante", "peak", "punta", "barrier", "barrera"]) ? .38 : 0)),
    strategicInteraction: clamp(.34 + (includes(text, ["response", "respuesta", "match", "igual", "rival", "competidor"]) ? .4 : 0)),
    decisionCoherence: clamp(.4 + (input.finalRecommendation.length > 180 ? .2 : .08) + (includes(text, ["if ", " si ", "unless", "umbral", "threshold", "revis"]) ? .22 : 0)),
    adaptability: clamp(.42 + (input.competitorResponse.length > 100 ? .18 : 0) + (input.incentiveResponse.length > 100 ? .18 : 0) + (decisionChanged ? .04 : .04)),
  };
  const entries = Object.entries(scores) as [keyof typeof scores, number][]; const overallPerformance = clamp(entries.reduce((sum, [, score]) => sum + score, 0) / entries.length); const weakest = [...entries].sort((a, b) => a[1] - b[1])[0][0];
  const dimensionLabels: Record<keyof typeof scores, { "es-CL": string; en: string }> = {
    economicFraming: { "es-CL": "el marco económico", en: "economic framing" }, marginalReasoning: { "es-CL": "el razonamiento marginal", en: "marginal reasoning" }, elasticity: { "es-CL": "la elasticidad", en: "elasticity" }, incentives: { "es-CL": "los incentivos", en: "incentives" }, marketStructure: { "es-CL": "la estructura de mercado", en: "market structure" }, strategicInteraction: { "es-CL": "la interacción estratégica", en: "strategic interaction" }, decisionCoherence: { "es-CL": "la coherencia de la decisión", en: "decision coherence" }, adaptability: { "es-CL": "la adaptabilidad", en: "adaptability" },
  };
  return evaluationSchema.parse({ dimensions: scores, overallPerformance, strength: { "es-CL": "La recomendación integra señales de mercado y deja visible el mecanismo que sostiene la decisión.", en: "The recommendation integrates market signals and makes the mechanism supporting the decision visible." }, improvement: { "es-CL": `El próximo foco es ${dimensionLabels[weakest]["es-CL"]}: conviértelo en un supuesto o umbral observable.`, en: `The next focus is ${dimensionLabels[weakest].en}: turn it into an observable assumption or threshold.` }, evaluatorVersion: "deterministic-survia-v1" });
}

export async function evaluateSurvia(input: SurviaEvaluationInput, adapter?: SurviaAIAdapter) {
  if (adapter) { try { return evaluationSchema.parse(await adapter.evaluate(input)); } catch { /* deterministic fallback */ } }
  return fallbackSurviaEvaluation(input);
}
