import type { CSSProperties } from "react";
import { ApplyButton } from "@/components/ApplyButton";
import { Gate } from "@/components/gate/Gate";
import { ResetGoalButton } from "@/components/gate/ResetGoalButton";
import { MaskedLines } from "@/components/MaskedLines";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { getContent } from "@/content";

const isDev = process.env.NODE_ENV !== "production";

export default function Home() {
  const content = getContent();

  return (
    <>
      <Gate content={content.gate} />

      {/* Everything after the gate. Until Step 3 this is the Step 1 check content. */}
      <div className="page-root">
        <header className="flex items-center justify-between gap-3 px-(--margin) py-3.5">
          <span className="font-display text-[20px] leading-none font-semibold tracking-[0.03em] uppercase">
            {content.brand.name}
          </span>
          <div className="flex items-center gap-2">
            {isDev && <ResetGoalButton label={content.nav.reset} />}
            <ApplyButton source="nav" size="small" label={content.apply.label} />
          </div>
        </header>

        <main
          id="page"
          tabIndex={-1}
          className="mx-auto flex max-w-[1376px] flex-col gap-24 px-(--margin) pt-10 pb-32 md:gap-36"
        >
          <Reveal className="text-center">
            <h1 className="font-display uppercase">
              <span className="block text-shout font-bold">
                <MaskedLines lines={content.hero.shout} />
              </span>
              <span className="mask mt-[0.4em] py-[0.12em] text-title leading-[1.22] font-semibold">
                <span className="rise" style={{ "--d": "240ms" } as CSSProperties}>
                  <RichText value={content.hero.punch} />
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal className="grid gap-6 min-[900px]:grid-cols-12 min-[900px]:items-end min-[900px]:gap-x-8">
            <h2 className="fade font-display text-title font-bold uppercase min-[900px]:col-span-6">
              <RichText value={content.hero.choose.title} />
            </h2>
            <div
              className="fade min-[900px]:col-span-5 min-[900px]:col-start-8"
              style={{ "--d": "90ms" } as CSSProperties}
            >
              <p className="mb-7 max-w-[34ch]">{content.hero.choose.body}</p>
              <ApplyButton source="hero" label={content.apply.label} />
            </div>
          </Reveal>

          <p className="max-w-[60ch] grain bg-surface p-6 text-muted">
            Check page: the gate is live. The real hero and sections replace this from Step 3.
          </p>
        </main>
      </div>
    </>
  );
}
