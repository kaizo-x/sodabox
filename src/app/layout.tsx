import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Fredoka, Plus_Jakarta_Sans } from 'next/font/google';
import StickyCatMascot from '@/components/StickyCatMascot';
import { SoundProvider } from '@/lib/sound-context';
import { UserProvider } from '@/lib/user-context';
import './globals.css';

const display = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SodaBox — a cozy cat & pastel stationery playground',
  description:
    'SodaBox is a fizzy little playground of nine pastel mini-studios: goodie boxes, memory keepsakes, doodle sketchbooks, postcards, mixtapes and a very sleepy desk cat.',
  applicationName: 'SodaBox',
};

export const viewport: Viewport = {
  themeColor: '#FFFDF9',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-cream">
        <SoundProvider>
          <UserProvider>
            <div className="relative flex min-h-dvh flex-col">
              <a
                href="#sodabox-main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:border-[3px] focus:border-charcoal focus:bg-cream focus:px-4 focus:py-2 focus:font-display focus:text-sm focus:font-semibold"
              >
                Skip to content
              </a>
              <main id="sodabox-main" className="flex-1">
                {children}
              </main>
            </div>
            <StickyCatMascot />
          </UserProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
