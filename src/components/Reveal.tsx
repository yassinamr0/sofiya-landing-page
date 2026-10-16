"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** e.g. `--band-delay` / `--circle-delay` to retime highlights in this block. */
  style?: CSSProperties;
  /** How much of the block must be on screen before it plays. */
  threshold?: number;
  /**
   * Above-the-fold content: play from the first paint with CSS alone, without
   * waiting for JavaScript to load. Keeps the largest content from being held
   * back (Largest Contentful Paint).
   */
  immediate?: boolean;
};

/**
 * Plays the entrance motion of everything inside it (masked lines, fades,
 * highlights) once, when it scrolls into view. The hidden starting states in
 * globals.css only apply while JavaScript is running, so content is never
 * left invisible.
 */
export function Reveal({ children, className = "", style, threshold = 0.3, immediate = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || immediate) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, immediate]);

  return (
    <div
      ref={ref}
      {...(immediate ? { "data-reveal-now": "" } : { "data-reveal": "" })}
      style={style}
      className={`${className} ${revealed ? "is-revealed" : ""}`}
    >
      {children}
    </div>
  );
}
