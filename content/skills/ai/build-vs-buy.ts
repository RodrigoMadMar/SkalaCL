import type { Locale } from "@/i18n/config";
import { referenceSkillSchema, type LearningBlockType, type LearningDecision } from "@/lib/learning/schemas";

export const buildVsBuySkill = referenceSkillSchema.parse({
  id: "ai.build-vs-buy",
  domain: "ai",
  specialization: "ai-strategy",
  title: { "es-CL": "Desarrollar o comprar", en: "Build vs Buy" },
  objective: {
    "es-CL": "Tomar y defender una decisión sobre desarrollar, comprar o combinar capacidades de IA, haciendo explícitos sus costos y renuncias.",
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
    entry: { eyebrow: "ESTRATEGIA DE IA · 7 MIN", title: "Desarrollar o comprar", body: "Un proveedor puede ayudarte a lanzar en pocas semanas. Desarrollar internamente puede darte más control y diferenciación. La decisión difícil es saber qué capacidades conviene tener dentro de la empresa.", cta: "Comenzar" },
    diagnostic: { eyebrow: "PIENSA ANTES DE VER EL MODELO", scenario: sharedScenario["es-CL"], prompt: "Antes de conocer el modelo de decisión, ¿qué harías hoy?", reason: "¿Cuál es tu razón principal?", placeholder: "Explica qué factor pesa más en tu decisión…", cta: "Guardar mi postura", options: { build: "Desarrollar internamente", buy: "Comprar", hybrid: "Combinar ambas opciones", defer: "Aún no decidiría" } },
    reveal: { eyebrow: "MODELO MENTAL", title: "No estás eligiendo una tecnología. Estás decidiendo qué capacidad conviene tener dentro de la empresa.", body: "La decisión se vuelve más clara cuando separas seis preguntas. Ninguna basta por sí sola, pero juntas revelan los costos y las renuncias que una simple comparación de precios suele ocultar.", expand: "Explora los seis criterios de decisión", buildSignal: "Favorece el desarrollo interno", buySignal: "Favorece la compra", cta: "Aplicar el modelo", lenses: [
      { title: "Diferenciación", question: "¿El cliente percibirá una ventaja que sólo tu empresa puede crear?", explanation: "No todo lo importante es diferenciador. Una capacidad es estratégica cuando los datos, la lógica o la experiencia resultante mejoran una ventaja que no está disponible para todos.", build: "La capacidad moldea la propuesta de valor y aprende con datos propios.", buy: "El resultado es estándar y poseer la tecnología no cambia la elección del cliente." },
      { title: "Velocidad", question: "¿Cuánto valor se pierde mientras esperas?", explanation: "El tiempo también tiene costo. Comprar puede acelerar aprendizaje, ingresos o reducción de riesgo; construir sólo compensa esa espera si la propiedad futura vale más que la oportunidad perdida.", build: "La demora es tolerable y desarrollar la capacidad crea valor acumulativo.", buy: "Llegar antes permite validar demanda o capturar una ventana de mercado." },
      { title: "Economía", question: "¿Qué cuesta realmente cada camino al escalar?", explanation: "Compara costo total, no sólo licencia versus horas de ingeniería. Incluye uso, equipo, evaluación, operación, fallas, integración y el costo de cambiar más adelante.", build: "El volumen vuelve predecible la inversión y reduce el costo marginal.", buy: "La demanda es incierta o el proveedor distribuye costos entre muchos clientes." },
      { title: "Control", question: "¿Qué necesitas gobernar directamente?", explanation: "Control puede significar privacidad, confiabilidad, personalización, auditabilidad o ritmo de cambio. Exigir control total sin identificar el riesgo concreto suele producir sobreconstrucción.", build: "Un fallo o límite externo afectaría una obligación crítica del negocio.", buy: "Contratos, evaluaciones y arquitectura desacoplada controlan suficientemente el riesgo." },
      { title: "Capacidad", question: "¿Puedes operar lo que construyes de forma confiable?", explanation: "Prototipar no equivale a operar. Poseer una capacidad exige talento, evaluación continua, observabilidad, soporte y una organización dispuesta a mantenerla.", build: "La empresa ya tiene la base o necesita desarrollar esa competencia estratégicamente.", buy: "Cerrar la brecha interna retrasaría el valor y distraería talento escaso." },
      { title: "Reversibilidad", question: "¿Qué tan costoso será cambiar de decisión?", explanation: "Una buena decisión hoy puede dejar de serlo. Conserva alternativas separando los datos, las evaluaciones, las instrucciones y las integraciones de la tecnología elegida.", build: "La dependencia del proveedor sería alta y la capacidad seguirá siendo relevante.", buy: "La solución permite portar los activos, es modular o resulta fácil de sustituir mientras aprendes." },
    ] },
    field: { eyebrow: "CAMPO DE DECISIÓN", title: "Ubica el escenario", body: "Usa los dos controles para representar las condiciones actuales. El campo sugiere una tendencia inicial; los otros cuatro criterios todavía pueden cambiar la decisión.", howToRead: "Cómo leerlo", guide: "La zona superior izquierda favorece el desarrollo interno; la inferior derecha favorece la compra. La zona central sugiere separar las capas y combinar ambas opciones.", controlHint: "Mueve ambos controles y observa cómo cambia la tendencia.", xAxis: "Madurez de soluciones externas", yAxis: "Diferenciación estratégica", xLow: "Mercado incipiente", xHigh: "Mercado maduro", yLow: "Baja", yHigh: "Alta", build: "DESARROLLAR", buy: "COMPRAR", hybrid: "COMBINAR", tendency: "Tendencia inicial", tendencies: { build: "Desarrollar internamente", buy: "Comprar", hybrid: "Combinar ambas opciones" }, interpretation: { build: "La capacidad parece diferenciadora y el mercado externo aún no resuelve bien la necesidad.", buy: "Existen soluciones maduras para una capacidad con poca diferenciación propia.", hybrid: "Las señales son mixtas: define qué capa conviene desarrollar y cuál adquirir." }, scale: { low: "Baja", medium: "Media", high: "Alta" }, caution: "Esto no es una respuesta automática: la economía, el control, la capacidad interna y la reversibilidad todavía pueden cambiar la decisión.", firstCta: "Fijar postura", factsTitle: "Ahora incorpora dos hechos", facts: ["El proveedor permite exportar los datos y cambiar de modelo.", "El equipo interno no tiene experiencia operando modelos en producción."], movePrompt: "¿Cambiarías tu decisión?", move: "Sí, cambiaría mi postura", keep: "No, la mantendría", cta: "Continuar" },
    contrast: { eyebrow: "CONTRASTE", title: "El límite entre ambas opciones importa más que la etiqueta", examples: [
      { label: "A · Comprar la capa estandarizada", title: "Reconocimiento de texto en un flujo interno", body: "Las herramientas externas ya son confiables, la capacidad no es visible para el cliente y tener infraestructura propia no crea una ventaja." },
      { label: "B · Poseer la capa diferenciadora", title: "Ranking personalizado", body: "Los datos propios y la lógica de decisión afectan directamente conversión, valor para comercios y experiencia del cliente." },
    ], insight: "La arquitectura también puede ser híbrida: comprar infraestructura y construir la capa que realmente diferencia.", cta: "Tomar una decisión" },
    application: { eyebrow: "APLICACIÓN", title: "Formula una recomendación para el comité", facts: ["El uso esperado se triplicará si el piloto funciona.", "El proveedor cobra principalmente por uso.", "El área Legal aprueba los controles actuales del proveedor.", "Cambiar después exige migrar instrucciones, evaluaciones e integraciones.", "El equipo de desarrollo es sólido, pero tiene poca experiencia operando modelos de aprendizaje automático."], prompt: "¿Desarrollarías la capacidad, la comprarías o combinarías ambas opciones? Defiende tu decisión en 3–5 líneas.", helper: "No necesitas mencionar los seis factores. Prioriza los que realmente podrían cambiar la decisión.", placeholder: "Escribe tu recomendación, la evidencia que la respalda y el costo o renuncia que aceptarías…", cta: "Enviar recomendación" },
    challenge: { eyebrow: "DESAFÍO DE SKALA", context: "Skala está poniendo a prueba un supuesto de tu recomendación.", placeholder: "Responde en 2–4 líneas. Puedes ajustar o defender tu decisión…", cta: "Responder al desafío" },
    final: { eyebrow: "DECISIÓN FINAL", title: "Tu decisión final", body: "Puedes mantener o cambiar tu recomendación. Lo importante es explicar con claridad qué costo o renuncia estás dispuesto a aceptar.", learningTitle: "Lo que Skala estaba poniendo a prueba", learning: {
      speed: "Velocidad no significa simplemente ‘comprar’. Es el valor económico de aprender o llegar antes, comparado con la ventaja que podrías acumular al construir.",
      cost: "El precio actual no es la economía completa. Volumen, operación, costos de cambio y valor estratégico pueden invertir la comparación con el tiempo.",
      control: "Control sólo justifica construir cuando responde a un riesgo concreto. Contratos, evaluaciones y una arquitectura desacoplada también pueden entregar control suficiente.",
      capability: "La pregunta no es si el equipo puede crear un prototipo, sino si puede operar, evaluar y mejorar la capacidad de forma confiable durante años.",
      lockIn: "La reversibilidad se diseña antes de necesitarla: datos que puedan trasladarse, evaluaciones propias e integraciones desacopladas reducen el costo de cambiar.",
      boundary: "Combinar opciones sólo se vuelve una estrategia cuando defines el límite: qué compras, qué desarrollas y dónde conservarás los datos, el aprendizaje y el control.",
    }, prompt: "¿Qué decides ahora?", rationale: "Explica qué costo o renuncia aceptas y qué condición te haría revisar la decisión.", placeholder: "Mantengo o cambio mi decisión porque… Acepto… La revisaría si…", cta: "Cerrar decisión" },
    recall: { eyebrow: "TRANSFERENCIA", title: "¿Reconoces qué cambió?", prompt: "Una empresa financiera compra una solución externa porque necesita avanzar rápido. Seis meses después, la capacidad comienza a diferenciar la experiencia del cliente y el volumen ya justifica una inversión propia. ¿Qué factor cambió más la decisión?", options: ["La diferenciación estratégica y la economía de escala", "El proveedor dejó de tener capacidad técnica", "Desarrollar internamente siempre es mejor después de un piloto", "La velocidad dejó de importar por completo"], cta: "Registrar respuesta" },
    summary: { eyebrow: "PRÁCTICA COMPLETADA", updated: "Tu Skala se actualizó", application: "APLICACIÓN", adaptability: "ADAPTABILIDAD", recall: "TRANSFERENCIA", mastery: "DESARROLLAR O COMPRAR", evidence: "2 nuevas evidencias", connection: "1 conexión fortalecida", completionNote: "Completar la práctica registra avance. El dominio sólo aumenta a partir de evidencia evaluada y todavía no implica expertise comprobado.", cta: "Ver el cambio en Tu Skala", next: "Siguiente paso sugerido" },
    validation: { choose: "Selecciona una decisión.", reason: "Explica brevemente tu razón principal.", response: "Desarrolla tu razonamiento antes de continuar.", recall: "Selecciona una respuesta." },
  },
  en: {
    meta: { back: "← Back to Your Skala", sequence: "SEQUENCE", save: "Progress saved", restart: "Restart session" },
    entry: { eyebrow: "AI STRATEGY · 7 MIN", title: "Build vs Buy", body: "A vendor can get you into production in weeks. Building internally can create more control and differentiation. The hard decision is knowing what is worth owning.", cta: "Start" },
    diagnostic: { eyebrow: "THINK BEFORE REVEAL", scenario: sharedScenario.en, prompt: "Before seeing any framework: what would you decide today?", reason: "What is the main reason?", placeholder: "Explain which variable carries the most weight…", cta: "Save my position", options: { build: "Build", buy: "Buy", hybrid: "Hybrid", defer: "I would not decide yet" } },
    reveal: { eyebrow: "MENTAL MODEL", title: "You are not choosing technology. You are choosing which capability is worth owning.", body: "Build vs Buy becomes clearer when you separate six questions. Open each lens: none decides alone, but together they expose trade-offs a simple price comparison tends to hide.", expand: "Explore the six decision lenses", buildSignal: "Pushes toward build", buySignal: "Pushes toward buy", cta: "Apply the model", lenses: [
      { title: "Differentiation", question: "Will customers perceive an advantage only your company can create?", explanation: "Not everything important is differentiating. A capability is strategic when its data, logic or resulting experience strengthens an advantage that is not available to everyone.", build: "The capability shapes the value proposition and learns from proprietary data.", buy: "The outcome is standard and owning the technology does not change customer choice." },
      { title: "Speed", question: "How much value is lost while you wait?", explanation: "Time has a cost. Buying can accelerate learning, revenue or risk reduction; building only offsets that wait when future ownership is worth more than the missed opportunity.", build: "Delay is tolerable and developing the capability creates compounding value.", buy: "Arriving sooner validates demand or captures a market window." },
      { title: "Economics", question: "What does each path really cost at scale?", explanation: "Compare total cost, not license fees versus engineering hours. Include usage, team, evaluation, operations, failures, integration and the cost of switching later.", build: "Volume makes investment predictable and lowers marginal cost.", buy: "Demand is uncertain or the vendor spreads costs across many customers." },
      { title: "Control", question: "What must you govern directly?", explanation: "Control can mean privacy, reliability, customization, auditability or pace of change. Demanding total control without naming the risk usually leads to overbuilding.", build: "An external failure or constraint would threaten a critical business obligation.", buy: "Contracts, evaluations and decoupled architecture control the risk sufficiently." },
      { title: "Capability", question: "Can you operate what you build reliably?", explanation: "Prototyping is not operating. Ownership requires talent, continuous evaluation, observability, support and an organization willing to maintain the system.", build: "The company has the foundation or strategically needs to develop that competence.", buy: "Closing the internal gap delays value and distracts scarce talent." },
      { title: "Reversibility", question: "How expensive will changing your mind be?", explanation: "A good decision today can become wrong later. Preserve options by separating data, evaluations, prompts and integrations from the chosen technology.", build: "External lock-in would be high and the capability will remain relevant.", buy: "The solution is portable, modular or easy to replace while learning." },
    ] },
    field: { eyebrow: "DECISION FIELD", title: "Place the scenario", body: "Use the two controls to represent today's conditions. The field suggests an initial tendency; the other four lenses can still change the decision.", howToRead: "How to read it", guide: "Top-left favors build; bottom-right favors buy. The middle suggests separating layers and evaluating a hybrid model.", controlHint: "Move both controls and observe how the tendency changes.", xAxis: "External solution maturity", yAxis: "Strategic differentiation", xLow: "Emerging market", xHigh: "Mature market", yLow: "Low", yHigh: "High", build: "BUILD", buy: "BUY", hybrid: "HYBRID", tendency: "Field tendency", tendencies: { build: "Build", buy: "Buy", hybrid: "Evaluate a hybrid model" }, interpretation: { build: "The capability looks differentiating and the external market does not yet solve the need well.", buy: "Mature external solutions exist for a capability with low proprietary differentiation.", hybrid: "Signals are mixed: define which layer to own and which to acquire." }, scale: { low: "Low", medium: "Medium", high: "High" }, caution: "This is not an automatic answer: economics, control, internal capability and reversibility can still move the decision.", firstCta: "Set position", factsTitle: "Now add two facts", facts: ["The vendor supports data export and model portability.", "The internal team has no production ML operating experience."], movePrompt: "Would you move your decision?", move: "Yes, I would move it", keep: "No, I would keep it", cta: "Continue" },
    contrast: { eyebrow: "CONTRAST", title: "The boundary matters more than the label", examples: [
      { label: "A · Buy the commodity layer", title: "OCR in an internal workflow", body: "External tools already work reliably, the capability is not customer-visible and owning the infrastructure creates no advantage." },
      { label: "B · Own the differentiating layer", title: "Personalized ranking", body: "Proprietary data and decision logic directly shape conversion, merchant value and customer experience." },
    ], insight: "Architecture can also be hybrid: buy infrastructure and build the layer that actually differentiates.", cta: "Make a decision" },
    application: { eyebrow: "APPLICATION", title: "Recommend to the committee", facts: ["Expected usage will triple if the pilot succeeds.", "The vendor charges primarily by usage.", "Legal approves the vendor's current controls.", "Switching later requires migrating prompts, evaluations and integrations.", "The company has a strong backend team but limited ML operations experience."], prompt: "Do you build, buy or propose a hybrid model? Defend your decision in 3–5 lines.", helper: "Do not mention all six variables by obligation. Prioritize the ones that actually change the decision.", placeholder: "Recommendation, evidence and accepted trade-off…", cta: "Submit recommendation" },
    challenge: { eyebrow: "SKALA CHALLENGE", context: "Skala is testing an assumption in your recommendation.", placeholder: "Answer in 2–4 lines. You may revise or defend your decision…", cta: "Answer challenge" },
    final: { eyebrow: "FINAL DECISION", title: "Your final decision", body: "You may keep your recommendation or change it. What matters is making the trade-off you are accepting explicit.", learningTitle: "What Skala was testing", learning: {
      speed: "Speed does not simply mean ‘buy’. It is the economic value of learning or arriving sooner, compared with the advantage you might compound by building.",
      cost: "Today's price is not the full economics. Volume, operations, switching costs and strategic value can reverse the comparison over time.",
      control: "Control justifies building only when it addresses a concrete risk. Contracts, evaluations and decoupled architecture can also provide sufficient control.",
      capability: "The question is not whether the team can create a prototype, but whether it can reliably operate, evaluate and improve the capability for years.",
      lockIn: "Reversibility is designed before it is needed: portable data, proprietary evaluations and decoupled integrations reduce the cost of switching.",
      boundary: "‘Hybrid’ becomes a strategy when you name the boundary: what you buy, what you build and where you retain data, learning and control.",
    }, prompt: "What do you decide now?", rationale: "Make the trade-off and the condition that would trigger a review explicit.", placeholder: "I keep or change because… I accept… I would review if…", cta: "Close decision" },
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
    "es-CL": "El equipo puede contratar más personas, pero alcanzar una operación confiable de modelos puede tomar entre 9 y 12 meses. ¿Qué valor estás dispuesto a postergar para desarrollar esta capacidad internamente?",
    en: "The team can hire, but reaching reliable production ML operations may take 9–12 months. What value are you willing to delay to own this capability?",
  },
  lockIn: {
    "es-CL": "Supón que cambiar después exige reconstruir integraciones y la infraestructura de evaluación. ¿Qué harías ahora para preservar reversibilidad?",
    en: "Assume switching later requires rebuilding integrations and evaluation infrastructure. What would you do now to preserve reversibility?",
  },
  boundary: {
    "es-CL": "¿Qué capa mantendrías realmente bajo tu control? Combinar opciones no es una estrategia hasta que definas con claridad el límite entre ambas.",
    en: "Which layer would you actually own? “Hybrid” is not a strategy until the boundary is explicit.",
  },
} as const;

export function getBuildVsBuyCopy(locale: Locale) { return copy[locale]; }
export function decisionLabel(locale: Locale, decision: LearningDecision) { return copy[locale].diagnostic.options[decision]; }
