import type { Goal } from "@/content";

// The gate answer lives only on <html data-goal> for the current page view:
// every visit starts at the gate.

export function isGoal(value: unknown): value is Goal {
  return value === "lose" || value === "gain";
}

export function readGoal(): Goal | null {
  const value = document.documentElement.dataset.goal;
  return isGoal(value) ? value : null;
}
