'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface SoundContextValue {
  soundOn: boolean;
  toggleSound: () => void;
  playPop: () => void;
  playPurr: () => void;
  playChime: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

type ToneShape = OscillatorType;

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundOn, setSoundOn] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);

  const tone = useCallback(
    (frequency: number, duration: number, shape: ToneShape, delay = 0) => {
      if (!soundOn || typeof window === 'undefined') return;
      const Ctor = window.AudioContext;
      if (!Ctor) return;

      audioRef.current ??= new Ctor();
      const ctx = audioRef.current;
      const start = ctx.currentTime + delay;

      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = shape;
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + 0.03);
    },
    [soundOn],
  );

  const value = useMemo<SoundContextValue>(
    () => ({
      soundOn,
      toggleSound: () => setSoundOn((previous) => !previous),
      playPop: () => tone(880, 0.12, 'triangle'),
      playPurr: () => {
        tone(196, 0.22, 'sine');
        tone(247, 0.22, 'sine', 0.09);
      },
      playChime: () => {
        tone(659, 0.16, 'sine');
        tone(988, 0.2, 'sine', 0.1);
      },
    }),
    [soundOn, tone],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundContextValue {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used inside a SoundProvider');
  }
  return context;
}
