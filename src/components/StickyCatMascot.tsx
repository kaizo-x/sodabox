'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import CatFaceIllustration from '@/components/CatFaceIllustration';
import { useSound } from '@/lib/sound-context';

const PURR_LINES = [
  'purrrr~',
  'mrrrp!',
  'nya~',
  'paw-five!',
  '*tail wiggle*',
  'meow meow!',
  'fizz fizz!',
];

const PARTICLES = [
  { emoji: '💜', x: -34, y: -46 },
  { emoji: '⭐', x: -8, y: -58 },
  { emoji: '🐾', x: 20, y: -44 },
  { emoji: '✨', x: 34, y: -20 },
];

/** Cute desk-cat widget pinned to the bottom-right of every screen. */
export default function StickyCatMascot() {
  const { playPurr } = useSound();
  const prefersReducedMotion = useReducedMotion();
  const [bubble, setBubble] = useState<string | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const handlePet = useCallback(() => {
    const line = PURR_LINES[Math.floor(Math.random() * PURR_LINES.length)];
    setBubble(line);
    setBurstKey((key) => key + 1);
    playPurr();
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setBubble(null), 2000);
  }, [playPurr]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {bubble ? (
          <motion.p
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            className="pointer-events-none rounded-2xl rounded-br-sm border-[3px] border-charcoal bg-cream px-3 py-1.5 font-display text-sm font-semibold shadow-chunky-xs"
          >
            {bubble}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {burstKey > 0 && bubble ? (
            <div
              key={burstKey}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {PARTICLES.map((particle, index) => (
                <motion.span
                  key={`${burstKey}-${particle.emoji}-${index}`}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 1, x: particle.x, y: particle.y, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ duration: 0.85, delay: index * 0.04, ease: 'easeOut' }}
                  className="absolute text-lg"
                >
                  {particle.emoji}
                </motion.span>
              ))}
            </div>
          ) : null}
        </AnimatePresence>

        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.button
            type="button"
            onClick={handlePet}
            whileHover={{ scale: 1.06, rotate: -3 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 460, damping: 22 }}
            aria-label="Pet the SodaBox desk cat"
            className="pointer-events-auto relative grid h-16 w-16 place-items-center rounded-full border-[3px] border-charcoal bg-lavender shadow-chunky-lg"
          >
            <span
              aria-hidden="true"
              className="absolute -top-2 left-3 h-3.5 w-3.5 -rotate-[18deg] rounded-tl-md border-[3px] border-b-0 border-charcoal bg-lavender"
            />
            <span
              aria-hidden="true"
              className="absolute -top-2 right-3 h-3.5 w-3.5 rotate-[18deg] rounded-tr-md border-[3px] border-b-0 border-charcoal bg-lavender"
            />
            <span className="h-11 w-11 overflow-hidden rounded-full">
              <CatFaceIllustration accent="#FCE7F3" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <span aria-live="polite" className="sr-only">
        {bubble ?? ''}
      </span>
    </div>
  );
}
