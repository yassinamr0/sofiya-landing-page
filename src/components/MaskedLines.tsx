import { Fragment, type CSSProperties } from "react";
import type { Lines } from "@/content";
import { RichText } from "./RichText";

type Props = {
  lines: Lines;
  /** Extra classes for each line's mask, e.g. to sit lines side by side on wide screens. */
  lineClassName?: string;
};

/**
 * A headline whose lines rise from behind their own baseline, one after the
 * other, when the surrounding <Reveal> plays.
 */
export function MaskedLines({ lines, lineClassName = "" }: Props) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {/* A word space between lines, for when they sit side by side on wide screens. */}
      {i > 0 && " "}
      <span className={`mask ${lineClassName}`}>
        <span className="rise" style={{ "--d": `${i * 110}ms` } as CSSProperties}>
          <RichText value={line} />
        </span>
      </span>
    </Fragment>
  ));
}
