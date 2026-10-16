import { ApplyButton } from "@/components/ApplyButton";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { getContent, type Lines } from "@/content";

// Step 1 check page: shows the tokens, fonts, highlights and the Apply button.
// Replaced by the real page (gate, hero, sections) from Step 2 on.

function MaskedLines({ lines }: { lines: Lines }) {
  return lines.map((line, i) => (
    <span key={i} className="mask">
      <span className="rise" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
        <RichText value={line} />
      </span>
    </span>
  ));
}

export default function Home() {
  const content = getContent();

  return (
    <>
      <header className="flex items-center justify-between gap-3 px-(--margin) py-3.5">
        <span className="font-display text-[20px] leading-none font-semibold tracking-[0.03em] uppercase">
          {content.brand.name}
        </span>
        <ApplyButton source="nav" size="small" label={content.apply.label} />
      </header>

      <main className="mx-auto flex max-w-[1376px] flex-col gap-24 px-(--margin) pt-10 pb-32 md:gap-36">
        <Reveal className="text-center">
          <h1 className="font-display uppercase">
            <span className="block text-shout font-bold">
              <MaskedLines lines={content.hero.shout} />
            </span>
            <span className="mask mt-[0.4em] py-[0.12em] text-title leading-[1.22] font-semibold">
              <span className="rise" style={{ "--d": "240ms" } as React.CSSProperties}>
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
            style={{ "--d": "90ms" } as React.CSSProperties}
          >
            <p className="mb-7 max-w-[34ch]">{content.hero.choose.body}</p>
            <ApplyButton source="hero" label={content.apply.label} />
          </div>
        </Reveal>

        <Reveal className="text-center">
          <h2 className="font-display text-shout font-bold uppercase">
            <MaskedLines lines={content.gate.title} />
          </h2>
        </Reveal>

        <p className="max-w-[60ch] bg-surface grain p-6 text-muted">
          Step 1 check page: design tokens, fonts, the three highlight styles and the shared Apply
          button. The real page is built from Step 2.
        </p>
      </main>
    </>
  );
}
