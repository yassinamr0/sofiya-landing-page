"use client";

import { useEffect, useRef, useState } from "react";
import type Hls from "hls.js";
import type { Goal, HeroVideo as HeroVideoContent } from "@/content";
import { track } from "@/lib/analytics";
import { BroomArt, CalfArt } from "../gate/Illustrations";

type Props = {
  goal: Goal;
  video: HeroVideoContent;
  playLabel: string;
  pendingNote: string;
};

const isStream = (src: string) => /\.m3u8(\?|$)/i.test(src);

/**
 * The intro video for one goal, in a 16:9 frame. Never autoplays and loads
 * nothing until tapped, then plays with sound (the tap is the permission iOS
 * and in-app browsers need). Takes a direct MP4 link or a streaming (.m3u8)
 * link from any host; Safari streams natively, other browsers load hls.js
 * only at that moment. Without a link yet, it shows the goal's drawing and a
 * placeholder label.
 */
export function HeroVideo({ goal, video, playLabel, pendingNote }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const tracked = useRef(false);
  const [started, setStarted] = useState(false);
  const Art = goal === "lose" ? CalfArt : BroomArt;

  useEffect(() => () => hlsRef.current?.destroy(), []);

  function trackPlay() {
    if (tracked.current) return;
    tracked.current = true;
    track({ name: "video_play", goal });
  }

  async function start() {
    setStarted(true);
    const el = videoRef.current;
    if (!video.src || !el) {
      trackPlay();
      return;
    }
    if (isStream(video.src) && !el.canPlayType("application/vnd.apple.mpegurl")) {
      const { default: HlsPlayer } = await import("hls.js");
      if (HlsPlayer.isSupported()) {
        const hls = new HlsPlayer();
        hlsRef.current = hls;
        hls.loadSource(video.src);
        hls.attachMedia(el);
      }
    } else {
      el.src = video.src;
    }
    el.play().catch(() => {});
  }

  return (
    <figure className="relative m-0 aspect-video w-full overflow-hidden grain bg-surface-2">
      {video.src ? (
        <video
          ref={videoRef}
          poster={video.poster}
          preload="none"
          playsInline
          controls={started}
          onPlay={trackPlay}
          className="absolute inset-0 h-full w-full bg-black object-cover"
        />
      ) : (
        <Art className="absolute inset-0 m-auto h-[78%] w-auto opacity-[0.13] grayscale" />
      )}

      {!(started && video.src) && (
        <button
          type="button"
          aria-label={playLabel}
          onClick={start}
          className="absolute inset-0 m-auto grid size-[72px] place-items-center bg-accent text-on-accent transition-[transform,background-color] duration-150 ease-press hover:bg-ink active:scale-94 min-[640px]:size-24"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ms-1 size-7 min-[640px]:size-[34px]">
            <path d="M6 4v16l14-8z" />
          </svg>
        </button>
      )}

      {!video.src && (
        <>
          {started && (
            <p
              role="status"
              className="absolute inset-x-4 top-[calc(50%+44px)] text-center text-note min-[640px]:top-[calc(50%+60px)]"
            >
              {pendingNote}
            </p>
          )}
          <figcaption className="absolute start-3 bottom-2.5 text-note text-muted min-[640px]:start-4 min-[640px]:bottom-3.5">
            {video.placeholderLabel}
          </figcaption>
        </>
      )}
    </figure>
  );
}
