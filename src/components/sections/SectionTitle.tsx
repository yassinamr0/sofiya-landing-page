import type { CSSProperties } from "react";
import type { Rich } from "@/content";
import { RichText } from "../RichText";

type Props = {
  id: string;
  value: Rich;
  className?: string;
};

/** A section headline in the display face, with its highlight from the copy. */
export function SectionTitle({ id, value, className = "" }: Props) {
  return (
    <h2 id={id} className={`fade font-display text-title leading-[1.2] font-bold text-balance uppercase ${className}`}>
      <RichText value={value} />
    </h2>
  );
}

/** Highlights in section headlines play sooner than the hero's. */
export const sectionHighlightTiming = { "--band-delay": "350ms", "--circle-delay": "250ms" } as CSSProperties;
