'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowLeft, Heart, MousePointerClick, Package } from 'lucide-react';
import CatFaceIllustration from '@/components/CatFaceIllustration';
import { MINI_PROJECTS } from '@/lib/projects';
import { useSound } from '@/lib/sound-context';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } },
};

const PILLARS = [
  {
    icon: Package,
    title: 'Stationery, but alive',
    copy: 'Every module starts as a paper object — a postcard, a polaroid, a cassette — then gets a tiny bit of web magic.',
    surface: 'bg-lavender',
  },
  {
    icon: MousePointerClick,
    title: 'Toys you can poke',
    copy: 'Hover, unbox, stamp, scribble. The whole playground is built for curious clicking and zero pressure.',
    surface: 'bg-mint',
  },
  {
    icon: Heart,
    title: 'Cozy by default',
    copy: 'Soft pastels, chunky ink outlines and a desk cat who purrs when you say hello. No dark patterns, no ads.',
    surface: 'bg-blush',
  },
];

export default function AboutSection() {
  const { playChime } = useSound();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20"
    >
      <motion.p
        variants={item}
        className="inline-flex rounded-full border-[2.5px] border-charcoal bg-butter px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide shadow-chunky-xs"
      >
        The SodaBox story
      </motion.p>

      <motion.h1
        variants={item}
        className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
      >
        A shoebox of little joys, rebuilt for the browser.
      </motion.h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <motion.div variants={item} className="flex flex-col gap-5 text-base leading-relaxed text-charcoal/75">
          <p>
            SodaBox began as a real cardboard box — the kind that collects cinema tickets, cat
            stickers, birthday cards and a cassette that still works. Every few months it got
            opened, and everything inside felt fizzy again. That feeling is the entire product
            brief: a place on the internet where small, handmade-feeling things are worth keeping.
          </p>
          <p>
            So we blended two worlds that rarely share a desk. The cozy stationery side brings
            postcards, wax seals, doodle pads and calendars. The web-toy side brings unboxing
            animations, constellation messages and a cassette deck that spins. Neither side is a
            gimmick — one gives the other something to hold.
          </p>
          <p>
            It is deliberately soft: pastel surfaces, chunky ink borders and retro drop shadows,
            because software can feel like a desk you actually want to sit at. And wherever you
            go, a tiny cat naps in the corner, ready to purr.
          </p>
        </motion.div>

        <motion.aside
          variants={item}
          className="rounded-blob border-[4px] border-charcoal bg-sky p-5 shadow-chunky-lg"
        >
          <div className="rounded-[2rem] border-[3px] border-charcoal bg-cream p-4">
            <CatFaceIllustration accent="#E0F2FE" />
          </div>
          <p className="mt-4 font-display text-lg font-semibold">Desk cat on duty</p>
          <p className="mt-1 text-sm leading-relaxed text-charcoal/70">
            Inspired by stationery hauls, sticker albums, 90s mixtapes and the quiet joy of a cat
            asleep on a warm keyboard.
          </p>
        </motion.aside>
      </div>

      <motion.section variants={item} className="mt-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">How we think about it</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className={`rounded-blob border-[3px] border-charcoal p-5 shadow-chunky ${pillar.surface}`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border-[2.5px] border-charcoal bg-cream shadow-chunky-xs">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{pillar.copy}</p>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section variants={item} className="mt-16">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Nine modules, one playground
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/70">
          Each tile on the playground is its own tiny studio. They are UI shells for now while the
          layout and flow get polished.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MINI_PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <li
                key={project.id}
                className="flex items-start gap-3 rounded-3xl border-[3px] border-charcoal bg-cream p-4 shadow-chunky-sm"
              >
                <span
                  style={{ backgroundColor: project.accent }}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[2.5px] border-charcoal"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold leading-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-charcoal/65">{project.hashtags.join(' · ')}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </motion.section>

      <motion.div
        variants={item}
        className="mt-16 flex flex-col items-start gap-4 rounded-blob border-[4px] border-charcoal bg-lavender p-6 shadow-chunky-lg sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold">Ready to poke around?</h2>
          <p className="mt-1 text-sm text-charcoal/70">
            The bento playground is waiting, cat ears and all.
          </p>
        </div>
        <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/home"
            onClick={playChime}
            className="flex items-center gap-2 rounded-full border-[3px] border-charcoal bg-charcoal px-6 py-3 font-display text-base font-semibold text-cream shadow-chunky"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Playground
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
