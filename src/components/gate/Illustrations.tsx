// PLACEHOLDER illustrations for the gate (and later the hero video frame).
// Drawn in the palette's flat colours; swap for final artwork when it exists.

type Props = { className?: string };

/** 3egl: a round, cheerful calf. */
export function CalfArt({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <rect x="58" y="158" width="24" height="36" rx="10" fill="#F5F5F2" />
      <rect x="118" y="158" width="24" height="36" rx="10" fill="#F5F5F2" />
      <rect x="58" y="184" width="24" height="10" rx="4" fill="#3A3A40" />
      <rect x="118" y="184" width="24" height="10" rx="4" fill="#3A3A40" />
      <ellipse cx="100" cy="146" rx="72" ry="42" fill="#F5F5F2" />
      <path d="M44 132q14-18 34-8q6 20-12 28q-20 2-22-20z" fill="#09090A" />
      <path d="M134 150q20-12 32 4q-2 20-22 20q-14-4-10-24z" fill="#09090A" />
      <ellipse cx="48" cy="76" rx="21" ry="10" transform="rotate(-20 48 76)" fill="#F5F5F2" />
      <ellipse cx="152" cy="76" rx="21" ry="10" transform="rotate(20 152 76)" fill="#F5F5F2" />
      <ellipse cx="50" cy="77" rx="11" ry="5" transform="rotate(-20 50 77)" fill="#FF2E93" />
      <ellipse cx="150" cy="77" rx="11" ry="5" transform="rotate(20 150 77)" fill="#FF2E93" />
      <path d="M74 54q-5-15 6-20q4 9 4 18z" fill="#A8A8A3" />
      <path d="M126 54q5-15-6-20q-4 9-4 18z" fill="#A8A8A3" />
      <ellipse cx="100" cy="88" rx="47" ry="43" fill="#F5F5F2" />
      <path d="M62 72q10-22 32-15q-2 18-18 22q-14 1-14-7z" fill="#09090A" />
      <circle cx="84" cy="88" r="5.5" fill="#09090A" />
      <circle cx="86" cy="86" r="1.8" fill="#F5F5F2" />
      <circle cx="116" cy="88" r="5.5" fill="#09090A" />
      <circle cx="118" cy="86" r="1.8" fill="#F5F5F2" />
      <ellipse cx="100" cy="113" rx="29" ry="18" fill="#FF2E93" />
      <ellipse cx="90" cy="111" rx="4" ry="5.5" fill="#09090A" />
      <ellipse cx="110" cy="111" rx="4" ry="5.5" fill="#09090A" />
      <path
        d="M92 122q8 5 16 0"
        stroke="#09090A"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Ma2asha: a skinny broomstick, trying very hard to flex. */
export function BroomArt({ className }: Props) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M100 88L76 82L70 64M100 88L124 82L130 64"
        stroke="#A8A8A3"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="77" cy="79" r="3.5" fill="#A8A8A3" />
      <circle cx="123" cy="79" r="3.5" fill="#A8A8A3" />
      <rect x="96" y="14" width="8" height="128" rx="4" fill="#A8A8A3" />
      <circle cx="93" cy="42" r="7" fill="#F5F5F2" />
      <circle cx="94.5" cy="43.5" r="3" fill="#09090A" />
      <circle cx="107" cy="42" r="7" fill="#F5F5F2" />
      <circle cx="108.5" cy="43.5" r="3" fill="#09090A" />
      <path
        d="M95 57q5-3 10 0"
        stroke="#09090A"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M138 44q7 10 0 14q-7-4 0-14z" fill="#A8A8A3" />
      <rect x="84" y="136" width="32" height="14" fill="#FF2E93" />
      <path d="M86 150L54 194H146L114 150Z" fill="#F5F5F2" />
      <path
        d="M92 153L74 192M97 153L87 192M100 153V192M103 153L113 192M108 153L126 192"
        stroke="#09090A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".45"
      />
    </svg>
  );
}
