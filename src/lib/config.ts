// Every Apply button opens this application form (Typeform, Tally, Google Forms or similar).
// Set it in .env.local and on Vercel.
const applyFormUrl = process.env.NEXT_PUBLIC_APPLY_FORM_URL;

if (!applyFormUrl && process.env.NODE_ENV !== "production") {
  console.warn("NEXT_PUBLIC_APPLY_FORM_URL is not set. Apply buttons point to #apply.");
}

export const APPLY_FORM_URL = applyFormUrl || "#apply";
