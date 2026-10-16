"use client";

import { useRef, useState } from "react";
import type { Goal, HeroVideo as HeroVideoContent } from "@/content";
import { track } from "@/lib/analytics";
import { BroomArt, CalfArt } from "../gate/Illustrations";

type Props = {
  goal: Goal;
  video: HeroVideoContent;
  playLabel: string;
  pendingNote: string;
};

/**
 * The intro video for one goal. Never autoplays: it loads nothing until tapped,
 * then plays with sound (the tap is the permission iOS and in-app browsers need).
 * Without a real file yet, it shows the goal's drawing and a placeholder label.
 */
export function HeroVideo({ goal, video, playLabel, pendingNote }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tracked = useRef(false);
  const [started, setStarted] = useState(false);
  const Art = goal === "lose" ? CalfArt : BroomArt;

  function trackPlay() {
    if (tracked.current) return;
    tracked.current = true;
    track({ name: "video_play", goal });
  }

  function start() {
    setStarted(true);
    if (video.src) videoRef.current?.play().catch(() => {});
    else trackPlay();
  }

  return (
    <figure className="relative m-0 aspect-[4/5] w-full overflow-hidden grain bg-surface-2">
      {video.src ? (
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          preload="none"
          playsInline
          controls={started}
          onPlay={trackPlay}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Art className="absolute inset-x-[8%] top-[8%] h-[78%] w-[84%] opacity-[0.13] grayscale" />
      )}

      {!(started && video.src) && (
        <button
          type="button"
          aria-label={playLabel}
          onClick={start}
          className="absolute inset-0 m-auto grid size-24 place-items-center bg-accent text-on-accent transition-[transform,background-color] duration-150 ease-press hover:bg-ink active:scale-94"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ms-1 size-[34px]">
            <path d="M6 4v16l14-8z" />
          </svg>
        </button>
      )}

      {!video.src && (
        <>
          {started && (
            <p role="status" className="absolute inset-x-4 top-[calc(50%+64px)] text-center text-note">
              {pendingNote}
            </p>
          )}
          <figcaption className="absolute start-4 bottom-3.5 text-note text-muted">
            {video.placeholderLabel}
          </figcaption>
        </>
      )}
    </figure>
  );
}
