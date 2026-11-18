import { cn } from '@/lib/cn';

interface CatFaceIllustrationProps {
  className?: string;
  /** Pastel hex used for the ears and blush. */
  accent?: string;
}

/** Chunky, hand-drawn looking cat face used across the hero + about pages. */
export default function CatFaceIllustration({
  className,
  accent = '#F3E8FF',
}: CatFaceIllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={cn('h-full w-full', className)}
    >
      <path
        d="M42 74 50 22l44 30Z"
        fill={accent}
        stroke="#1E1B24"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path
        d="M158 74 150 22l-44 30Z"
        fill={accent}
        stroke="#1E1B24"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <rect
        x="30"
        y="52"
        width="140"
        height="118"
        rx="48"
        fill="#FFFDF9"
        stroke="#1E1B24"
        strokeWidth="5"
      />
      <path
        d="M70 108q11-13 22 0"
        stroke="#1E1B24"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M108 108q11-13 22 0"
        stroke="#1E1B24"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="124" r="9" fill={accent} />
      <circle cx="140" cy="124" r="9" fill={accent} />
      <path d="M92 118h16l-8 8-8-8Z" fill="#1E1B24" />
      <path
        d="M100 126v6"
        stroke="#1E1B24"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M100 132c-4 7-12 6-14 1M100 132c4 7 12 6 14 1"
        stroke="#1E1B24"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 112h-14M31 124l-13 4M170 112h14M169 124l13 4"
        stroke="#1E1B24"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
