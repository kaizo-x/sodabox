import type { Metadata } from 'next';
import AuthCard from '@/components/AuthCard';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Login or register · SodaBox',
};

export default function AuthPage() {
  return (
    <>
      <Navbar variant="landing" />
      <div className="relative overflow-hidden py-12 sm:py-16">
        <div
          aria-hidden="true"
          className="bg-dots pointer-events-none absolute inset-0 opacity-[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-lavender/70 blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-mint/70 blur-2xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <AuthCard />
        </div>
      </div>
    </>
  );
}
