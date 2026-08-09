import type { Locale } from "@/i18n/config";
import { referenceSkillSchema, type LearningBlockType, type LearningDecision } from "@/lib/learning/schemas";

export const buildVsBuySkill = referenceSkillSchema.parse({
  id: "ai.build-vs-buy",
  domain: "ai",
  specialization: "ai-strategy",
  title: { "es-CL": "Build vs Buy", en: "Build vs Buy" },
  objective: {
    "es-CL": "Tomar y defender una decisión de construir, comprar o usar un modelo híbrido para una capacidad de IA, ponderando trade-offs explícitos.",
    en: "Make and defend a build, buy or hybrid decision for an AI capability by weighing explicit trade-offs.",
  },
  difficulty: 2,
  estimatedMinutes: 7,
  prerequisites: ["ai.model-landscape", "economics.unit-economics"],
  masteryTargets: ["ai.build-vs-buy", "strategy.strategic-differentiation", "economics.unit-economics"],
  version: "0.1",
  reviewStatus: "validated",
  blocks: [
    { id: "entry", type: "editorial" },
    { id: "diagnostic", type: "think" },
    { id: "reveal", type: "editorial" },
    { id: "field", type: "visual" },
    { id: "contrast", type: "example" },
    { id: "recommendation", type: "open_response" },
    { id: "challenge", type: "ai_challenge" },
    { id: "final-decision", type: "application" },
    { id: "transfer", type: "recall_check" },
    { id: "summary", type: "mastery_summary" },
  ] satisfies { id: string; type: LearningBlockType }[],
});

const sharedScenario = {
  "es-CL": "Una empresa de software B2B quiere un copiloto de soporte con IA para 600 agentes. Un proveedor puede lanzarlo en seis semanas; el equipo interno estima seis meses para alcanzar una calidad base comparable. La dirección cree que los datos de soporte podrían volverse estratégicos.",
  en: "A B2B software company wants an AI support copilot for 600 customer-service agents. A vendor can launch in six weeks; the internal team estimates six months to reach comparable baseline quality. Leadership believes support data may eventually become strategic.",
} satisfies Record<Locale, string>;

