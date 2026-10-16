import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { Reveal } from "../Reveal";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

/**
 * "Most coaches change how you look. We change how you live."
 * Most programs vs Here, side by side at every width: the comparison is the point.
 */
export function Contrast({ content }: { content: Content["contrast"] }) {
  const columns = "grid grid-cols-2 gap-x-[clamp(8px,1.6vw,24px)]";

  return (
    <section
      aria-labelledby="contrast-title"
      className="grain bg-surface px-(--margin) py-[clamp(96px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[1376px]">
        <Reveal style={sectionHighlightTiming}>
          <SectionTitle id="contrast-title" value={content.title} />
        </Reveal>

        <Reveal className="mt-[clamp(48px,6vw,96px)]" threshold={0.2}>
          {/* Screen readers get the label inside each cell instead. */}
          <div aria-hidden="true" className={`fade ${columns} pb-3 font-bold`}>
            <span className="text-muted">{content.theirsLabel}</span>
            <span className="text-accent">{content.oursLabel}</span>
          </div>
          <ul className="m-0 grid list-none gap-[clamp(8px,1vw,12px)] p-0">
            {content.rows.map((row, i) => (
              <li
                key={i}
                className={`fade ${columns}`}
                style={{ "--d": `${120 + i * 90}ms` } as CSSProperties}
              >
                <p className="m-0 p-[clamp(12px,2vw,28px)] text-[16px] leading-snug text-muted min-[640px]:text-body">
                  <span className="visually-hidden">{content.theirsLabel}: </span>
                  {row.theirs}
                </p>
                <p className="m-0 grain bg-surface-3 p-[clamp(12px,2vw,28px)] text-[16px] leading-snug font-medium min-[640px]:text-body">
                  <span className="visually-hidden">{content.oursLabel}: </span>
                  {row.ours}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
