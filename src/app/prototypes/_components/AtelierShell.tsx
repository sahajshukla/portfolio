'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { contentConfig } from '@/config/contentConfig';
import type { Palette } from './atelierPalette';
import {
  BellCurveAmbient,
  CareerCurve,
  PenroseSketch,
  AgentConstellation,
  BenfordsBars,
  ContactForm,
  ChessKnightMoves,
  Figure,
  JovianRotation,
  NLtoSQLDemo,
  useInView,
  type CareerNode,
} from './Interactive';

/* ── Typography helpers ───────────────────────────────────────────── */

/* Spectral — body voice */
const news = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-spectral), Georgia, "Times New Roman", serif',
  ...extra,
});
const newsText = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-spectral), Georgia, "Times New Roman", serif',
  ...extra,
});

/* Bricolage Grotesque — display voice. Width and weight axes carry emphasis (no italic). */
const bric = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: 'var(--font-bricolage), Inter, system-ui, sans-serif',
  fontVariationSettings: "'wdth' 100, 'opsz' 96",
  ...extra,
});

const labelStyle = (color: string): React.CSSProperties => ({
  fontFamily: 'var(--font-mono)',
  fontSize: 10.5,
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color,
  fontWeight: 400,
});

/* ── Bits ────────────────────────────────────────────────────────── */

