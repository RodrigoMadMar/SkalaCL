import { programSchema, type LocalizedProgramText } from "@/lib/programs/schemas";

const l = (es: string, en: string): LocalizedProgramText => ({ "es-CL": es, en });
const titles = [
  l("Economía de los negocios", "Economics of Business"),
  l("Contabilidad y desempeño", "Accounting & Business Performance"),
  l("Finanzas y creación de valor", "Finance & Value Creation"),
  l("Datos, decisiones e incertidumbre", "Data, Decisions & Uncertainty"),
  l("Clientes, marketing y crecimiento", "Customers, Marketing & Growth"),
  l("Operaciones y sistemas", "Operations & Systems"),
  l("Organizaciones, liderazgo y comunicación", "Organizations, Leadership & Communication"),
  l("Estrategia", "Strategy"),
  l("Empresa, sociedad y contexto global", "Business in Society & Global Context"),
  l("Capstone de Base de Negocios", "Business Core Capstone"),
];
const questions = [
  l("¿Cómo asignan valor los mercados y cómo decidir cuando cambian precios, incentivos, costos y competencia?", "How do markets allocate value, and how should a manager reason when prices, incentives, costs and competition change?"),
  l("¿Qué está ocurriendo económicamente dentro de una empresa y cómo se conectan sus estados?", "What is happening economically inside a company, and how do its statements connect?"),
  l("¿Qué inversiones crean valor y cómo asignar capital escaso?", "Which investments create value, and how should scarce capital be allocated?"),
  l("¿Cómo decidir con evidencia incompleta, ruidosa o engañosa?", "How do you decide with incomplete, noisy or misleading evidence?"),
  l("¿Por qué los clientes eligen, pagan, adoptan y permanecen?", "Why do customers choose, pay, adopt and stay?"),
  l("¿Cómo diseñar un sistema que convierta recursos en valor de forma confiable?", "How do you design a system that reliably converts resources into value?"),
  l("¿Cómo coordinar acción cuando difieren incentivos, información y autoridad?", "How do you coordinate action when incentives, information and authority differ?"),
  l("¿Dónde competir, cómo ganar y por qué debería persistir la ventaja?", "Where should a company play, how should it win and why should advantage persist?"),
  l("¿Cómo incorporar fuerzas macro, regulatorias, éticas y sociales a una decisión?", "How do you incorporate macro, regulatory, ethical and societal forces into a decision?"),
  l("¿Puedes integrar las disciplinas para resolver una decisión empresarial ambigua?", "Can you integrate the disciplines to resolve an ambiguous business decision?"),
];

const unitOneSkills = [
  ["supply-demand", l("Oferta y demanda", "Supply & Demand"), 7],
  ["opportunity-cost", l("Costo de oportunidad", "Opportunity Cost"), 7],
  ["marginal-thinking", l("Pensamiento marginal", "Marginal Thinking"), 8],
  ["marginal-cost", l("Costo marginal", "Marginal Cost"), 8],
  ["elasticity", l("Elasticidad", "Elasticity"), 9],
  ["incentives", l("Incentivos", "Incentives"), 8],
  ["market-structure", l("Estructura de mercado", "Market Structure"), 8],
  ["pricing-strategy", l("Precios y discriminación de precios", "Pricing & Price Discrimination"), 10],
  ["competitive-interaction-game-theory", l("Interacción competitiva y teoría de juegos", "Competitive Interaction & Game Theory"), 9],
] as const;

export const businessCoreProgram = programSchema.parse({
  id: "business-core",
  version: "1.0.0",
  title: l("Base de Negocios", "Business Core"),
  description: l("Un recorrido conectado para desarrollar criterio empresarial y demostrarlo con decisiones.", "A connected path for building business judgment and demonstrating it through decisions."),
  units: titles.map((title, index) => ({
    id: index === 9 ? "business-core-capstone" : `business-core-unit-${String(index + 1).padStart(2, "0")}`,
    order: index + 1,
    title,
    coreQuestion: questions[index],
    exitCapability: index === 0
      ? l("Diagnosticar un mercado, identificar el margen relevante, anticipar respuestas y elegir una acción defendible.", "Diagnose a market, identify the relevant margin, anticipate responses and choose a defensible action.")
      : l("La experiencia completa se implementará en una fase posterior.", "The complete experience will be implemented in a later phase."),
    skillReferences: index === 0 ? unitOneSkills.map(([id, skillTitle, minutes], skillIndex) => ({ id: `unit-01-skill-${skillIndex + 1}`, graphNodeId: id, order: skillIndex + 1, title: skillTitle, estimatedMinutes: minutes, implementationStatus: "playable" as const })) : [],
    checkpoint: index === 0 ? {
      id: "survia-price-the-route",
      title: l("Survia — Define el precio de la ruta", "Survia — Price the Route"),
      estimatedMinutes: 18,
      requiredSkillIds: ["marginal-thinking", "elasticity", "market-structure", "incentives"],
      evidenceSkillIds: ["supply-demand", "marginal-thinking", "marginal-cost", "elasticity", "incentives", "market-structure", "pricing-strategy", "competitive-interaction-game-theory"],
      implementationStatus: "playable" as const,
    } : null,
    implementationStatus: index === 0 ? "playable" as const : "structural" as const,
  })),
});

export function localizedProgramText(value: LocalizedProgramText, locale: "es-CL" | "en") { return value[locale]; }
export const economicsUnit = businessCoreProgram.units[0];

export const programCopy = {
  "es-CL": { eyebrow: "Programa", mapped: "recorrido conectado", progress: "Progreso", mastery: "Dominio", coverage: "Cobertura", current: "Unidad actual", open: "Abrir unidad", structural: "Próximamente", capstone: "Integración final", unit: "Unidad", units: "Unidades", skills: "habilidades", evidence: "evidencias", checkpoint: "checkpoint", back: "Volver al programa", foundation: "Fundación económica", begin: "Comenzar", continue: "Continuar", completed: "Completada", ready: "Listo", locked: "Disponible al completar la base", nextStep: "Tu próximo paso", existing: "El progreso reconoce la evidencia y los avances anteriores.", checkpointTitle: "Decisión integrada", statusActive: "Activa", statusPlanned: "Estructura definida" },
  en: { eyebrow: "Program", mapped: "connected path", progress: "Progress", mastery: "Mastery", coverage: "Coverage", current: "Current unit", open: "Open unit", structural: "Coming later", capstone: "Final integration", unit: "Unit", units: "Units", skills: "skills", evidence: "evidence", checkpoint: "checkpoint", back: "Back to program", foundation: "Economic foundation", begin: "Begin", continue: "Continue", completed: "Completed", ready: "Ready", locked: "Available after completing the foundation", nextStep: "Your next step", existing: "Progress recognizes prior evidence and completions.", checkpointTitle: "Integrated decision", statusActive: "Active", statusPlanned: "Structure defined" },
};
