'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Menu, Volume2, VolumeX, X } from 'lucide-react';
import SodaBoxLogo from '@/components/SodaBoxLogo';
import { getAvatar } from '@/lib/avatars';
import { cn } from '@/lib/cn';
import { useSound } from '@/lib/sound-context';
import { useUser } from '@/lib/user-context';

interface NavbarProps {
  /** `landing` shows the Login CTA, `app` shows sound + avatar controls. */
  variant: 'landing' | 'app';
}

interface NavLink {
  href: string;
  label: string;
}

const APP_LINKS: NavLink[] = [
  { href: '/home', label: 'Playground' },
  { href: '/about', label: 'About' },
];

const LANDING_LINKS: NavLink[] = [{ href: '/about', label: 'About' }];

export default function Navbar({ variant }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { soundOn, toggleSound, playPop } = useSound();
  const { user, signOut } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const links = variant === 'app' ? APP_LINKS : LANDING_LINKS;
  const avatar = getAvatar(user?.avatarId ?? 'mochi');

  useEffect(() => {
    setMobileOpen(false);
    setUserOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!userOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) setUserOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setUserOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userOpen]);

  const handleSignOut = () => {
    signOut();
    setUserOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-charcoal bg-cream/90 backdrop-blur-md">
      <nav
        aria-label={variant === 'app' ? 'Playground' : 'Main'}
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link
          href={variant === 'app' ? '/home' : '/'}
          className="rounded-2xl transition-transform hover:-rotate-2"
          aria-label={variant === 'app' ? 'SodaBox playground home' : 'SodaBox home'}
        >
          <SodaBoxLogo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full border-[2.5px] border-transparent px-4 py-2 font-display text-sm font-medium transition-colors',
                  active
                    ? 'border-charcoal bg-lavender shadow-chunky-xs'
                    : 'text-charcoal/75 hover:border-charcoal hover:bg-white hover:text-charcoal',
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {variant === 'landing' ? (
            <Link
              href="/auth"
              onClick={playPop}
              className="ml-2 rounded-full border-[2.5px] border-charcoal bg-charcoal px-5 py-2 font-display text-sm font-semibold text-cream shadow-chunky-xs transition-transform hover:-translate-y-0.5 hover:shadow-chunky"
            >
              Login
            </Link>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={soundOn}
                aria-label={soundOn ? 'Mute playground sounds' : 'Unmute playground sounds'}
                className="grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-charcoal bg-mint text-charcoal shadow-chunky-xs transition-transform hover:-translate-y-0.5 hover:shadow-chunky"
              >
                {soundOn ? (
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <VolumeX className="h-4 w-4" aria-hidden="true" />
                )}
              </button>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserOpen((open) => !open)}
                  aria-expanded={userOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-2 rounded-full border-[2.5px] border-charcoal bg-cream py-1 pl-1 pr-3 shadow-chunky-xs transition-transform hover:-translate-y-0.5 hover:shadow-chunky"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'grid h-7 w-7 place-items-center rounded-full border-2 border-charcoal text-base',
                      avatar.surface,
                    )}
                  >
                    {avatar.emoji}
                  </span>
                  <span className="font-display text-sm font-medium">
                    {user?.username ?? 'Guest Cat'}
                  </span>
                </button>

                <AnimatePresence>
                  {userOpen ? (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                      className="absolute right-0 mt-3 w-60 rounded-3xl border-[3px] border-charcoal bg-cream p-3 shadow-chunky"
                    >
                      <p className="px-2 pb-1 font-display text-sm font-semibold">
                        {user?.username ?? 'Guest Cat'}
                      </p>
                      <p className="truncate px-2 pb-3 text-xs text-charcoal/60">
                        {user?.email ?? 'just visiting the playground'}
                      </p>
                      <p
                        className={cn(
                          'mb-3 rounded-2xl border-2 border-charcoal px-2 py-1.5 text-xs',
                          avatar.surface,
                        )}
                      >
                        Starter cat · <span className="font-semibold">{avatar.name}</span>
                      </p>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl border-[2.5px] border-charcoal bg-butter px-3 py-2 font-display text-sm font-semibold shadow-chunky-xs transition-transform hover:-translate-y-0.5"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Log out
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={playPop}
                  className="ml-2 rounded-full border-[2.5px] border-charcoal bg-charcoal px-5 py-2 font-display text-sm font-semibold text-cream shadow-chunky-xs transition-transform hover:-translate-y-0.5 hover:shadow-chunky"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="sodabox-mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="grid h-10 w-10 place-items-center rounded-2xl border-[2.5px] border-charcoal bg-lavender shadow-chunky-xs md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="sodabox-mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t-[3px] border-charcoal bg-cream md:hidden"
          >
            <div className="flex flex-col gap-2 px-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-2xl border-[2.5px] px-4 py-3 font-display text-sm font-medium',
                    pathname === link.href
                      ? 'border-charcoal bg-lavender shadow-chunky-xs'
                      : 'border-charcoal/20 bg-white',
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {variant === 'landing' ? (
                <Link
                  href="/auth"
                  onClick={playPop}
                  className="rounded-2xl border-[2.5px] border-charcoal bg-charcoal px-4 py-3 text-center font-display text-sm font-semibold text-cream"
                >
                  Login
                </Link>
              ) : user ? (
                <div className="flex items-center justify-between gap-2 rounded-2xl border-[2.5px] border-charcoal bg-mint px-4 py-3">
                  <span className="flex items-center gap-2 font-display text-sm font-medium">
                    <span aria-hidden="true" className="text-base">
                      {avatar.emoji}
                    </span>
                    {user.username}
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 rounded-xl border-2 border-charcoal bg-butter px-3 py-1.5 font-display text-xs font-semibold"
                  >
                    <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                    Log out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  onClick={playPop}
                  className="rounded-2xl border-[2.5px] border-charcoal bg-charcoal px-4 py-3 text-center font-display text-sm font-semibold text-cream"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
