import type { ReactNode } from "react";
import { Arm, GooseFigure, INK, LINE, MUSCLE, ORANGE, PINK, WHITE } from "../GooseArt";
import { GooseScene } from "./GooseScene";

// The goose's small moments further down the page. Each is a hand-drawn SVG
// whose parts move with CSS keyframes (globals.css, "Goose moments"), started
// by <GooseScene> when it scrolls into view and replayed when the goose is
// tapped. Transform and opacity only; wrappers never take the pointer.

const TAPE = "#FFC93C";
const WOOD = "#8A5A3C";

/** The goose mirrored to face left (towards the start of a line in left-to-right text). */
function FacingLeft({ children }: { children: ReactNode }) {
  return <g transform="translate(120 0) scale(-1 1)">{children}</g>;
}

/** A strip of tape measure, `length` long, lying along the x axis from (x, y). */
function Tape({ x, y, length }: { x: number; y: number; length: number }) {
  const ticks = Array.from({ length: Math.floor(length / 8) }, (_, i) => `M${x + 4 + i * 8} ${y}V${y + (i % 2 ? 3 : 5)}`);
  return (
    <>
      <rect x={x} y={y} width={length} height="7" fill={TAPE} stroke={LINE} strokeWidth="1.2" />
      <path d={ticks.join("")} stroke={LINE} strokeWidth="1.2" />
    </>
  );
}

