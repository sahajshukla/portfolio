'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export type Palette = {
  key: 'ink-bone' | 'bone-espresso' | 'onyx-champagne' | 'atelier';
  displayName: string;
  bg: string;
  fg: string;
  fgMuted: string;
  fgFaint: string;
  accent: string;
  /** Optional soothing secondary accent (sage / dusty rose / eucalyptus). Used very sparingly. */
  secondary?: string;
  /** Optional warm tint for surface cards / quote blocks (e.g. tea-stained paper). */
  warmTint?: string;
  hairline: string;
  cardBg: string;
  logoFilter: string;
  /** Subtle vignette / ambient color */
  vignette: string;
};

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function VariantNav({ current }: { current: Palette['key'] }) {
  const variants: { key: string; label: string }[] = [
    { key: 'ink-bone', label: 'Ink & Bone' },
    { key: 'bone-espresso', label: 'Bone & Espresso' },
    { key: 'onyx-champagne', label: 'Onyx & Champagne' },
    { key: 'atelier', label: 'Atelier' },
  ];
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-1.5 py-1.5 rounded-full backdrop-blur-xl"
      style={{ background: 'rgba(20,20,20,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>
      {variants.map((v) => {
        const active = v.key === current;
        return (
          <Link
            key={v.key}
            href={`/prototypes/${v.key}`}
            className="px-4 py-2 rounded-full transition-colors no-underline"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: active ? '#0a0a0a' : 'rgba(255,255,255,0.7)',
              background: active ? '#EDE6D6' : 'transparent',
            }}
          >
            {v.label}
          </Link>
        );
      })}
      <Link
        href="/prototypes"
        className="px-3 py-2 rounded-full no-underline"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.5)',
        }}
      >
        Index
      </Link>
    </div>
  );
}

function HairlineRule({ palette, delay = 0 }: { palette: Palette; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mx-8 lg:mx-16">
      <div
        className="h-px w-full origin-left"
        style={{
          background: palette.hairline,
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      />
    </div>
  );
}

function Caps({ children, palette, color }: { children: React.ReactNode; palette: Palette; color?: string }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: color ?? palette.fgFaint,
        fontWeight: 400,
      }}
    >
      {children}
    </div>
  );
}

function CompanyLogo({ company, index, palette }: {
  company: { name: string; logo: string };
  index: number;
  palette: Palette;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className="relative h-16 w-40 flex items-center justify-center"
      style={{
        opacity: visible ? 0.78 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <Image
        src={company.logo}
        alt={company.name}
        width={150}
        height={60}
        className="object-contain max-h-12"
        style={{ filter: palette.logoFilter }}
      />
    </div>
  );
}

function WorkArticle({ work, palette }: {
  work: { num: string; title: string; italic: string; tail: string; body: string; caliber: string };
  palette: Palette;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <article
      ref={ref}
      className="grid md:grid-cols-12 gap-8 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="md:col-span-3">
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(72px, 8vw, 140px)',
            lineHeight: 0.9,
            color: palette.accent,
            fontStyle: 'italic',
          }}
        >
          {work.num}
        </div>
        <Caps palette={palette}>{work.caliber}</Caps>
      </div>
      <div className="md:col-span-9">
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: palette.fg,
            marginBottom: 16,
          }}
        >
          {work.title} —{' '}
          <span style={{ fontStyle: 'italic', color: palette.fgMuted }}>{work.italic}</span>
          {work.tail ? <span style={{ color: palette.fg }}> {work.tail}</span> : null}
        </h3>
        <p
          className="max-w-[640px]"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            lineHeight: 1.65,
            fontWeight: 300,
            color: palette.fgMuted,
          }}
        >
          {work.body}
        </p>
        <div className="mt-8 inline-flex items-center gap-4">
          <a
            href="#"
            className="no-underline pb-1"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: palette.accent,
              borderBottom: `1px solid ${palette.accent}`,
            }}
          >
            Read the Case Study →
          </a>
        </div>
      </div>
    </article>
  );
}

