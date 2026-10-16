# CLAUDE.md: Sofiya Validovna coaching landing page

## What this is
A lead-generation landing page for fitness coach **Sofiya Validovna** (150k+ Instagram followers). Visitors arrive from Instagram, mostly on phones. They already know her story.

**A lead = someone who completes the Typeform.** Every "Apply now" button goes to the Typeform (keep the URL in one env var, `NEXT_PUBLIC_TYPEFORM_URL`). Nothing else on the page is a conversion.

After the Typeform, Sofiya's team reaches out on Instagram chat (not a call). Pricing and duration are discussed there, never on the page.

## The offer (use only these facts, never invent more)
- 6-month "180 degree" transformation of body and life.
- Daily WhatsApp check-ins: "show me what you ate, show me everything".
- Weekly one-on-one meeting with Sofiya herself (food, what to improve, habits).
- Personalized workout and food plans, changeable any time.
- Extra custom plans (sleep, growing a specific muscle, etc.).
- Full access to call the coach for any help.
- No client cap.
- Do not state a price, a duration other than six months, or any result number. Results, names, photos and quotes are placeholders until real ones are supplied.

## Voice
Bold, direct, never salesy. Confident enough to say "you don't have to choose us, you have another hundred options." Specific beats vague. No hype words, no fake urgency, no countdown timers, no "limited spots" (there is no cap).
Differentiators to lean on: she is present and doesn't ghost; plans are personalized, not AI-generated or a PDF; the focus is lifestyle, not just the body.

## The reference design (a rough sketch, NOT the final design)
A rough Claude Design sketch exists: https://claude.ai/artifact/U723osQZK9PTQr8aCiznLy
Use it for **structure, copy and flow only**. It is deliberately basic. Its colors, fonts, layout and styling are NOT requirements: ignore them. The real site must be far higher quality: custom, premium, confident, not a template. You have full creative freedom over the visual design (color, typography, layout, imagery, motion). Propose your own direction.

## Page flow
1. **Gate: "What are you?"** Full-screen, first thing seen, before anything else. Funny tone. Two choices: **3egl** (calf, for someone heavy who wants to lose weight) and **Ma2asha** (broomstick, for someone skinny who wants to bulk up). Choosing one stores the goal and reveals the real page. Wording and illustrations are placeholders and may change. The choice must also be remembered (localStorage, with try/catch) so a returning visitor skips the gate. Provide a way to reset it during development.
2. **Hero:** headline "Six months from now, you won't recognize yourself." above a large, centered intro video. The video shown depends on the goal (calf = weight-loss video, broomstick = muscle-gain video). A faded photo backdrop sits behind everything. Under the video: "You don't have to choose us." and "You have a hundred other options. Keep scrolling, keep comparing, keep waiting. Or take a real step." with the **Apply now** button.
3. **Contrast:** "Most coaches change how you look. We change how you live." with a Most programs vs Here comparison (template plan vs built for you; silence vs daily check-ins; no real calls vs weekly meeting plus calls; only the body vs the whole lifestyle).
4. **Chats:** "Other coaches go quiet. Sofiya doesn't." Two illustrated chat screens side by side: a "Most programs" chat of unanswered messages ending "No reply for 6 days", and a "Here" chat that follows the goal (weight-loss chat or muscle chat). Labelled "Illustrative conversations, not real clients."
5. **"This is not a template":** five icon cards (daily WhatsApp check-ins, weekly meeting with Sofiya, plans that change with you, extra plans for specific goals, call your coach for any help).
6. **Results:** "Results, not promises." Three testimonial cards (before/after photo or video, first name, result, quote), then a "More results" row of portrait photos in one horizontal scroll strip (not a grid of boxes).
7. **"You might be thinking...":** four objection cards, each quoting a doubt and answering it, each with a slot for a real client who said the same, plus an Apply button.
8. **Who this is for / isn't:** a "For you if..." card with check icons and a "Not for you if..." card with X icons (the two should look clearly different).
9. **Final CTA:** "Ready to take the step?" with Apply now and the line "Takes 2 minutes. We'll reach out on Instagram."
10. Footer: name and Instagram link.
There is no FAQ section. Do not add one.

## The goose (required, always on)
An animated goose comes in from the side of the screen, waddles to the **Apply now** button, pecks it, turns **muscular**, then runs off. It is the site's signature moment.
- It plays for **every** visitor. Do **not** add a reduced-motion fallback or hide it for anyone. It's a website, not an app.
- It should trigger after the gate is passed and the hero is visible, once per visit.
- It must find the button's real on-screen position (mobile and desktop differ) and not block or cover the button for long. The button stays clickable the whole time.
- The muscular transformation needs to be funny and readable at phone size. Propose the technique (hand-built SVG with GSAP, Rive, Lottie or a sprite sheet) and explain the pick before building. Keep the animation light enough not to hurt page speed.

## Constraints
- **Mobile first.** Most visitors come from the Instagram in-app browser on phones. Design and test at 390px wide first. Videos must not autoplay with sound; handle iOS Safari and the Instagram in-app browser.
- **Fast.** Optimize images and video (poster frames, lazy loading, compressed video, no huge JS). Aim for a strong Lighthouse mobile score.
- **Accessibility basics:** real buttons and links, visible focus, alt text, readable contrast, tap targets of at least 44px. Buttons should give clear press feedback; hover effects only on devices that hover.
- **Arabic is possible later, not now.** Do not build it yet, but structure the code so it can be added without a rewrite: all copy in one content file or i18n layer, and use logical CSS properties (margin-inline, padding-inline, text-align: start) rather than left/right.
- **Placeholders are honest.** Anything fake (photos, names, numbers, quotes, chat conversations) must be visibly marked and easy to swap. Never present invented results as real.
- **Analytics:** track gate choice, video play, each Apply click (which button), and Typeform opens. Keep it simple and privacy-respecting.

## Suggested stack (change it if you have a better reason)
Next.js (App Router) + TypeScript + Tailwind, Framer Motion or GSAP for motion, deployed on Vercel. Self-host or use a video host with HLS for the intro videos. Keep content in a single typed content file.

## Working rules
- Read PLAN.md and work one step at a time. After each step, run the site and check it at mobile and desktop widths before moving on.
- Ask before changing the offer, the copy's meaning, the goose behavior, or the gate concept.
- Keep the code simple and readable. Don't add features that aren't in this file or PLAN.md.
