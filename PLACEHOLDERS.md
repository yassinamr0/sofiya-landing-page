# Placeholders to replace before launch

Everything fake on the page, in one list, with where the real thing goes. Almost all of it lives in **`src/content/en.ts`** (every entry there is commented `PLACEHOLDER`), plus two settings.

Once an item is real, remove its brackets and set `placeholder: false` where it has one.

## Settings (`.env.local` for development, Vercel → Project → Settings → Environment Variables for the live site)

| Setting | Now | Put |
| --- | --- | --- |
| `NEXT_PUBLIC_APPLY_FORM_URL` | `https://forms.example.com/REPLACE_ME` | The share link of the application form (Typeform, Tally or Google Forms). Every Apply button opens it. |
| `NEXT_PUBLIC_ANALYTICS` | empty: nothing is sent | `umami:<website id>` or `plausible:<script URL from Plausible's install snippet>`. Rebuild after changing it. |

## Links

| Where in `en.ts` | Now | Put |
| --- | --- | --- |
| `brand.instagram.url` | `https://www.instagram.com/` (footer shows "(placeholder link)") | Sofiya's Instagram profile URL, then `placeholder: false` |

## Videos (hosted outside the repo)

| Where in `en.ts` | Now | Put |
| --- | --- | --- |
| `hero.video.lose` | drawing of the calf + "Placeholder: weight-loss intro video" | `src`: a streaming `.m3u8` link (Bunny Stream, Cloudflare Stream, Mux) or a direct `.mp4` link; `poster`: a still image link. 16:9. |
| `hero.video.gain` | drawing of the broomstick + "Placeholder: muscle-gain intro video" | Same, for the muscle-gain video |
| `results.testimonials[2].media.video` | "[CLIENT VIDEO TESTIMONIAL]" | `{ src: "<direct .mp4 link>", poster: "/media/results/<name>-poster.jpg" }` |

YouTube or Vimeo page links don't work in these players; they need a video file or stream link. If the host asks about cross-origin access (CORS), allow the site's domain.

## Photos (put the files in `public/media/`, then reference them by path)

| Where in `en.ts` | Now | Put |
| --- | --- | --- |
| `hero.backdropPhotos` | grey tiles + "Backdrop photos: placeholder" | 6 or 12 paths, e.g. `["/media/backdrop/1.jpg", …]`. Decorative, no alt text needed. The note disappears by itself. |
| `results.testimonials[0].media.photo`, `[1].media.photo` | "[BEFORE / AFTER PHOTO]" | `{ src: "/media/results/<name>.jpg", alt: "<Name> before and after six months" }`, portrait 4:5 |
| `results.more` (10 entries, built from `clientPhoto`) | "[Client photo]" | One entry per photo: `{ label: "", photo: { src, alt } }`, portrait 3:4 |

Next.js resizes and compresses these automatically. Photos around 1600px on the long side are plenty.

## Text

| Where in `en.ts` | Now | Put |
| --- | --- | --- |
| `results.testimonials[*].name` | "[Client first name]" | The client's first name (with their permission) |
| `results.testimonials[*].result` | "[X kg in Y weeks]" | Their real result. No invented numbers. |
| `results.testimonials[*].quote` | "[Real testimonial, in the client's own words]" | Their words |
| `objections.items[*].proof` | "[Client who said the same: X kg in Y weeks]" | A real client who had that doubt, and their result |
| `chats.ours.*` photo bubbles | "[photo: breakfast]", "[photo: pre-workout meal]" | Can stay: the chats are labelled "Illustrative conversations, not real clients." |

## Illustrations and wording still marked "to be decided"

| What | Where | Note |
| --- | --- | --- |
| Gate wording, and the line "Placeholder wording and visuals, to be decided." | `gate` in `en.ts` | Remove the `note` line once the gate copy is final |
| Calf and broomstick drawings | `src/components/gate/Illustrations.tsx` | Hand-drawn SVG; swap the drawing inside each component for final artwork (same 200×200 canvas) |
| Site icon (pink tile with an "S") | `src/app/icon.svg` | Replace with the real logo or mark |

## Before launch: test on a real phone

Emulation can't reproduce these, so check them on an actual iPhone and Android phone:

1. Open the site **from an Instagram DM or bio link** (Instagram's in-app browser) and in **iOS Safari**.
2. Gate: tap both answers (reload the page to see the gate again).
3. Intro video: tap play. It should play inline with sound, never on its own.
4. Goose: scroll to the Apply button under the video. It walks in, pecks, flexes and runs off; the button still works while it's there.
5. "More results": swipe the strip sideways; the page itself shouldn't move.
6. Hold a finger on "Apply now": no text selection or pop-up.
7. Turn the phone sideways: nothing hides under the notch.
8. Tap Apply: the form opens in the same tab. Submit a test entry and check it arrives.
