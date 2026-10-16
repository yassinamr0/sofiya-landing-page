import type { Metadata, Viewport } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import { getContent } from "@/content";
import { GOAL_STORAGE_KEY } from "@/lib/goal";
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
// 2. Puts the saved gate answer on <html data-goal> so a returning visitor goes
//    straight to the page with no flash of the gate. ?reset clears the answer,
//    ?goal=lose|gain sets it (handy for testing on a phone).
const bootScript = `(function () {
  var html = document.documentElement;
  if (!("IntersectionObserver" in window)) return;
  html.setAttribute("data-js", "");
  try {
    var key = ${JSON.stringify(GOAL_STORAGE_KEY)};
    var params = new URLSearchParams(location.search);
    if (params.has("reset")) localStorage.removeItem(key);
    var fromUrl = params.get("goal");
    if (fromUrl === "lose" || fromUrl === "gain") localStorage.setItem(key, fromUrl);
    var goal = localStorage.getItem(key);
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