function Hairline({ palette, color }: { palette: Palette; color?: string }) {
  const { ref, visible } = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="px-8 lg:px-16">
      <div
        className="h-px w-full origin-left"
        style={{
          background: color ?? palette.hairline,
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}

function Label({ children, color }: { children: React.ReactNode; color: string }) {
  return <span style={labelStyle(color)}>{children}</span>;
}

/* Section heading: a brass dot and a label. No Roman numerals, no "Note N" framing. */
function SectionTag({ num, children, palette }: { num?: string; children: React.ReactNode; palette: Palette }) {
  // num kept as an optional prop so existing callsites continue to compile;
  // it's no longer rendered.
  void num;
  return (
    <div className="flex items-center gap-3">
      <span
        style={{
          display: 'inline-block',
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: palette.accent,
          boxShadow: `0 0 0 4px ${palette.accent}1a`,
        }}
      />
      <span style={{ ...labelStyle(palette.fg), fontWeight: 500, letterSpacing: '0.32em' }}>
        {children}
      </span>
    </div>
  );
}

/* ── Hero wordmark with click effect ─────────────────────────────── */

function HeroWordmark({ palette }: { palette: Palette }) {
  const sage = palette.secondary ?? palette.accent;
  const accents = [palette.accent, sage, palette.fg];
  const [colorIdx, setColorIdx] = useState(0);
  const cycle = () => setColorIdx((i) => (i + 1) % accents.length);
  return (
    <h1
      onClick={cycle}
      style={bric({
        fontWeight: 300,
        fontSize: 'clamp(64px, 12vw, 220px)',
        lineHeight: 0.9,
        letterSpacing: '-0.045em',
        color: palette.fg,
        cursor: 'pointer',
        userSelect: 'none',
        fontVariationSettings: "'wdth' 95, 'opsz' 96",
      })}
    >
      Sahaj
      <br />
      <span
        style={{
          color: accents[colorIdx],
          fontWeight: 500,
          fontVariationSettings: "'wdth' 100, 'opsz' 96",
          transition: 'color 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        Shukla.
      </span>
    </h1>
  );
}

/* ── Page content ────────────────────────────────────────────────── */

function CompanyMark({ company, index, palette, side }: {
  company: { name: string; logo: string; role?: string };
  index: number;
  palette: Palette;
  side: 'left' | 'right';
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`flex items-center gap-3.5 ${side === 'right' ? 'md:justify-end md:flex-row-reverse' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(8px)',
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
      }}
    >
      <Image
        src={company.logo}
        alt={company.name}
        width={36}
        height={36}
        className="object-contain rounded-sm flex-shrink-0"
        style={{ filter: palette.logoFilter, opacity: 0.78 }}
      />
      <div className={side === 'right' ? 'text-right' : ''}>
        <div style={newsText({ fontSize: 17, fontWeight: 400, color: palette.fg, letterSpacing: '-0.005em' })}>
          {company.name}
        </div>
        {company.role && (
          <div style={{ ...labelStyle(palette.fgFaint), fontSize: 9 }}>{company.role}</div>
        )}
      </div>
    </div>
  );
}

function Credential({ item, palette }: {
  item: { num: string; label: string; primary: string; secondary: string };
  palette: Palette;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex items-baseline gap-3 mb-4">
        <Label color={palette.fgFaint}>{item.num}</Label>
        <div className="flex-1 h-px" style={{ background: palette.hairline, maxWidth: 120 }} />
      </div>
      <Label color={palette.fgMuted}>{item.label}</Label>
      <div
        className="mt-3.5"
        style={news({
          fontWeight: 400,
          fontSize: 'clamp(22px, 2.2vw, 28px)',
          lineHeight: 1.15,
          letterSpacing: '-0.015em',
          color: palette.fg,
        })}
      >
        {item.primary}
      </div>
      <div className="mt-2" style={newsText({ fontSize: 14, color: palette.fgMuted, lineHeight: 1.5, fontStyle: 'italic' })}>
        {item.secondary}
      </div>
    </div>
  );
}

/** Other-project chip card. */
function ProjectChip({ project, palette, index }: {
  project: typeof contentConfig.projects[number];
  palette: Palette;
  index: number;
}) {
  const { ref, visible } = useInView<HTMLAnchorElement>(0.15);
  const sage = palette.secondary ?? palette.accent;
  const accent = index % 2 === 0 ? palette.accent : sage;
  return (
    <a
      ref={ref}
      href={project.githubUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline group"
      style={{
        color: 'inherit',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(14px)',
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s`,
      }}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <Label color={palette.fgFaint}>{String(index + 1).padStart(2, '0')}</Label>
        <span style={{ ...labelStyle(accent), fontSize: 9 }}>{project.category.replace('-', ' ')}</span>
      </div>
      <div style={news({
        fontWeight: 400,
        fontSize: 'clamp(19px, 1.8vw, 24px)',
        lineHeight: 1.22,
        letterSpacing: '-0.012em',
        color: palette.fg,
      })}>
        {project.title}
      </div>
      <p
        className="mt-2.5"
        style={newsText({
          fontSize: 13.5,
          lineHeight: 1.65,
          color: palette.fgMuted,
          fontStyle: 'italic',
        })}
      >
        {project.tagline}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {project.technologies.slice(0, 4).map((t, i) => (
          <span key={t} style={{
            ...labelStyle(palette.fgFaint),
            fontSize: 9,
            paddingLeft: i === 0 ? 0 : 10,
            borderLeft: i === 0 ? 'none' : `1px solid ${palette.hairline}`,
          }}>
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

function ArticleCard({ article, palette, featured = false }: {
  article: typeof contentConfig.articles[number];
  palette: Palette;
  featured?: boolean;
}) {
  const { ref, visible } = useInView<HTMLAnchorElement>(0.15);
  return (
    <a
      ref={ref}
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline group"
      style={{
        color: 'inherit',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Label color={palette.accent}>{featured ? 'Lead' : 'Note'}</Label>
        <Label color={palette.fgFaint}>{article.publishedDate}</Label>
        {article.readTime && <Label color={palette.fgFaint}>· {article.readTime}</Label>}
      </div>
      <h4
        style={news({
          fontWeight: 400,
          fontSize: featured ? 'clamp(32px, 3.8vw, 56px)' : 'clamp(20px, 1.9vw, 26px)',
          lineHeight: featured ? 1.05 : 1.22,
          letterSpacing: featured ? '-0.025em' : '-0.014em',
          color: palette.fg,
        })}
        className="transition-colors duration-300 group-hover:opacity-80"
      >
        {article.title.split(' ').map((w, i, arr) => (
          <span key={i}>
            {i === Math.floor(arr.length / 2) ? <span style={{ fontStyle: 'italic', color: palette.accent }}>{w}</span> : w}
            {i < arr.length - 1 ? ' ' : ''}
          </span>
        ))}
      </h4>
      <p
        className="mt-5"
        style={newsText({
          fontSize: featured ? 16 : 13.5,
          lineHeight: 1.7,
          color: palette.fgMuted,
        })}
      >
        {article.description}
      </p>
      <div className="mt-5 inline-block pb-0.5" style={{ ...labelStyle(palette.fg), borderBottom: `1px solid ${palette.hairline}` }}>
        Read on Medium →
      </div>
    </a>
  );
}

/* ── Main shell ───────────────────────────────────────────────────── */

export default function AtelierShell({ palette }: { palette: Palette }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Piano-key scroll: weighty but a touch lighter than before. Glides like a
  // dampened-felt key returning to rest — never sticky, always deliberate.
  useEffect(() => {
    let raf = 0;
    let lenisInstance: { destroy: () => void; raf: (t: number) => void } | null = null;
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
        smoothWheel: true,
        wheelMultiplier: 0.92,
        lerp: 0.085,
        touchMultiplier: 1.6,
      });
      lenisInstance = lenis;
      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenisInstance?.destroy();
    };
  }, []);

  const reveal = (i: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s, transform 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s`,
  } as const);

  const sage = palette.secondary ?? palette.accent;

  /* Real content from contentConfig */

  const companies = [
    { name: 'BlackRock', logo: '/companies/blackrock_logo.jpeg', role: 'Tech Audit' },
    { name: 'Nomura', logo: '/companies/nomura_logo.jpeg', role: 'Finance Audit' },
    { name: 'BDIPlus', logo: '/companies/bdiplus_logo.jpeg', role: 'Engineering' },
    { name: 'EliteFit', logo: '/companies/elitefit_ai_logo.jpeg', role: 'Backend' },
    { name: 'TCR Inc.', logo: '/companies/technical_consulting_and_research.jpeg', role: 'BI Analyst' },
  ];

  const credentials = [
    { num: '01', label: 'Currently', primary: 'Software Engineer II', secondary: 'BDIPlus, New York' },
    { num: '02', label: 'Previously', primary: 'BlackRock, Nomura', secondary: 'Technology and finance audit' },
    { num: '03', label: 'Available', primary: 'New Jersey, USA', secondary: 'H-1B, open to sponsorship' },
  ];

  /** Career milestones, each with deep role detail surfaced on hover/click. */
  const careerNodes: CareerNode[] = [
    {
      year: '2020', yearShort: '2020', company: 'TCR, EliteFit', role: 'BI / Backend',
      period: 'Mar 2020 to Mar 2021',
      achievement: 'Kafka and REST analytics pipeline at TCR. A pose-scoring ML model at EliteFit hitting 93% accuracy versus baseline. First taste of turning raw data into something alive.',
      stack: ['Python', 'Kafka', 'TensorFlow', 'AWS S3 / DynamoDB'],
    },
    {
      year: '2021', yearShort: '2021', company: 'BlackRock', role: 'Technology Audit',
      period: 'Aug 2021 to Jan 2024',
      achievement: '65 IT controls tested across 9 engagements. 200 concurrent audits tracked on a real-time monitoring dashboard. 7 critical control issues remediated. 4 formal audit reports co-authored. Roughly 6 hours saved per control through Python automation.',
      stack: ['Python', 'SQL', 'Tableau', 'SOX / ITGC', 'ACL, IDEA'],
    },
    {
      year: '2024', yearShort: '2024', company: 'Nomura', role: 'Finance Audit',
      period: 'Apr 2024 to Jan 2025',
      achievement: '160,000 journal entries representing $466B examined for fraud patterns. Five-year operational risk dashboard built for the Global Finance Audit team. Three major audits supported: Financial Reporting, Collateral Management, Dodd-Frank. Manual review reduced 35% via automated exception testing.',
      stack: ['Python', 'SQL', 'Power BI', 'Statistical Analysis'],
    },
    {
      year: '2025', yearShort: '2025', company: 'BDIPlus', role: 'Software Engineer II',
      period: 'Jan 2025 to Present',
      achievement: 'Spark and Databricks extraction pipelines hitting 63% rate across messy warehouse APIs. Redis JSON caching layer reducing query latency 40%. Multi-database orchestration (Snowflake, Postgres, SQL Server). Production LLM systems on Azure OpenAI and Gemma-3 8B.',
      stack: ['PySpark', 'Databricks', 'Azure OpenAI', 'Redis', 'C# / .NET'],
    },
    {
      year: '2025', yearShort: 'now', company: 'Vantage AuditOS', role: 'Independent Architect',
      period: '2024 to Present',
      achievement: 'A zero-trust audit operating system, end-to-end. Self-hosted LLM for natural-language queries against encrypted audit data. Per-tenant AES-256 isolation. Compliance mappings across NIST, SOX, SOC 2, ISO 42001, OCC, FFIEC, CFTC, COSO.',
      stack: ['FastAPI', 'Next.js', 'OpenSQL-7B', 'AES-256', 'Terraform'],
    },
  ];

  // Other projects (the small chips section) — exclude Vantage which lives in its own chapter.
  const otherProjects = contentConfig.projects.filter((p) => !p.featured);

  /* ── Render ─────────────────────────────────────────────────── */

  return (
    <div
      className="prototype-shell min-h-screen w-full relative overflow-hidden"
      style={{ background: palette.bg, color: palette.fg }}
    >
      {/* Concert-hall ambient: brass vignette + moss haze */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 18% 0%, ${palette.vignette} 0%, transparent 55%),
            radial-gradient(ellipse at 92% 95%, ${sage}1a 0%, transparent 60%)
          `,
        }}
      />

      {/* Vertical key-line ambient: barely-there piano-key suggestion. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent calc(100vw / 42 - 1px), ${palette.hairline} calc(100vw / 42 - 1px), ${palette.hairline} calc(100vw / 42))`,
          opacity: 0.32,
          maskImage: 'radial-gradient(ellipse at 50% 45%, black 5%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, black 5%, transparent 72%)',
        }}
      />

      {/* TOP BAR ─────────────────────────────── */}
      <header className="relative z-10 px-8 lg:px-16 pt-8 flex items-center justify-between">
        <a href="#" className="no-underline" style={{ color: palette.fg }}>
          <span style={bric({ fontSize: 19, fontWeight: 400, letterSpacing: '-0.018em' })}>
            Sahaj{' '}
            <span style={{ color: palette.accent, fontWeight: 500 }}>Shukla</span>
          </span>
        </a>
        <nav className="hidden md:flex gap-9">
          {[
            { label: 'Work', href: '#vantage' },
            { label: 'Career', href: '#career' },
            { label: 'Writing', href: '#writing' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a key={item.label} href={item.href} className="no-underline">
              <Label color={palette.fgMuted}>{item.label}</Label>
            </a>
          ))}
        </nav>
        <Label color={palette.fgFaint}><JovianRotation /></Label>
      </header>

      <div className="relative z-10 mt-8">
        <Hairline palette={palette} />
      </div>

      {/* HERO ─────────────────────────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 pt-28 lg:pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BellCurveAmbient color={palette.accent} secondary={sage} opacity={0.15} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="flex flex-wrap items-baseline justify-between mb-16" style={reveal(0)}>
            <Label color={palette.accent}>A portfolio in nine notes</Label>
            <Label color={palette.fgFaint}>2020 / now</Label>
          </div>

          <div className="grid md:grid-cols-12 gap-x-10 gap-y-14 items-start">
            <div className="md:col-span-7" style={reveal(1)}>
              <HeroWordmark palette={palette} />
              {/* Credential signature: CISA sits like a signed mark beneath the wordmark */}
              <div className="mt-9 flex items-center gap-4 max-w-[460px]">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}66)` }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10.5,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: palette.accent,
                    fontWeight: 500,
                  }}
                >
                  CISA
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: palette.fgFaint,
                  }}
                >
                  Certified by ISACA
                </span>
              </div>
            </div>

            <div className="md:col-span-5 md:col-start-8 md:pt-12" style={reveal(2)}>
              <Label color={palette.fgMuted}>On the work</Label>
              <p
                className="mt-5 max-w-[440px]"
                style={bric({
                  fontSize: 'clamp(20px, 1.7vw, 26px)',
                  lineHeight: 1.4,
                  fontWeight: 300,
                  color: palette.fg,
                  letterSpacing: '-0.012em',
                })}
              >
                A practitioner at the cusp of{' '}
                <span style={{ color: palette.accent, fontWeight: 500 }}>audit</span>,{' '}
                <span style={{ color: palette.accent, fontWeight: 500 }}>ML</span>, and{' '}
                <span style={{ color: sage, fontWeight: 500 }}>software</span>.
              </p>
              <p
                className="mt-6 max-w-[440px]"
                style={newsText({
                  fontSize: 15,
                  lineHeight: 1.7,
                  fontWeight: 400,
                  color: palette.fgMuted,
                })}
              >
                Five years across BlackRock, Nomura, and BDIPlus, shipping production
                systems for regulated industries. Building Vantage, a zero-trust audit
                operating system, on the side.
              </p>
            </div>
          </div>

          {/* HERO STATS ROW — six animated figures */}
          <div className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-8" style={reveal(3)}>
            {[
              { v: 5, s: 'y', label: 'years' },
              { v: 3, s: '', label: 'institutions' },
              { v: 466, s: 'B', p: '$', label: 'analyzed' },
              { v: 65, s: '', label: 'controls' },
              { v: 9, s: '', label: 'engagements' },
              { v: 4, s: '', label: 'audit reports' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col" style={{ borderLeft: i === 0 ? 'none' : `1px solid ${palette.hairline}`, paddingLeft: i === 0 ? 0 : 16 }}>
                <span
                  style={news({
                    fontWeight: 300,
                    fontSize: 'clamp(28px, 3.4vw, 48px)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                    color: palette.fg,
                  })}
                >
                  <Figure value={s.v} prefix={s.p ?? ''} suffix={s.s} />
                </span>
                <span style={{
                  ...labelStyle(palette.fgMuted),
                  fontSize: 9.5,
                  marginTop: 8,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="mt-16 grid md:grid-cols-12 gap-x-10" style={reveal(4)}>
            <div className="md:col-span-8 flex flex-wrap items-center gap-x-9 gap-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: sage, boxShadow: `0 0 0 4px ${sage}22` }}
                />
                <Label color={palette.fg}>Open to senior roles</Label>
              </div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="no-underline">
                <Label color={palette.fgMuted}>Résumé, PDF</Label>
              </a>
              <a href="#contact" className="no-underline">
                <Label color={palette.fgMuted}>Get in touch</Label>
              </a>
            </div>
            <div className="md:col-span-4 flex items-center justify-start md:justify-end">
              <Label color={palette.fgFaint}>From New Jersey, with care</Label>
            </div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* I · WHERE I'VE BEEN ───────────────────────── */}
      <section id="about" className="relative z-10 px-8 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-x-10 gap-y-14">
          <div className="md:col-span-4">
            <SectionTag num="I" palette={palette}>Where I&apos;ve been</SectionTag>
            <h2
              className="mt-5"
              style={bric({
                fontWeight: 300,
                fontSize: 'clamp(36px, 4.2vw, 60px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: palette.fg,
              })}
            >
              Three positions,
              <br /><span style={{ fontWeight: 500, color: palette.accent }}>one thread.</span>
            </h2>
            <p
              className="mt-7 max-w-[340px]"
              style={newsText({
                fontSize: 15,
                lineHeight: 1.7,
                color: palette.fgMuted,
              })}
            >
              Started in audit. Moved through analytics. Now writing the systems
              the auditors used to inspect.
            </p>
          </div>

          <div className="md:col-span-8 grid md:grid-cols-3 gap-x-8 gap-y-10 items-start">
            {credentials.map((c) => (
              <Credential key={c.num} item={c} palette={palette} />
            ))}
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* II · CAREER, IN A CURVE ───────────────────────── */}
      <section id="career" className="relative z-10 px-8 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-x-10 mb-14">
            <div className="md:col-span-4">
              <SectionTag num="II" palette={palette}>Career, in a curve</SectionTag>
              <h2
                className="mt-5"
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(36px, 4.2vw, 60px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: palette.fg,
                })}
              >
                Time on x,
                <br /><span style={{ fontWeight: 500, color: palette.accent }}>ambition on y.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 md:pt-2">
              <p
                style={newsText({
                  fontSize: 16,
                  lineHeight: 1.75,
                  color: palette.fgMuted,
                  fontStyle: 'italic',
                })}
              >
                Drawn the way an analyst would, left to right. Each peak is an institution.
                Hover any node to see the work that happened there.
              </p>
            </div>
          </div>

          <CareerCurve
            nodes={careerNodes}
            fg={palette.fg}
            accent={palette.accent}
            secondary={sage}
            hairline={palette.hairline}
            faint={palette.fgFaint}
            muted={palette.fgMuted}
          />

          {/* Side interactive: Benford's Law — math footnote for the Nomura fraud work */}
          <div className="mt-16 grid md:grid-cols-12 gap-x-10 items-start">
            <div className="md:col-span-7">
              <Label color={palette.fgFaint}>A footnote on fraud</Label>
              <p
                className="mt-4 max-w-[520px]"
                style={news({
                  fontSize: 'clamp(20px, 1.8vw, 24px)',
                  lineHeight: 1.45,
                  fontWeight: 300,
                  color: palette.fg,
                  letterSpacing: '-0.012em',
                })}
              >
                In <span style={{ fontStyle: 'italic', color: palette.accent }}>naturally occurring</span>{' '}
                financial data, the first digit of every number is more likely to be a 1
                than a 9. The deviation between the curve on the right and a real
                ledger is where fabrication tends to hide.
              </p>
              <p
                className="mt-4 max-w-[520px]"
                style={newsText({
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: palette.fgMuted,
                  fontStyle: 'italic',
                })}
              >
                Sage, one of Vantage&apos;s agents, runs this test on every batch of
                journal entries the platform sees. Hover any bar to read the
                expected percentage.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <BenfordsBars
                accent={palette.accent}
                hairline={palette.hairline}
                faint={palette.fgFaint}
                muted={palette.fgMuted}
                width={280}
                height={110}
              />
            </div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* III · IN GOOD COMPANY ───────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-baseline gap-6">
              <SectionTag num="III" palette={palette}>In good company</SectionTag>
              <h3
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  lineHeight: 1.1,
                  color: palette.fg,
                  letterSpacing: '-0.022em',
                })}
              >
                Five firms, <span style={{ fontWeight: 500, color: palette.accent }}>five lessons.</span>
              </h3>
            </div>
            <Label color={palette.fgFaint}>2020 to present</Label>
          </div>

          <div className="grid md:grid-cols-5 gap-x-10 gap-y-12 items-start">
            <div className="md:col-span-1"><CompanyMark company={companies[0]} index={0} palette={palette} side="left" /></div>
            <div className="md:col-span-1"><CompanyMark company={companies[1]} index={1} palette={palette} side="left" /></div>
            <div className="md:col-span-1"><CompanyMark company={companies[2]} index={2} palette={palette} side="left" /></div>
            <div className="md:col-span-1" />
            <div className="md:col-span-1" />
            <div className="md:col-span-1 md:col-start-2"><CompanyMark company={companies[3]} index={3} palette={palette} side="left" /></div>
            <div className="md:col-span-1"><CompanyMark company={companies[4]} index={4} palette={palette} side="left" /></div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* IV · VANTAGE ───────────────────────── */}
      <section id="vantage" className="relative z-10 px-8 lg:px-16 py-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-x-10 mb-14">
            <div className="md:col-span-5">
              <SectionTag num="IV" palette={palette}>Vantage</SectionTag>
              <p
                className="mt-6 max-w-[440px]"
                style={newsText({
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: palette.fgMuted,
                  fontStyle: 'italic',
                })}
              >
                An AI-native internal audit platform. 380,000 lines of code.
                Architected end-to-end, from infrastructure to interface. Built
                quietly between roles. The reason so many of the choices on
                this page make sense.
              </p>
              <div className="mt-7">
                <a
                  href="https://vantageauditos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline pb-1 inline-block"
                  style={{
                    ...labelStyle(palette.accent),
                    borderBottom: `1px solid ${palette.accent}`,
                  }}
                >
                  Visit vantageauditos.com →
                </a>
              </div>
            </div>
            <div className="md:col-span-7">
              <h2
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(44px, 5.4vw, 90px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  color: palette.fg,
                })}
              >
                Fourteen agents,
                <br /><span style={{ fontWeight: 500, color: palette.accent }}>one principle.</span>
              </h2>
            </div>
          </div>

          {/* Identity principle pull-quote */}
          <div className="mb-12 grid md:grid-cols-12 gap-x-10">
            <div className="md:col-span-10 md:col-start-2">
              <blockquote
                style={news({
                  fontWeight: 300,
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.015em',
                  color: palette.fg,
                  fontStyle: 'italic',
                  paddingLeft: 24,
                  borderLeft: `2px solid ${palette.accent}`,
                })}
              >
                An agent must never have more access than the human who created it.
              </blockquote>
              <div className="mt-3 pl-6">
                <Label color={palette.fgFaint}>Vantage core principle · identity delegation via OIDC</Label>
              </div>
            </div>
          </div>

          {/* Agent Constellation: the real hero feature */}
          <div className="mb-12">
            <AgentConstellation
              fg={palette.fg}
              bg={palette.bg}
              muted={palette.fgMuted}
              faint={palette.fgFaint}
              accent={palette.accent}
              secondary={sage}
              hairline={palette.hairline}
            />
          </div>

          {/* Real compliance frameworks — chip strip */}
          <div className="mb-16">
            <div className="flex items-baseline gap-4 mb-4">
              <Label color={palette.fgFaint}>Maps to</Label>
              <div className="flex-1 h-px" style={{ background: palette.hairline }} />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {[
                'SOX ITGC', 'COBIT 2019', 'SOC 2', 'ISO 27001', 'NIST CSF', 'HIPAA', 'CCM',
              ].map((f, i) => (
                <span
                  key={f}
                  style={{
                    fontFamily: 'var(--font-spectral), Georgia, serif',
                    fontVariationSettings: "'opsz' 144",
                    fontSize: 17,
                    fontStyle: 'italic',
                    color: i % 2 === 0 ? palette.fg : palette.accent,
                    fontWeight: 400,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
            <p
              className="mt-5 max-w-[700px]"
              style={newsText({
                fontSize: 14,
                lineHeight: 1.7,
                color: palette.fgMuted,
                fontStyle: 'italic',
              })}
            >
              Observation events auto-map to the relevant controls in each framework
              based on event type. SOX assertions, COBIT processes, SOC 2 trust criteria,
              ISO 27001 controls, NIST CSF subcategories, HIPAA rules, CCM domains.
            </p>
          </div>

          {/* Vera demo (NL → SQL): secondary */}
          <div className="grid md:grid-cols-12 gap-x-10 mb-8">
            <div className="md:col-span-4">
              <Label color={palette.accent}>Also</Label>
              <h3
                className="mt-4"
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: palette.fg,
                })}
              >
                Meet <span style={{ fontWeight: 500, color: palette.accent }}>Vera.</span>
              </h3>
              <p
                className="mt-5 max-w-[340px]"
                style={newsText({
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: palette.fgMuted,
                })}
              >
                The platform AI assistant. 16 tools across audit, workpapers, risks,
                controls, and regulations. Intent-based model routing. Haiku for
                the simple, Sonnet for the considered. Watch her compile a few audit
                questions into safe SQL.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                {['16 tools', 'streaming', 'RAG', 'tool-calling', 'anonymized'].map((t, i) => (
                  <span key={t} style={{
                    ...labelStyle(palette.fgFaint),
                    fontSize: 9,
                    paddingLeft: i === 0 ? 0 : 10,
                    borderLeft: i === 0 ? 'none' : `1px solid ${palette.hairline}`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-8">
              <NLtoSQLDemo
                bg={palette.bg}
                fg={palette.fg}
                muted={palette.fgMuted}
                faint={palette.fgFaint}
                accent={palette.accent}
                hairline={palette.hairline}
              />
            </div>
          </div>

          {/* Tech chip strip */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['FastAPI', 'Next.js', 'Vite + TanStack', 'PostgreSQL + RLS', 'Redis', 'Docker', 'Clerk / OIDC', 'BYOLLM'].map((t, i) => (
                <span key={t} style={{
                  ...labelStyle(palette.fgMuted),
                  fontSize: 10,
                  paddingLeft: i === 0 ? 0 : 12,
                  borderLeft: i === 0 ? 'none' : `1px solid ${palette.hairline}`,
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* V · OTHER PROJECTS ───────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-x-10 mb-14">
            <div className="md:col-span-4">
              <SectionTag num="V" palette={palette}>Also in the ledger</SectionTag>
              <h2
                className="mt-5"
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(34px, 4vw, 56px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: palette.fg,
                })}
              >
                Other <span style={{ fontWeight: 500, color: palette.accent }}>experiments.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 md:pt-2">
              <p style={newsText({
                fontSize: 15,
                lineHeight: 1.75,
                color: palette.fgMuted,
                fontStyle: 'italic',
              })}>
                Side projects across ML, full-stack, and analytics. Each one
                a chapter of learning kept honest in public on GitHub.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {otherProjects.map((p, i) => (
              <ProjectChip key={p.id} project={p} palette={palette} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* VI · ON WRITING ───────────────────────── */}
      <section id="writing" className="relative z-10 px-8 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-x-10 mb-14">
            <div className="md:col-span-7">
              <SectionTag num="VI" palette={palette}>On writing</SectionTag>
              <h2
                className="mt-5"
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(44px, 5.4vw, 84px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.035em',
                  color: palette.fg,
                })}
              >
                Thinking <span style={{ fontWeight: 500, color: palette.accent }}>out loud</span>,
                <br />on Medium.
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-10">
              <p
                style={newsText({
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: palette.fgMuted,
                  fontStyle: 'italic',
                })}
              >
                Writings on information, uncertainty, and the quiet mathematics underneath.
                More on Medium, where the rest live.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-x-12 gap-y-16">
            <div className="md:col-span-7">
              <ArticleCard article={contentConfig.articles[0]} palette={palette} featured />
            </div>
            <div className="md:col-span-4 md:col-start-9 space-y-14">
              <ArticleCard article={contentConfig.articles[1]} palette={palette} />
              <div className="h-px" style={{ background: palette.hairline }} />
              <ArticleCard article={contentConfig.articles[2]} palette={palette} />
            </div>
          </div>

          <div className="mt-14">
            <a
              href={contentConfig.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline pb-1 inline-block"
              style={{
                ...labelStyle(palette.accent),
                borderBottom: `1px solid ${palette.accent}`,
              }}
            >
              The full archive on Medium →
            </a>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* VII · A PRINCIPLE ───────────────────────── */}
      <section
        className="relative z-10 px-8 lg:px-16 py-36"
        style={{
          background: palette.warmTint
            ? `linear-gradient(180deg, transparent, ${palette.warmTint}, transparent)`
            : 'transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-x-10">
          <div className="md:col-span-8">
            <SectionTag num="VII" palette={palette}>A principle</SectionTag>
            <blockquote
              className="mt-7"
              style={news({
                fontWeight: 300,
                fontSize: 'clamp(32px, 4.2vw, 60px)',
                lineHeight: 1.22,
                letterSpacing: '-0.022em',
                color: palette.fg,
              })}
            >
              The best systems aren&apos;t built.
              <br /><span style={{ fontStyle: 'italic', color: palette.accent }}>They&apos;re understood.</span>
              <br />
              <span style={{ color: palette.fgMuted }}>
                Five years auditing how enterprises run taught me that excellence
                is rarely loud. It hides in the details no one inspects.
              </span>
            </blockquote>
            <div className="mt-10">
              <Label color={palette.fgFaint}>Sahaj Shukla · written between rotations</Label>
            </div>
          </div>

          <div className="md:col-span-4 flex md:flex-col items-center md:items-end md:justify-end gap-6 mt-12 md:mt-0">
            <PenroseSketch color={palette.accent} secondary={sage} size={220} />
            <p
              className="max-w-[240px] md:text-right"
              style={newsText({
                fontSize: 13,
                lineHeight: 1.7,
                color: palette.fgMuted,
                fontStyle: 'italic',
              })}
            >
              Three sides, one impossible whole. A small reminder that the most
              interesting systems are the ones that shouldn&apos;t work, but do.
              Click to see what each side stands for.
            </p>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* VIII · ELSEWHERE ───────────────────────── */}
      <section className="relative z-10 px-8 lg:px-16 py-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-x-10 items-center">
          <div className="md:col-span-3">
            <ChessKnightMoves
              fg={palette.fg}
              accent={palette.accent}
              secondary={sage}
              hairline={palette.hairline}
              muted={palette.fgMuted}
              faint={palette.fgFaint}
              size={220}
            />
          </div>
          <div className="md:col-span-5 md:col-start-5 mt-10 md:mt-0">
            <SectionTag num="VIII" palette={palette}>Elsewhere</SectionTag>
            <h3
              className="mt-5"
              style={bric({
                fontWeight: 300,
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: palette.fg,
              })}
            >
              <span style={{ fontWeight: 500, color: sage }}>Math, chess, literature,</span>
              <br />sports, and trivia.
            </h3>
            <p
              className="mt-5 max-w-[420px]"
              style={newsText({
                fontSize: 14.5,
                lineHeight: 1.75,
                color: palette.fgMuted,
              })}
            >
              The CLT is the prettiest theorem. The knight is the prettiest piece on
              the board. Information theory holds the universe together. The rest is
              just learning to pay attention.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-10 mt-10 md:mt-0">
            <Label color={palette.fgFaint}>Currently reading</Label>
            <div
              className="mt-3"
              style={news({
                fontSize: 17,
                fontStyle: 'italic',
                color: palette.fg,
                lineHeight: 1.4,
                fontWeight: 400,
              })}
            >
              Designing Data-Intensive Applications. Again.
            </div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* IX · CONTACT ───────────────────────── */}
      <section id="contact" className="relative z-10 px-8 lg:px-16 py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-12 gap-x-10 mb-16">
            <div className="md:col-span-7">
              <SectionTag num="IX" palette={palette}>Get in touch</SectionTag>
              <h2
                className="mt-6"
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(48px, 6.4vw, 110px)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: palette.fg,
                })}
              >
                Make a thing
                <br /> that
                <br /> <span style={{ fontWeight: 500, color: palette.accent }}>ages well</span>.
              </h2>
            </div>
            <div className="md:col-span-5 md:pt-10">
              <p
                style={newsText({
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: palette.fgMuted,
                  fontStyle: 'italic',
                })}
              >
                Senior engineering roles, audit analytics leadership, technical
                project work, or a long conversation about agents and compliance.
                Drop a note and I&apos;ll respond within a day.
              </p>
            </div>
          </div>

          {/* Form + direct list */}
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-16">
            <div className="md:col-span-7">
              <Label color={palette.accent}>A note</Label>
              <div className="mt-6">
                <ContactForm
                  email={contentConfig.personal.email}
                  fg={palette.fg}
                  muted={palette.fgMuted}
                  faint={palette.fgFaint}
                  accent={palette.accent}
                  hairline={palette.hairline}
                />
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <Label color={palette.accent}>Or, directly</Label>
              <div className="mt-6 space-y-5">
                {[
                  { k: 'Email', v: contentConfig.personal.email, href: `mailto:${contentConfig.personal.email}` },
                  { k: 'Phone', v: contentConfig.personal.phone, href: `tel:${contentConfig.personal.phone.replace(/[^\d+]/g, '')}` },
                  { k: 'LinkedIn', v: 'in/sahajshukla', href: contentConfig.social.linkedin },
                  { k: 'GitHub', v: 'sahajshukla', href: contentConfig.social.github },
                  { k: 'Medium', v: '@sahajshukla', href: contentConfig.social.medium },
                  { k: 'Kaggle', v: 'sahajshukla', href: contentConfig.social.kaggle },
                ].map((row) => (
                  <div key={row.k} className="flex items-baseline gap-4">
                    <Label color={palette.fgFaint}>{row.k}</Label>
                    <div className="flex-1 h-px" style={{ background: palette.hairline }} />
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="no-underline"
                      style={news({
                        fontSize: 16,
                        color: palette.fg,
                        fontWeight: 400,
                        letterSpacing: '-0.01em',
                      })}
                    >
                      {row.v}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-3">
                <span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: sage, boxShadow: `0 0 0 4px ${sage}22` }}
                />
                <Label color={palette.fgMuted}>Typical response within a day</Label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Hairline palette={palette} />

      {/* COMPREHENSIVE FOOTER — every link visible ───────────────────── */}
      <footer className="relative z-10 px-8 lg:px-16 py-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Big foot wordmark */}
          <div className="grid md:grid-cols-12 gap-x-10 mb-16">
            <div className="md:col-span-8">
              <h3
                style={bric({
                  fontWeight: 300,
                  fontSize: 'clamp(48px, 6.4vw, 120px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.045em',
                  color: palette.fg,
                  fontVariationSettings: "'wdth' 95, 'opsz' 96",
                })}
              >
                Sahaj{' '}
                <span style={{ color: palette.accent, fontWeight: 500, fontVariationSettings: "'wdth' 100, 'opsz' 96" }}>
                  Shukla.
                </span>
              </h3>
              <p
                className="mt-6 max-w-[520px]"
                style={bric({
                  fontSize: 20,
                  lineHeight: 1.4,
                  fontWeight: 300,
                  color: palette.fgMuted,
                  letterSpacing: '-0.012em',
                })}
              >
                At the cusp of{' '}
                <span style={{ color: palette.accent, fontWeight: 500 }}>audit</span>,{' '}
                <span style={{ color: palette.accent, fontWeight: 500 }}>ML</span>, and{' '}
                <span style={{ color: sage, fontWeight: 500 }}>software</span>.
              </p>
            </div>
            <div className="md:col-span-4 md:pt-6">
              <div className="flex items-center gap-2.5 mb-3">
                <span
                  className="block w-1.5 h-1.5 rounded-full"
                  style={{ background: sage, boxShadow: `0 0 0 4px ${sage}22` }}
                />
                <Label color={palette.fg}>Open to senior roles</Label>
              </div>
              <p style={newsText({ fontSize: 13.5, lineHeight: 1.7, color: palette.fgMuted, fontStyle: 'italic' })}>
                {contentConfig.personal.visaStatus}
              </p>
            </div>
          </div>

          <div className="h-px mb-12" style={{ background: palette.hairline }} />

          {/* Four-column link grid — every link visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {/* Reach */}
            <div>
              <Label color={palette.accent}>Reach</Label>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href={`mailto:${contentConfig.personal.email}`}
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    {contentConfig.personal.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contentConfig.personal.phone.replace(/[^\d+]/g, '')}`}
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    {contentConfig.personal.phone}
                  </a>
                </li>
                <li style={newsText({ fontSize: 14, color: palette.fgMuted, fontStyle: 'italic' })}>
                  {contentConfig.personal.location}
                </li>
              </ul>
            </div>

            {/* Elsewhere on the web */}
            <div>
              <Label color={palette.accent}>Elsewhere</Label>
              <ul className="mt-5 space-y-3">
                {[
                  { label: 'LinkedIn', href: contentConfig.social.linkedin },
                  { label: 'GitHub', href: contentConfig.social.github },
                  { label: 'Medium', href: contentConfig.social.medium },
                  { label: 'Kaggle', href: contentConfig.social.kaggle },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                      style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                    >
                      {l.label} <span style={{ color: palette.fgFaint, fontSize: 11 }}>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work */}
            <div>
              <Label color={palette.accent}>Work</Label>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="https://vantageauditos.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    Vantage AuditOS <span style={{ color: palette.fgFaint, fontSize: 11 }}>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    Résumé <span style={{ color: palette.fgFaint, fontSize: 11 }}>PDF</span>
                  </a>
                </li>
                <li style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}>
                  CISA <span style={{ color: palette.fgFaint, fontSize: 11 }}>ISACA</span>
                </li>
                <li>
                  <a
                    href="/certifications/databricks-fundamentals.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    Databricks Fundamentals <span style={{ color: palette.fgFaint, fontSize: 11 }}>↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/certifications/databricks-data-engineering.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400 })}
                  >
                    Databricks Data Eng. <span style={{ color: palette.fgFaint, fontSize: 11 }}>↗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Read */}
            <div>
              <Label color={palette.accent}>Read</Label>
              <ul className="mt-5 space-y-3">
                {contentConfig.articles.map((a) => (
                  <li key={a.id}>
                    <a
                      href={a.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline"
                      style={newsText({ fontSize: 14, color: palette.fg, fontWeight: 400, lineHeight: 1.45, display: 'block' })}
                    >
                      {a.title.length > 38 ? a.title.slice(0, 36) + '…' : a.title}{' '}
                      <span style={{ color: palette.fgFaint, fontSize: 11 }}>↗</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={contentConfig.social.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline"
                    style={{ ...labelStyle(palette.accent), fontSize: 10 }}
                  >
                    All on Medium →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="h-px mt-14 mb-7" style={{ background: palette.hairline }} />

          {/* Foot strip */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Label color={palette.fgFaint}>From New Jersey, with care</Label>
            <a href="#" className="no-underline">
              <Label color={palette.fgFaint}>Back to top ↑</Label>
            </a>
            <Label color={palette.fgFaint}>Atelier · <JovianRotation withLabel={false} /></Label>
          </div>
        </div>
      </footer>

    </div>
  );
}
