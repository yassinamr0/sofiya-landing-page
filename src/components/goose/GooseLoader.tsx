"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

// The goose's code is split out of the main bundle and fetched as soon as the page mounts.
const loadGoose = () => import("./Goose");
const Goose = dynamic(loadGoose, { ssr: false });

// Never twice in one page view (e.g. after "Pick again" in development).
let playedThisPageView = false;

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve));

type Stage = { target: HTMLElement; root: HTMLElement };

/**
 * Starts the goose every time the page is opened, as soon as the hero's Apply
 * button is properly on screen. The page (and so the button) is hidden behind
 * the gate until it is answered, so this also means "after the gate".
 */
export function GooseLoader() {
  const [stage, setStage] = useState<Stage | null>(null);
  const [run, setRun] = useState(0);
  const finish = useCallback(() => setStage(null), []);
  const replay = useCallback(() => setRun((n) => n + 1), []);

  useEffect(() => {
    if (playedThisPageView) return;
    loadGoose();
    const target = document.querySelector<HTMLElement>("[data-goose-target] a");
    const root = document.querySelector<HTMLElement>(".page-root");
    if (!target || !root) return;

    let visible = false;
    let waiting = false;
    const start = async () => {
      if (waiting) return;
      waiting = true;
      // Two frames, so the hero's entrance fade has started (the goose allows for the rest).
      await nextFrame();
      await nextFrame();
      waiting = false;
      // Scrolled past before it settled: wait for the next time it is on screen.
      if (!visible || playedThisPageView) return;
      observer.disconnect();
      playedThisPageView = true;
      setStage({ target, root });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { threshold: 0.6 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return stage ? <Goose key={run} target={stage.target} root={stage.root} onDone={finish} onReplay={replay} /> : null;
}
