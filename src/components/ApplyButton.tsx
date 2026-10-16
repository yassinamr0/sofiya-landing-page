"use client";

import type { MouseEvent } from "react";
import type { ApplySource } from "@/content";
import { analyticsEnabled, track } from "@/lib/analytics";
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

const opensForm = APPLY_FORM_URL.startsWith("http");
// Longest the click waits for its analytics event before opening the form.
const SEND_WAIT_MS = 300;

/** The one Apply button. Every "Apply now" on the page renders this. */
export function ApplyButton({ source, label, size = "default", className = "" }: Props) {
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const sent = Promise.all([
      track({ name: "apply_click", source, goal: readGoal() }),
      opensForm ? track({ name: "form_open", source }) : Promise.resolve(),
    ]);

    // When events are really sent, hold the navigation a moment so leaving the
    // page doesn't cancel them. New-tab clicks (modifier keys) go straight through.
    const plainClick = e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
    if (!analyticsEnabled || !opensForm || !plainClick) return;
    e.preventDefault();
    const timeout = new Promise((resolve) => window.setTimeout(resolve, SEND_WAIT_MS));
    Promise.race([sent, timeout]).then(() => window.location.assign(APPLY_FORM_URL));
  }

  return (
    // Same tab on purpose: new tabs are unreliable in the Instagram in-app browser.
    <a
      href={APPLY_FORM_URL}
      onClick={handleClick}
      className={`inline-flex items-center justify-center whitespace-nowrap select-none [-webkit-touch-callout:none] bg-accent font-text text-body font-bold text-on-accent transition-[transform,background-color] duration-150 ease-press hover:bg-ink active:scale-97 ${sizes[size]} ${className}`}
    >
      {label}
    </a>
  );
}
