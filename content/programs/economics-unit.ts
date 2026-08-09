import type { Locale } from "@/i18n/config";

export type UnitInteraction = "market-model" | "forced-choice" | "incremental-table" | "cost-simulator" | "elasticity-simulator" | "incentive-lab" | "market-classification" | "pricing-lab" | "game-simulation";
type L = { "es-CL": string; en: string };
const l = (es: string, en: string): L => ({ "es-CL": es, en });

export type EconomicsSkillExperience = {
  skillId: string;
  interaction: UnitInteraction;
  capability: L;
  coldOpen: L;
  choices: L[];
  correctChoice: number;
  explanation: L;
  interactionTitle: L;
  interactionPrompt: L;
  application: L;
  transfer: L;
  transferChoices: L[];
  correctTransfer: number;
  aiChallenge: L;
  evidenceDimensions: string[];
};

export const economicsSkills: EconomicsSkillExperience[] = [
  {
    skillId: "supply-demand", interaction: "market-model",
    capability: l("Distinguir un movimiento a lo largo de la curva de un cambio de mercado y anticipar precio y cantidad.", "Distinguish movement along a curve from a market shift and anticipate price and quantity."),
    coldOpen: l("Un servicio de suscripción baja su precio 20% y obtiene más altas. ¿Aumentó la demanda?", "A subscription service cuts price by 20% and gets more sign-ups. Did demand increase?"),
    choices: [l("Sí", "Yes"), l("No necesariamente", "Not necessarily"), l("Falta información", "Insufficient information")], correctChoice: 1,
    explanation: l("Vender más después de bajar el precio describe mayor cantidad demandada. Para afirmar que la demanda cambió necesitamos una causa distinta del propio precio, como ingreso, preferencias o la salida de un competidor.", "Selling more after a price cut describes greater quantity demanded. A demand shift requires a cause other than the product's own price, such as income, preferences or a competitor exit."),
    interactionTitle: l("Laboratorio de mercado", "Market lab"), interactionPrompt: l("Aplica cada shock y predice primero qué ocurrirá con el precio y la cantidad de equilibrio.", "Apply each shock and predict what happens to equilibrium price and quantity before revealing it."),
    application: l("Un gimnasio premium baja el precio la misma semana en que cierra un competidor. Separa el efecto precio del cambio de demanda y di qué dato permitiría distinguirlos.", "A premium gym cuts price in the same week a competitor closes. Separate the price effect from the demand shift and name evidence that would distinguish them."),
    transfer: l("Un impuesto encarece producir bebidas. ¿Qué cambia primero?", "A tax raises the cost of producing drinks. What changes first?"), transferChoices: [l("La oferta se contrae", "Supply contracts"), l("La demanda aumenta", "Demand expands"), l("Sólo cambia la cantidad demandada", "Only quantity demanded changes")], correctTransfer: 0,
    aiChallenge: l("¿Qué observación refutaría tu explicación principal?", "What observation would falsify your main explanation?"), evidenceDimensions: ["marketMechanism", "causalDistinction"],
  },
  {
    skillId: "opportunity-cost", interaction: "forced-choice",
    capability: l("Identificar el valor de la mejor alternativa que se sacrifica al decidir.", "Identify the value of the best alternative sacrificed by a choice."),
    coldOpen: l("Una empresa posee un piso de oficinas desocupado. Si instala allí un nuevo equipo, ¿qué determina el costo económico?", "A company owns an unused office floor. If it places a new team there, what determines the economic cost?"),
    choices: [l("Lo pagado por el piso", "What it paid for the floor"), l("La mejor alternativa disponible", "The best available alternative"), l("Sólo los nuevos gastos en efectivo", "Only new cash expenses")], correctChoice: 1,
    explanation: l("La propiedad no vuelve gratuito el espacio. El costo relevante es el valor de arrendarlo o reservarlo para expansión, según cuál sea la mejor alternativa factible.", "Ownership does not make the space free. The relevant cost is the value of renting it or reserving it for expansion, whichever is the best feasible alternative."),
    interactionTitle: l("Decisión con recursos escasos", "Scarce-resource decision"), interactionPrompt: l("Compara renta de mercado, expansión esperada y reubicación. Elige la alternativa sacrificada de mayor valor.", "Compare market rent, expected expansion and relocation. Choose the highest-value forgone alternative."),
    application: l("Ya se gastaron $18 millones en remodelación. Explica si ese gasto cambia la decisión de mañana y qué sí debería cambiarla.", "The company already spent $18 million on renovation. Explain whether that changes tomorrow's decision and what should change it."),
    transfer: l("Dos productos compiten por el mismo equipo de ingeniería. ¿Cuál es el costo de elegir A?", "Two products compete for the same engineering team. What is the cost of choosing A?"), transferChoices: [l("El presupuesto de A", "A's budget"), l("El valor que habría creado B", "The value B would have created"), l("El sueldo ya comprometido", "The salary already committed")], correctTransfer: 1,
    aiChallenge: l("¿Qué restricción haría que cambiara la mejor alternativa?", "Which constraint would change the best alternative?"), evidenceDimensions: ["opportunityCost", "sunkCostReasoning"],
  },
  {
    skillId: "marginal-thinking", interaction: "incremental-table",
    capability: l("Decidir sobre el siguiente incremento sin quedar atrapado por totales o promedios.", "Decide on the next increment without being trapped by totals or averages."),
    coldOpen: l("Una campaña sigue siendo rentable en promedio. ¿Eso basta para comprar el siguiente bloque de clientes?", "A campaign remains profitable on average. Is that enough to buy the next customer band?"),
    choices: [l("Sí", "Yes"), l("No: importa el siguiente bloque", "No: the next band matters"), l("Sólo si crece el volumen", "Only if volume grows")], correctChoice: 1,
    explanation: l("La decisión incremental compara beneficio y costo del próximo bloque. Un promedio positivo puede ocultar que los clientes más recientes destruyen valor.", "The incremental decision compares the next band's benefit and cost. A positive average can hide that the newest customers destroy value."),
    interactionTitle: l("Frontera de adquisición", "Acquisition frontier"), interactionPrompt: l("Selecciona hasta qué banda expandirías. Después prueba qué pasa si mejora la retención de la banda D.", "Choose the last band you would fund. Then test what happens if Band D retention improves."),
    application: l("Defiende tu punto de detención e identifica la información que podría moverlo.", "Defend your stopping point and identify the information that could move it."),
    transfer: l("El beneficio marginal esperado cae bajo el costo marginal. ¿Qué regla aplica?", "Expected marginal benefit falls below marginal cost. Which rule applies?"), transferChoices: [l("Seguir mientras el promedio sea positivo", "Continue while the average is positive"), l("Detener el siguiente incremento", "Stop the next increment"), l("Recuperar primero el costo fijo", "Recover fixed cost first")], correctTransfer: 1,
    aiChallenge: l("Si mejora la retención de la banda D, ¿qué parte de tu lógica cambia y cuál permanece?", "If Band D retention improves, which part of your logic changes and which remains?"), evidenceDimensions: ["marginalReasoning", "adaptability"],
  },
  {
    skillId: "marginal-cost", interaction: "cost-simulator",
    capability: l("Estimar qué costos cambian con una unidad adicional, incluidos saltos de capacidad.", "Estimate which costs change with one more unit, including capacity steps."),
    coldOpen: l("Un software tiene equipo fijo. ¿Su costo marginal es siempre casi cero?", "A software product has a fixed team. Is its marginal cost always near zero?"),
    choices: [l("Sí", "Yes"), l("No", "No"), l("Sólo después de escalar", "Only after scaling")], correctChoice: 1,
    explanation: l("Distribuir software puede ser barato, pero transacciones, infraestructura, soporte e inferencia varían. Además, al cruzar capacidad, un costo fijo se vuelve incremental para ese tramo.", "Software distribution may be cheap, but transactions, infrastructure, support and inference vary. Crossing capacity can also make a fixed cost incremental for that range."),
    interactionTitle: l("Simulador de capacidad", "Capacity simulator"), interactionPrompt: l("Mueve clientes entre 1.000 y 20.000. Antes de cruzar 12.000, predice el efecto de sumar un equipo de soporte.", "Move customers from 1,000 to 20,000. Before crossing 12,000, predict the effect of adding a support team."),
    application: l("Explica por qué el costo medio puede bajar mientras el costo marginal salta en el umbral.", "Explain why average cost can fall while marginal cost jumps at the threshold."),
    transfer: l("En consultoría, ¿qué suele impulsar el costo marginal?", "In consulting, what usually drives marginal cost?"), transferChoices: [l("Horas profesionales adicionales", "Additional professional hours"), l("La marca", "The brand"), l("El arriendo ya firmado", "The signed lease")], correctTransfer: 0,
    aiChallenge: l("¿Qué capacidad o supuesto escondido podría crear el siguiente salto de costo?", "Which hidden capacity or assumption could create the next cost step?"), evidenceDimensions: ["costDrivers", "quantitativeReasoning"],
  },
  {
    skillId: "elasticity", interaction: "elasticity-simulator",
    capability: l("Usar la respuesta de demanda para evaluar decisiones de precio e ingreso.", "Use demand response to evaluate pricing and revenue decisions."),
    coldOpen: l("El precio sube 10% y el volumen cae 4%. ¿La elasticidad será siempre 0,4?", "Price rises 10% and volume falls 4%. Will elasticity always be 0.4?"),
    choices: [l("Sí", "Yes"), l("No: depende de segmento, horizonte y causalidad", "No: it depends on segment, horizon and causality"), l("Sólo en mercados grandes", "Only in large markets")], correctChoice: 1,
    explanation: l("La razón observada sirve como estimación local, no como ley permanente. Segmento, sustitutos, horizonte y cambios simultáneos pueden modificarla o sesgarla.", "The observed ratio is a local estimate, not a permanent law. Segment, substitutes, horizon and concurrent changes can alter or bias it."),
    interactionTitle: l("Curvas de respuesta", "Response curves"), interactionPrompt: l("Cambia el precio y compara usuarios empresariales, ocasionales y con muchos sustitutos. Predice primero qué segmento perderá más volumen.", "Change price and compare business, occasional and highly substitutable users. Predict which segment loses the most volume first."),
    application: l("Interpreta el cambio de ingreso y explica por qué una prueba A/B todavía podría no identificar la respuesta de largo plazo.", "Interpret the revenue change and explain why an A/B test may still not identify long-run response."),
    transfer: l("¿Qué producto suele tener demanda más elástica?", "Which product usually has more elastic demand?"), transferChoices: [l("Un medicamento sin sustitutos", "A drug with no substitutes"), l("Una app entre muchas equivalentes", "An app among many equivalents"), l("Agua en una emergencia", "Water in an emergency")], correctTransfer: 1,
    aiChallenge: l("¿Qué cambio simultáneo podría estar contaminando la respuesta observada?", "Which concurrent change could contaminate the observed response?"), evidenceDimensions: ["elasticity", "evidenceUse"],
  },
  {
    skillId: "incentives", interaction: "incentive-lab",
    capability: l("Anticipar respuestas intencionales y no intencionales a métricas, recompensas y restricciones.", "Anticipate intended and unintended responses to metrics, rewards and constraints."),
    coldOpen: l("Soporte paga bonos por tickets cerrados por hora. ¿Qué ocurrirá además de aumentar la velocidad?", "Support pays bonuses for tickets closed per hour. What happens besides faster closure?"),
    choices: [l("Nada", "Nothing"), l("Puede aumentar reapertura y evasión de casos difíciles", "Repeat contacts and hard-case avoidance may rise"), l("Siempre mejora satisfacción", "Satisfaction always improves")], correctChoice: 1,
    explanation: l("Las personas optimizan lo medido dentro de sus restricciones. Si velocidad sustituye al resultado real, aparecen cierres prematuros, selección de casos y calidad invisible.", "People optimize what is measured within their constraints. If speed substitutes for the real outcome, premature closure, case selection and hidden quality emerge."),
    interactionTitle: l("Arquitectura de incentivos", "Incentive architecture"), interactionPrompt: l("Ajusta el peso de velocidad, resolución al primer contacto y resultado del cliente. Observa el comportamiento simulado.", "Adjust the weight on speed, first-contact resolution and customer outcome. Observe simulated behavior."),
    application: l("Diseña una métrica balanceada y explica qué conducta todavía podría generar.", "Design a balanced metric and explain which behavior it could still create."),
    transfer: l("Ventas recibe comisión sólo por contratos firmados. ¿Qué riesgo aparece?", "Sales is paid only for signed contracts. Which risk appears?"), transferChoices: [l("Clientes de baja calidad o promesas excesivas", "Low-quality customers or overpromising"), l("Menor actividad comercial", "Lower sales activity"), l("Costos fijos más bajos", "Lower fixed costs")], correctTransfer: 0,
    aiChallenge: l("Con mejor información pero la misma métrica, ¿qué cambia y qué incentivo permanece?", "With better information but the same metric, what changes and which incentive remains?"), evidenceDimensions: ["behavioralMechanism", "incentiveDesign"],
  },
  {
    skillId: "market-structure", interaction: "market-classification",
    capability: l("Diagnosticar cómo concentración, diferenciación, barreras y poder de negociación afectan precios y rentabilidad.", "Diagnose how concentration, differentiation, barriers and bargaining power shape pricing and profitability."),
    coldOpen: l("Un mercado tiene sólo tres competidores. ¿Eso garantiza buena rentabilidad?", "A market has only three competitors. Does that guarantee attractive profitability?"),
    choices: [l("Sí", "Yes"), l("No", "No"), l("Sólo si son grandes", "Only if they are large")], correctChoice: 1,
    explanation: l("Pocos rivales no bastan. Compradores concentrados, sustitutos, baja diferenciación o entrada fácil pueden disipar el poder de precios.", "Few rivals are not enough. Concentrated buyers, substitutes, low differentiation or easy entry can dissipate pricing power."),
    interactionTitle: l("Mapa de poder de mercado", "Market power map"), interactionPrompt: l("Compara cuatro mercados y ordénalos según poder de precios. Cambia la frontera de mercado para revelar sustitutos.", "Compare four markets and rank them by pricing power. Change the market boundary to reveal substitutes."),
    application: l("Defiende la frontera de mercado que usarías y el factor estructural más decisivo.", "Defend the market boundary you would use and the most decisive structural factor."),
    transfer: l("Cae una barrera de entrada importante. ¿Qué presión aparece normalmente?", "A major entry barrier falls. Which pressure usually appears?"), transferChoices: [l("Mayor margen asegurado", "Guaranteed higher margin"), l("Más entrada y presión sobre márgenes", "More entry and margin pressure"), l("Menos sustitutos", "Fewer substitutes")], correctTransfer: 1,
    aiChallenge: l("¿Qué sustituto vuelve engañosa una definición demasiado estrecha del mercado?", "Which substitute makes a narrow market definition misleading?"), evidenceDimensions: ["marketStructure", "marketDefinition"],
  },
  {
    skillId: "pricing-strategy", interaction: "pricing-lab",
    capability: l("Diseñar precios diferenciados que capturen valor sin destruir adopción, confianza o coherencia.", "Design differentiated pricing that captures value without destroying adoption, trust or coherence."),
    coldOpen: l("¿Discriminar precios significa cobrar a cada cliente todo lo que tolera?", "Does price discrimination mean charging every customer everything they will tolerate?"),
    choices: [l("Sí", "Yes"), l("No", "No"), l("Sólo en B2B", "Only in B2B")], correctChoice: 1,
    explanation: l("Una arquitectura defendible separa disposición a pagar mediante planes, uso o reglas verificables. También enfrenta arbitraje, justicia percibida, regulación y costo de servir.", "A defensible architecture separates willingness to pay through plans, usage or verifiable rules. It also faces arbitrage, perceived fairness, regulation and cost-to-serve."),
    interactionTitle: l("Laboratorio de precios", "Pricing lab"), interactionPrompt: l("Elige precio plano, planes o uso para tres segmentos. Luego incorpora una restricción de reventa.", "Choose flat, tiered or usage pricing for three segments. Then incorporate a resale constraint."),
    application: l("Recomienda una arquitectura y explica el equilibrio entre captura, adopción y riesgo de justicia.", "Recommend an architecture and explain the balance between capture, adoption and fairness risk."),
    transfer: l("¿Qué actúa como valla en una tarifa aérea comprada con anticipación?", "What acts as a fence in an advance-purchase airline fare?"), transferChoices: [l("La fecha y las restricciones de cambio", "Timing and change restrictions"), l("El color del avión", "Aircraft color"), l("El costo hundido del aeropuerto", "The airport's sunk cost")], correctTransfer: 0,
    aiChallenge: l("Si los clientes pueden revender entre segmentos, ¿cómo rediseñas la separación?", "If customers can resell across segments, how do you redesign separation?"), evidenceDimensions: ["pricingArchitecture", "tradeoffReasoning"],
  },
  {
    skillId: "competitive-interaction-game-theory", interaction: "game-simulation",
    capability: l("Anticipar la respuesta de otro actor racional y reconocer resultados conjuntos deficientes.", "Anticipate another rational actor's response and recognize poor joint outcomes."),
    coldOpen: l("Un recorte de precio es rentable si el rival no reacciona. ¿Es suficiente para aprobarlo?", "A price cut is profitable if the rival does not react. Is that enough to approve it?"),
    choices: [l("Sí", "Yes"), l("No: la respuesta cambia el resultado", "No: the response changes the outcome"), l("Sólo importa nuestra cuota", "Only our share matters")], correctChoice: 1,
    explanation: l("Cuando las decisiones son interdependientes, la acción relevante incluye la mejor respuesta del rival. Una jugada atractiva de forma unilateral puede iniciar un equilibrio peor para ambos.", "When decisions are interdependent, the relevant action includes the rival's best response. An attractive unilateral move can start a worse equilibrium for both."),
    interactionTitle: l("Simulación competitiva", "Competitive simulation"), interactionPrompt: l("Juega tres rondas de mantener o recortar precio. Después evalúa un compromiso de capacidad antes de la entrada.", "Play three rounds of hold or cut price. Then assess a capacity commitment before entry."),
    application: l("Anticipa la respuesta más plausible y define cuándo un compromiso sería creíble.", "Anticipate the most plausible response and define when a commitment would be credible."),
    transfer: l("Un rival obtiene exclusividad de distribución. ¿Qué debes evaluar primero?", "A rival obtains distribution exclusivity. What should you assess first?"), transferChoices: [l("Tu respuesta y el nuevo conjunto de opciones", "Your response and the new option set"), l("Sólo su costo histórico", "Only its historical cost"), l("Ignorarlo hasta ver ventas", "Ignore it until sales arrive")], correctTransfer: 0,
    aiChallenge: l("¿Qué respuesta del rival vuelve incoherente tu decisión inicial?", "Which rival response makes your initial decision incoherent?"), evidenceDimensions: ["bestResponse", "strategicInteraction"],
  },
];

