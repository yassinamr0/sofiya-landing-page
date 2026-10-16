import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { ApplyButton } from "../ApplyButton";
import { DoorGoose } from "../goose/moments/Moments";
import { Reveal } from "../Reveal";
import { RichText } from "../RichText";
import { sectionHighlightTiming } from "./SectionTitle";

type Props = {
  content: Content["finalCta"];
  applyLabel: string;
};

/** "Ready to take the step?" The last ask, as big as the opening headline. */
export function FinalCta({ content, applyLabel }: Props) {
  return (
    <section
      aria-labelledby="final-title"
      className="grain bg-surface px-(--margin) py-[clamp(112px,14vw,220px)] text-center"
    >
      <Reveal style={sectionHighlightTiming} className="mx-auto flex max-w-[1376px] flex-col items-center">
        <h2
          id="final-title"
          className="fade m-0 font-display text-[clamp(48px,13vw,176px)] leading-[1.15] font-bold tracking-[-0.02em] text-balance uppercase"
        >
          <RichText value={content.title} />
        </h2>
        <div className="fade mt-[clamp(32px,4vw,56px)] grid justify-items-center gap-3.5" style={{ "--d": "120ms" } as CSSProperties}>
          <DoorGoose>
            <ApplyButton source="final" label={applyLabel} />
          </DoorGoose>
          <p className="m-0 text-note text-muted">{content.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
