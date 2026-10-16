import type { CSSProperties } from "react";
import type { Content, Goal } from "@/content";
import { LonelyGoose, TextingGoose } from "../goose/moments/Moments";
import { Reveal } from "../Reveal";
import { ChatScreen } from "./ChatScreen";
import { SectionTitle, sectionHighlightTiming } from "./SectionTitle";

const GOALS: Goal[] = ["lose", "gain"];

/** "Other coaches go quiet. Sofiya doesn't." Two chats; the "Here" one follows the gate answer. */
export function Chats({ content }: { content: Content["chats"] }) {
  return (
    <section aria-labelledby="chats-title" className="px-(--margin) py-[clamp(96px,12vw,200px)]">
      <div className="mx-auto max-w-[1376px]">
        <Reveal style={sectionHighlightTiming}>
          <SectionTitle id="chats-title" value={content.title} className="max-w-[20ch]" />
          <p className="fade mt-5 mb-0 max-w-[40ch]" style={{ "--d": "90ms" } as CSSProperties}>
            {content.intro}
          </p>
        </Reveal>

        <div className="mt-[clamp(40px,5vw,72px)] grid items-stretch gap-[clamp(16px,2vw,24px)] min-[900px]:grid-cols-2">
          <Reveal threshold={0.25} className="h-full">
            <ChatScreen chat={content.theirs} tone="theirs" decoration={<LonelyGoose />} />
          </Reveal>
          {/* Both versions are in the HTML; <html data-goal> hides the other one. */}
          {GOALS.map((goal) => (
            // Extra room above on phones: the texting goose sits on this card's top edge.
            <div key={goal} data-for-goal={goal} className="mt-[72px] min-[900px]:mt-0">
              <Reveal threshold={0.25} className="h-full">
                <ChatScreen chat={content.ours[goal]} tone="ours" decoration={<TextingGoose />} />
              </Reveal>
            </div>
          ))}
        </div>

        <p className="mt-5 mb-0 text-note text-muted">{content.disclaimer}</p>
      </div>
    </section>
  );
}
