import type { Content } from "@/content";

type Props = {
  brand: Content["brand"];
  content: Content["footer"];
};

/** The page closes on her name, built across the full width, and the Instagram link. */
export function SiteFooter({ brand, content }: Props) {
  return (
    <footer className="overflow-hidden px-(--margin) pt-[clamp(56px,7vw,96px)] pb-[max(24px,env(safe-area-inset-bottom))]">
      <p
        aria-hidden="true"
        className="m-0 text-center font-display text-[clamp(40px,11.4vw,164px)] leading-[0.85] font-bold tracking-[-0.02em] whitespace-nowrap uppercase"
      >
        {content.name}
      </p>
      <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-note text-muted">
        <span>{content.name}</span>
        <span>
          <a
            href={brand.instagram.url}
            className="inline-flex min-h-11 items-center font-bold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-150 hover:text-accent"
          >
            {brand.instagram.label}
          </a>
          {brand.instagram.placeholder && <span className="ms-2">{content.instagramPlaceholderNote}</span>}
        </span>
      </div>
    </footer>
  );
}
