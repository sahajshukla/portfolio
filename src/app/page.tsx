'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Impact from '@/components/sections/Impact';
import Companies from '@/components/sections/Companies';
import Experience from '@/components/sections/Experience';
import Certifications from '@/components/sections/Certifications';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Articles from '@/components/sections/Articles';
import OpenToRoles from '@/components/sections/OpenToRoles';
import Contact from '@/components/sections/Contact';
import EditModeToggle from '@/components/EditModeToggle';

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

      // Cleanup on unmount
      return () => {
        lenis.destroy();
      };
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Impact Metrics Section */}
      <Impact />

      {/* Companies Section */}
      <Companies />

      {/* Experience Section */}
      <Experience />

      {/* Certifications Section */}
      <Certifications />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Articles/Writing Section */}
      <Articles />

      {/* Open To Roles Section */}
      <OpenToRoles />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Edit Mode Toggle (for content editing - DEV ONLY) */}
      {process.env.NODE_ENV === 'development' && <EditModeToggle />}
    </main>
  );
}
