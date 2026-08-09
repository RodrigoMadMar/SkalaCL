import type { Locale } from "@/i18n/config";
import { caseDefinitionSchema, type CaseDecision, type CaseDimension } from "@/lib/cases/schemas";

const l = (es: string, en: string) => ({ "es-CL": es, en });

export const aiCopilotEconomicsCase = caseDefinitionSchema.parse({
  id: "case.ai-copilot-economics",
  slug: "ai-copilot-economics",
  version: "0.1",
  estimatedMinutes: 18,
  skills: ["ai-inference-economics", "ai-pricing", "economics.unit-economics", "ai.build-vs-buy", "ai-cost-quality"],
  rubricId: "case.ai-copilot-economics.v1",
  title: l("La economía del copiloto", "The economics of the copilot"),
  subtitle: l("Cuando más uso no significa automáticamente un mejor negocio.", "When more usage does not automatically mean a better business."),
  context: {
    company: "NexoDesk",
    role: l("Lideras la estrategia de producto y debes recomendar al comité ejecutivo cómo lanzar el copiloto de IA.", "You lead product strategy and must recommend how to launch the AI copilot to the executive committee."),
    premise: l("El piloto genera valor real, pero cada interacción tiene costo variable. Debes elegir una arquitectura de producto, precio y capacidad antes de comprometer el lanzamiento.", "The pilot creates real value, but every interaction carries variable cost. You must choose a product, pricing and capability architecture before committing to launch."),
  },
  sections: [
    {
      id: "brief", label: l("Brief", "Brief"), title: l("La decisión", "The decision"),
      body: l("NexoDesk vende software de atención al cliente a empresas medianas. El comité quiere anunciar un copiloto en el próximo trimestre, pero todavía no define si comprar la capa de IA, construirla ni cómo cobrarla.", "NexoDesk sells customer-support software to mid-market companies. The committee wants to announce a copilot next quarter, but has not decided whether to buy the AI layer, build it, or how to charge for it."),
      metrics: [
        { label: l("Base instalada", "Installed base"), value: "8.000", note: l("asientos pagados", "paid seats") },
        { label: l("Precio actual", "Current price"), value: "US$45", note: l("por asiento/mes", "per seat/month") },
        { label: l("Margen bruto", "Gross margin"), value: "82%", note: l("producto actual", "current product") },
      ],
    },
    {
      id: "pilot", label: l("Piloto", "Pilot"), title: l("Valor observado", "Observed value"),
      body: l("El piloto cubrió 420 agentes durante seis semanas. La adopción fue voluntaria y la calidad se midió por aceptación de sugerencias, no sólo por precisión técnica.", "The pilot covered 420 agents for six weeks. Adoption was voluntary and quality was measured through suggestion acceptance, not technical accuracy alone."),
      metrics: [
        { label: l("Uso semanal", "Weekly usage"), value: "62%", note: l("de agentes expuestos", "of exposed agents") },
        { label: l("Tiempo de atención", "Handling time"), value: "−18%", note: l("promedio del piloto", "pilot average") },
        { label: l("Aceptación", "Acceptance"), value: "88%", note: l("sugerencias utilizadas", "suggestions used") },
      ],
    },
    {
      id: "economics", label: l("Economía", "Economics"), title: l("Ingreso y costo no escalan igual", "Revenue and cost scale differently"),
      body: l("Investigación comercial sugiere un add-on de US$12 por asiento activo. El proveedor cobra principalmente por uso y los agentes intensivos consumen cerca de cuatro veces el promedio.", "Commercial research supports a US$12 add-on per active seat. The vendor charges primarily by usage and intensive agents consume nearly four times the average."),
      metrics: [
        { label: l("Disposición a pagar", "Willingness to pay"), value: "38%", note: l("de cuentas entrevistadas", "of interviewed accounts") },
        { label: l("Costo esperado", "Expected cost"), value: "US$7,80", note: l("por usuario activo/mes", "per active user/month") },
        { label: l("Margen add-on", "Add-on margin"), value: "35%", note: l("antes de soporte", "before support") },
      ],
    },
    {
      id: "options", label: l("Opciones", "Options"), title: l("Tres caminos plausibles", "Three plausible paths"),
      body: l("Comprar permite lanzar en ocho semanas con US$120 mil de implementación y un mínimo anual de US$180 mil. Construir requiere siete meses y US$900 mil el primer año, con un costo objetivo de US$4,10 por usuario. Un híbrido puede comprar inferencia y conservar evaluación, routing y experiencia de producto.", "Buying enables an eight-week launch with US$120k implementation and a US$180k annual minimum. Building requires seven months and US$900k in year one, with a target cost of US$4.10 per user. A hybrid can buy inference while owning evaluation, routing and product experience."),
      metrics: [
        { label: l("Comprar", "Buy"), value: "8 sem.", note: l("lanzamiento estimado", "estimated launch") },
        { label: l("Construir", "Build"), value: "7 meses", note: l("hasta producción", "to production") },
        { label: l("Equipo disponible", "Available team"), value: "4", note: l("backend; sin ML Ops", "backend; no ML Ops") },
      ],
    },
    {
      id: "inbox", label: l("Bandeja", "Inbox"), title: l("Lo que tensiona el comité", "What the committee is testing"),
      body: l("Ventas quiere anunciar antes que un competidor. Finanzas exige una ruta a 65% de margen para el add-on. Legal acepta al proveedor si datos, evaluaciones e historial de prompts son portables. Operaciones teme que el promedio del piloto oculte segmentos costosos.", "Sales wants to announce before a competitor. Finance requires a path to 65% margin for the add-on. Legal accepts the vendor if data, evaluations and prompt history remain portable. Operations fears the pilot average hides expensive segments."),
      metrics: [
        { label: l("Ventas", "Sales"), value: "10 sem.", note: l("ventana competitiva", "competitive window") },
        { label: l("Finanzas", "Finance"), value: "65%", note: l("margen objetivo", "target margin") },
        { label: l("Legal", "Legal"), value: "Portable", note: l("condición de aprobación", "approval condition") },
      ],
    },
  ],
  newInformation: {
    usageShock: { title: l("El promedio ocultaba una cola costosa", "The average hid an expensive tail"), body: l("Los agentes del decil superior consumen 3,2× más de lo proyectado. Su costo estimado sube a US$13,40 al mes: supera el precio propuesto de US$12.", "Agents in the top usage decile consume 3.2× more than projected. Their estimated monthly cost rises to US$13.40, above the proposed US$12 price."), implication: l("Debes decidir si cambias precio, límites de uso, routing o segmento objetivo.", "You must decide whether to change pricing, usage limits, routing or the target segment.") },
    competitorWindow: { title: l("La ventana se acorta", "The window narrows"), body: l("Un competidor anunció un copiloto para dentro de diez semanas y catorce cuentas enterprise preguntaron por disponibilidad este trimestre.", "A competitor announced a copilot for ten weeks from now and fourteen enterprise accounts asked about availability this quarter."), implication: l("Debes valorar explícitamente qué aprendizaje o ingreso se pierde al esperar.", "You must explicitly value what learning or revenue is lost by waiting.") },
    qualityGap: { title: l("La calidad promedio no era uniforme", "Average quality was not uniform"), body: l("La aceptación baja de 88% a 71% en consultas complejas y multilingües, precisamente las de clientes con mayor disposición a pagar.", "Acceptance falls from 88% to 71% for complex and multilingual queries, precisely among customers with the highest willingness to pay."), implication: l("Debes conectar umbrales de calidad con propuesta de valor, costo y alcance del lanzamiento.", "You must connect quality thresholds to value proposition, cost and launch scope.") },
    portabilityTest: { title: l("La portabilidad tiene una frontera", "Portability has a boundary"), body: l("El proveedor exporta datos, pero sus evaluaciones y reglas de routing no se transfieren. Recrearlas tomaría entre tres y cuatro meses.", "The vendor exports data, but its evaluations and routing rules do not transfer. Recreating them would take three to four months."), implication: l("Un modelo híbrido sólo es reversible si defines qué activos permanecerán bajo control de NexoDesk.", "A hybrid model is reversible only if you define which assets remain under NexoDesk's control.") },
  },
  reviewStatus: "validated",
});