export const unitExperienceCopy = {
  "es-CL": { back: "Volver a la unidad", restart: "Reiniciar", capability: "Capacidad", commit: "Confirmar respuesta", reveal: "Ver explicación", continue: "Continuar", interact: "Interactuar", apply: "Aplicar criterio", applicationHelp: "Escribe una respuesta ejecutiva. Explicita mecanismo, decisión y supuesto.", challenge: "Desafío de criterio", challengeHelp: "Responde al contrafactual antes de cerrar.", transfer: "Transferencia", finish: "Registrar evidencia", summary: "Evidencia registrada", mastery: "Dominio", evidence: "Evidencias", next: "Siguiente experiencia", map: "Ver cambio en Tu Skala", validation: "Desarrolla la respuesta con al menos 60 caracteres.", select: "Selecciona una opción.", correct: "Lectura consistente", reconsider: "Revisa el mecanismo", blocks: "Bloques", blockNames: ["Decisión inicial", "Modelo", "Interacción", "Aplicación", "Desafío AI", "Transferencia", "Resumen"] },
  en: { back: "Back to unit", restart: "Restart", capability: "Capability", commit: "Commit answer", reveal: "Reveal explanation", continue: "Continue", interact: "Interact", apply: "Apply judgment", applicationHelp: "Write an executive response. Make the mechanism, decision and assumption explicit.", challenge: "Judgment challenge", challengeHelp: "Answer the counterfactual before closing.", transfer: "Transfer", finish: "Record evidence", summary: "Evidence recorded", mastery: "Mastery", evidence: "Evidence", next: "Next experience", map: "See change in Your Skala", validation: "Develop the response with at least 60 characters.", select: "Select an option.", correct: "Consistent reading", reconsider: "Revisit the mechanism", blocks: "Blocks", blockNames: ["Initial decision", "Model", "Interaction", "Application", "AI challenge", "Transfer", "Summary"] },
};

