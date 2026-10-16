"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type Props = {
  /** Names the strip for screen readers, e.g. "More results". */
  label: string;
  children: ReactNode;
};

/**
 * A horizontal strip that snaps to each item. Phones swipe it natively;
 * a mouse can drag it (or use the trackpad / shift-scroll), and the keyboard
 * scrolls it with the arrow keys once it has focus.
 */
export function ScrollStrip({ label, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
    ref.current.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      // Snapping fights a drag; it comes back on release and settles on the nearest item.
      el.dataset.dragging = "";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  }

  function onPointerUp() {
    delete ref.current?.dataset.dragging;
    drag.current = null;
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="scroll-strip -mx-(--margin) flex snap-x snap-mandatory scroll-px-(--margin) gap-[clamp(10px,1.2vw,16px)] overflow-x-auto px-(--margin) pb-3 select-none"
    >
      {children}
    </div>
  );
}
