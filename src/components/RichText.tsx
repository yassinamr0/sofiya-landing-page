import { Fragment } from "react";
import type { Mark, Rich } from "@/content";

/** Renders copy where some words carry a highlight (see `Mark` in content/types.ts). */
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Highlight key={i} text={part.text} mark={part.mark} />
        ),
      )}
    </>
  );
}

function Highlight({ text, mark }: { text: string; mark: Mark }) {
  if (mark === "band") return <span className="hl-band">{text}</span>;
  if (mark === "outline") return <span className="hl-outline">{text}</span>;
  return (
    <span className="hl-circle">
      {text}
      <svg viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength={1}
          d="M34 16C86 2 172 6 191 40C206 72 142 97 92 95C36 93 3 75 8 48C12 24 54 10 118 9"
        />
      </svg>
    </span>
  );
}
