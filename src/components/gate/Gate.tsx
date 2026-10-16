"use client";

import { useState, type CSSProperties } from "react";
import type { Content, Goal } from "@/content";
import { track } from "@/lib/analytics";
import { chooseGoal } from "@/lib/goal-store";
import { MaskedLines } from "../MaskedLines";
import { Reveal } from "../Reveal";
import { BroomArt, CalfArt } from "./Illustrations";

const ART: Record<Goal, typeof CalfArt> = { lose: CalfArt, gain: BroomArt };
const GOALS: Goal[] = ["lose", "gain"];

// How long the picked card flashes and the gate slides away before the page shows.
const LEAVE_MS = 500;

/** "What are you?": the full-screen question every new visitor answers first. */
export function Gate({ content }: { content: Content["gate"] }) {
  const [picked, setPicked] = useState<Goal | null>(null);

  function pick(goal: Goal) {
    if (picked) return;
    setPicked(goal);
    track({ name: "gate_choice", goal });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        chooseGoal(goal);
        setPicked(null);
        window.scrollTo(0, 0);
        // Move keyboard and screen-reader users to the page they just unlocked.
        document.getElementById("page")?.focus({ preventScroll: true });
      },
      reduceMotion ? 0 : LEAVE_MS,
    );
  }

  return (
    <section
      aria-labelledby="gate-title"
      className={`gate flex min-h-svh flex-col justify-center px-(--margin) py-8 ${picked ? "is-leaving" : ""}`}
    >
      <Reveal className="flex w-full flex-col gap-[clamp(28px,5vh,56px)]">
        <div className="text-center">
          <h1 id="gate-title" className="font-display text-shout font-bold uppercase">
            <MaskedLines lines={content.title} lineClassName="min-[900px]:inline-block min-[900px]:align-top" />
          </h1>
          <p className="fade mt-[18px]" style={{ "--d": "260ms" } as CSSProperties}>
            {content.subtitle}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-[clamp(10px,1.6vw,24px)] min-[900px]:max-w-[920px]">
          {GOALS.map((goal, i) => {
            const option = content.options[goal];
            const Art = ART[goal];
            const isPicked = picked === goal;
            return (
              <div key={goal} className="fade" style={{ "--d": `${340 + i * 80}ms` } as CSSProperties}>
                <button
                  type="button"
                  aria-label={option.ariaLabel}
                  onClick={() => pick(goal)}
                  className={`choice group flex w-full flex-col p-[clamp(8px,1vw,16px)] text-center transition-[transform,background-color,color] duration-200 ease-press active:scale-97 ${
                    isPicked ? "is-picked bg-accent text-on-accent" : "grain bg-surface text-ink hover:bg-surface-2"
                  }`}
                >
                  <span className="choice-art grid aspect-square place-items-center min-[900px]:aspect-[4/3]">
                    <Art className="h-[82%] w-[82%] transition-transform duration-400 ease-reveal group-hover:scale-106 group-hover:-rotate-3" />
                  </span>
                  <span
                    className={`block pt-3.5 pb-2 font-display text-title leading-none font-semibold tracking-[0.01em] uppercase transition-colors duration-200 ${
                      isPicked ? "" : "group-hover:text-accent"
                    }`}
                  >
                    {option.name}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <p className="fade text-center text-note text-muted" style={{ "--d": "500ms" } as CSSProperties}>
          {content.note}
        </p>
      </Reveal>
    </section>
  );
}
