export type CaseAnalyticsName =
  | "case_started" | "case_evidence_viewed" | "case_decision_submitted" | "case_challenge_answered"
  | "case_revision_submitted" | "case_completed" | "case_mastery_updated";

export function trackCaseEvent(name: CaseAnalyticsName, metadata: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("skala:analytics", { detail: { name, metadata, occurredAt: new Date().toISOString() } }));
}
