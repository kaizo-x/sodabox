import Link from 'next/link';
import LandingHero from '@/components/LandingHero';
import Navbar from '@/components/Navbar';
import SodaBoxLogo from '@/components/SodaBoxLogo';

const STEPS = [
  {
    emoji: '🐱',
    title: 'Pick a starter cat',
    copy: 'Four very different personalities, one of them is always hungry.',
    surface: 'bg-lavender',
  },
  {
    emoji: '🎁',
    title: 'Open your box',
    copy: 'Nine tiny studios land on one bento board, ready to be poked.',
    surface: 'bg-mint',
  },
  {
    emoji: '✏️',
    title: 'Make soft little things',
    copy: 'Doodle, stamp, seal, plan and stash memories in pastel.',
    surface: 'bg-peach',
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar variant="landing" />
      <LandingHero />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className={`rounded-blob border-[3px] border-charcoal p-6 shadow-chunky ${step.surface}`}
            >
              <span
                aria-hidden="true"
                className="grid h-12 w-12 place-items-center rounded-2xl border-[2.5px] border-charcoal bg-cream text-2xl shadow-chunky-xs"
              >
                {step.emoji}
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">{step.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{step.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t-[3px] border-charcoal bg-cream">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6">
          <SodaBoxLogo />
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 text-sm">
            <Link className="hover:underline" href="/about">
              About
            </Link>
            <Link className="hover:underline" href="/home">
              Playground
            </Link>
            <Link className="hover:underline" href="/auth">
              Login
            </Link>
          </nav>
          <p className="text-xs text-charcoal/55">Made with pastel and purrs ✦ UI prototype</p>
        </div>
      </footer>
    </>
  );
}
