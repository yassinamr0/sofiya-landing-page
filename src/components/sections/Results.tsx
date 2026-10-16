import Image from "next/image";
import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { Reveal } from "../Reveal";
import { ScrollStrip } from "./ScrollStrip";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

// PLACEHOLDER: every name, result, quote, photo and video here is a marked
// stand-in (see content/en.ts) until real client material is supplied.

/** "Results, not promises." Three testimonials, then a strip of more client photos. */
export function Results({ content }: { content: Content["results"] }) {
  return (
    <section aria-labelledby="results-title" className="px-(--margin) py-[clamp(96px,12vw,200px)]">
      <div className="mx-auto max-w-[1376px]">
        <Reveal style={sectionHighlightTiming}>
          <SectionTitle id="results-title" value={content.title} />
        </Reveal>

        <Reveal threshold={0.15} className="mt-[clamp(40px,5vw,72px)]">
          <ul className="m-0 grid list-none gap-[clamp(16px,2vw,24px)] p-0 min-[900px]:grid-cols-3">
            {content.testimonials.map((t, i) => (
              <li
                key={i}
                className="fade flex flex-col grain bg-surface"
                style={{ "--d": `${i * 100}ms` } as CSSProperties}
              >
                <TestimonialMedia media={t.media} />
                <div className="flex flex-col gap-2.5 p-[clamp(20px,2.4vw,28px)]">
                  <p className="m-0 font-bold">{t.name}</p>
                  <p className="m-0 font-display text-statement font-semibold text-accent uppercase">{t.result}</p>
                  <p className="m-0 text-muted">{t.quote}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal threshold={0.2} className="mt-[clamp(64px,8vw,120px)]">
          <h3 className="fade m-0 mb-5 font-display text-statement font-bold uppercase">{content.moreTitle}</h3>
          <div className="fade" style={{ "--d": "90ms" } as CSSProperties}>
            <ScrollStrip label={content.moreTitle}>
              {content.more.map((photo, i) => (
                <div
                  key={i}
                  className="relative grid aspect-[3/4] w-[clamp(200px,58vw,280px)] shrink-0 snap-start place-items-center overflow-hidden grain bg-surface p-4 text-center text-note text-muted"
                >
                  {photo.photo ? (
                    <Image
                      src={photo.photo.src}
                      alt={photo.photo.alt}
                      fill
                      sizes="280px"
                      draggable={false}
                      className="object-cover"
                    />
                  ) : (
                    photo.label
                  )}
                </div>
              ))}
            </ScrollStrip>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** A real before/after photo or video once supplied, otherwise its labelled placeholder. */
function TestimonialMedia({ media }: { media: Content["results"]["testimonials"][number]["media"] }) {
  const frame = "relative grid aspect-[4/5] place-items-center overflow-hidden grain bg-surface-2 p-4 text-center text-note text-muted";

  if (media.kind === "photo" && media.photo) {
    return (
      <div className={frame}>
        <Image
          src={media.photo.src}
          alt={media.photo.alt}
          fill
          sizes="(min-width: 900px) 30vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  if (media.kind === "video" && media.video) {
    // Never autoplays; loads nothing until played.
    return (
      <div className={frame}>
        <video
          src={media.video.src}
          poster={media.video.poster}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      {media.kind === "video" ? (
        <span className="grid justify-items-center gap-3">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-8">
            <path d="M6 4v16l14-8z" />
          </svg>
          {media.label}
        </span>
      ) : (
        media.label
      )}
    </div>
  );
}
