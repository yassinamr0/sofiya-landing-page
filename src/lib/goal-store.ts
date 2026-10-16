"use client";

import { useSyncExternalStore } from "react";
import type { Goal } from "@/content";
import { readGoal } from "./goal";

// The current goal lives on <html data-goal>. CSS uses it to show either the
// gate or the page, and components read it with useGoal(). It is not saved,
// so every visit starts at the gate.

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getServerSnapshot(): Goal | null {
  return null;
}

function notify() {
  listeners.forEach((listener) => listener());
}

export function useGoal(): Goal | null {
  return useSyncExternalStore(subscribe, readGoal, getServerSnapshot);
}

export function chooseGoal(goal: Goal): void {
  document.documentElement.dataset.goal = goal;
  notify();
}

export function resetGoal(): void {
  delete document.documentElement.dataset.goal;
  notify();
}
