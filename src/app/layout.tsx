import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { getContent } from "@/content";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const content = getContent();

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // The page is dark-only, so one status-bar colour fits every visitor.
  themeColor: "#09090a",
  colorScheme: "dark",
};

// Runs before first paint:
// 1. Marks that JavaScript is running (data-js), so entrance motion may start
//    hidden. Browsers without IntersectionObserver keep everything visible.
// 2. Every visit starts at the gate. For testing, ?goal=lose|gain skips it for
//    that page load only (nothing is saved).
const bootScript = `(function () {
  var html = document.documentElement;
  if (!("IntersectionObserver" in window)) return;
  html.setAttribute("data-js", "");
  try {
    var goal = new URLSearchParams(location.search).get("goal");
    if (goal === "lose" || goal === "gain") html.setAttribute("data-goal", goal);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={content.locale}
      dir={content.dir}
      className={`${oswald.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        {children}
        <AnalyticsScript />
      </body>
    </html>
  );
}
