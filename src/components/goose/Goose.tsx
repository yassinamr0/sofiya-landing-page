"use client";

import { useEffect, useRef } from "react";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/easing";
import { BuffGoose, Burst, NECK_PIVOT, WalkingGoose } from "./GooseArt";

// Canvas size of the drawings, and where the feet stand.
const VIEW_W = 120;
const VIEW_H = 140;
const FEET_Y = 136;

// The peck: how far the neck tips forward, and where the bill tip lands (canvas units).
const PECK_ANGLE = 58;
const PECK_TIP_X = 142.3;
/** How far (px) the bill presses into the button's edge at the bottom of a peck. */
const BITE = 3;

const WALK_SPEED = 340; // px per second
/** The buff goose is visibly bigger than the one that walked in. */
const BUFF_SCALE = 1.15;
const PECK_MS = 320;

type Props = {
  /** The Apply link to peck. */
  target: HTMLElement;
  /** Positioned ancestor the goose layer covers; coordinates are relative to it. */
  root: HTMLElement;
  onDone: () => void;
};

/**
 * The signature moment: a goose waddles in from the side, pecks the Apply
 * button twice, turns buff, flexes, and runs off the way it came.
 *
 * Plays for every visitor, with no reduced-motion variant: a deliberate
 * project rule (CLAUDE.md), the one exception to the site's motion rules.
 * Only transform and opacity animate. The layer ignores the pointer, so the
 * button stays clickable throughout.
 */
