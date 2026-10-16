"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How much of the scene must be on screen before it plays. */
  threshold?: number;
};

/**
 * Plays one of the goose's section moments once, when it is properly on
 * screen. The moment's CSS animations sit paused on their first frame until
 * then (globals.css). Like the hero goose, it plays for everyone, every time
 * the page is opened.
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

  return (
    <div ref={ref} className={`goose-scene ${className}`}>
      {children}
    </div>
  );
}
