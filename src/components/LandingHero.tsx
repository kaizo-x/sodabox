'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, PawPrint, Sparkles } from 'lucide-react';
import CatFaceIllustration from '@/components/CatFaceIllustration';
import { cn } from '@/lib/cn';
import { useSound } from '@/lib/sound-context';

const HEADLINE = ['S', 'o', 'd', 'a', 'B', 'o', 'x'];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 24 } },
};

const FLOATERS = [
  { emoji: '🫧', className: 'left-[6%] top-[18%] text-3xl', drift: -22 },
  { emoji: '⭐', className: 'left-[16%] top-[70%] text-2xl', drift: 18 },
  { emoji: '🐾', className: 'right-[10%] top-[12%] text-2xl', drift: -16 },
  { emoji: '🧋', className: 'right-[22%] bottom-[12%] text-3xl', drift: 20 },
  { emoji: '✨', className: 'left-[44%] top-[6%] text-xl', drift: -14 },
];

export default function LandingHero() {
  const { playPop, playChime } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const floatAnimation = (drift: number) =>
    prefersReducedMotion
      ? undefined
      : { y: [0, drift, 0], rotate: [0, drift > 0 ? 8 : -8, 0] };

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-0 opacity-[0.07]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {FLOATERS.map((floater, index) => (
          <motion.span
            key={floater.emoji}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.85, scale: 1 }}
            transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
            className={cn('absolute select-none', floater.className)}
          >
            <motion.span
              className="block"
              animate={floatAnimation(floater.drift)}
              transition={{
                duration: 5 + index,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {floater.emoji}
            </motion.span>
          </motion.span>
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
      >
        <div className="flex flex-col items-start">
          <motion.p
            variants={item}
            className="flex items-center gap-2 rounded-full border-[2.5px] border-charcoal bg-mint px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide shadow-chunky-xs sm:text-sm"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            9 tiny pastel studios inside
          </motion.p>

          <motion.h1
            variants={container}
            className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
          >
            {HEADLINE.map((letter, index) => (
              <motion.span key={`${letter}-${index}`} variants={item} className="inline-block">
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.svg
            viewBox="0 0 300 18"
            aria-hidden="true"
            className="-mt-2 h-5 w-[70%] max-w-[280px]"
          >
            <motion.path
              d="M5 13C70 4 210 3 295 11"
              fill="none"
              stroke="#1E1B24"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.55, duration: 0.85, ease: 'easeInOut' }}
            />
          </motion.svg>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/75 sm:text-lg"
          >
            A cozy little corner of the internet where stationery tools, pastel doodles and one
            very sleepy desk cat live together. Unbox goodies, keep memories, doodle on a
            sketchbook and scribble secret wishes into the sky.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth"
                onClick={playPop}
                className="flex items-center gap-2 rounded-full border-[3px] border-charcoal bg-charcoal px-7 py-3.5 font-display text-base font-semibold text-cream shadow-chunky transition-shadow hover:shadow-chunky-lg"
              >
                Jump In
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/home"
                onClick={playChime}
                className="flex items-center gap-2 rounded-full border-[3px] border-charcoal bg-cream px-7 py-3.5 font-display text-base font-semibold text-charcoal shadow-chunky transition-shadow hover:bg-lavender hover:shadow-chunky-lg"
              >
                Peek at the Playground
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal/70"
          >
            <li className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" aria-hidden="true" /> 4 starter cat mascots
            </li>
            <li className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" aria-hidden="true" /> no accounts needed to peek
            </li>
            <li className="flex items-center gap-2">
              <PawPrint className="h-4 w-4" aria-hidden="true" /> zero ads, ever
            </li>
          </motion.ul>
        </div>

        <motion.div variants={item} className="relative mx-auto w-full max-w-md">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-blob border-[4px] border-charcoal bg-blush p-6 shadow-chunky-lg"
          >
            <div className="rounded-[2rem] border-[3px] border-charcoal bg-cream p-4">
              <CatFaceIllustration accent="#FCE7F3" />
            </div>
            <p className="mt-4 text-center font-display text-lg font-semibold">
              Mochi is guarding your box
            </p>
            <p className="text-center text-sm text-charcoal/65">
              tap the widget in the corner to say hi
            </p>
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], rotate: [-4, -1, -4] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-6 top-8 hidden rounded-2xl border-[3px] border-charcoal bg-mint px-3 py-2 font-display text-sm font-semibold shadow-chunky sm:block"
          >
            🧋 fizz fizz
          </motion.div>

          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -9, 0], rotate: [3, 6, 3] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -right-4 bottom-10 hidden rounded-2xl border-[3px] border-charcoal bg-lavender px-3 py-2 font-display text-sm font-semibold shadow-chunky sm:block"
          >
            ⭐ new sticker!
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
