'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { MiniProject } from '@/types';

interface ProjectModalProps {
  project: MiniProject;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const Icon = project.icon;

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialogRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/45 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sodabox-modal-title"
        initial={{ opacity: 0, y: 26, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-blob border-[4px] border-charcoal bg-cream shadow-chunky-lg"
      >
        <div
          style={{ backgroundColor: project.accent }}
          className="relative flex items-center gap-3 border-b-[3px] border-charcoal px-6 py-5"
        >
          <span className="grid h-12 w-12 place-items-center rounded-2xl border-[2.5px] border-charcoal bg-cream shadow-chunky-xs">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-charcoal/70">
              {project.tag}
            </p>
            <h2 id="sodabox-modal-title" className="font-display text-2xl font-semibold">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="px-6 py-6">
          <p className="text-sm leading-relaxed text-charcoal/75">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.hashtags.map((hashtag) => (
              <span
                key={hashtag}
                className="rounded-full border-2 border-charcoal/25 bg-white px-2.5 py-1 text-xs font-medium text-charcoal/70"
              >
                {hashtag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex gap-3 rounded-3xl border-[2.5px] border-dashed border-charcoal/30 bg-white/70 p-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-charcoal" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-charcoal/70">
              <span className="font-display font-semibold text-charcoal">Coming soon:</span>{' '}
              {project.shellNote}
            </p>
          </div>

          <motion.button
            ref={closeRef}
            type="button"
            onClick={onClose}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              'mt-6 flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-charcoal bg-charcoal px-6 py-3 font-display text-base font-semibold text-cream shadow-chunky',
            )}
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
