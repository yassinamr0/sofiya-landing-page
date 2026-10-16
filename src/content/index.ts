import { en } from "./en";
import type { Content, Locale } from "./types";

export type * from "./types";

const byLocale: Record<Locale, Content> = { en };

export const defaultLocale: Locale = "en";

export function getContent(locale: Locale = defaultLocale): Content {
  return byLocale[locale];
}
