import type { Goal } from "@/content";

// The gate answer is remembered so a returning visitor skips the gate.
// Storage can be missing or blocked (private mode, in-app browsers), so every
// access is wrapped and the page works without it.

const KEY = "sv-goal";

export function isGoal(value: unknown): value is Goal {
  return value === "lose" || value === "gain";
}

export function readGoal(): Goal | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return isGoal(value) ? value : null;
  } catch {
    return null;
  }
}

export function saveGoal(goal: Goal): void {
  try {
    window.localStorage.setItem(KEY, goal);
  } catch {}
}

export function clearGoal(): void {
  try {
    window.localStorage.removeItem(KEY);
  } catch {}
}
