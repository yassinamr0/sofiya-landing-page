// PLACEHOLDER: a grid of dark tiles standing in for Sofiya's photos. Swap each
// tile for a real photo (same grid) when they exist; the fade mask stays.

const TILES = 12;

/** The faded photo backdrop behind the header and the top of the hero. */
export function Backdrop({ note }: { note: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="hero-backdrop pointer-events-none absolute inset-x-0 top-0 grid h-[clamp(560px,92vh,900px)] grid-cols-3 gap-1.5 overflow-hidden opacity-55 min-[640px]:grid-cols-6"
      >
        {Array.from({ length: TILES }, (_, i) => (
          <span key={i} className={`grain aspect-[3/4] ${i % 2 ? "bg-surface-2" : "bg-surface-3"}`} />
        ))}
      </div>
      <p className="absolute end-(--margin) top-[84px] z-[1] m-0 hidden text-note text-muted min-[640px]:block">
        {note}
      </p>
    </>
  );
}
