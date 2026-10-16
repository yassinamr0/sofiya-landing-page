import type { CSSProperties } from "react";
import type { Content, Goal } from "@/content";
import { ApplyButton } from "../ApplyButton";
import { MaskedLines } from "../MaskedLines";
import { Reveal } from "../Reveal";
import { RichText } from "../RichText";
import { HeroVideo } from "./HeroVideo";

const GOALS: Goal[] = ["lose", "gain"];

type Props = {
  content: Content["hero"];
  applyLabel: string;
};

/** Headline, the goal's intro video, then "You don't have to choose us." */
export function Hero({ content, applyLabel }: Props) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative px-(--margin) pt-[clamp(28px,6vh,72px)] pb-[clamp(96px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[1376px]">
        <Reveal immediate className="text-center">
          <h1 id="hero-title" className="font-display uppercase">
            <span className="block text-shout font-bold">
              <MaskedLines lines={content.shout} />
            </span>
            <span className="mask mt-[0.4em] py-[0.12em] text-title leading-[1.22] font-semibold">
              <span className="rise" style={{ "--d": "240ms" } as CSSProperties}>
                <RichText value={content.punch} />
              </span>
            </span>
          </h1>

          {/* Both videos are in the page; <html data-goal> hides the other one before first paint. */}
          <div
            className="fade mx-auto mt-[clamp(36px,5vw,72px)] w-full max-w-[1000px]"
            style={{ "--d": "420ms" } as CSSProperties}
          >
            {GOALS.map((goal) => (
              <div key={goal} data-for-goal={goal}>
                <HeroVideo
                  goal={goal}
                  video={content.video[goal]}
                  playLabel={content.playLabel}
                  pendingNote={content.videoPendingNote}
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-[clamp(64px,9vw,150px)] grid gap-6 min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-8">
          <h2 className="fade font-display text-title font-bold uppercase min-[900px]:col-span-6">
            <RichText value={content.choose.title} />
          </h2>
          <div
            className="fade min-[900px]:col-span-5 min-[900px]:col-start-8"
            style={{ "--d": "90ms" } as CSSProperties}
          >
            <p className="mb-7 max-w-[34ch]">{content.choose.body}</p>
            {/* The goose walks to this button and pecks it (see components/goose). */}
            <span data-goose-target className="inline-block">
              <ApplyButton source="hero" label={applyLabel} />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