export const interactionCopy = {
  "es-CL": {
    predict: "Predicción", reveal: "Revelar resultado", price: "Precio", quantity: "Cantidad", demand: "Demanda", supply: "Oferta",
    shocks: ["Sale un competidor", "Sube el ingreso", "Baja el costo de insumos", "Se abarata un sustituto", "Se limita la capacidad"],
    alternatives: ["Arrendar: $14M/año", "Reservar expansión: valor esperado $19M", "Usar para el equipo: ahorro $11M"],
    bands: "Banda", contribution: "Contribución incremental", acquisition: "Costo incremental", improved: "Mejorar retención de D",
    customers: "Clientes", totalCost: "Costo total", averageCost: "Costo medio", marginalCost: "Costo marginal", threshold: "Nuevo equipo de soporte desde 12.000",
    segment: "Segmento", business: "Empresas", occasional: "Ocasionales", substitutes: "Muchos sustitutos", revenue: "Ingreso",
    speed: "Velocidad", resolution: "Resolución inicial", outcome: "Resultado del cliente", repeats: "Reaperturas", avoidance: "Evasión de casos difíciles",
    markets: ["Software regulado", "Cafeterías locales", "Proveedor industrial", "Marketplace de nicho"], pricingPower: "Poder de precios", narrow: "Mercado estrecho", broad: "Mercado con sustitutos",
    pricingModes: ["Precio plano", "Planes", "Por uso"], adoption: "Adopción", contributionShort: "Contribución", fairness: "Riesgo de justicia", resale: "Activar restricción de reventa",
    hold: "Mantener precio", cut: "Recortar precio", round: "Ronda", you: "Tú", rival: "Rival", payoff: "Resultado", play: "Jugar ronda",
  },
  en: {
    predict: "Prediction", reveal: "Reveal result", price: "Price", quantity: "Quantity", demand: "Demand", supply: "Supply",
    shocks: ["Competitor exits", "Income rises", "Input cost falls", "Substitute gets cheaper", "Capacity is limited"],
    alternatives: ["Rent out: $14M/year", "Reserve expansion: $19M expected value", "Use for team: $11M savings"],
    bands: "Band", contribution: "Incremental contribution", acquisition: "Incremental cost", improved: "Improve Band D retention",
    customers: "Customers", totalCost: "Total cost", averageCost: "Average cost", marginalCost: "Marginal cost", threshold: "New support team from 12,000",
    segment: "Segment", business: "Business", occasional: "Occasional", substitutes: "Many substitutes", revenue: "Revenue",
    speed: "Speed", resolution: "First-contact resolution", outcome: "Customer outcome", repeats: "Repeat contacts", avoidance: "Hard-case avoidance",
    markets: ["Regulated software", "Local coffee shops", "Industrial supplier", "Niche marketplace"], pricingPower: "Pricing power", narrow: "Narrow market", broad: "Market with substitutes",
    pricingModes: ["Flat price", "Tiers", "Usage"], adoption: "Adoption", contributionShort: "Contribution", fairness: "Fairness risk", resale: "Activate resale constraint",
    hold: "Hold price", cut: "Cut price", round: "Round", you: "You", rival: "Rival", payoff: "Payoff", play: "Play round",
  },
};

export function getEconomicsSkill(skillId: string) { return economicsSkills.find((item) => item.skillId === skillId); }
export function lt(value: L, locale: Locale) { return value[locale]; }
