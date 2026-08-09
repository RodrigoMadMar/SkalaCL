export type LearningAnalyticsName =
  | "skill_started" | "think_submitted" | "visual_interacted" | "application_submitted"
  | "ai_challenge_shown" | "ai_challenge_answered" | "final_decision_submitted"
  | "recall_submitted" | "skill_completed" | "mastery_updated" | "graph_update_viewed" | "next_move_opened";

export function trackLearningEvent(name: LearningAnalyticsName, metadata: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("skala:analytics", { detail: { name, metadata, occurredAt: new Date().toISOString() } }));
}
