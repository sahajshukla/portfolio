'use client';

import { useEffect } from 'react';
import CinematicPortfolio from '@/components/CinematicPortfolio';

export default function Home() {
  useEffect(() => {
    // Initialize Lenis smooth scroll for ultra-smooth scrolling
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <CinematicPortfolio />
    </main>
  );
}
