// The goose, drawn by hand. Both poses face right on a 120 x 140 canvas with
// the feet on y = 136; the animation mirrors them to face left.
//
// What makes it a goose and not a duck: the long S-shaped neck standing high
// above a big body, the long orange bill, the upturned tail and the tall stance.

import type { ReactNode } from "react";

export const WHITE = "#F5F5F2";
export const LINE = "#2A2A2E";
export const WING = "#D9D9D2";
export const MUSCLE = "#B9B9B2";
export const ORANGE = "#FF8A1F";
export const INK = "#09090A";
export const PINK = "#FF2E93";

/** Where the neck turns when it pecks (canvas units). */
export const NECK_PIVOT = { x: 74, y: 86 };

function Leg({ x, className, thick = false }: { x: number; className: string; thick?: boolean }) {
  return (
    <g className={`goose-leg ${className}`}>
      <path d={`M${x} 112V132`} stroke={ORANGE} strokeWidth={thick ? 7 : 5} strokeLinecap="round" />
      <path
        d={`M${x} 131L${x + (thick ? 12 : 10)} 136H${x - (thick ? 10 : 8)}Z`}
        fill={ORANGE}
        stroke={LINE}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </g>
  );
}

/** The goose as it walks in and pecks. */
export function WalkingGoose() {
  return (
    <svg viewBox="0 0 120 140" className="goose-pose goose-walk">
      <g className="goose-bob">
        <Leg x={60} className="goose-leg-b" />
        <Leg x={48} className="goose-leg-a" />
        <path d="M24 86L7 70L22 96Z" fill={WHITE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />

        {/* Neck and head: the part that pecks. Drawn before the body so the body covers the neck's base. */}
        <g className="goose-head">
          <path d="M74 88C90 70 70 52 84 32" stroke={LINE} strokeWidth="17" strokeLinecap="round" fill="none" />
          <path d="M74 88C90 70 70 52 84 32" stroke={WHITE} strokeWidth="13" strokeLinecap="round" fill="none" />
          <circle cx="88" cy="27" r="12" fill={WHITE} stroke={LINE} strokeWidth="2" />
          <path d="M97 24L115 31L97 35Z" fill={ORANGE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="91" cy="24" r="2.4" fill={INK} />
          {/* The cheeky, slightly menacing brow every goose has. */}
          <path d="M85 17L95 21" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </g>

        <ellipse cx="56" cy="94" rx="36" ry="22" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <path d="M34 88C44 76 66 78 74 90C64 100 46 102 34 88Z" fill={WING} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/**
 * The plain goose standing still, as a group on the 120 x 140 canvas facing
 * right, for the section moments. Class hooks let each moment move a part:
 * gf-whole (everything, turns at the feet), gf-head (neck and head, turns at
 * the neck's base), gf-eye, gf-wing and gf-leg-front.
 */
export function GooseFigure({ headExtra, bodyExtra }: { headExtra?: ReactNode; bodyExtra?: ReactNode }) {
  return (
    <g className="gf-whole">
      <Leg x={60} className="gf-leg-back" />
      <Leg x={48} className="gf-leg-front" />
      <path d="M24 86L7 70L22 96Z" fill={WHITE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      <g className="gf-head">
        <path d="M74 88C90 70 70 52 84 32" stroke={LINE} strokeWidth="17" strokeLinecap="round" fill="none" />
        <path d="M74 88C90 70 70 52 84 32" stroke={WHITE} strokeWidth="13" strokeLinecap="round" fill="none" />
        <circle cx="88" cy="27" r="12" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <path d="M97 24L115 31L97 35Z" fill={ORANGE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
        <circle className="gf-eye" cx="91" cy="24" r="2.4" fill={INK} />
        <path d="M85 17L95 21" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        {headExtra}
      </g>
      <ellipse cx="56" cy="94" rx="36" ry="22" fill={WHITE} stroke={LINE} strokeWidth="2" />
      <path
        className="gf-wing"
        d="M34 88C44 76 66 78 74 90C64 100 46 102 34 88Z"
        fill={WING}
        stroke={LINE}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {bodyExtra}
    </g>
  );
}

function Arm({ side }: { side: "front" | "back" }) {
  // The back arm is the front arm mirrored around the body's centre line (x = 60).
  const m = (x: number) => (side === "front" ? x : 120 - x);
  return (
    <g className={`goose-arm goose-arm-${side}`}>
      <path d={`M${m(80)} 90L${m(104)} 88L${m(106)} 60`} stroke={LINE} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={`M${m(80)} 90L${m(104)} 88L${m(106)} 60`} stroke={WHITE} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* The bicep. */}
      <ellipse cx={m(92)} cy="80" rx="14" ry="11" fill={WHITE} stroke={LINE} strokeWidth="2" />
      <path d={`M${m(86)} 84Q${m(93)} 88 ${m(100)} 84`} stroke={MUSCLE} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* A wing-tip fist. */}
      <circle cx={m(106)} cy="55" r="7.5" fill={WHITE} stroke={LINE} strokeWidth="2" />
      <path d={`M${m(103)} 52V58M${m(107)} 51V58`} stroke={MUSCLE} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

/** The goose after the peck: thick neck, chest out, double-biceps flex, sweatband on. */
export function BuffGoose() {
  return (
    <svg viewBox="0 0 120 140" className="goose-pose goose-buff">
      <g className="goose-bob">
        <Leg x={68} className="goose-leg-b" thick />
        <Leg x={52} className="goose-leg-a" thick />
        <path d="M28 96L10 82L24 104Z" fill={WHITE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
        <Arm side="back" />

        <path d="M62 88L66 46" stroke={LINE} strokeWidth="22" strokeLinecap="round" />
        <path d="M62 88L66 46" stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
        <circle cx="68" cy="36" r="13" fill={WHITE} stroke={LINE} strokeWidth="2" />
        <path d="M80 33L99 40L80 45Z" fill={ORANGE} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="72" cy="36" r="2.4" fill={INK} />
        {/* Sweatband, tails flying. */}
        <rect x="55" y="24" width="26" height="6" rx="2" fill={PINK} stroke={LINE} strokeWidth="1.5" />
        <path d="M55 27L45 22M55 29L46 33" stroke={PINK} strokeWidth="3" strokeLinecap="round" />

        <ellipse cx="60" cy="102" rx="34" ry="26" fill={WHITE} stroke={LINE} strokeWidth="2" />
        {/* Pecs and abs. */}
        <path d="M45 92Q52 99 60 92Q68 99 75 92" stroke={MUSCLE} strokeWidth="2" strokeLinecap="round" fill="none" />
        {[100, 107, 114].map((y) => (
          <g key={y}>
            <rect x="53" y={y} width="6.5" height="5.5" rx="2" fill="none" stroke={MUSCLE} strokeWidth="1.8" />
            <rect x="60.5" y={y} width="6.5" height="5.5" rx="2" fill="none" stroke={MUSCLE} strokeWidth="1.8" />
          </g>
        ))}
        <Arm side="front" />
      </g>
    </svg>
  );
}

/** Pink "pow" lines around the goose as it turns buff. */
export function Burst() {
  const rays = Array.from({ length: 10 }, (_, i) => (i * Math.PI * 2) / 10);
  return (
    <svg viewBox="0 0 120 140" className="goose-pose goose-burst">
      {rays.map((a, i) => (
        <path
          key={i}
          d={`M${60 + Math.cos(a) * 62} ${78 + Math.sin(a) * 62}L${60 + Math.cos(a) * 76} ${78 + Math.sin(a) * 76}`}
          stroke={PINK}
          strokeWidth="5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
