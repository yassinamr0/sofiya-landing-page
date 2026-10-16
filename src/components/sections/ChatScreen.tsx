import type { CSSProperties, ReactNode } from "react";
import type { Chat, ChatItem } from "@/content";

type Props = {
  chat: Chat;
  /** "ours" is Sofiya's chat: pink coach bubbles and a pink avatar. */
  tone: "theirs" | "ours";
  /** Drawn over the bottom of the screen (the goose's moment). */
  decoration?: ReactNode;
};

const STEP_MS = 70;

/**
 * An illustrated chat screen. Styled like a messaging app (rounded bubbles,
 * round avatar), so it is the one place the page's square corners don't apply.
 * Messages pop in one by one when the surrounding <Reveal> plays.
 */
export function ChatScreen({ chat, tone, decoration }: Props) {
  const ours = tone === "ours";

  return (
    <figure data-ui className="relative m-0 flex h-full flex-col grain bg-surface">
      <figcaption className="flex items-center gap-3 bg-surface-2 px-5 py-3.5">
        <span
          aria-hidden="true"
          className={`grid size-9 place-items-center rounded-full font-display text-[18px] font-semibold ${
            ours ? "bg-accent text-on-accent" : "bg-surface-3"
          }`}
        >
          {ours ? "S" : ""}
        </span>
        <span className="font-bold">{chat.label}</span>
      </figcaption>

      <ol className="m-0 flex list-none flex-col gap-2.5 p-[clamp(16px,2vw,24px)]">
        {chat.items.map((item, i) => (
          <li
            key={i}
            className={`fade flex ${item.from === "client" ? "justify-end" : "justify-start"}`}
            style={{ "--d": `${i * STEP_MS}ms` } as CSSProperties}
          >
            <Message item={item} ours={ours} />
          </li>
        ))}
      </ol>

      <p
        className={`fade m-0 mt-auto px-5 pt-2 pb-6 text-center text-note font-bold ${ours ? "text-accent" : "text-muted"}`}
        style={{ "--d": `${chat.items.length * STEP_MS + 250}ms` } as CSSProperties}
      >
        {chat.footnote}
      </p>
      {decoration}
    </figure>
  );
}

function Message({ item, ours }: { item: ChatItem; ours: boolean }) {
  if (item.kind === "time") {
    return <span className="px-1 pt-2 text-note text-muted">{item.text}</span>;
  }

  if (item.kind === "photo") {
    return (
      <span className="max-w-[82%] rounded-[18px] bg-surface-3 p-2">
        <span className="grid h-[120px] w-[200px] max-w-full place-items-center rounded-[12px] bg-surface-2 px-3 text-center text-note text-muted">
          {item.label}
        </span>
      </span>
    );
  }

  const coach = item.from === "coach";
  const colours = coach && ours ? "bg-accent text-on-accent" : "bg-surface-3";
  return (
    <span className={`max-w-[82%] rounded-[18px] px-4 py-2.5 text-[16px] leading-snug ${colours}`}>
      {item.text}
    </span>
  );
}