export default function Goose({ target, root, onDone }: Props) {
  const gooseRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const goose = gooseRef.current;
    const face = faceRef.current;
    if (!goose || !face) return;

    const walk = goose.querySelector<SVGSVGElement>(".goose-walk")!;
    const buff = goose.querySelector<SVGSVGElement>(".goose-buff")!;
    const burst = goose.querySelector<SVGSVGElement>(".goose-burst")!;
    const head = goose.querySelector<SVGGElement>(".goose-head")!;
    // The neck pecks by turning around its base.
    head.style.transformBox = "view-box";
    head.style.transformOrigin = `${NECK_PIVOT.x}px ${NECK_PIVOT.y}px`;

    const running: Animation[] = [];
    let cancelled = false;

    const play = (el: Element, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = el.animate(keyframes, { fill: "forwards", ...options });
      running.push(animation);
      return animation.finished;
    };
    const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));
    const at = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`;

    const run = async () => {
      const viewportWidth = document.documentElement.clientWidth;
      const height = viewportWidth < 640 ? 120 : 150;
      const scale = height / VIEW_H;
      const width = VIEW_W * scale;
      goose.style.width = `${width}px`;
      goose.style.height = `${height}px`;

      const button = target.getBoundingClientRect();
      const origin = root.getBoundingClientRect();

      // Come in from the right whenever the goose fits there: the hero button sits at the
      // start of its row, so the left side means walking across the headline beside it.
      const fromRight = viewportWidth - button.right >= width + 24 || viewportWidth - button.right >= button.left;
      // The button may still be rising in with the hero's fade: stand where it will come to rest.
      const fade = target.closest<HTMLElement>(".fade");
      const rising = fade ? new DOMMatrix(getComputedStyle(fade).transform).m42 : 0;
      const top = button.bottom - rising - origin.top - FEET_Y * scale;
      const tip = PECK_TIP_X * scale;
      // Stand so that at the bottom of a peck the bill just presses the button's near edge.
      const standX = fromRight
        ? button.right - origin.left - BITE - (width - tip)
        : button.left - origin.left + BITE - tip;
      const offscreenX = fromRight ? viewportWidth - origin.left + 8 : -width - origin.left - 8;
      const facing = (towardButton: boolean) =>
        (face.style.transform = fromRight === towardButton ? "scaleX(-1)" : "none");

      // 1. Waddle in at a steady walking pace.
      facing(true);
      goose.style.transform = at(offscreenX, top);
      goose.style.opacity = "1";
      goose.classList.add("is-walking");
      const walkMs = Math.min(1200, Math.max(500, (Math.abs(standX - offscreenX) / WALK_SPEED) * 1000));
      await play(goose, [{ transform: at(offscreenX, top) }, { transform: at(standX, top) }], {
        duration: walkMs,
        easing: "linear",
      });
      goose.classList.remove("is-walking");
      if (cancelled) return;
      await wait(60);

      // 2. Two pecks; the button takes each one with a small press.
      const push = fromRight ? -3 : 3;
      for (let i = 0; i < 2 && !cancelled; i++) {
        const peck = play(
          head,
          [
            { transform: "rotate(0deg)", easing: EASE_IN_OUT },
            { transform: `rotate(${PECK_ANGLE}deg)`, offset: 0.45, easing: EASE_IN_OUT },
            { transform: "rotate(0deg)" },
          ],
          { duration: PECK_MS, easing: "linear" },
        );
        window.setTimeout(() => {
          if (cancelled) return;
          running.push(
            target.animate(
              [
                { transform: "none" },
                { transform: `translateX(${push}px) scale(0.96)` },
                { transform: "none" },
              ],
              { duration: 160, easing: EASE_OUT },
            ),
          );
        }, PECK_MS * 0.45);
        await peck;
      }
      if (cancelled) return;
      await wait(60);

      // 3. Turns buff: the plain goose shrinks away, the buff one pops in with a burst.
      play(walk, [{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(0.94)" }], {
        duration: 140,
        easing: EASE_OUT,
      });
      play(
        burst,
        [
          { opacity: 0, transform: "scale(0.9)" },
          { opacity: 1, transform: "scale(1.04)", offset: 0.35 },
          { opacity: 0, transform: "scale(1.15)" },
        ],
        { duration: 520, easing: EASE_OUT },
      );
      await play(
        buff,
        [
          { opacity: 0, transform: "scale(0.94)", easing: EASE_OUT },
          { opacity: 1, transform: `scale(${BUFF_SCALE + 0.1})`, offset: 0.55, easing: EASE_OUT },
          { opacity: 1, transform: `scale(${BUFF_SCALE})` },
        ],
        { duration: 380, easing: "linear" },
      );
      if (cancelled) return;

      // 4. Double flex.
      await play(
        buff,
        [
          { transform: `scale(${BUFF_SCALE})`, easing: EASE_IN_OUT },
          { transform: `scale(${BUFF_SCALE + 0.07})`, offset: 0.25, easing: EASE_IN_OUT },
          { transform: `scale(${BUFF_SCALE})`, offset: 0.5, easing: EASE_IN_OUT },
          { transform: `scale(${BUFF_SCALE + 0.07})`, offset: 0.75, easing: EASE_IN_OUT },
          { transform: `scale(${BUFF_SCALE})` },
        ],
        { duration: 600, easing: "linear" },
      );
      if (cancelled) return;
      await wait(140);

      // 5. Turns around and runs off the way it came.
      facing(false);
      goose.classList.add("is-running");
      await play(goose, [{ transform: at(standX, top) }, { transform: at(offscreenX, top) }], {
        duration: 550,
        easing: EASE_IN_OUT,
      });
      if (!cancelled) onDone();
    };

    // A layout change mid-run would leave the goose pecking thin air: end it instead.
    const stop = () => {
      cancelled = true;
      running.forEach((a) => a.cancel());
      onDone();
    };
    window.addEventListener("resize", stop);
    run();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", stop);
      running.forEach((a) => a.cancel());
    };
  }, [target, root, onDone]);

  return (
    <div className="goose-layer" aria-hidden="true">
      <div ref={gooseRef} className="goose">
        <div ref={faceRef} className="goose-face">
          <Burst />
          <BuffGoose />
          <WalkingGoose />
        </div>
      </div>
    </div>
  );
}
