import type { CatAvatar, CatAvatarId } from '@/types';

export const CAT_AVATARS: CatAvatar[] = [
  {
    id: 'mochi',
    name: 'Mochi',
    emoji: '😺',
    surface: 'bg-lavender',
    accent: '#F3E8FF',
  },
  {
    id: 'wasabi',
    name: 'Wasabi',
    emoji: '😸',
    surface: 'bg-mint',
    accent: '#DCFCE7',
  },
  {
    id: 'peaches',
    name: 'Peaches',
    emoji: '😻',
    surface: 'bg-peach',
    accent: '#FFEDD5',
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    emoji: '😼',
    surface: 'bg-sky',
    accent: '#E0F2FE',
  },
];

export const DEFAULT_AVATAR_ID: CatAvatarId = 'mochi';

export function getAvatar(id: CatAvatarId): CatAvatar {
  return CAT_AVATARS.find((avatar) => avatar.id === id) ?? CAT_AVATARS[0];
}
