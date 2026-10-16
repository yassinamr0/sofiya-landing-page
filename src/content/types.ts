// Shapes for every piece of copy on the page. One object per language
// implements `Content`, so adding Arabic later means adding `ar.ts`.

export type Locale = "en";
export type Direction = "ltr" | "rtl";

/** The visitor's answer at the gate: 3egl (lose weight) or Ma2asha (bulk up). */
export type Goal = "lose" | "gain";

/** Which Apply button was pressed, for analytics. */
export type ApplySource = "nav" | "hero" | "objections" | "final";

/**
 * Highlight styles for words inside a headline.
 * band: pink highlighter that wipes in behind the words.
 * outline: hollow letters.
 * circle: hand-drawn loop around the words.
 */
export type Mark = "band" | "outline" | "circle";

/** A line of text where some words carry a highlight. */
export type Rich = ReadonlyArray<string | { text: string; mark: Mark }>;

/** A headline whose line breaks are set by hand, one `Rich` per line. */
export type Lines = ReadonlyArray<Rich>;

/**
 * Anything fake (photos, names, numbers, quotes) is marked so it is easy to find
 * and swap. Set it to false (or remove it) once the real thing is in.
 */
export type Placeholder = { placeholder?: boolean };

/**
 * A photo: put the file in public/media/ and give its path, e.g.
 * { src: "/media/results/anna.jpg", alt: "Anna before and after six months" }.
 * Next.js resizes and compresses it automatically.
 */
export type Photo = { src: string; alt: string };

export type ChatSender = "client" | "coach";

export type ChatItem =
  | { kind: "time"; from: ChatSender; text: string }
  | { kind: "text"; from: ChatSender; text: string }
  | ({ kind: "photo"; from: ChatSender; label: string } & Placeholder);

export type Chat = {
  label: string;
  items: ReadonlyArray<ChatItem>;
  footnote: string;
};

/**
 * A 16:9 intro video, hosted outside the repo. `src` is a direct MP4 link or a
 * streaming (.m3u8 / HLS) link; `poster` is a still image link shown before
 * playing. Until `src` is set, the frame shows `placeholderLabel` and the
 * goal's drawing. YouTube/Vimeo page links do not work here.
 */
export type HeroVideo = {
  src?: string;
  poster?: string;
  placeholderLabel: string;
};

export type FeatureIcon = "chat" | "calendar" | "sliders" | "layers" | "phone";

export type Content = {
  locale: Locale;
  dir: Direction;

  meta: { title: string; description: string };

  brand: {
    name: string;
    instagram: { label: string; url: string } & Placeholder;
  };

  apply: { label: string };

  gate: {
    title: Lines;
    subtitle: string;
    note: string;
    options: Record<Goal, { name: string; ariaLabel: string }>;
  };

  nav: { reset: string };

  hero: {
    shout: Lines;
    punch: Rich;
    backdropNote: string;
    /** Photos of Sofiya for the faded backdrop (decorative, so no alt text). Empty: placeholder tiles. */
    backdropPhotos: ReadonlyArray<string>;
    playLabel: string;
    /** Shown after tapping play while a goal has no real video yet. */
    videoPendingNote: string;
    video: Record<Goal, HeroVideo>;
    choose: { title: Rich; body: string };
  };

  contrast: {
    title: Rich;
    theirsLabel: string;
    oursLabel: string;
    rows: ReadonlyArray<{ theirs: string; ours: string }>;
  };

  chats: {
    title: Rich;
    intro: string;
    theirs: Chat;
    ours: Record<Goal, Chat>;
    disclaimer: string;
  };

  notTemplate: {
    title: Rich;
    intro: string;
    items: ReadonlyArray<{ icon: FeatureIcon; title: string; body: string }>;
  };

  results: {
    title: Rich;
    testimonials: ReadonlyArray<
      {
        media:
          | { kind: "photo"; label: string; photo?: Photo }
          /** A direct MP4 link; the poster is a still image shown before it plays. */
          | { kind: "video"; label: string; video?: { src: string; poster?: string } };
        name: string;
        result: string;
        quote: string;
      } & Placeholder
    >;
    moreTitle: string;
    more: ReadonlyArray<{ label: string; photo?: Photo } & Placeholder>;
  };

  objections: {
    title: Rich;
    items: ReadonlyArray<{ doubt: string; answer: string; proof: string }>;
  };

  fit: {
    title: Rich;
    forYou: { title: string; items: ReadonlyArray<string> };
    notForYou: { title: string; items: ReadonlyArray<string> };
  };

  finalCta: { title: Rich; note: string };

  footer: {
    name: string;
    /** Shown next to the Instagram link while its URL is still a placeholder. */
    instagramPlaceholderNote: string;
  };
};
