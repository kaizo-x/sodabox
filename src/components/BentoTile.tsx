'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, PawPrint } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { MiniProject } from '@/types';

interface BentoTileProps {
  project: MiniProject;
  onOpen: (project: MiniProject) => void;
}

const cardVariants: Variants = {
  rest: { y: 0, rotate: 0 },
  hover: { y: -6, rotate: -0.5 },
};

const earVariants: Variants = {
  rest: { opacity: 0, y: 16, scale: 0.6 },
  hover: { opacity: 1, y: 0, scale: 1 },
};

function CatEar({ className, accent }: { className?: string; accent: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('h-6 w-6', className)}>
      <path
        d="M6 38 20 5l14 33Z"
        fill={accent}
        stroke="#1E1B24"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BentoTile({ project, onOpen }: BentoTileProps) {
  const Icon = project.icon;
  const featured = project.span.includes('row-span-2');
  const [lifted, setLifted] = useState(false);

  return (
    <motion.article
      initial="rest"
      animate={lifted ? 'hover' : 'rest'}
      variants={cardVariants}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onHoverStart={() => setLifted(true)}
      onHoverEnd={() => setLifted(false)}
      onFocus={() => setLifted(true)}
      onBlur={() => setLifted(false)}
      className={cn('group relative', project.span)}
    >
      <motion.div
        aria-hidden="true"
        variants={earVariants}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="pointer-events-none absolute -top-3.5 left-6 z-0 flex gap-7"
      >
        <CatEar accent={project.accent} />
        <CatEar accent={project.accent} className="mt-1" />
      </motion.div>

      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title}`}
        className={cn(
          'relative z-10 flex h-full w-full flex-col rounded-[2rem] border-[3px] border-charcoal p-5 text-left shadow-chunky transition-shadow duration-200 hover:shadow-chunky-lg focus-visible:shadow-chunky-lg',
          project.surface,
        )}
      >
        <PawPrint
          aria-hidden="true"
          className="absolute right-4 top-4 h-16 w-16 text-charcoal/[0.07]"
        />

        <div className="relative flex items-start justify-between gap-2">
          <span className="rounded-full border-2 border-charcoal bg-cream/85 px-3 py-1 font-display text-[0.7rem] font-semibold uppercase tracking-wide">
            {project.tag}
          </span>
          <span className="flex items-center gap-1.5 rounded-full border-2 border-charcoal bg-charcoal px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-cream">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint"
            />
            Active
          </span>
        </div>

        <span
          style={{ backgroundColor: project.accent }}
          className={cn(
            'relative mt-4 grid shrink-0 place-items-center rounded-2xl border-[2.5px] border-charcoal shadow-chunky-xs',
            featured ? 'h-14 w-14' : 'h-12 w-12',
          )}
        >
          <Icon
            aria-hidden="true"
            className={cn('text-charcoal', featured ? 'h-7 w-7' : 'h-6 w-6')}
          />
        </span>

        <div className="relative mt-auto pt-4">
          <h3
            className={cn(
              'font-display font-semibold leading-tight',
              featured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg',
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'mt-1.5 text-charcoal/70',
              featured ? 'text-sm leading-relaxed' : 'text-xs leading-snug',
            )}
          >
            {project.description}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="flex flex-wrap gap-1.5">
              {project.hashtags.map((hashtag) => (
                <span
                  key={hashtag}
                  className="rounded-full border-2 border-charcoal/25 bg-cream/70 px-2 py-0.5 text-[0.65rem] font-medium text-charcoal/70"
                >
                  {hashtag}
                </span>
              ))}
            </span>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-charcoal bg-cream transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
