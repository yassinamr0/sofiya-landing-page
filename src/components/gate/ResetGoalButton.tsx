"use client";

import { resetGoal } from "@/lib/goal-store";

/** Development only: forget the gate answer and show the gate again. */
export function ResetGoalButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        resetGoal();
        window.scrollTo(0, 0);
      }}
      className="hidden min-h-11 items-center px-2.5 text-note whitespace-nowrap text-muted transition-colors duration-150 hover:text-ink min-[640px]:inline-flex"
    >
      {label}
    </button>
  );
}
