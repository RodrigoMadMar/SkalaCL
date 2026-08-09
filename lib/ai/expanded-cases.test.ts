import { describe, expect, it } from "vitest";
import { expandedCases } from "@/content/cases/expanded";
import { challengeExpandedCase, evaluateExpandedCase } from "./expanded-cases";

describe("expanded case AI fallback", () => {
  it.each(expandedCases)("creates a bounded challenge and five evidence results for $definition.slug", async (config) => {
    const base = { config, locale: "es-CL" as const, decision: "hybrid" as const, rationale: "Segmentaría la respuesta porque el valor y el costo cambian por cliente, pero vigilaría el riesgo de ejecución.", citedEvidence: config.definition.sections.slice(0, 3).map((item) => item.id), primaryRisk: "El principal riesgo es asumir una ventaja que todavía no está comprobada." };
    const challenge = await challengeExpandedCase(base);
    expect(config.definition.newInformation[challenge.newInformationId]).toBeTruthy();
    expect(challenge.prompt.en).not.toBe(challenge.prompt["es-CL"]);
    const evaluation = await evaluateExpandedCase({ ...base, challengeResponse: "Defendería la tesis sólo si el mecanismo sobrevive la nueva condición y fijaría un umbral.", finalDecision: "hybrid", revisedRationale: "La nueva evidencia cambia el riesgo, aunque no elimina el mecanismo. Mantengo la decisión con alcance limitado y revisión.", recommendation: "Recomiendo una respuesta segmentada porque protege el valor y permite aprender sin comprometer toda la economía; aceptamos complejidad operativa temporal.", reviewTrigger: "Revisaremos la decisión si retención, margen o adopción cruzan el umbral acordado en dos cohortes." });
    expect(evaluation.skillEvidence).toHaveLength(5);
    expect(evaluation.overallPerformance).toBeGreaterThan(0.4);
  });
});
