import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'About · SodaBox',
  description:
    'The story behind SodaBox — a shoebox of little joys rebuilt for the browser, blending cozy stationery tools with playful web toys.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar variant="app" />
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-dots pointer-events-none absolute inset-0 opacity-[0.06]"
        />
        <div className="relative">
          <AboutSection />
        </div>
      </div>
    </>
  );
}