export default function EditorialShell({ palette }: { palette: Palette }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const heroDelay = (i: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s`,
  } as const);

  const companies = [
    { name: 'BlackRock', logo: '/companies/blackrock_logo.jpeg' },
    { name: 'Nomura', logo: '/companies/nomura_logo.jpeg' },
    { name: 'BDIPlus', logo: '/companies/bdiplus_logo.jpeg' },
    { name: 'EliteFit', logo: '/companies/elitefit_ai_logo.jpeg' },
    { name: 'TCR Inc.', logo: '/companies/technical_consulting_and_research.jpeg' },
  ];

  const credentials = [
    { label: 'Currently', primary: 'Software Engineer II', secondary: 'BDIPlus · New York' },
    { label: 'Previously', primary: 'BlackRock · Nomura', secondary: 'Technology & Finance Audit' },
    { label: 'Available', primary: 'New Jersey, USA', secondary: 'On H-1B · Open to sponsorship' },
  ];

  const works = [
    {
      num: '01',
      title: 'Vantage AuditOS',
      italic: 'a quiet revolution',
      tail: 'in how audit is performed.',
      body: 'A zero-trust, AI-driven audit platform. Natural-language queries against encrypted, isolated data. Architected end-to-end — infrastructure, model, interface. The fusion of five years in audit with five years in engineering.',
      caliber: 'Caliber 2025 · FastAPI · Next.js · OpenSQL-7B',
    },
    {
      num: '02',
      title: 'Contact Extraction Pipeline',
      italic: 'spark, set to language.',
      tail: '',
      body: 'A Databricks pipeline coupling distributed compute with Azure OpenAI to lift 63% extraction rates from messy warehouse APIs. Built at BDIPlus; in production today.',
      caliber: 'Caliber 2025 · PySpark · Azure OpenAI · Redis',
    },
    {
      num: '03',
      title: '$466B in Journal Entries',
      italic: 'fraud, in the margins.',
      tail: '',
      body: 'A Nomura analytics engagement examining 160,000 entries representing four hundred and sixty-six billion dollars of activity. Surfaced anomalies for follow-up; informed remediation strategy for the firm.',
      caliber: 'Caliber 2024 · Python · SQL · Power BI',
    },
  ];

  return (
    <div
      className="prototype-shell min-h-screen w-full relative overflow-hidden"
      style={{
        background: palette.bg,
        color: palette.fg,
      }}
    >
      {/* Soft vignette / paper grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${palette.vignette} 0%, transparent 60%)`,
        }}
      />

      {/* TOP BAR ─────────────────────── */}
      <header className="relative z-10 px-8 lg:px-16 pt-7 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Penrose mark"
            width={22}
            height={22}
            style={{ filter: palette.logoFilter, opacity: 0.85 }}
            className="proto-rotate-slow"
          />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1, color: palette.fg }}>
            Sahaj Shukla
          </span>
        </div>
        <nav className="hidden md:flex gap-10">
          {['Index', 'Work', 'Writing', 'Contact'].map((item) => (
            <a
              key={item}
              href="#"
              className="no-underline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: palette.fgMuted,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
        <Caps palette={palette}>Vol. I</Caps>
      </header>

      <div className="relative z-10 mt-8">
        <HairlineRule palette={palette} />
      </div>

      {/* HERO ─────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 pt-32 lg:pt-44 pb-32">
        <div className="max-w-[1280px] mx-auto">
          {/* Editorial folio number */}
          <div className="grid md:grid-cols-12 gap-8 mb-16" style={heroDelay(0)}>
            <div className="md:col-span-3">
              <Caps palette={palette} color={palette.accent}>Folio Nº 07</Caps>
              <div className="mt-3" style={{ fontFamily: 'var(--font-serif)', fontSize: 14, color: palette.fgMuted, fontStyle: 'italic' }}>
                A practitioner&apos;s record,<br /> 2020 — present.
              </div>
            </div>
            <div className="md:col-span-9 flex md:justify-end items-start">
              <Caps palette={palette}>
                Engineering · Analytics · Audit · AI
              </Caps>
            </div>
          </div>

          {/* Display headline */}
          <h1
            className="leading-[0.94] tracking-[-0.025em]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 400,
              fontSize: 'clamp(56px, 11vw, 180px)',
              color: palette.fg,
              ...heroDelay(1),
            }}
          >
            Building
            <br />
            <span style={{ fontStyle: 'italic', color: palette.accent }}>intelligent</span>{' '}
            systems where
            <br />
            finance, data
            <br />
            <span style={{ fontStyle: 'italic' }}>&amp; reason</span> converge.
          </h1>

          {/* Subhead column */}
          <div className="grid md:grid-cols-12 gap-8 mt-20">
            <div className="md:col-span-5 md:col-start-7">
              <div className="proto-draw h-px mb-7" style={{ background: palette.accent, width: 56 }} />
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 18,
                  lineHeight: 1.6,
                  fontWeight: 300,
                  color: palette.fgMuted,
                  ...heroDelay(2),
                }}
              >
                Five years across BlackRock, Nomura, and BDIPlus. From auditing the
                machinery of global finance to architecting the production AI systems
                that will reshape it. I build things that are quietly excellent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HairlineRule palette={palette} />

      {/* META TRIAD ─────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-20">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-12">
          {credentials.map((c) => (
            <div key={c.label}>
              <Caps palette={palette}>— {c.label}</Caps>
              <div className="mt-5" style={{ fontFamily: 'var(--font-serif)', fontSize: 28, lineHeight: 1.15, color: palette.fg }}>
                {c.primary}
              </div>
              <div className="mt-2" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: palette.fgMuted, fontWeight: 300 }}>
                {c.secondary}
              </div>
            </div>
          ))}
        </div>
      </section>

      <HairlineRule palette={palette} />

      {/* COMPANIES STRIP ─────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex justify-center mb-14">
            <Caps palette={palette}>— In Service Of —</Caps>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-10">
            {companies.map((c, i) => (
              <CompanyLogo key={c.name} company={c} index={i} palette={palette} />
            ))}
          </div>
        </div>
      </section>

      <HairlineRule palette={palette} />

      {/* SELECTED WORKS ─────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-32">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-24">
            <div className="md:col-span-3">
              <Caps palette={palette}>— Selected Works</Caps>
            </div>
            <div className="md:col-span-7">
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(40px, 5vw, 72px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: palette.fg,
                }}
              >
                Three pieces, each at the convergence
                of <span style={{ fontStyle: 'italic', color: palette.accent }}>domain</span> and{' '}
                <span style={{ fontStyle: 'italic', color: palette.accent }}>discipline</span>.
              </h2>
            </div>
          </div>

          <div className="space-y-32">
            {works.map((w) => (
              <WorkArticle key={w.num} work={w} palette={palette} />
            ))}
          </div>
        </div>
      </section>

      <HairlineRule palette={palette} />

      {/* MANIFESTO ─────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-40">
        <div className="max-w-[1100px] mx-auto text-center">
          <Caps palette={palette}>— A Word, In Passing</Caps>
          <blockquote
            className="mt-10"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 3.4vw, 52px)',
              lineHeight: 1.25,
              color: palette.fg,
              fontWeight: 400,
            }}
          >
            “The best systems aren&apos;t built —{' '}
            <span style={{ fontStyle: 'italic', color: palette.accent }}>they&apos;re understood.</span>{' '}
            Five years auditing how enterprises run taught me that excellence
            is rarely loud. It hides in the details no one inspects.”
          </blockquote>
          <div className="mt-10">
            <Caps palette={palette}>Sahaj Shukla</Caps>
          </div>
        </div>
      </section>

      <HairlineRule palette={palette} />

      {/* FOOTER ─────────────────────── */}
      <footer className="relative z-10 px-8 lg:px-16 py-12 flex flex-wrap items-center justify-between gap-4">
        <Caps palette={palette}>Crafted in New Jersey</Caps>
        <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: palette.fgMuted }}>
          {palette.displayName}
        </div>
        <Caps palette={palette}>Caliber Nº 07</Caps>
      </footer>

      <VariantNav current={palette.key} />
    </div>
  );
}
