// Every Apply button goes to this Typeform. Set it in .env.local and on Vercel.
const typeformUrl = process.env.NEXT_PUBLIC_TYPEFORM_URL;

if (!typeformUrl && process.env.NODE_ENV !== "production") {
  console.warn("NEXT_PUBLIC_TYPEFORM_URL is not set. Apply buttons point to #apply.");
}

export const TYPEFORM_URL = typeformUrl || "#apply";
