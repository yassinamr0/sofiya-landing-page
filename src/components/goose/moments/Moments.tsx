import type { ReactNode } from "react";
import { GooseFigure, INK, LINE, ORANGE, PINK, WHITE } from "../GooseArt";
import { GooseScene } from "./GooseScene";

// The goose's small moments further down the page, one per section. Each is a
// hand-drawn SVG whose parts move with CSS keyframes (globals.css, "Goose
// moments"), started by <GooseScene> when it scrolls into view. Transform and
// opacity only; nothing here takes the pointer.

const TAPE = "#FFC93C";

/** The goose mirrored to face left (towards the start of a line in left-to-right text). */
function FacingLeft({ children }: { children: ReactNode }) {
  return <g transform="translate(120 0) scale(-1 1)">{children}</g>;
}

/**
 * Chats, inside the "Most programs" screen: the goose waits for a reply,
 * slowly slumps against the wall and nods off while a tumbleweed rolls by.
 */
export function LonelyGoose() {
  return (
    <GooseScene threshold={0.9} className="lonely pointer-events-none absolute inset-x-0 bottom-0 h-[110px] overflow-hidden">
      <svg viewBox="0 0 120 140" aria-hidden="true" className="lonely-goose absolute start-1 bottom-1 h-[96px] w-auto">
        <GooseFigure />
      </svg>
      {/* A cobweb in the corner by its head, for the "still waiting" look. */}
      <svg viewBox="0 0 40 40" aria-hidden="true" className="lonely-web absolute start-0 top-0 size-[38px]">
        <path
          d="M0 0L38 38M0 14Q14 14 14 0M0 26Q24 26 26 0M0 38Q36 36 38 0M0 0L20 38M0 0L38 20"
          stroke={WHITE}
          strokeOpacity="0.45"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <span aria-hidden="true" className="lonely-zzz absolute start-[86px] bottom-[64px] font-display text-[18px] leading-none font-semibold text-muted">
        z<span className="text-[13px]"> z</span><span className="text-[10px]"> z</span>
      </span>
      <span className="tumbleweed absolute bottom-2 start-full block size-[34px]">
        <svg viewBox="0 0 40 40" aria-hidden="true" className="size-full">
          <g stroke="#B08A55" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <circle cx="20" cy="20" r="16" />
            <path d="M6 14Q20 26 34 12M8 28Q20 10 32 30M14 5Q26 20 12 35M26 5Q14 20 28 35M4 21Q20 18 36 22" />
          </g>
        </svg>
      </span>
    </GooseScene>
  );
}

/**
 * "This is not a template": the goose, tape measure round its neck, measures
 * the plan like a tailor fitting a suit, ticks it, and the tape snaps back.
 */
export function TailorGoose({ planLabel }: { planLabel: string }) {
  return (
    <GooseScene className="tailor mt-[clamp(24px,3vw,40px)]">
      <svg viewBox="0 0 290 150" aria-hidden="true" className="h-[clamp(120px,14vw,150px)] w-auto max-w-full">
        {/* The plan, a sheet of paper. */}
        <g>
          <rect x="150" y="48" width="132" height="98" fill={WHITE} stroke={LINE} strokeWidth="2" />
          <text x="162" y="74" fill={LINE} fontSize="15" fontWeight="700" className="font-display uppercase" letterSpacing="0.04em">
            {planLabel}
          </text>
          <path d="M162 92H266M162 106H252M162 120H260M162 134H232" stroke="#C9C9C2" strokeWidth="3" strokeLinecap="round" />
          <path
            className="tailor-check"
            pathLength={1}
            d="M236 104L248 118L270 88"
            stroke={PINK}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        <g transform="translate(6 10)">
          <GooseFigure
            headExtra={
              <>
                {/* The tape draped round its neck. */}
                <path d="M68 60Q80 70 90 58" stroke={TAPE} strokeWidth="5" fill="none" strokeLinecap="round" />
                <path d="M68 60L62 96M90 58L94 88" stroke={TAPE} strokeWidth="5" strokeLinecap="round" />
                {/* The end it pulls across the plan, held in the bill. */}
                <g className="tailor-tape">
                  <rect x="110" y="28" width="168" height="8" fill={TAPE} stroke={LINE} strokeWidth="1.2" />
                  <path
                    d={Array.from({ length: 20 }, (_, i) => `M${116 + i * 8} 28V${i % 2 ? 31 : 33}`).join("")}
                    stroke={LINE}
                    strokeWidth="1.2"
                  />
                </g>
              </>
            }
          />
        </g>
      </svg>
    </GooseScene>
  );
}

