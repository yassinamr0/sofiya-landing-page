import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { KickGoose } from "../goose/moments/Moments";
import { Reveal } from "../Reveal";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 size-6 shrink-0">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true" className="mt-0.5 size-6 shrink-0">
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </svg>
  );
}

/**
 * "Who this is for. And who it isn't." The two lists look nothing alike:
 * a solid pink card with checks, and a quiet muted one with crosses.
 */
export function Fit({ content, pillLabel }: { content: Content["fit"]; pillLabel: string }) {
  return (
    <section aria-labelledby="fit-title" className="overflow-x-clip px-(--margin) py-[clamp(96px,12vw,200px)]">
      <div className="mx-auto max-w-[1376px]">
        <Reveal style={sectionHighlightTiming}>
          <SectionTitle id="fit-title" value={content.title} />
        </Reveal>

        <Reveal threshold={0.2} className="mt-[clamp(40px,5vw,72px)] grid gap-[clamp(16px,2vw,24px)] min-[900px]:grid-cols-12">
          <div className="fade bg-accent p-[clamp(24px,3.5vw,48px)] text-on-accent min-[900px]:col-span-7">
            <h3 className="m-0 font-display text-statement font-bold uppercase">{content.forYou.title}</h3>
            <ul className="m-0 mt-6 grid list-none gap-4 p-0">
              {content.forYou.items.map((item) => (
                <li key={item} className="flex gap-3.5 font-medium">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="fade p-[clamp(24px,3.5vw,48px)] min-[900px]:col-span-5"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="m-0 shrink-0 font-display text-statement font-bold text-muted uppercase">{content.notForYou.title}</h3>
              <KickGoose pillLabel={pillLabel} />
            </div>
            <ul className="m-0 mt-6 grid list-none gap-4 p-0 text-muted">
              {content.notForYou.items.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Cross />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
