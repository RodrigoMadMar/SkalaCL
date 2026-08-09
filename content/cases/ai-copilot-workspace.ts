import type { Locale } from "@/i18n/config";
import type { CaseStage } from "@/lib/cases/schemas";

const l = (es: string, en: string) => ({ "es-CL": es, en });

export const aiCopilotEvidenceViews = {
  brief: {
    kind: "decision-frame" as const,
    caption: l("La decisión está limitada por tres fuerzas simultáneas.", "The decision is constrained by three forces at once."),
    items: [
      { label: l("Ventana", "Window"), value: l("Próximo trimestre", "Next quarter"), note: l("Presión de tiempo", "Time pressure") },
      { label: l("Economía", "Economics"), value: l("Costo variable", "Variable cost"), note: l("Escala con el uso", "Scales with usage") },
      { label: l("Control", "Control"), value: l("Arquitectura abierta", "Open architecture"), note: l("Decisión pendiente", "Unresolved choice") },
    ],
  },
  pilot: {
    kind: "signal-bars" as const,
    caption: l("El piloto muestra valor, pero todavía no prueba una economía sostenible.", "The pilot shows value, but does not yet prove sustainable economics."),
    items: [
      { label: l("Uso semanal", "Weekly usage"), value: "62%", magnitude: 62 },
      { label: l("Reducción de tiempo", "Handling-time reduction"), value: "18%", magnitude: 18 },
      { label: l("Aceptación", "Acceptance"), value: "88%", magnitude: 88 },
    ],
  },
  economics: {
    kind: "unit-economics" as const,
    caption: l("Cada US$12 de ingreso deja US$4,20 antes de soporte.", "Each US$12 of revenue leaves US$4.20 before support."),
    items: [
      { label: l("Precio propuesto", "Proposed price"), value: "US$12,00", magnitude: 100, tone: "neutral" as const },
      { label: l("Costo esperado", "Expected cost"), value: "−US$7,80", magnitude: 65, tone: "intelligence" as const },
      { label: l("Contribución actual", "Current contribution"), value: "US$4,20", magnitude: 35, tone: "signal" as const },
      { label: l("Contribución objetivo", "Target contribution"), value: "US$7,80", magnitude: 65, tone: "target" as const },
    ],
  },
  options: {
    kind: "option-system" as const,
    caption: l("Ninguna alternativa domina en velocidad, control y capital al mismo tiempo.", "No option dominates speed, control and capital at the same time."),
    columns: [
      { title: l("Comprar", "Buy"), facts: [l("8 semanas", "8 weeks"), l("US$120 mil de implementación", "US$120k implementation"), l("Mínimo anual: US$180 mil", "US$180k annual minimum")] },
      { title: l("Construir", "Build"), facts: [l("7 meses", "7 months"), l("US$900 mil el primer año", "US$900k in year one"), l("Costo objetivo: US$4,10", "Target cost: US$4.10")] },
      { title: l("Combinar", "Hybrid"), facts: [l("Inferencia externa", "External inference"), l("Evaluación propia", "Owned evaluation"), l("Experiencia bajo control", "Owned experience")] },
    ],
  },
  inbox: {
    kind: "stakeholder-map" as const,
    caption: l("El comité no discrepa sobre el objetivo; discrepa sobre qué riesgo aceptar.", "The committee agrees on the objective, but not on which risk to accept."),
    items: [
      { label: l("Ventas", "Sales"), value: l("Velocidad", "Speed"), note: l("Ventana de 10 semanas", "10-week window") },
      { label: l("Finanzas", "Finance"), value: l("Margen", "Margin"), note: l("Objetivo de 65%", "65% target") },
      { label: l("Legal", "Legal"), value: l("Portabilidad", "Portability"), note: l("Condición de aprobación", "Approval condition") },
      { label: l("Operaciones", "Operations"), value: l("Variabilidad", "Variability"), note: l("El promedio puede ocultar riesgo", "The average may hide risk") },
    ],
  },
} as const;

const stageLabels: Record<CaseStage, { "es-CL": string; en: string }> = {
  intro: l("Entrada", "Enter"),
  evidence: l("Evidencia", "Evidence"),
  initial_decision: l("Tesis", "Thesis"),
  challenge: l("Desafío", "Challenge"),
  new_information: l("Nueva señal", "New signal"),
  revision: l("Revisión", "Revision"),
  final_recommendation: l("Recomendación", "Recommendation"),
  result: l("Evaluación", "Evaluation"),
};

const workspaceCopy = {
  "es-CL": {
    stageLabels: Object.fromEntries(Object.entries(stageLabels).map(([key, value]) => [key, value["es-CL"]])) as Record<CaseStage, string>,
    visualLabel: "LECTURA DEL SISTEMA",
    pin: "Incorporar a la tesis",
    unpin: "Quitar de la tesis",
    pinned: "INCORPORADA",
    railEyebrow: "MESA DE DECISIÓN",
    railTitle: "Tesis de trabajo",
    thesisEmpty: "Aún no has fijado una postura. Reúne señales que puedan sostener una decisión.",
    citedEvidence: "Evidencia incorporada",
    noCitations: "Ninguna fuente incorporada todavía.",
    acceptedRisk: "Riesgo aceptado",
    riskEmpty: "Todavía no has declarado el riesgo principal.",
    criticalAssumption: "Supuesto bajo presión",
    assumptionEmpty: "Skala tensionará un supuesto después de tu primera decisión.",
    readiness: "Preparación para decidir",
    readinessCount: "{count} / 3 condiciones",
    sourceCheck: "4 fuentes revisadas",
    citationCheck: "2 fuentes incorporadas",
    decisionCheck: "Postura formulada",
    readinessBody: "No se trata de leer todo: debes conectar fuentes distintas con una postura defendible.",
    initialThesis: "Tesis inicial",
    currentPosition: "Posición actual",
    decisionPending: "Sin decisión",
    trajectory: "Trayectoria de decisión",
    challengeSignal: "Intervención de Skala",
    newSignal: "Nueva señal material",
    changed: "Cambió",
    maintained: "Se mantiene",
  },
  en: {
    stageLabels: Object.fromEntries(Object.entries(stageLabels).map(([key, value]) => [key, value.en])) as Record<CaseStage, string>,
    visualLabel: "SYSTEM READING",
    pin: "Add to thesis",
    unpin: "Remove from thesis",
    pinned: "IN THESIS",
    railEyebrow: "DECISION DESK",
    railTitle: "Working thesis",
    thesisEmpty: "You have not set a position yet. Gather signals that can support a decision.",
    citedEvidence: "Evidence in the thesis",
    noCitations: "No source has been incorporated yet.",
    acceptedRisk: "Accepted risk",
    riskEmpty: "You have not declared the primary risk yet.",
    criticalAssumption: "Assumption under pressure",
    assumptionEmpty: "Skala will pressure an assumption after your first decision.",
    readiness: "Decision readiness",
    readinessCount: "{count} / 3 conditions",
    sourceCheck: "4 sources reviewed",
    citationCheck: "2 sources incorporated",
    decisionCheck: "Position formed",
    readinessBody: "The goal is not to read everything. Connect different sources to a defensible position.",
    initialThesis: "Initial thesis",
    currentPosition: "Current position",
    decisionPending: "No decision",
    trajectory: "Decision trajectory",
    challengeSignal: "Skala intervention",
    newSignal: "Material new signal",
    changed: "Changed",
    maintained: "Maintained",
  },
};

export function getAICopilotWorkspaceCopy(locale: Locale) { return workspaceCopy[locale]; }
