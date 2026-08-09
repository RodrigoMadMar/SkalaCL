export type DecisionReadiness = {
  sourcesReady: boolean;
  citationsReady: boolean;
  decisionReady: boolean;
  completed: number;
  readyToAdvance: boolean;
};

export function getDecisionReadiness(evidenceViewed: string[], citedEvidence: string[], hasDecision = false): DecisionReadiness {
  const sourcesReady = new Set(evidenceViewed).size >= 4;
  const citationsReady = new Set(citedEvidence).size >= 2;
  const decisionReady = hasDecision;
  const completed = [sourcesReady, citationsReady, decisionReady].filter(Boolean).length;
  return { sourcesReady, citationsReady, decisionReady, completed, readyToAdvance: sourcesReady && citationsReady };
}