/** Buff goose head and thick neck, facing right, used by the buff moments. */
function BuffHead({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 60V10" stroke={LINE} strokeWidth="22" strokeLinecap="round" />
      <path d="M0 60V10" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
      <circle cx="2" cy="0" r="13" fill={WHITE} stroke={LINE} strokeWidth="2" />
      <path d="M14 -3L33 4L14 9Z" fill={ORANGE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="6" cy="-1" r="2.4" fill={INK} />
      <rect x="-11" y="-12" width="26" height="6" rx="2" fill={PINK} stroke={LINE} strokeWidth="1.5" />
    </g>
  );
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
 * Chats, on the "Here" screen's top edge: a buff goose sits with its legs
 * dangling over the edge, texting nonstop.
 */
export function TextingGoose() {
  return (
    <GooseScene threshold={0.6} className="texting pointer-events-none absolute end-3 bottom-[calc(100%-36px)] h-[112px] w-[92px]">
      <svg viewBox="0 0 120 146" aria-hidden="true" className="size-full">
        <FacingLeft>
          {/* Legs hang over the card's edge (y = 110). */}
          <g className="texting-leg texting-leg-a">
            <path d="M54 108L50 136" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
            <path d="M50 134L61 139H42Z" fill={ORANGE} stroke={LINE} strokeWidth="1.5" strokeLinejoin="round" />
          </g>
          <g className="texting-leg texting-leg-b">
            <path d="M68 108L66 136" stroke={ORANGE} strokeWidth="6" strokeLinecap="round" />
            <path d="M66 134L77 139H58Z" fill={ORANGE} stroke={LINE} strokeWidth="1.5" strokeLinejoin="round" />
          </g>
          <path d="M26 96L10 86L22 104Z" fill={WHITE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
          <BuffHead x={62} y={40} />
          <ellipse cx="58" cy="98" rx="34" ry="16" fill={WHITE} stroke={LINE} strokeWidth="2" />
          {/* Pecs and abs. */}
          <path d="M48 90Q55 96 62 90Q69 96 76 90" stroke={MUSCLE} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M56 98H68M56 104H68M62 96V108" stroke={MUSCLE} strokeWidth="1.8" strokeLinecap="round" />
          {/* The arm holding the phone up to its face. */}
          <path d="M76 92L96 96L100 70" stroke={LINE} strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M76 92L96 96L100 70" stroke={WHITE} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <ellipse cx="88" cy="88" rx="11" ry="8" fill={WHITE} stroke={LINE} strokeWidth="2" />
          <g className="texting-phone">
            <rect x="94" y="48" width="14" height="24" rx="3" fill={INK} stroke={WHITE} strokeWidth="1.5" transform="rotate(-12 101 60)" />
            <rect x="97" y="52" width="8" height="14" rx="1" fill={PINK} opacity="0.85" transform="rotate(-12 101 60)" />
          </g>
          <circle cx="101" cy="68" r="5" fill={WHITE} stroke={LINE} strokeWidth="1.5" />
        </FacingLeft>
      </svg>
      {/* "Sent" bubbles floating up from the phone. */}
      <span className="texting-bubble absolute top-[18px] start-0 block h-[12px] w-[20px] rounded-full bg-accent" />
      <span className="texting-bubble texting-bubble-2 absolute top-[18px] start-[4px] block h-[10px] w-[16px] rounded-full bg-accent" />
    </GooseScene>
  );
}

/**
 * Contrast, above "A plan tailored for you": a goose in a tux measures the
 * plan like a tailor (height, width, diagonal), moving around it, then ticks it.
 */
export function TailorGoose({ planLabel }: { planLabel: string }) {
  return (
    <GooseScene threshold={0.7} className="tailor">
      <svg viewBox="0 0 340 150" aria-hidden="true" className="block h-auto w-full">
        {/* The plan. */}
        <rect x="222" y="46" width="100" height="100" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <text x="232" y="70" fill={LINE} fontSize="16" fontWeight="700" className="font-display uppercase" letterSpacing="0.04em">
          {planLabel}
        </text>
        <path d="M232 88H310M232 102H298M232 116H306M232 130H284" stroke="#C9C9C2" strokeWidth="3" strokeLinecap="round" />

        <g className="tailor-walk">
          <g transform="translate(0 10)">
            <GooseFigure outfit="tux" />
          </g>
        </g>

        {/* Three measurements: height, width, diagonal. */}
        <g transform="rotate(-90 214 146)">
          <g className="tailor-tape tailor-tape-1">
            <Tape x={214} y={146} length={100} />
          </g>
        </g>
        <g className="tailor-tape tailor-tape-2">
          <Tape x={222} y={37} length={100} />
        </g>
        <g transform="rotate(-45 222 146)">
          <g className="tailor-tape tailor-tape-3">
            <Tape x={222} y={143} length={141} />
          </g>
        </g>
        <path
          className="tailor-check"
          pathLength={1}
          d="M284 104L296 118L318 86"
          stroke={PINK}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </GooseScene>
  );
}

/**
 * "Daily WhatsApp check-ins": the goose at a little table on the card's top
 * edge photographs its plate (show me what you ate), then eats.
 */
export function DinnerGoose() {
  return (
    <GooseScene threshold={0.8} className="dinner flex justify-end">
      <svg viewBox="0 0 200 140" aria-hidden="true" className="h-[clamp(92px,10vw,112px)] w-auto">
        <g transform="translate(0 14)">
          <GooseFigure />
        </g>
        {/* Table, standing on the card. */}
        <rect x="34" y="100" width="156" height="7" rx="1.5" fill={WOOD} stroke={LINE} strokeWidth="1.5" />
        <path d="M44 107V140M180 107V140" stroke={WOOD} strokeWidth="6" />
        {/* Plate and food. */}
        <ellipse cx="146" cy="99" rx="24" ry="5" fill={WHITE} stroke={LINE} strokeWidth="1.5" />
        <g className="dinner-food">
          <circle cx="138" cy="93" r="6" fill="#5DBB63" stroke={LINE} strokeWidth="1.2" />
          <ellipse cx="151" cy="94" rx="8" ry="5" fill="#B5793F" stroke={LINE} strokeWidth="1.2" />
          <path d="M157 96L165 90" stroke={ORANGE} strokeWidth="4" strokeLinecap="round" />
        </g>
        <path d="M136 97h1M150 97h1M158 96h1" stroke="#B5793F" strokeWidth="2" strokeLinecap="round" />
        {/* The phone, held up over the plate for the photo. */}
        <g className="dinner-phone">
          <g transform="rotate(24 120 62)">
            <rect x="113" y="50" width="15" height="25" rx="3" fill={INK} stroke={WHITE} strokeWidth="1.5" />
            <circle cx="120.5" cy="54.5" r="1.6" fill={WHITE} />
          </g>
          <g className="dinner-flash">
            <circle cx="130" cy="74" r="10" fill={WHITE} />
            <path d="M130 56V50M146 74H152M142 62L147 57M118 62L113 57M142 86L147 91" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </GooseScene>
  );
}

/**
 * "I'm starting from zero": a buff goose does pull-ups on the card's top
 * edge, hauls itself up and flexes a huge arm as it says its line.
 */
export function PullUpGoose({ line }: { line: string }) {
  return (
    <GooseScene threshold={1} className="pullup pointer-events-none relative h-[96px] overflow-hidden">
      <svg viewBox="0 0 140 120" aria-hidden="true" className="absolute start-[clamp(12px,6vw,64px)] bottom-0 h-[120px] w-[140px]">
        <g className="pullup-body">
          <BuffHead x={60} y={70} />
          <ellipse cx="60" cy="130" rx="30" ry="18" fill={WHITE} stroke={LINE} strokeWidth="2" />
          <path d="M44 124Q52 131 60 124Q68 131 76 124" stroke={MUSCLE} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* The flexing arm, swung up from below the edge. */}
          <g transform="translate(-4 30)">
            <g className="pullup-arm">
              <g className="pullup-pump">
                <Arm side="front" />
              </g>
            </g>
          </g>
        </g>
        {/* Wing tips gripping the edge; the front one lets go to flex. */}
        <ellipse cx="34" cy="117" rx="10" ry="5" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <ellipse className="pullup-grip" cx="86" cy="117" rx="10" ry="5" fill={WHITE} stroke={LINE} strokeWidth="2" />
      </svg>
      <span className="pullup-bubble absolute bottom-[50px] start-[calc(clamp(12px,6vw,64px)+138px)] rounded-[14px] bg-ink px-3 py-1.5 font-display text-[16px] leading-none font-semibold whitespace-nowrap text-bg uppercase">
        {line}
      </span>
    </GooseScene>
  );
}

/** "Not for you if...": a quick-fix pill rolls up and the goose kicks it away. */
export function KickGoose({ pillLabel }: { pillLabel: string }) {
  return (
    <GooseScene className="kick ms-auto w-[120px] min-w-0 shrink">
      <svg viewBox="0 0 262 140" aria-hidden="true" className="block h-auto w-full">
        <GooseFigure />
        <g className="kick-pill">
          <path d="M118 88H177V136H118A24 24 0 0 1 118 88Z" fill={PINK} />
          <path d="M177 88H236A24 24 0 0 1 236 136H177Z" fill={WHITE} />
          <rect x="94" y="88" width="166" height="48" rx="24" fill="none" stroke={LINE} strokeWidth="2.5" />
          <text
            x="177"
            y="120"
            textAnchor="middle"
            fill={INK}
            fontSize="24"
            fontWeight="700"
            className="font-display uppercase"
            letterSpacing="0.05em"
          >
            {pillLabel}
          </text>
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
        className="door-goose absolute start-full bottom-0 ms-1.5 h-[clamp(76px,9vw,96px)] w-auto"
      >
        <FacingLeft>
          <GooseFigure outfit="bowtie" />
        </FacingLeft>
      </svg>
    </GooseScene>
  );
}
