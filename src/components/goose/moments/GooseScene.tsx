"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How much of the scene must be on screen before it plays. */
  threshold?: number;
};

/**
 * Plays one of the goose's section moments once, when it is properly on
 * screen, and again whenever the goose is tapped. The moment's CSS animations
 * sit paused on their first frame until then (globals.css). Like the hero
 * goose, it plays for everyone, every time the page is opened.
 */
export function GooseScene({ children, className = "", threshold = 0.8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-playing");
        observer.disconnect();
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Tapping the drawing starts every part of the moment again from its first frame.
  function replay(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    // A tap on the Apply button inside the door moment is just a tap on Apply.
    if (!el || (event.target as Element).closest("a, button")) return;
    el.classList.add("is-playing");
    for (const animation of el.getAnimations({ subtree: true })) {
      if (!(animation instanceof CSSAnimation)) continue;
      animation.cancel();
      animation.play();
    }
  }

  return (
    <div ref={ref} className={`goose-scene ${className}`} onClick={replay}>
      {children}
    </div>
  );
}