const dimensionOrder: CaseDimension[] = ["problemDiagnosis", "evidenceUse", "strategicReasoning", "decisionCoherence", "adaptability", "communication", "financialReasoning"];

const copy = {
  "es-CL": {
    meta: { back: "← Volver a Casos", caseCode: "CASO 002", progress: "PROGRESO GUARDADO", stage: "ETAPA", restart: "Reiniciar caso", minutesShort: "MIN" },
    intro: { eyebrow: "LABORATORIO DE DECISIONES", youAre: "TÚ ERES", enter: "Entrar al caso", synthetic: "Caso sintético · Los datos pertenecen a esta simulación" },
    evidence: { eyebrow: "EVIDENCIA", title: "Construye tu lectura antes de decidir", body: "Revisa las cinco fuentes. No todas tienen el mismo peso y algunas tensiones no se resuelven con una sola métrica.", viewed: "REVISADO", unread: "POR REVISAR", continue: "Formar una tesis", requirement: "Revisa al menos cuatro fuentes para continuar." },
    initial: { eyebrow: "DECISIÓN INICIAL", title: "¿Qué recomendarías hoy?", body: "Elige un camino defendible con la evidencia disponible. Todavía podrás revisarlo.", prompt: "Recomendación inicial", rationale: "Explica tu tesis en 3–5 líneas", rationalePlaceholder: "Conecta evidencia, trade-offs y el principal supuesto…", evidencePrompt: "Selecciona al menos dos evidencias que sostienen tu tesis", risk: "¿Cuál es el principal riesgo que aceptas?", riskPlaceholder: "El riesgo más importante es…", submit: "Enviar decisión al comité" },
    challenge: { eyebrow: "DESAFÍO DE SKALA", title: "Tu tesis tiene un supuesto que merece presión", context: "Skala construyó esta pregunta desde tu propia recomendación.", placeholder: "Responde en 2–4 líneas. Puedes defender, limitar o revisar tu tesis…", submit: "Responder al desafío" },
    newInfo: { eyebrow: "NUEVA INFORMACIÓN", title: "La decisión cambió de contexto", notCorrection: "Esto no convierte tu decisión anterior en incorrecta. Evalúa si cambia el trade-off.", continue: "Revisar mi posición" },
    revision: { eyebrow: "REVISIÓN", title: "¿Mantienes, ajustas o cambias?", body: "La adaptabilidad no consiste en cambiar siempre, sino en incorporar información material sin perder coherencia.", rationale: "Explica qué cambió —o por qué no cambia— en tu razonamiento", placeholder: "La nueva información afecta… Mantengo/cambio porque…", submit: "Fijar decisión final" },
    final: { eyebrow: "RECOMENDACIÓN FINAL", title: "Escribe para el comité", body: "Cierra con una recomendación ejecutiva y una condición observable que obligaría a revisarla.", recommendation: "Recomendación ejecutiva", recommendationPlaceholder: "Recomiendo… porque… El trade-off que aceptamos es…", trigger: "Condición de revisión", triggerPlaceholder: "Revisaremos esta decisión si…", submit: "Evaluar mi razonamiento", evaluating: "Evaluando contra la rúbrica…" },
    result: { eyebrow: "EVALUACIÓN COMPLETA", title: "La calidad está en el razonamiento", overall: "DESEMPEÑO GLOBAL", strength: "FORTALEZA PRINCIPAL", improvement: "PRÓXIMA MEJORA", trajectory: "TRAYECTORIA DE DECISIÓN", evidence: "EVIDENCIA GENERADA", mastery: "CAMBIO EN TU SKALA", before: "Antes", after: "Ahora", distinction: "Completar el caso genera evidencia de aplicación bajo presión. Una sola evidencia no equivale a expertise demostrado.", openGraph: "Ver cambio en Tu Skala", backCases: "Volver a Casos" },
    decisions: { vendor: "Lanzar con proveedor", build: "Construir internamente", hybrid: "Modelo híbrido", defer: "No comprometer el lanzamiento aún" } satisfies Record<CaseDecision, string>,
    dimensions: { problemDiagnosis: "Diagnóstico", evidenceUse: "Uso de evidencia", strategicReasoning: "Razonamiento estratégico", decisionCoherence: "Coherencia", adaptability: "Adaptabilidad", communication: "Comunicación", financialReasoning: "Razonamiento financiero" } satisfies Record<CaseDimension, string>,
    errors: { decision: "Selecciona una recomendación.", rationale: "Desarrolla tu tesis antes de continuar.", evidence: "Selecciona al menos dos evidencias.", risk: "Haz explícito el riesgo que aceptas.", challenge: "Responde al supuesto puesto a prueba.", revision: "Explica cómo procesaste la nueva información.", recommendation: "Escribe una recomendación ejecutiva completa.", trigger: "Define una condición observable de revisión." },
  },
  en: {
    meta: { back: "← Back to Cases", caseCode: "CASE 002", progress: "PROGRESS SAVED", stage: "STAGE", restart: "Restart case", minutesShort: "MIN" },
    intro: { eyebrow: "DECISION LAB", youAre: "YOU ARE", enter: "Enter the case", synthetic: "Synthetic case · All data belongs to this simulation" },
    evidence: { eyebrow: "EVIDENCE", title: "Build your reading before deciding", body: "Review all five sources. They do not carry equal weight and some tensions cannot be resolved with one metric.", viewed: "REVIEWED", unread: "TO REVIEW", continue: "Form a thesis", requirement: "Review at least four sources to continue." },
    initial: { eyebrow: "INITIAL DECISION", title: "What would you recommend today?", body: "Choose a defensible path from the available evidence. You will still be able to revise it.", prompt: "Initial recommendation", rationale: "Explain your thesis in 3–5 lines", rationalePlaceholder: "Connect evidence, trade-offs and the main assumption…", evidencePrompt: "Select at least two evidence sources supporting your thesis", risk: "What is the main risk you accept?", riskPlaceholder: "The most important risk is…", submit: "Send decision to the committee" },
    challenge: { eyebrow: "SKALA CHALLENGE", title: "Your thesis contains an assumption worth pressuring", context: "Skala built this question from your own recommendation.", placeholder: "Answer in 2–4 lines. You may defend, narrow or revise your thesis…", submit: "Answer the challenge" },
    newInfo: { eyebrow: "NEW INFORMATION", title: "The decision context changed", notCorrection: "This does not make your earlier decision wrong. Decide whether it changes the trade-off.", continue: "Review my position" },
    revision: { eyebrow: "REVISION", title: "Do you maintain, adjust or change?", body: "Adaptability is not always changing your mind; it is incorporating material information without losing coherence.", rationale: "Explain what changed —or why it did not— in your reasoning", placeholder: "The new information affects… I maintain/change because…", submit: "Set final decision" },
    final: { eyebrow: "FINAL RECOMMENDATION", title: "Write for the committee", body: "Close with an executive recommendation and an observable condition that would force a review.", recommendation: "Executive recommendation", recommendationPlaceholder: "I recommend… because… The trade-off we accept is…", trigger: "Review condition", triggerPlaceholder: "We will review this decision if…", submit: "Evaluate my reasoning", evaluating: "Evaluating against the rubric…" },
    result: { eyebrow: "EVALUATION COMPLETE", title: "Quality lives in the reasoning", overall: "OVERALL PERFORMANCE", strength: "STRONGEST ASPECT", improvement: "NEXT IMPROVEMENT", trajectory: "DECISION TRAJECTORY", evidence: "EVIDENCE GENERATED", mastery: "YOUR SKALA UPDATE", before: "Before", after: "Now", distinction: "Completing the case creates evidence of application under pressure. A single event is not demonstrated expertise.", openGraph: "See change in Your Skala", backCases: "Back to Cases" },
    decisions: { vendor: "Launch with vendor", build: "Build internally", hybrid: "Hybrid model", defer: "Do not commit to launch yet" } satisfies Record<CaseDecision, string>,
    dimensions: { problemDiagnosis: "Problem diagnosis", evidenceUse: "Evidence use", strategicReasoning: "Strategic reasoning", decisionCoherence: "Decision coherence", adaptability: "Adaptability", communication: "Communication", financialReasoning: "Financial reasoning" } satisfies Record<CaseDimension, string>,
    errors: { decision: "Select a recommendation.", rationale: "Develop your thesis before continuing.", evidence: "Select at least two evidence sources.", risk: "Make the risk you accept explicit.", challenge: "Respond to the assumption under pressure.", revision: "Explain how you processed the new information.", recommendation: "Write a complete executive recommendation.", trigger: "Define an observable review condition." },
  },
};

export const caseDimensionOrder = dimensionOrder;
export function getAICopilotCaseCopy(locale: Locale) { return copy[locale]; }
