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

/**
 * Headline, the goal's intro video, then "You don't have to choose us." and
 * Apply. Sized so the Apply button is on screen without scrolling on most
 * phones and laptops; from 900px the video and the Apply block sit side by side.
 */
export function Hero({ content, applyLabel }: Props) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative px-(--margin) pt-[clamp(8px,2vh,32px)] pb-[clamp(96px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[1376px]">
        <Reveal immediate className="text-center">
          <h1 id="hero-title" className="font-display uppercase">
            <span className="block text-[clamp(48px,14vw,112px)] leading-[0.88] font-bold tracking-[-0.02em]">
              <MaskedLines lines={content.shout} />
            </span>
            <span className="mask mt-[0.3em] py-[0.12em] text-[clamp(26px,7.2vw,44px)] leading-[1.15] font-semibold">
              <span className="rise" style={{ "--d": "240ms" } as CSSProperties}>
                <RichText value={content.punch} />
              </span>
            </span>
          </h1>
        </Reveal>

        <div className="mt-[clamp(14px,2.5vw,32px)] grid gap-[clamp(18px,3vw,40px)] min-[900px]:grid-cols-12 min-[900px]:items-center min-[900px]:gap-x-10">
          {/* Both videos are in the page; <html data-goal> hides the other one before first paint. */}
          <Reveal immediate className="min-[900px]:col-span-7">
            {/* Narrower on short screens, so the Apply button below still fits. */}
            <div
              className="fade mx-auto w-[min(92%,max(260px,calc((100svh-500px)*16/9)))] min-[900px]:w-[min(100%,max(400px,calc((100svh-400px)*16/9)))]"
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

          <Reveal className="text-center min-[900px]:col-span-5 min-[900px]:text-start">
            <h2 className="fade font-display text-[clamp(26px,7vw,56px)] leading-[1.05] font-bold uppercase">
              <RichText value={content.choose.title} />
            </h2>
            <div className="fade" style={{ "--d": "90ms" } as CSSProperties}>
              <p className="mx-auto mt-2.5 mb-4 max-w-[36ch] min-[900px]:mx-0 min-[900px]:mt-4 min-[900px]:mb-6">
                {content.choose.body}
              </p>
              {/* The goose walks to this button and pecks it (see components/goose). */}
              <span data-goose-target className="inline-block">
                <ApplyButton source="hero" label={applyLabel} />
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
