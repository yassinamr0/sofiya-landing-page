import Image from "next/image";

// Until photos are set in content (hero.backdropPhotos), dark placeholder tiles
// stand in for them. The fade mask applies either way.

const TILES = 12;

type Props = {
  photos: ReadonlyArray<string>;
  note: string;
};

/** The faded photo backdrop behind the header and the top of the hero. */
export function Backdrop({ photos, note }: Props) {
  return (
    <>
      <div
        aria-hidden="true"
        className="hero-backdrop pointer-events-none absolute inset-x-0 top-0 grid h-[clamp(560px,92svh,900px)] grid-cols-3 gap-1.5 overflow-hidden opacity-55 min-[640px]:grid-cols-6"
      >
        {Array.from({ length: TILES }, (_, i) => {
          const src = photos.length ? photos[i % photos.length] : null;
          return (
            <span key={i} className={`relative grain aspect-[3/4] ${i % 2 ? "bg-surface-2" : "bg-surface-3"}`}>
              {src && (
                // Decorative: the backdrop sits behind the content, so no alt text.
                <Image src={src} alt="" fill sizes="(min-width: 640px) 17vw, 34vw" className="object-cover" />
              )}
            </span>
          );
        })}
      </div>
      {!photos.length && (
        <p className="absolute end-(--margin) top-[84px] z-[1] m-0 hidden text-note text-muted min-[640px]:block">
          {note}
        </p>
      )}
    </>
  );
}
