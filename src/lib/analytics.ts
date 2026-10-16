import type { ApplySource, Goal } from "@/content";

// The only events the page tracks. No personal data, no third-party cookies.
export type AnalyticsEvent =
  | { name: "gate_choice"; goal: Goal }
  | { name: "video_play"; goal: Goal }
  | { name: "apply_click"; source: ApplySource; goal: Goal | null }
  | { name: "form_open"; source: ApplySource };

/**
 * Where events go, set with one variable (in .env.local and on Vercel):
 *   NEXT_PUBLIC_ANALYTICS=umami:<website id>
 *   NEXT_PUBLIC_ANALYTICS=plausible:<script URL from Plausible's install snippet>
 * Unset: nothing is sent. In development events are only logged to the console.
 */
export type Provider = { name: "umami"; websiteId: string } | { name: "plausible"; scriptUrl: string };

export function parseProvider(value: string | undefined): Provider | null {
  if (!value) return null;
  const split = value.indexOf(":");
  const name = value.slice(0, split).trim();
  const arg = value.slice(split + 1).trim();
  if (split < 0 || !arg) return null;
  if (name === "umami") return { name, websiteId: arg };
  if (name === "plausible") return { name, scriptUrl: arg };
  return null;
}

export const provider = parseProvider(process.env.NEXT_PUBLIC_ANALYTICS);

/** True when events are actually sent somewhere (production with a provider set). */
export const analyticsEnabled = provider !== null && process.env.NODE_ENV === "production";

type Props = Record<string, string>;

type AnalyticsWindow = Window & {
  umami?: { track: (name: string, data?: Props) => unknown };
  plausible?: (name: string, options?: { props?: Props; callback?: () => void }) => void;
};

// Events fired before the provider's script has loaded wait here (Umami has no queue of its own).
const pending: Array<() => void> = [];
let scriptReady = false;

/** Called by <AnalyticsScript> once the provider's script has loaded. */
export function markAnalyticsReady(): void {
  scriptReady = true;
  pending.splice(0).forEach((deliver) => deliver());
}

function send(name: string, props: Props): Promise<void> {
  return new Promise((resolve) => {
    const deliver = () => {
      const w = window as AnalyticsWindow;
      try {
        if (provider?.name === "umami" && w.umami) {
          Promise.resolve(w.umami.track(name, props)).then(() => resolve(), () => resolve());
          return;
        }
        if (provider?.name === "plausible" && w.plausible) {
          w.plausible(name, { props, callback: () => resolve() });
          return;
        }
      } catch {}
      resolve();
    };
    // Plausible's snippet queues calls itself, so only Umami needs to wait for its script.
    if (scriptReady || provider?.name === "plausible") deliver();
    else pending.push(deliver);
  });
}

/** Records an event. The promise settles once it has been sent (or straight away if nothing is sent). */
export function track(event: AnalyticsEvent): Promise<void> {
  if (process.env.NODE_ENV !== "production") console.info("[analytics]", event);
  if (!analyticsEnabled) return Promise.resolve();
  const { name, ...rest } = event;
  const props = Object.fromEntries(Object.entries(rest).map(([key, value]) => [key, String(value ?? "none")]));
  return send(name, props);
}
