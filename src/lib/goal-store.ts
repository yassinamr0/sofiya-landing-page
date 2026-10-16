"use client";

import { useSyncExternalStore } from "react";
import type { Goal } from "@/content";
import { clearGoal, isGoal, saveGoal } from "./goal";

// The current goal lives on <html data-goal>. The boot script in layout.tsx
// sets it before first paint, CSS uses it to show either the gate or the page,
// and components read it with useGoal().

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Goal | null {
  const goal = document.documentElement.dataset.goal;
  return isGoal(goal) ? goal : null;
}

function getServerSnapshot(): Goal | null {
  return null;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function useGoal(): Goal | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function chooseGoal(goal: Goal): void {
  saveGoal(goal);
  document.documentElement.dataset.goal = goal;
  notify();
}

export function resetGoal(): void {
  clearGoal();
  delete document.documentElement.dataset.goal;
  notify();
}
