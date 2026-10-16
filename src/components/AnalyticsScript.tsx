"use client";

import Script from "next/script";
import { analyticsEnabled, markAnalyticsReady, provider } from "@/lib/analytics";

// Plausible's queue stub: calls made before its script loads are kept and replayed.
const plausibleStub = `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`;

/** Loads the analytics provider's script after the page is interactive, if one is set. */
export function AnalyticsScript() {
  if (!analyticsEnabled || !provider) return null;

  if (provider.name === "umami") {
    return (
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id={provider.websiteId}
        strategy="afterInteractive"
        onReady={markAnalyticsReady}
      />
    );
  }

  return (
    <>
      <Script id="plausible-stub" strategy="afterInteractive">
        {plausibleStub}
      </Script>
      <Script src={provider.scriptUrl} strategy="afterInteractive" onReady={markAnalyticsReady} />
    </>
  );
}