const copy = {
  "es-CL": {
    meta: { back: "← Volver a Tu Skala", sequence: "SECUENCIA", save: "Progreso guardado", restart: "Reiniciar sesión" },
    entry: { eyebrow: "AI STRATEGY · 7 MIN", title: "Build vs Buy", body: "Un proveedor puede llevarte a producción en semanas. Construir internamente puede darte más control y diferenciación. La decisión difícil es saber qué vale la pena poseer.", cta: "Comenzar" },
    diagnostic: { eyebrow: "PIENSA ANTES DE VER", scenario: sharedScenario["es-CL"], prompt: "Antes de ver ningún marco: ¿qué decidirías hoy?", reason: "¿Cuál es la razón principal?", placeholder: "Explica la variable que más pesa en tu decisión…", cta: "Guardar mi posición", options: { build: "Construir", buy: "Comprar", hybrid: "Modelo híbrido", defer: "Todavía no decidiría" } },
    reveal: { eyebrow: "MODELO MENTAL", title: "No estás eligiendo tecnología. Estás eligiendo qué capacidad vale la pena poseer.", body: "Build vs Buy cambia cuando separas seis preguntas. Úsalas para estructurar juicio, no como una fórmula automática.", expand: "Selecciona una lente", cta: "Aplicar el modelo", lenses: [
      ["Diferenciación", "¿Poseer esta capacidad crea una ventaja duradera que el cliente percibe o la empresa puede explotar de forma única?"],
      ["Velocidad", "¿Cuánto valor se pierde esperando una construcción interna en vez de desplegar ahora?"],
      ["Economía", "¿Cómo cambian los costos totales con uso, ingeniería, operación y cambio de proveedor?"],
      ["Control", "¿Qué tan críticos son los datos, la confiabilidad, la personalización y la auditabilidad?"],
      ["Capacidad", "¿La organización tiene —o necesita desarrollar— el talento y modelo operativo para poseerla?"],
      ["Reversibilidad", "¿Qué tan difícil sería cambiar de camino por lock-in, portabilidad, arquitectura o capacidad acumulada?"],
    ] },
    field: { eyebrow: "CAMPO DE DECISIÓN", title: "Ubica el escenario", body: "El campo muestra una tendencia, no una respuesta automática.", xAxis: "Madurez de soluciones externas", yAxis: "Diferenciación estratégica", build: "CONSTRUIR", buy: "COMPRAR", hybrid: "HÍBRIDO", firstCta: "Fijar posición", factsTitle: "Ahora incorpora dos hechos", facts: ["El proveedor permite exportar datos y portar modelos.", "El equipo interno no tiene experiencia operando ML en producción."], movePrompt: "¿Moverías tu decisión?", move: "Sí, movería mi posición", keep: "No, la mantendría", cta: "Continuar" },
    contrast: { eyebrow: "CONTRASTE", title: "La frontera importa más que la etiqueta", examples: [
      { label: "A · Comprar la capa commodity", title: "OCR en un flujo interno", body: "Las herramientas externas ya son confiables, la capacidad no es visible para clientes y poseer la infraestructura no crea ventaja." },
      { label: "B · Poseer la capa diferenciadora", title: "Ranking personalizado", body: "Los datos propios y la lógica de decisión afectan directamente conversión, valor para comercios y experiencia del cliente." },
    ], insight: "La arquitectura también puede ser híbrida: comprar infraestructura y construir la capa que realmente diferencia.", cta: "Tomar una decisión" },
    application: { eyebrow: "APLICACIÓN", title: "Recomienda al comité", facts: ["El uso esperado se triplicará si el piloto funciona.", "El proveedor cobra principalmente por uso.", "Legal aprueba los controles actuales del proveedor.", "Cambiar después exige migrar prompts, evaluaciones e integraciones.", "Existe un equipo backend fuerte, pero poca experiencia en ML operations."], prompt: "¿Construyes, compras o propones un modelo híbrido? Defiende tu decisión en 3–5 líneas.", helper: "No menciones las seis variables por obligación. Prioriza las que realmente cambian la decisión.", placeholder: "Recomendación, evidencia y trade-off aceptado…", cta: "Enviar recomendación" },
    challenge: { eyebrow: "DESAFÍO DE SKALA", context: "Skala está tensionando una premisa de tu recomendación.", placeholder: "Responde en 2–4 líneas. Puedes revisar o defender tu decisión…", cta: "Responder al desafío" },
    final: { eyebrow: "DECISIÓN FINAL", title: "Tu decisión final", body: "Puedes mantener tu recomendación o cambiarla. Lo importante es hacer explícito el trade-off que estás aceptando.", prompt: "¿Qué decides ahora?", rationale: "Explicita el trade-off y la condición que te haría revisar esta decisión.", placeholder: "Mantengo o cambio porque… Acepto… Revisaría si…", cta: "Cerrar decisión" },
    recall: { eyebrow: "TRANSFERENCIA", title: "¿Reconoces qué cambió?", prompt: "Una fintech compra una solución externa porque necesita velocidad. Seis meses después, la capacidad empieza a diferenciar directamente la experiencia del cliente y el volumen ya justifica inversión propia. ¿Qué variable cambió más la decisión?", options: ["La diferenciación estratégica y la economía a escala", "El proveedor dejó de ser técnicamente capaz", "Build siempre es mejor después del piloto", "La velocidad dejó de importar por completo"], cta: "Registrar respuesta" },
    summary: { eyebrow: "SKILL COMPLETADA", updated: "Tu Skala se actualizó", application: "APLICACIÓN", adaptability: "ADAPTABILIDAD", recall: "TRANSFERENCIA", mastery: "BUILD VS BUY", evidence: "2 evidencias agregadas", connection: "1 conexión fortalecida", completionNote: "Completar registra actividad. El dominio crece sólo desde evidencia evaluada y aún no implica expertise comprobado.", cta: "Ver cambio en Tu Skala", next: "Siguiente paso sugerido" },
    validation: { choose: "Selecciona una decisión.", reason: "Explica brevemente tu razón principal.", response: "Desarrolla tu razonamiento antes de continuar.", recall: "Selecciona una respuesta." },
  },
  en: {
    meta: { back: "← Back to Your Skala", sequence: "SEQUENCE", save: "Progress saved", restart: "Restart session" },
    entry: { eyebrow: "AI STRATEGY · 7 MIN", title: "Build vs Buy", body: "A vendor can get you into production in weeks. Building internally can create more control and differentiation. The hard decision is knowing what is worth owning.", cta: "Start" },
    diagnostic: { eyebrow: "THINK BEFORE REVEAL", scenario: sharedScenario.en, prompt: "Before seeing any framework: what would you decide today?", reason: "What is the main reason?", placeholder: "Explain which variable carries the most weight…", cta: "Save my position", options: { build: "Build", buy: "Buy", hybrid: "Hybrid", defer: "I would not decide yet" } },
    reveal: { eyebrow: "MENTAL MODEL", title: "You are not choosing technology. You are choosing which capability is worth owning.", body: "Build vs Buy becomes clearer when you separate six questions. Use them to structure judgment, not as an automatic formula.", expand: "Select a lens", cta: "Apply the model", lenses: [
      ["Differentiation", "Would owning this capability create a durable advantage customers perceive or the company can uniquely exploit?"],
      ["Speed", "How much value is lost by waiting to build instead of deploying now?"],
      ["Economics", "How do total costs behave across usage, engineering, operations and switching?"],
      ["Control", "How critical are data boundaries, reliability, customization and auditability?"],
      ["Capability", "Does the organization have —or strategically need— the talent and operating model to own it?"],
      ["Reversibility", "How difficult would it be to change course due to lock-in, portability, architecture or accumulated capability?"],
    ] },
    field: { eyebrow: "DECISION FIELD", title: "Place the scenario", body: "The field shows a tendency, not an automatic answer.", xAxis: "External solution maturity", yAxis: "Strategic differentiation", build: "BUILD", buy: "BUY", hybrid: "HYBRID", firstCta: "Set position", factsTitle: "Now add two facts", facts: ["The vendor supports data export and model portability.", "The internal team has no production ML operating experience."], movePrompt: "Would you move your decision?", move: "Yes, I would move it", keep: "No, I would keep it", cta: "Continue" },
    contrast: { eyebrow: "CONTRAST", title: "The boundary matters more than the label", examples: [
      { label: "A · Buy the commodity layer", title: "OCR in an internal workflow", body: "External tools already work reliably, the capability is not customer-visible and owning the infrastructure creates no advantage." },
      { label: "B · Own the differentiating layer", title: "Personalized ranking", body: "Proprietary data and decision logic directly shape conversion, merchant value and customer experience." },
    ], insight: "Architecture can also be hybrid: buy infrastructure and build the layer that actually differentiates.", cta: "Make a decision" },
    application: { eyebrow: "APPLICATION", title: "Recommend to the committee", facts: ["Expected usage will triple if the pilot succeeds.", "The vendor charges primarily by usage.", "Legal approves the vendor's current controls.", "Switching later requires migrating prompts, evaluations and integrations.", "The company has a strong backend team but limited ML operations experience."], prompt: "Do you build, buy or propose a hybrid model? Defend your decision in 3–5 lines.", helper: "Do not mention all six variables by obligation. Prioritize the ones that actually change the decision.", placeholder: "Recommendation, evidence and accepted trade-off…", cta: "Submit recommendation" },
    challenge: { eyebrow: "SKALA CHALLENGE", context: "Skala is testing an assumption in your recommendation.", placeholder: "Answer in 2–4 lines. You may revise or defend your decision…", cta: "Answer challenge" },
    final: { eyebrow: "FINAL DECISION", title: "Your final decision", body: "You may keep your recommendation or change it. What matters is making the trade-off you are accepting explicit.", prompt: "What do you decide now?", rationale: "Make the trade-off and the condition that would trigger a review explicit.", placeholder: "I keep or change because… I accept… I would review if…", cta: "Close decision" },
    recall: { eyebrow: "TRANSFER", title: "Can you recognize what changed?", prompt: "A fintech buys an external solution because it needs speed. Six months later, the capability directly differentiates the customer experience and scale now justifies internal investment. Which variable most changed the decision?", options: ["Strategic differentiation and economics at scale", "The vendor stopped being technically capable", "Build is always better after the pilot", "Speed stopped mattering entirely"], cta: "Record answer" },
    summary: { eyebrow: "SKILL COMPLETE", updated: "Your Skala updated", application: "APPLICATION", adaptability: "ADAPTABILITY", recall: "TRANSFER", mastery: "BUILD VS BUY", evidence: "2 evidence events added", connection: "1 connection strengthened", completionNote: "Completion records activity. Mastery grows only from assessed evidence and does not yet imply demonstrated expertise.", cta: "See change in Your Skala", next: "Suggested next step" },
    validation: { choose: "Select a decision.", reason: "Briefly explain your main reason.", response: "Develop your reasoning before continuing.", recall: "Select an answer." },
  },
} as const;

