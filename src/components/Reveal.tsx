"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How much of the block must be on screen before it plays. */
  threshold?: number;
};

/**
 * Plays the entrance motion of everything inside it (masked lines, fades,
 * highlights) once, when it scrolls into view. The hidden starting states in
 * globals.css only apply while JavaScript is running, so content is never
 * left invisible.
 */
export function Reveal({ children, className = "", threshold = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, [threshold]);

  return (
    <div ref={ref} data-reveal="" className={`${className} ${revealed ? "is-revealed" : ""}`}>
      {children}
    </div>
  );
}
