"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

// The goose's code is only fetched when it is about to play.
const Goose = dynamic(() => import("./Goose"), { ssr: false });

const PLAYED_KEY = "sv-goose";
// Backup for when sessionStorage is blocked: at least never twice in one page view.
let playedThisPageView = false;

function hasPlayed(): boolean {
  if (playedThisPageView) return true;
  try {
    return window.sessionStorage.getItem(PLAYED_KEY) === "1";
  } catch {
    return false;
  }
}

function markPlayed(): void {
  playedThisPageView = true;
  try {
    window.sessionStorage.setItem(PLAYED_KEY, "1");
  } catch {}
}

// Lets the hero's entrance fade finish, so the button is measured where it rests.
const SETTLE_MS = 900;

type Stage = { target: HTMLElement; root: HTMLElement };

/**
 * Starts the goose once per visit, as soon as the hero's Apply button is
 * properly on screen. The page (and so the button) is hidden behind the gate
 * until it is answered, so this also means "after the gate".
 */
export function GooseLoader() {
  const [stage, setStage] = useState<Stage | null>(null);
  const finish = useCallback(() => setStage(null), []);

  useEffect(() => {
    if (hasPlayed()) return;
    const target = document.querySelector<HTMLElement>("[data-goose-target] a");
    const root = document.querySelector<HTMLElement>(".page-root");
    if (!target || !root) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        // Scrolled past before it settled: wait for the next time it is on screen.
        if (!entry.isIntersecting || hasPlayed()) return;
        timer = window.setTimeout(() => {
          observer.disconnect();
          markPlayed();
          setStage({ target, root });
        }, SETTLE_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return stage ? <Goose target={stage.target} root={stage.root} onDone={finish} /> : null;
}