export const challengePatterns = {
  speed: {
    "es-CL": "Tu recomendación depende mucho de la ventaja de lanzar en seis semanas. Supón que el costo anual del proveedor a escala llega a 2,5× la estimación inicial. ¿Qué cambia?",
    en: "Your recommendation depends heavily on the six-week launch advantage. Assume the vendor's annual cost at scale becomes 2.5× the initial estimate. What changes?",
  },
  cost: {
    "es-CL": "Estás tratando el costo actual como la decisión. Supón que la capacidad se vuelve una fuente importante de diferenciación en 18 meses. ¿Tu arquitectura seguiría teniendo sentido?",
    en: "You are treating today's cost as the decision. Assume the capability becomes a major source of differentiation in 18 months. Would your architecture still make sense?",
  },
  control: {
    "es-CL": "Supón que el proveedor ya cumple los estándares de control y portabilidad requeridos. ¿Construir sigue siendo el mejor uso de la capacidad interna?",
    en: "Assume the vendor now meets the required control and portability standards. Is building still the best use of internal capability?",
  },
  capability: {
    "es-CL": "El equipo puede contratar, pero llegar a una operación confiable de ML puede tomar 9–12 meses. ¿Qué valor estás dispuesto a retrasar para poseer esta capacidad?",
    en: "The team can hire, but reaching reliable production ML operations may take 9–12 months. What value are you willing to delay to own this capability?",
  },
  lockIn: {
    "es-CL": "Supón que cambiar después exige reconstruir integraciones y la infraestructura de evaluación. ¿Qué harías ahora para preservar reversibilidad?",
    en: "Assume switching later requires rebuilding integrations and evaluation infrastructure. What would you do now to preserve reversibility?",
  },
  boundary: {
    "es-CL": "¿Qué capa poseerías realmente? “Híbrido” no es una estrategia hasta que la frontera sea explícita.",
    en: "Which layer would you actually own? “Hybrid” is not a strategy until the boundary is explicit.",
  },
} as const;

export function getBuildVsBuyCopy(locale: Locale) { return copy[locale]; }
export function decisionLabel(locale: Locale, decision: LearningDecision) { return copy[locale].diagnostic.options[decision]; }