/**
 * "I'm starting from zero": the goose does pull-ups on the card's top edge
 * (only its head and wing tips show above it), then says its line.
 */
export function PullUpGoose({ line }: { line: string }) {
  return (
    <GooseScene threshold={1} className="pullup relative h-[64px] overflow-hidden">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute start-[clamp(20px,6vw,64px)] bottom-0 h-[100px] w-[100px]">
        <g className="pullup-body">
          {/* Neck and head, rising above the edge. */}
          <path d="M48 120V70" stroke={LINE} strokeWidth="17" strokeLinecap="round" />
          <path d="M48 120V70" stroke={WHITE} strokeWidth="13" strokeLinecap="round" />
          <circle cx="50" cy="58" r="13" fill={WHITE} stroke={LINE} strokeWidth="2" />
          <path d="M60 55L80 62L60 67Z" fill={ORANGE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="54" cy="55" r="2.4" fill={INK} />
          {/* Straining. */}
          <path d="M47 47L58 51" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M30 50L25 46M29 58H23" stroke={WHITE} strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Wing tips gripping the edge. */}
        <ellipse cx="26" cy="97" rx="10" ry="5" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <ellipse cx="74" cy="97" rx="10" ry="5" fill={WHITE} stroke={LINE} strokeWidth="2" />
      </svg>
      <span className="pullup-bubble absolute bottom-[26px] start-[calc(clamp(20px,6vw,64px)+104px)] rounded-[14px] bg-ink px-3 py-1.5 font-display text-[16px] leading-none font-semibold whitespace-nowrap text-bg uppercase">
        {line}
      </span>
    </GooseScene>
  );
}

/** "Not for you if... you want a quick fix": a quick-fix pill rolls up and the goose kicks it away. */
export function KickGoose({ pillLabel }: { pillLabel: string }) {
  return (
    <GooseScene className="kick mt-[clamp(20px,3vw,32px)]">
      <svg viewBox="0 0 300 140" aria-hidden="true" className="h-[110px] w-auto">
        <GooseFigure />
        <g className="kick-pill">
          <g transform="translate(134 124) scale(0.85)">
            <path d="M-46 -15H0V15H-46A15 15 0 0 1 -46 -15Z" fill={PINK} />
            <path d="M0 -15H46A15 15 0 0 1 46 15H0Z" fill={WHITE} />
            <rect x="-61" y="-15" width="122" height="30" rx="15" fill="none" stroke={LINE} strokeWidth="2" />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill={INK}
              fontSize="14"
              fontWeight="700"
              className="font-display uppercase"
              letterSpacing="0.06em"
            >
              {pillLabel}
            </text>
          </g>
        </g>
      </svg>
    </GooseScene>
  );
}

/**
 * Final call: the goose in a bow tie holds the Apply button open like a door
 * and bows, "after you". The button stays a normal, clickable link.
 */
export function DoorGoose({ children }: { children: ReactNode }) {
  return (
    <GooseScene threshold={1} className="door relative inline-block">
      {/* The light behind the door, seen while it swings open. */}
      <span aria-hidden="true" className="door-light absolute inset-0 bg-ink" />
      {children}
      <svg
        viewBox="0 0 120 140"
        aria-hidden="true"
        className="door-goose pointer-events-none absolute start-full bottom-0 ms-1.5 h-[clamp(76px,9vw,96px)] w-auto"
      >
        <FacingLeft>
          <GooseFigure
            bodyExtra={
              <g>
                <path d="M64 72L76 78L64 84ZM88 72L76 78L88 84Z" fill={PINK} stroke={LINE} strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="76" cy="78" r="3" fill={PINK} stroke={LINE} strokeWidth="1.5" />
              </g>
            }
          />
        </FacingLeft>
      </svg>
    </GooseScene>
  );
}
