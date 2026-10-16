import type { Content } from "@/content";
import { ApplyButton } from "./ApplyButton";
import { ResetGoalButton } from "./gate/ResetGoalButton";

const isDev = process.env.NODE_ENV !== "production";

type Props = {
  brand: Content["brand"];
  applyLabel: string;
  resetLabel: string;
};

/** Wordmark and the Apply button. "Pick again" (gate reset) shows in development only. */
export function SiteHeader({ brand, applyLabel, resetLabel }: Props) {
  return (
    <header className="relative flex items-center justify-between gap-3 px-(--margin) py-3.5">
      <span className="font-display text-[20px] leading-none font-semibold tracking-[0.03em] whitespace-nowrap uppercase">
        {brand.name}
      </span>
      <div className="flex items-center gap-2">
        {isDev && <ResetGoalButton label={resetLabel} />}
        <ApplyButton source="nav" size="small" label={applyLabel} />
      </div>
    </header>
  );
}
