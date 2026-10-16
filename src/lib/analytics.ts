import type { ApplySource, Goal } from "@/content";

// The only events the page tracks. No personal data, no third-party cookies.
export type AnalyticsEvent =
  | { name: "gate_choice"; goal: Goal }
  | { name: "video_play"; goal: Goal }
  | { name: "apply_click"; source: ApplySource; goal: Goal | null }
  | { name: "form_open"; source: ApplySource };

export function track(event: AnalyticsEvent): void {
  // Logs in development only. A privacy-friendly analytics provider is wired up in Step 7.
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event);
  }
}
