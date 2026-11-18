'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SodaUser } from '@/types';

const STORAGE_KEY = 'sodabox:user';

interface UserContextValue {
  user: SodaUser | null;
  signIn: (user: SodaUser) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

function isSodaUser(value: unknown): value is SodaUser {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.username === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.avatarId === 'string'
  );
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SodaUser | null>(null);

  // Restore the playful session so a refresh on /home keeps your cat mascot.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (isSodaUser(parsed)) setUser(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const signIn = useCallback((nextUser: SodaUser) => {
    setUser(nextUser);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      // Storage can be unavailable in private modes — the session stays in memory.
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up when storage is blocked.
    }
  }, []);

  const value = useMemo<UserContextValue>(
    () => ({ user, signIn, signOut }),
    [user, signIn, signOut],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside a UserProvider');
  }
  return context;
}
