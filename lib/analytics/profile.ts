export type ProfileAnalyticsName = "profile_opened" | "profile_share_previewed";

export function trackProfileEvent(name: ProfileAnalyticsName, metadata: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("skala:analytics", { detail: { name, metadata, occurredAt: new Date().toISOString() } }));
}
