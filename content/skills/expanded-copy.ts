import type { Locale } from "@/i18n/config";

const copy = {
  "es-CL": {
    meta: { back: "← Volver a Tu Skala", sequence: "SECUENCIA", saved: "PROGRESO GUARDADO", restart: "Reiniciar práctica", minutes: "MIN" },
    entry: { eyebrow: "PRÁCTICA DE DECISIÓN", body: "Una skill breve para cambiar cómo lees una decisión real, no para memorizar una definición.", cta: "Comenzar" },
    think: { eyebrow: "PIENSA ANTES DE VER EL MODELO", title: "¿Cómo leerías esta situación hoy?", helper: "Forma una tesis inicial. No se evalúa como correcta o incorrecta.", placeholder: "Explica qué señal priorizarías y por qué…", cta: "Guardar mi lectura" },
    reveal: { eyebrow: "MODELO MENTAL", title: "Tres capas para razonar mejor", body: "Abre cada capa. El objetivo es entender el mecanismo y también dónde deja de funcionar.", labels: ["La intuición que falla", "El mecanismo", "La frontera"], cta: "Aplicar el modelo" },
    application: { eyebrow: "APLICACIÓN", title: "Toma una posición", body: "Usa el modelo para hacer una recomendación. Prioriza la evidencia que realmente cambia la decisión.", prompt: "¿Qué harías y qué trade-off aceptarías?", placeholder: "Recomendación, evidencia y costo aceptado…", cta: "Tensionar mi respuesta" },
    challenge: { eyebrow: "DESAFÍO DE SKALA", title: "Prueba tu tesis bajo otra condición", context: "Skala está tensionando el mecanismo de tu respuesta, no buscando una palabra correcta.", answer: "¿Qué cambia —o por qué no cambia— en tu recomendación?", placeholder: "Revisa o defiende tu tesis con lógica condicional…", cta: "Cerrar mi decisión" },
    transfer: { eyebrow: "TRANSFERENCIA", title: "Reconoce el mecanismo en otro contexto", distractors: ["La métrica más visible debería decidir por sí sola.", "La opción con mayor crecimiento siempre es preferible.", "El contexto nuevo no debería cambiar una decisión bien tomada."], cta: "Registrar evidencia" },
    summary: { eyebrow: "SKILL COMPLETADA", updated: "Tu Skala se actualizó", application: "APLICACIÓN", adaptability: "ADAPTABILIDAD", transfer: "TRANSFERENCIA", mastery: "DOMINIO", evidence: "2 evidencias agregadas", distinction: "Completar registra actividad. El dominio sólo cambia desde evidencia evaluada y esta práctica no implica expertise demostrado.", next: "Siguiente paso sugerido", graph: "Ver cambio en Tu Skala" },
    dimensions: { framing: "Encuadre", mechanism: "Mecanismo", application: "Aplicación", adaptability: "Adaptabilidad" },
    validation: { response: "Desarrolla tu razonamiento antes de continuar.", transfer: "Selecciona una respuesta." },
  },
  en: {
    meta: { back: "← Back to Your Skala", sequence: "SEQUENCE", saved: "PROGRESS SAVED", restart: "Restart practice", minutes: "MIN" },
    entry: { eyebrow: "DECISION PRACTICE", body: "A short skill designed to change how you read a real decision, not to memorize a definition.", cta: "Start" },
    think: { eyebrow: "THINK BEFORE THE MODEL", title: "How would you read this situation today?", helper: "Form an initial thesis. It is not graded as right or wrong.", placeholder: "Explain which signal you would prioritize and why…", cta: "Save my reading" },
    reveal: { eyebrow: "MENTAL MODEL", title: "Three layers for better reasoning", body: "Open each layer. The goal is to understand the mechanism and where it stops working.", labels: ["The intuition that fails", "The mechanism", "The boundary"], cta: "Apply the model" },
    application: { eyebrow: "APPLICATION", title: "Take a position", body: "Use the model to make a recommendation. Prioritize the evidence that actually changes the decision.", prompt: "What would you do and which trade-off would you accept?", placeholder: "Recommendation, evidence and accepted cost…", cta: "Pressure-test my answer" },
    challenge: { eyebrow: "SKALA CHALLENGE", title: "Test your thesis under another condition", context: "Skala is pressuring the mechanism in your response, not looking for one correct word.", answer: "What changes —or why does it not change— in your recommendation?", placeholder: "Revise or defend your thesis with conditional reasoning…", cta: "Close my decision" },
    transfer: { eyebrow: "TRANSFER", title: "Recognize the mechanism in another context", distractors: ["The most visible metric should decide by itself.", "The option with the most growth is always preferable.", "New context should not change a well-made decision."], cta: "Record evidence" },
    summary: { eyebrow: "SKILL COMPLETE", updated: "Your Skala updated", application: "APPLICATION", adaptability: "ADAPTABILITY", transfer: "TRANSFER", mastery: "MASTERY", evidence: "2 evidence events added", distinction: "Completion records activity. Mastery changes only from assessed evidence and this practice does not imply demonstrated expertise.", next: "Suggested next step", graph: "See change in Your Skala" },
    dimensions: { framing: "Framing", mechanism: "Mechanism", application: "Application", adaptability: "Adaptability" },
    validation: { response: "Develop your reasoning before continuing.", transfer: "Select an answer." },
  },
};

export function getExpandedSkillCopy(locale: Locale) { return copy[locale]; }
