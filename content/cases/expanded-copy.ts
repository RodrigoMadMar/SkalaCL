import type { Locale } from "@/i18n/config";
import { getAICopilotCaseCopy } from "./ai-copilot-economics";

export function getExpandedCaseCopy(locale: Locale) {
  const base = getAICopilotCaseCopy(locale);
  return {
    ...base,
    meta: { ...base.meta, caseCode: locale === "es-CL" ? "CASO" : "CASE" },
    evidence: { ...base.evidence, body: locale === "es-CL" ? "Revisa las fuentes antes de decidir. Contrasta señales de mercado, economía y comportamiento." : "Review the sources before deciding. Contrast market, economic and behavioral signals.", requirement: locale === "es-CL" ? "Revisa todas las fuentes para continuar." : "Review every source to continue." },
    challenge: { ...base.challenge, context: locale === "es-CL" ? "Skala tensionó un supuesto de tu recomendación. No busca una opción predeterminada." : "Skala pressured an assumption in your recommendation. It is not looking for a predetermined option." },
  };
}
