import { cn } from '@/lib/cn';

interface SodaBoxLogoProps {
  className?: string;
  /** Renders the "SodaBox" wordmark next to the mark. */
  withWordmark?: boolean;
  wordmarkClassName?: string;
}

/** Paw + fizzy soda cup mark for SodaBox. */
export function SodaBoxMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={cn('h-9 w-9', className)}
    >
      <path
        d="M13.8 18h20.4l-2.6 22.1A3.6 3.6 0 0 1 28 43.4h-8a3.6 3.6 0 0 1-3.6-3.3L13.8 18Z"
        fill="#F3E8FF"
        stroke="#1E1B24"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M11 18h26"
        stroke="#1E1B24"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M31 17.4 36.2 8.6"
        stroke="#1E1B24"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M24 34.6c-2.1 0-3.7-1.4-3.7-3.1s1.7-3 3.7-3 3.7 1.3 3.7 3-1.6 3.1-3.7 3.1Z"
        fill="#1E1B24"
      />
      <circle cx="19.6" cy="26.6" r="1.7" fill="#1E1B24" />
      <circle cx="28.4" cy="26.6" r="1.7" fill="#1E1B24" />
      <circle cx="24" cy="24.2" r="1.7" fill="#1E1B24" />
    </svg>
  );
}

export default function SodaBoxLogo({
  className,
  withWordmark = true,
  wordmarkClassName,
}: SodaBoxLogoProps) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <SodaBoxMark />
      {withWordmark ? (
        <span
          className={cn(
            'font-display text-xl font-semibold tracking-tight text-charcoal sm:text-2xl',
            wordmarkClassName,
          )}
        >
          SodaBox
        </span>
      ) : null}
    </span>
  );
}
