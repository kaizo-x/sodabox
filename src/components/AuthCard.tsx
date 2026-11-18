'use client';

import { useId, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Cat, Mail, Lock, User } from 'lucide-react';
import { CAT_AVATARS, DEFAULT_AVATAR_ID } from '@/lib/avatars';
import { cn } from '@/lib/cn';
import { useSound } from '@/lib/sound-context';
import { useUser } from '@/lib/user-context';
import type { CatAvatarId } from '@/types';

type AuthTab = 'login' | 'register';

const inputClass =
  'w-full rounded-2xl border-[2.5px] border-charcoal bg-white px-11 py-3 text-sm text-charcoal shadow-chunky-xs transition-shadow placeholder:text-charcoal/40 focus:shadow-chunky focus:outline-none';

const iconClass =
  'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/45';

export default function AuthCard() {
  const router = useRouter();
  const { signIn } = useUser();
  const { playChime, playPop } = useSound();
  const [tab, setTab] = useState<AuthTab>('login');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [avatarId, setAvatarId] = useState<CatAvatarId>(DEFAULT_AVATAR_ID);

  const fieldId = useId();

  const finish = (finalUsername: string, finalEmail: string) => {
    signIn({
      username: finalUsername,
      email: finalEmail,
      avatarId,
    });
    playChime();
    router.push('/home');
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fallback = email.split('@')[0]?.trim() || 'Soda Cat';
    finish(fallback.charAt(0).toUpperCase() + fallback.slice(1), email);
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    finish(username.trim(), email);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="rounded-blob border-[4px] border-charcoal bg-cream p-6 shadow-chunky-lg sm:p-8"
      >
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border-[2.5px] border-charcoal bg-peach px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide shadow-chunky-xs">
            <Cat className="h-4 w-4" aria-hidden="true" />
            Welcome to the box
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            {tab === 'login' ? 'Welcome back!' : 'Make your box'}
          </h1>
          <p className="mt-2 text-sm text-charcoal/65">
            {tab === 'login'
              ? 'Your stickers, doodles and sleepy cat are exactly where you left them.'
              : 'Pick a name, pick a cat, and the whole playground is yours.'}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Authentication mode"
          className="mb-6 flex rounded-full border-[3px] border-charcoal bg-white p-1 shadow-chunky-xs"
        >
          {(['login', 'register'] as AuthTab[]).map((value) => {
            const active = tab === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                id={`${fieldId}-${value}-tab`}
                aria-selected={active}
                aria-controls={`${fieldId}-${value}-panel`}
                onClick={() => {
                  setTab(value);
                  playPop();
                }}
                className="relative flex-1 rounded-full px-4 py-2 font-display text-sm font-semibold"
              >
                {active ? (
                  <motion.span
                    layoutId="sodabox-auth-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-lavender"
                  />
                ) : null}
                <span className="relative z-10">
                  {value === 'login' ? 'Login' : 'Register'}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {tab === 'login' ? (
            <motion.form
              key="login"
              id={`${fieldId}-login-panel`}
              role="tabpanel"
              aria-labelledby={`${fieldId}-login-tab`}
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor={`${fieldId}-login-email`} className="mb-1.5 block font-display text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className={iconClass} aria-hidden="true" />
                  <input
                    id={`${fieldId}-login-email`}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="catlover@sodabox.fun"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${fieldId}-login-password`} className="mb-1.5 block font-display text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className={iconClass} aria-hidden="true" />
                  <input
                    id={`${fieldId}-login-password`}
                    type="password"
                    required
                    minLength={4}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl px-1 py-1">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="h-5 w-5 shrink-0 cursor-pointer accent-[#1E1B24]"
                />
                <span className="text-sm text-charcoal/75">Remember me on this cozy laptop</span>
              </label>

              <motion.button
                type="submit"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 flex items-center justify-center gap-2 rounded-full border-[3px] border-charcoal bg-charcoal px-6 py-3.5 font-display text-base font-semibold text-cream shadow-chunky transition-shadow hover:shadow-chunky-lg"
              >
                Sign In
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              id={`${fieldId}-register-panel`}
              role="tabpanel"
              aria-labelledby={`${fieldId}-register-tab`}
              onSubmit={handleRegister}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex flex-col gap-4"
            >
              <div>
                <label htmlFor={`${fieldId}-register-name`} className="mb-1.5 block font-display text-sm font-medium">
                  Username
                </label>
                <div className="relative">
                  <User className={iconClass} aria-hidden="true" />
                  <input
                    id={`${fieldId}-register-name`}
                    type="text"
                    required
                    minLength={2}
                    autoComplete="username"
                    placeholder="mochi-muncher"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${fieldId}-register-email`} className="mb-1.5 block font-display text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className={iconClass} aria-hidden="true" />
                  <input
                    id={`${fieldId}-register-email`}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="catlover@sodabox.fun"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${fieldId}-register-password`} className="mb-1.5 block font-display text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className={iconClass} aria-hidden="true" />
                  <input
                    id={`${fieldId}-register-password`}
                    type="password"
                    required
                    minLength={4}
                    autoComplete="new-password"
                    placeholder="at least 4 fizzy characters"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset className="rounded-3xl border-[2.5px] border-dashed border-charcoal/30 bg-white/70 p-4">
                <legend className="px-2 font-display text-sm font-medium">
                  Choose your starter cat mascot
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CAT_AVATARS.map((avatar) => {
                    const active = avatarId === avatar.id;
                    return (
                      <label
                        key={avatar.id}
                        className={cn(
                          'flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-[3px] p-2 transition-transform has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-charcoal/35',
                          active
                            ? 'border-charcoal bg-cream shadow-chunky-xs'
                            : 'border-transparent hover:border-charcoal/30',
                        )}
                      >
                        <input
                          type="radio"
                          name={`${fieldId}-avatar`}
                          value={avatar.id}
                          checked={active}
                          onChange={() => {
                            setAvatarId(avatar.id);
                            playPop();
                          }}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            'grid h-14 w-14 place-items-center rounded-full border-[2.5px] border-charcoal text-2xl transition-transform',
                            avatar.surface,
                            active && 'scale-105 ring-4 ring-charcoal ring-offset-2 ring-offset-cream',
                          )}
                        >
                          {avatar.emoji}
                        </span>
                        <span className="font-display text-xs font-semibold">{avatar.name}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <motion.button
                type="submit"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="mt-1 flex items-center justify-center gap-2 rounded-full border-[3px] border-charcoal bg-charcoal px-6 py-3.5 font-display text-base font-semibold text-cream shadow-chunky transition-shadow hover:shadow-chunky-lg"
              >
                Create my SodaBox
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-charcoal/50">
          This is a UI playground prototype — nothing is sent anywhere.
        </p>
      </motion.div>
    </div>
  );
}
