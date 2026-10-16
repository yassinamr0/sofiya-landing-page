# PLAN.md: build order

Read CLAUDE.md first. Work top to bottom, one step at a time. Check each step at 390px and 1440px wide before ticking it off.

The reference sketch (link in CLAUDE.md) is for structure, copy and flow only. Its look is not a requirement. You have full freedom over the visual design.

## Step 0: Direction (before any code)
- [x] Look at the reference sketch and propose your own, much higher-quality visual direction. Show it as one hero mock-up for approval before building anything else.
- [x] Confirm the stack and how the intro videos will be hosted.

## Step 1: Foundation
- [x] Create the project and set up the design tokens from the approved direction.
- [x] Put all copy into one typed content file (English only, structured so a second language can be added later).
- [x] Add the Typeform URL as an env var and one shared Apply button component.

## Step 2: The gate ("What are you?")
- [ ] Full-screen question shown first, before anything else, in a funny tone.
- [ ] Two choices: **3egl** (calf) for someone heavy who wants to lose weight, and **Ma2asha** (broomstick) for someone skinny who wants to bulk up.
- [ ] Store the goal (remember it between visits), reveal the page, with a reset option for development.
- [ ] Placeholder illustrations clearly marked. The entrance and the choice should feel fun but fast.

## Step 3: The hero
- [ ] Headline above the intro video, video centered and large, faded photo backdrop behind.
- [ ] Goal-based video swap (calf = weight-loss video, broomstick = muscle-gain video; placeholders for now), poster frame, tap-to-play, no autoplay with sound.
- [ ] "You don't have to choose us." block and the Apply button under the video.

## Step 4: Middle sections
- [ ] Contrast section.
- [ ] Chats section: two illustrated chats, the "Here" one follows the goal. Labelled illustrative.
- [ ] "This is not a template" icon cards.

## Step 5: Proof and filters
- [ ] Results: testimonial cards plus the horizontal scroll strip of portrait photos (swipe on mobile, scroll or drag on desktop).
- [ ] Objections section with Apply button.
- [ ] For you / Not for you cards with check and X icons.
- [ ] Final CTA and footer. No FAQ section.

## Step 6: The goose
- [ ] Propose the animation technique and get approval.
- [ ] Build: enters from the side, waddles to the Apply button, pecks it, turns muscular, runs off.
- [ ] Always plays for every visitor (no reduced-motion fallback, no hiding it), once per visit, after the gate. Works at phone and desktop sizes. The button stays clickable the whole time.

## Step 7: Quality pass
- [ ] Mobile test on a real phone, including the Instagram in-app browser and iOS Safari.
- [ ] Speed: images, video, JS size, Lighthouse mobile.
- [ ] Accessibility basics from CLAUDE.md.
- [ ] Analytics events wired and checked.
- [ ] Every placeholder listed in one place so it can be swapped for real photos, videos, names, results and quotes.

## Later (not now)
- Arabic version with a right-to-left layout.
- Real intro videos, real client results, real photos.
