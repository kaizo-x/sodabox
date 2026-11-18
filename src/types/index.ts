import type { LucideIcon } from 'lucide-react';

/** Id of one of the four starter cat mascots. */
export type CatAvatarId = 'mochi' | 'wasabi' | 'peaches' | 'blueberry';

export interface CatAvatar {
  id: CatAvatarId;
  name: string;
  emoji: string;
  /** Tailwind background class used for the avatar disc. */
  surface: string;
  /** Hex accent reused for rings, ears and chips. */
  accent: string;
}

/** The signed-in (or guest preview) SodaBox user. */
export interface SodaUser {
  username: string;
  email: string;
  avatarId: CatAvatarId;
}

export interface MiniProject {
  id: string;
  title: string;
  /** Short nickname used by the playground header + about grid. */
  tag: string;
  description: string;
  hashtags: string[];
  icon: LucideIcon;
  /** Tailwind background class for the bento card. */
  surface: string;
  /** Hex accent for icon chips and the popping cat ears. */
  accent: string;
  /** Grid span classes applied from the `md` breakpoint up. */
  span: string;
  /** Placeholder copy shown inside the mini-project modal shell. */
  shellNote: string;
}
