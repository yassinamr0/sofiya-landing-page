"use client";

import type { ApplySource } from "@/content";
import { track } from "@/lib/analytics";
import { APPLY_FORM_URL } from "@/lib/config";
import { readGoal } from "@/lib/goal";

type Props = {
  /** Which button this is, so analytics can tell them apart. */
  source: ApplySource;
  label: string;
  size?: "default" | "small";
  className?: string;
};

const sizes = {
  default: "min-h-14 px-9",
  small: "min-h-11 px-5",
};

/** The one Apply button. Every "Apply now" on the page renders this. */
export function ApplyButton({ source, label, size = "default", className = "" }: Props) {
  function handleClick() {
    track({ name: "apply_click", source, goal: readGoal() });
    if (APPLY_FORM_URL.startsWith("http")) track({ name: "form_open", source });
  }

  return (
    // Same tab on purpose: new tabs are unreliable in the Instagram in-app browser.
    <a
      href={APPLY_FORM_URL}
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap bg-accent font-text text-body font-bold text-on-accent transition-[transform,background-color] duration-150 ease-press hover:bg-ink active:scale-97 ${sizes[size]} ${className}`}
    >
      {label}
    </a>
  );
}
