'use client';

import { motion } from 'framer-motion';
import BentoGrid from '@/components/BentoGrid';
import Navbar from '@/components/Navbar';
import { getAvatar } from '@/lib/avatars';
import { cn } from '@/lib/cn';
import { useUser } from '@/lib/user-context';

export default function HomePage() {
  const { user } = useUser();
  const avatar = getAvatar(user?.avatarId ?? 'mochi');
  const name = user?.username ?? 'Guest Cat';

  return (
    <>
      <Navbar variant="app" />

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-dots pointer-events-none absolute inset-0 opacity-[0.06]"
        />

        <section className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-10 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.span
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
              className={cn(
                'grid h-14 w-14 place-items-center rounded-full border-[3px] border-charcoal text-3xl shadow-chunky-xs',
                avatar.surface,
              )}
            >
              {avatar.emoji}
            </motion.span>

            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-wide text-charcoal/55">
                {avatar.name}&apos;s playground
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Hey {name}, pick a box!
              </h1>
            </div>
          </motion.div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Nine tiny studios are on the desk today. Hover a tile and its cat ears pop up, click
            one to peek inside the shell. Everything is cosmetic for now — the main event is the
            layout, the flow and the purring.
          </p>

          <ul className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-medium">
            {['9 studios', 'all shell-ready', 'sound on by default', 'nothing saved to a server'].map(
              (fact) => (
                <li
                  key={fact}
                  className="rounded-full border-2 border-charcoal bg-cream px-3 py-1.5 shadow-chunky-xs"
                >
                  {fact}
                </li>
              ),
            )}
          </ul>
        </section>

        <section
          aria-label="Mini project playground"
          className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-2 sm:px-6"
        >
          <BentoGrid />
        </section>
      </div>

      <footer className="border-t-[3px] border-charcoal bg-cream">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center text-xs text-charcoal/55 sm:px-6">
          SodaBox prototype · tap the desk cat in the corner for a purr ✦
        </div>
      </footer>
    </>
  );
}
