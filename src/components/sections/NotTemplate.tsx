import type { CSSProperties } from "react";
import type { Content } from "@/content";
import { Reveal } from "../Reveal";
import { FeatureIcon } from "./FeatureIcon";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

/**
 * "This is not a template." The headline stays in view on wide screens while
 * the five parts of the program scroll past beside it.
 */
export function NotTemplate({ content }: { content: Content["notTemplate"] }) {
  return (
    <section
      aria-labelledby="template-title"
      className="grain bg-surface px-(--margin) py-[clamp(96px,12vw,200px)]"
    >
      <div className="mx-auto grid max-w-[1376px] gap-[clamp(40px,5vw,72px)] min-[900px]:grid-cols-12 min-[900px]:gap-x-8">
        <Reveal
          style={sectionHighlightTiming}
          className="self-start min-[900px]:sticky min-[900px]:top-[clamp(32px,8vh,96px)] min-[900px]:col-span-5"
        >
          <SectionTitle id="template-title" value={content.title} />
          <p className="fade mt-5 mb-0 max-w-[36ch]" style={{ "--d": "90ms" } as CSSProperties}>
            {content.intro}
          </p>
        </Reveal>

        <Reveal threshold={0.15} className="min-[900px]:col-span-7">
          <ul className="m-0 grid list-none gap-[clamp(8px,1vw,12px)] p-0">
            {content.items.map((item, i) => (
              <li
                key={item.title}
                className="fade flex items-start gap-[clamp(16px,2vw,24px)] grain bg-surface-2 p-[clamp(20px,3vw,32px)]"
                style={{ "--d": `${i * 90}ms` } as CSSProperties}
              >
                <span className="grid size-14 shrink-0 place-items-center bg-surface-3 text-accent">
                  <FeatureIcon name={item.icon} className="size-[26px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="m-0 text-body leading-tight font-bold">{item.title}</h3>
                  <p className="mt-1.5 mb-0">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
