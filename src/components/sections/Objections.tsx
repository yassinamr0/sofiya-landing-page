import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { ApplyButton } from "../ApplyButton";
import { Reveal } from "../Reveal";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

type Props = {
  content: Content["objections"];
  applyLabel: string;
};

/** "You might be thinking..." Each doubt in her reader's words, answered, with a slot for a real client. */
export function Objections({ content, applyLabel }: Props) {
  return (
    <section
      aria-labelledby="objections-title"
      className="grain bg-surface px-(--margin) py-[clamp(96px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[1376px]">
        <Reveal style={sectionHighlightTiming}>
          <SectionTitle id="objections-title" value={content.title} />
        </Reveal>

        <ul className="m-0 mt-[clamp(40px,5vw,72px)] grid list-none gap-[clamp(8px,1vw,12px)] p-0">
          {content.items.map((item) => (
            <li key={item.doubt}>
              <Reveal
                threshold={0.4}
                className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-4 grain bg-surface-2 p-[clamp(24px,3.5vw,48px)] min-[900px]:grid-cols-12"
              >
                <blockquote className="fade m-0 font-display text-statement font-medium min-[900px]:col-span-6">
                  {item.doubt}
                </blockquote>
                <div className="fade min-[900px]:col-span-6" style={{ "--d": "90ms" } as CSSProperties}>
                  <p className="m-0">{item.answer}</p>
                  <p className="mt-3.5 mb-0 text-note font-bold text-accent">{item.proof}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-[clamp(40px,5vw,64px)] flex justify-center">
          <ApplyButton source="objections" label={applyLabel} />
        </div>
      </div>
    </section>
  );
}
