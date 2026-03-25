'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { contentConfig } from '@/config/contentConfig';

// ─── Color System ───
const COLORS = {
  bg: '#0a0a0f',
  surface: '#121218',
  cyan: '#00d9ff',
  purple: '#a855f7',
  teal: '#14b8a6',
  pink: '#ec4899',
  amber: '#f59e0b',
  red: '#ef4444',
  green: '#22c55e',
  textPrimary: '#f0f0f5',
  textSecondary: '#a0a0b0',
  textTertiary: '#707080',
};

// ─── useInView Hook ───
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ─── Floating Particles Background ───
function ParticleField({ count = 35 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * -20,
        color: [COLORS.cyan, COLORS.purple, COLORS.teal][i % 3],
        opacity: Math.random() * 0.3 + 0.1,
      })),
    [count]
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Progress Bar ───
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (v: number) => setProgress(v));
  }, [smoothProgress]);

  const chapter = progress < 0.2 ? 'I' : progress < 0.4 ? 'II' : progress < 0.6 ? 'III' : progress < 0.8 ? 'IV' : 'V';
  const label = progress < 0.2 ? 'ORIGIN' : progress < 0.4 ? 'ARSENAL' : progress < 0.6 ? 'CREATIONS' : progress < 0.8 ? 'HORIZON' : 'CONNECT';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3" style={{ background: `linear-gradient(180deg, ${COLORS.bg}ee, transparent)` }}>
      <span className="font-mono text-xs tracking-[3px] min-w-[140px]" style={{ color: COLORS.cyan }}>
        CH. {chapter} — {label}
      </span>
      <div className="flex-1 h-[2px] rounded-full overflow-hidden" style={{ background: `${COLORS.textTertiary}30` }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.teal})`,
            boxShadow: `0 0 8px ${COLORS.cyan}80`,
          }}
        />
      </div>
      <span className="font-mono text-xs" style={{ color: COLORS.textTertiary }}>
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

// ─── Chapter Title ───
function ChapterTitle({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  const { ref, visible } = useInView(0.3);
  return (
    <div ref={ref} className="text-center py-10 px-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="font-mono text-[13px] tracking-[6px] mb-4" style={{ color: COLORS.cyan, opacity: 0.7 }}>
        CHAPTER {number}
      </div>
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight m-0" style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg mt-4 max-w-[500px] mx-auto leading-relaxed" style={{ color: COLORS.textSecondary }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Section Title (non-chapter) ───
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const { ref, visible } = useInView(0.3);
  return (
    <div ref={ref} className="text-center mb-12 px-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
      <h3 className="text-2xl md:text-4xl font-bold" style={{ color: COLORS.textPrimary }}>{title}</h3>
      {subtitle && <p className="text-base mt-3 max-w-[500px] mx-auto" style={{ color: COLORS.textSecondary }}>{subtitle}</p>}
    </div>
  );
}

// ─── Milestone Card ───
function MilestoneCard({ milestone, index, isLeft }: { milestone: { year: string; label: string; place: string; text: string; color: string }; index: number; isLeft: boolean }) {
  const { ref, visible } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="relative mb-12"
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingLeft: isLeft ? 0 : 'calc(50% + 24px)',
        paddingRight: isLeft ? 'calc(50% + 24px)' : 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isLeft ? -40 : 40}px)`,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
      }}
    >
      <div
        className="absolute top-5 z-[2] rounded-full"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: 14,
          height: 14,
          background: milestone.color,
          boxShadow: visible ? `0 0 20px ${milestone.color}80` : 'none',
          transition: 'box-shadow 0.8s',
        }}
      />
      <div className="rounded-2xl p-6 max-w-[320px] backdrop-blur-xl" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${milestone.color}30` }}>
        <div className="font-mono text-xs tracking-[2px] mb-1" style={{ color: milestone.color }}>
          {milestone.year}
        </div>
        <div className="text-xl font-bold mb-1" style={{ color: COLORS.textPrimary }}>
          {milestone.label}
        </div>
        <div className="text-[13px] font-medium mb-3" style={{ color: milestone.color }}>
          {milestone.place}
        </div>
        <p className="text-sm leading-relaxed m-0" style={{ color: COLORS.textSecondary }}>
          {milestone.text}
        </p>
      </div>
    </div>
  );
}

// ─── Cinematic Hero ───
function CinematicHero() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = contentConfig.hero.rotatingWords;

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${COLORS.cyan}08, ${COLORS.purple}04, transparent)` }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} className="w-10 h-10" />
          <div className="font-mono text-[13px] tracking-[6px]" style={{ color: COLORS.cyan, opacity: 0.7 }}>
            SAHAJ SHUKLA
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-[800px] mx-auto mb-6" style={{ color: COLORS.textPrimary }}>
          Building intelligent systems<br />where{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.teal})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>business</span>,{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>data</span>, and{' '}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.teal}, ${COLORS.cyan})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>{' '}converge
        </h1>

        {/* Rotating Words */}
        <div className="h-8 mb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm tracking-[4px]"
              style={{ color: COLORS.cyan }}
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-[15px] md:text-lg font-light leading-relaxed max-w-[560px] mx-auto mb-8" style={{ color: COLORS.textSecondary }}>
          From audit floors at BlackRock and Nomura to architecting production AI systems — this is the story of how domain expertise meets engineering depth.
        </p>

        {/* Visa Status Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}60` }} />
          <span className="text-xs font-mono tracking-wider" style={{ color: COLORS.textTertiary }}>{contentConfig.personal.visaStatus}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          {contentConfig.hero.ctas.map((cta) => (
            <a
              key={cta.text}
              href={cta.href}
              className="py-3 px-8 rounded-full font-semibold text-sm no-underline transition-all"
              style={cta.variant === 'primary' ? {
                background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
                color: COLORS.bg,
                boxShadow: `0 0 20px ${COLORS.cyan}30`,
              } : {
                background: 'transparent',
                border: `1.5px solid ${COLORS.textTertiary}40`,
                color: COLORS.textPrimary,
              }}
            >
              {cta.text}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 justify-center">
          {[
            { label: 'LinkedIn', url: contentConfig.social.linkedin },
            { label: 'GitHub', url: contentConfig.social.github },
            { label: 'Medium', url: contentConfig.social.medium },
          ].map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] tracking-[2px] no-underline transition-all hover:opacity-100" style={{ color: COLORS.textTertiary, opacity: 0.6 }}>
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2 }}
        style={{ animation: 'floatParticle 3s ease-in-out infinite' }}
      >
        <div className="w-6 h-10 rounded-xl border-2 flex justify-center pt-2" style={{ borderColor: `${COLORS.textTertiary}40` }}>
          <div className="w-[3px] h-2 rounded-sm" style={{ background: COLORS.cyan, animation: 'scrollDot 2s ease-in-out infinite' }} />
        </div>
        <div className="text-center text-[10px] mt-2 tracking-[2px] font-mono" style={{ color: COLORS.textTertiary }}>SCROLL</div>
      </motion.div>
    </section>
  );
}

// ─── Companies Strip ───
function CompaniesStrip() {
  const { ref, visible } = useInView(0.2);
  const companies = [
    { name: 'BDIPlus', logo: '/companies/bdiplus_logo.jpeg', role: 'Software Engineer II' },
    { name: 'Nomura', logo: '/companies/nomura_logo.jpeg', role: 'Associate - Finance Audit' },
    { name: 'BlackRock', logo: '/companies/blackrock_logo.jpeg', role: 'Analyst - Technology Audit' },
    { name: 'EliteFit AI', logo: '/companies/elitefit_ai_logo.jpeg', role: 'Backend Developer' },
    { name: 'TCR Inc.', logo: '/companies/technical_consulting_and_research.jpeg', role: 'BI Analyst Intern' },
  ];

  return (
    <div ref={ref} className="py-16 px-6">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-8" style={{ color: COLORS.textTertiary, opacity: visible ? 1 : 0, transition: 'opacity 1s' }}>
        TRUSTED BY LEADING ORGANIZATIONS
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 max-w-[900px] mx-auto">
        {companies.map((c, i) => (
          <motion.div
            key={c.name}
            whileHover={{ scale: 1.08, borderColor: `${COLORS.cyan}40` }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-default"
            style={{
              background: `${COLORS.surface}80`,
              border: `1px solid ${COLORS.textTertiary}15`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease-out ${i * 0.1}s`,
            }}
          >
            <Image src={c.logo} alt={c.name} width={48} height={48} className="rounded-lg grayscale hover:grayscale-0 transition-all" />
            <span className="text-xs font-semibold" style={{ color: COLORS.textPrimary }}>{c.name}</span>
            <span className="text-[10px]" style={{ color: COLORS.textTertiary }}>{c.role}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── About Section ───
function AboutSection() {
  const { ref: ref1, visible: v1 } = useInView();
  const { ref: ref2, visible: v2 } = useInView();

  const education = [
    { degree: 'MS Business Intelligence & Analytics', school: 'Stevens Institute of Technology' },
    { degree: 'BE Electronics & Telecommunication', school: 'University of Mumbai' },
  ];

  const interests = ['Probability Theory', 'Information Theory', 'Statistics', 'Creative Writing', 'Music', 'Mechanical Watches'];

  return (
    <div className="max-w-[900px] mx-auto px-6 pb-20">
      {/* About Paragraphs */}
      <div ref={ref1} className="mb-12" style={{ opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {contentConfig.about.paragraphs.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>{p}</p>
            ))}
          </div>
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="rounded-xl p-5" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}15` }}>
              <div className="font-mono text-[11px] tracking-[3px] mb-3" style={{ color: COLORS.cyan }}>QUICK FACTS</div>
              <ul className="space-y-2">
                {contentConfig.about.highlights.map((h, i) => (
                  <li key={i} className="text-xs leading-relaxed flex gap-2" style={{ color: COLORS.textSecondary }}>
                    <span style={{ color: COLORS.cyan }}>&#x25B8;</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div className="rounded-xl p-5" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}15` }}>
              <div className="font-mono text-[11px] tracking-[3px] mb-3" style={{ color: COLORS.purple }}>EDUCATION</div>
              {education.map((e, i) => (
                <div key={i} className={i > 0 ? 'mt-3 pt-3' : ''} style={i > 0 ? { borderTop: `1px solid ${COLORS.textTertiary}15` } : {}}>
                  <div className="text-xs font-semibold" style={{ color: COLORS.textPrimary }}>{e.degree}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textTertiary }}>{e.school}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div ref={ref2} className="flex flex-wrap justify-center gap-2" style={{ opacity: v2 ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>
        {interests.map(tag => (
          <span key={tag} className="px-3 py-1.5 rounded-full text-[11px] font-mono" style={{ background: `${COLORS.textTertiary}12`, color: COLORS.textTertiary, border: `1px solid ${COLORS.textTertiary}15` }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Impact Metrics ───
function ImpactMetrics() {
  const { ref, visible } = useInView(0.2);
  const metrics = [
    { value: 466, prefix: '$', suffix: 'B+', label: 'Financial Activity Analyzed', desc: 'Fraud detection across journal entries', color: COLORS.cyan },
    { value: 200, suffix: '+', label: 'Concurrent Audits Tracked', desc: 'Real-time monitoring dashboard', color: COLORS.purple },
    { value: 65, suffix: '+', label: 'IT Controls Tested', desc: 'SOX/ITGC across 9 engagements', color: COLORS.teal },
    { value: 40, suffix: '%', label: 'Latency Reduction', desc: 'Redis caching optimization', color: COLORS.pink },
    { value: 63, suffix: '%', label: 'Extraction Success Rate', desc: 'Spark + Azure OpenAI pipeline', color: COLORS.amber },
    { value: 35, suffix: '%', label: 'Manual Effort Reduced', desc: 'Python automation workflows', color: COLORS.green },
  ];

  return (
    <div ref={ref} className="max-w-[1000px] mx-auto px-6 py-16">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-10" style={{ color: COLORS.textTertiary }}>IMPACT BY THE NUMBERS</div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="text-center p-5 rounded-xl"
            style={{
              background: `${COLORS.surface}80`,
              border: `1px solid ${m.color}15`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease-out ${i * 0.1}s`,
            }}
          >
            <div className="text-2xl md:text-3xl font-extrabold font-mono" style={{ color: m.color }}>
              {visible ? <AnimatedCounter target={m.value} prefix={m.prefix || ''} suffix={m.suffix} /> : `${m.prefix || ''}0${m.suffix}`}
            </div>
            <div className="text-xs font-semibold mt-1 tracking-wider uppercase" style={{ color: COLORS.textPrimary }}>{m.label}</div>
            <div className="text-[11px] mt-1" style={{ color: COLORS.textTertiary }}>{m.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CHAPTER I: ORIGIN ───
function ChapterOrigin() {
  const { ref: ref1, visible: v1 } = useInView();
  const { ref: ref2, visible: v2 } = useInView();
  const { ref: ref3, visible: v3 } = useInView();

  const milestones = [
    { year: '2020', label: 'THE SPARK', place: 'TCR Inc. & EliteFit', text: 'Built ML pipelines and real-time analytics from scratch. Deployed a pose-scoring model hitting 93% accuracy. First taste of turning raw data into something alive.', color: COLORS.teal },
    { year: '2021–2024', label: 'THE FORGE', place: 'BlackRock', text: 'Tested 65 IT controls across 9 audit engagements. Automated testing workflows, saving ~6 hours per control. Co-authored 4 formal audit reports. Built the discipline that makes great systems.', color: COLORS.cyan },
    { year: '2024', label: 'THE CRUCIBLE', place: 'Nomura', text: 'Analyzed $466B+ in journal entries for fraud patterns. Designed dashboards giving leadership real-time audit visibility. Where finance meets data at scale.', color: COLORS.purple },
    { year: '2025', label: 'THE ARCHITECT', place: 'BDIPlus', text: 'Architecting production-grade LLM systems. Spark + Databricks pipelines. Redis caching layers cutting latency 40%. Building the future of intelligent enterprise data.', color: COLORS.pink },
  ];

  return (
    <section className="min-h-screen relative">
      <ChapterTitle number="I" title="Origin" subtitle="Every system starts with a single commit." />

      <div ref={ref1} className="max-w-[700px] mx-auto px-6 pb-20 text-center" style={{ opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out 0.3s' }}>
        <p className="text-lg md:text-2xl font-light leading-relaxed" style={{ color: COLORS.textPrimary }}>
          I started at the intersection of{' '}
          <span className="font-semibold" style={{ color: COLORS.cyan }}>finance</span>,{' '}
          <span className="font-semibold" style={{ color: COLORS.purple }}>audit</span>, and{' '}
          <span className="font-semibold" style={{ color: COLORS.teal }}>technology</span>
          {' '}— where understanding risk means understanding systems, and understanding systems means understanding data.
        </p>
      </div>

      {/* About & Companies */}
      <AboutSection />
      <CompaniesStrip />

      {/* Career Timeline */}
      <div className="max-w-[800px] mx-auto px-6 pb-20 relative">
        <div className="text-center font-mono text-[11px] tracking-[4px] mb-10" style={{ color: COLORS.textTertiary }}>THE JOURNEY</div>
        <div
          ref={ref2}
          className="absolute top-10 bottom-0"
          style={{
            left: '50%',
            width: 2,
            background: v2 ? `linear-gradient(180deg, ${COLORS.cyan}00, ${COLORS.cyan}60, ${COLORS.purple}60, ${COLORS.pink}60, ${COLORS.pink}00)` : 'transparent',
            transition: 'background 2s ease-out',
            transform: 'translateX(-50%)',
          }}
        />
        {milestones.map((m, i) => (
          <MilestoneCard key={i} milestone={m} index={i} isLeft={i % 2 === 0} />
        ))}
      </div>

      {/* Detailed Experience */}
      <DetailedExperience />

      {/* Impact Metrics */}
      <ImpactMetrics />

      <div ref={ref3} className="text-center px-6 pb-28" style={{ opacity: v3 ? 1 : 0, transform: v3 ? 'scale(1)' : 'scale(0.95)', transition: 'all 1.2s ease-out' }}>
        <blockquote className="text-xl md:text-3xl italic font-light leading-relaxed max-w-[600px] mx-auto" style={{ color: COLORS.textSecondary }}>
          &ldquo;The journey from auditor to architect taught me that the best systems aren&apos;t just built — they&apos;re{' '}
          <span className="font-semibold not-italic" style={{ background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            understood
          </span>.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}

// ─── Detailed Experience ───
function DetailedExperience() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-[900px] mx-auto px-6 pb-16">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-8" style={{ color: COLORS.textTertiary }}>DETAILED EXPERIENCE</div>
      <div className="space-y-4">
        {contentConfig.experience.map((exp, i) => {
          const isOpen = expanded === exp.id;
          const accentColor = [COLORS.pink, COLORS.purple, COLORS.cyan, COLORS.teal, COLORS.amber][i % 5];
          return (
            <motion.div
              key={exp.id}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ background: `${COLORS.surface}cc`, border: `1px solid ${isOpen ? accentColor : COLORS.textTertiary}${isOpen ? '40' : '15'}`, transition: 'border-color 0.3s' }}
              onClick={() => setExpanded(isOpen ? null : exp.id)}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-base font-bold" style={{ color: COLORS.textPrimary }}>{exp.title}</span>
                    <span className="text-sm font-medium" style={{ color: accentColor }}>{exp.company}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs font-mono" style={{ color: COLORS.textTertiary }}>{exp.period}</span>
                    <span className="text-xs" style={{ color: COLORS.textTertiary }}>· {exp.location}</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ color: COLORS.textTertiary }}>
                  &#x25BC;
                </motion.div>
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm italic mb-4" style={{ color: COLORS.textSecondary }}>{exp.description}</p>
                      <ul className="space-y-2 mb-4">
                        {exp.achievements.map((a, j) => (
                          <li key={j} className="text-sm flex gap-2" style={{ color: COLORS.textSecondary }}>
                            <span style={{ color: accentColor }}>&#x25B8;</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map(t => (
                          <span key={t} className="px-2.5 py-1 rounded-md font-mono text-[10px]" style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Category Node ───
function CategoryNode({ category, index, active, onClick }: {
  category: { name: string; icon: string; color: string; skills: string[] };
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  const { ref, visible } = useInView(0.2);
  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
      style={{
        width: 140,
        height: 140,
        borderRadius: 20,
        background: active ? `${category.color}20` : `${COLORS.surface}aa`,
        border: `1.5px solid ${active ? category.color : `${COLORS.textTertiary}20`}`,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 0.08}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.8)',
        boxShadow: active ? `0 0 30px ${category.color}30` : 'none',
      }}
    >
      {active && (
        <div className="absolute -inset-[2px] rounded-[22px] -z-10" style={{ background: `conic-gradient(from 0deg, ${category.color}60, transparent, ${category.color}60)`, animation: 'spinSlow 4s linear infinite' }} />
      )}
      <span className="text-3xl mb-2">{category.icon}</span>
      <span className="text-xs font-semibold text-center px-2" style={{ color: active ? category.color : COLORS.textSecondary, letterSpacing: 0.5 }}>
        {category.name}
      </span>
      <span className="text-[10px] font-mono mt-1" style={{ color: COLORS.textTertiary }}>
        {category.skills.length} skills
      </span>
    </motion.div>
  );
}

// ─── Skills Panel ───
function SkillsPanel({ category }: { category: { color: string; skills: string[] } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap justify-center gap-2.5 max-w-[700px]"
    >
      {category.skills.map((skill, i) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -2, boxShadow: `0 0 16px ${category.color}30` }}
          className="px-5 py-2.5 rounded-full text-[13px] font-medium cursor-default"
          style={{ background: `${category.color}15`, border: `1px solid ${category.color}40`, color: category.color }}
        >
          {skill}
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Stats Bar ───
function StatsBar() {
  const { ref, visible } = useInView(0.3);
  const stats = [
    { value: '48+', label: 'Technical Skills', color: COLORS.cyan },
    { value: '5+', label: 'Years Experience', color: COLORS.purple },
    { value: '3', label: 'Major Firms', color: COLORS.teal },
    { value: '$466B+', label: 'Data Analyzed', color: COLORS.pink },
  ];
  return (
    <div ref={ref} className="flex flex-wrap justify-center gap-8 mt-16 pt-10" style={{ borderTop: `1px solid ${COLORS.textTertiary}15` }}>
      {stats.map((s, i) => (
        <div key={i} className="text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.6s ease-out ${i * 0.12}s` }}>
          <div className="text-3xl md:text-4xl font-extrabold font-mono" style={{ color: s.color }}>{s.value}</div>
          <div className="text-xs mt-1 tracking-wider uppercase" style={{ color: COLORS.textTertiary }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Certifications ───
function Certifications() {
  const { ref, visible } = useInView(0.3);
  const certs = [
    { name: 'Databricks Fundamentals Accreditation', issuer: 'Databricks Academy', date: 'Nov 2025', url: '/certifications/databricks-fundamentals.pdf' },
    { name: 'Get Started with Databricks for Data Engineering', issuer: 'Databricks Academy', date: 'Nov 2025', url: '/certifications/databricks-data-engineering.pdf' },
  ];

  return (
    <div ref={ref} className="max-w-[700px] mx-auto px-6 pt-10 pb-4">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-6" style={{ color: COLORS.textTertiary }}>CERTIFICATIONS</div>
      <div className="flex flex-wrap justify-center gap-3">
        {certs.map((c, i) => (
          <a
            key={i}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl no-underline transition-all"
            style={{
              background: `${COLORS.surface}cc`,
              border: `1px solid ${COLORS.amber}25`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(15px)',
              transition: `all 0.5s ease-out ${i * 0.1}s`,
            }}
          >
            <span style={{ color: COLORS.amber }}>&#x2713;</span>
            <div>
              <div className="text-xs font-semibold" style={{ color: COLORS.textPrimary }}>{c.name}</div>
              <div className="text-[10px]" style={{ color: COLORS.textTertiary }}>{c.issuer} · {c.date}</div>
            </div>
            <span className="text-[10px] ml-1" style={{ color: COLORS.textTertiary }}>&#x2197;</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── CHAPTER II: ARSENAL ───
function ChapterArsenal() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories = [
    { name: 'BI & Analytics', icon: '\u{1F4CA}', color: COLORS.cyan, skills: ['BI Strategy', 'Financial Modeling', 'Fraud Detection', 'KPI Design', 'Statistical Analysis', 'Data Storytelling', 'Power BI / Tableau', 'Advanced SQL'] },
    { name: 'Audit & Compliance', icon: '\u{1F6E1}', color: COLORS.purple, skills: ['SOX/ITGC Audit', 'Risk Assessment', 'GRC Frameworks', 'Anomaly Detection', 'Evidence Management', 'Control Testing', 'COSO / NIST / SOC 2'] },
    { name: 'Data Engineering', icon: '\u{2699}', color: COLORS.teal, skills: ['PySpark / Databricks', 'PostgreSQL / Snowflake', 'ETL Pipelines', 'Data Warehousing', 'Redis Caching', 'Kafka Streaming', 'Database Admin'] },
    { name: 'AI & ML', icon: '\u{1F9E0}', color: COLORS.pink, skills: ['LLM Integration', 'Prompt Engineering', 'PyTorch / TensorFlow', 'NLP / Transformers', 'Computer Vision', 'Model Deployment', 'Self-hosted LLMs'] },
    { name: 'Backend & DevOps', icon: '\u{1F680}', color: COLORS.amber, skills: ['FastAPI / Flask', 'C# / .NET Core', 'REST APIs', 'Docker / K8s', 'Terraform', 'CI/CD Pipelines', 'AWS / Azure'] },
    { name: 'Security', icon: '\u{1F510}', color: COLORS.red, skills: ['AES-256 / RSA', 'Zero-Trust Arch', 'JWT Auth', 'IAM / RBAC', 'Audit Logging', 'Secure APIs', 'Data Privacy'] },
  ];

  return (
    <section className="min-h-screen relative pb-28">
      <ChapterTitle number="II" title="Arsenal" subtitle="Every tool, earned through real-world deployment." />
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <CategoryNode key={i} category={cat} index={i} active={activeCategory === i} onClick={() => setActiveCategory(activeCategory === i ? null : i)} />
          ))}
        </div>
        <div className="min-h-[200px] flex justify-center">
          <AnimatePresence mode="wait">
            {activeCategory !== null ? (
              <SkillsPanel key={activeCategory} category={categories[activeCategory]} />
            ) : (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10" style={{ color: COLORS.textTertiary, fontSize: 15 }}>
                <div className="text-3xl mb-3 opacity-50">&uarr;</div>
                Tap a domain to reveal the toolkit
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <StatsBar />
        <Certifications />
      </div>
    </section>
  );
}

// ─── Vantage Showcase ───
function VantageShowcase() {
  const { ref, visible } = useInView(0.15);
  const features = [
    { icon: '\u{1F916}', title: 'NL \u2192 SQL', desc: 'Natural language to SQL via self-hosted LLM' },
    { icon: '\u{1F510}', title: 'Zero-Trust', desc: 'Per-audit AES-256 encryption with key isolation' },
    { icon: '\u{1F4CB}', title: 'Auto-Testing', desc: 'Automated control testing with exception detection' },
    { icon: '\u{1F4CA}', title: 'Live Collab', desc: 'Real-time collaboration with full audit trails' },
  ];

  const vantage = contentConfig.projects.find(p => p.id === 'vantage');

  return (
    <div ref={ref} className="max-w-[800px] mx-auto px-6 mb-16" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease-out' }}>
      <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.bg})`, border: `1px solid ${COLORS.purple}30` }}>
        <div className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] rounded-full" style={{ background: `radial-gradient(circle, ${COLORS.purple}15, transparent)` }} />
        <div className="font-mono text-[11px] tracking-[3px] mb-3" style={{ color: COLORS.purple }}>FLAGSHIP PROJECT</div>
        <h3 className="text-2xl md:text-4xl font-extrabold mb-2" style={{ color: COLORS.textPrimary }}>Vantage AuditOS</h3>
        <p className="text-base leading-relaxed mb-4 max-w-[600px]" style={{ color: COLORS.textSecondary }}>
          AI-powered, zero-trust audit automation. Built end-to-end — from architecture to deployment — using FastAPI, Next.js, PostgreSQL, and a self-hosted LLM.
        </p>
        {vantage?.fullDescription && (
          <div className="space-y-2 mb-6">
            {vantage.fullDescription.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: COLORS.textTertiary }}>{p}</p>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ background: `${COLORS.purple}15`, borderColor: `${COLORS.purple}50` }} className="p-4 rounded-xl cursor-default" style={{ background: `${COLORS.bg}80`, border: `1px solid ${COLORS.textTertiary}15`, transition: 'all 0.3s' }}>
              <div className="text-[22px] mb-2">{f.icon}</div>
              <div className="text-[13px] font-bold mb-1" style={{ color: COLORS.textPrimary }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: COLORS.textTertiary }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {(vantage?.technologies || ['FastAPI', 'Next.js', 'PostgreSQL', 'OpenSQL-7B', 'Docker', 'AES-256', 'Terraform']).map(t => (
            <span key={t} className="px-3 py-1 rounded-md font-mono text-[11px]" style={{ background: `${COLORS.textTertiary}15`, color: COLORS.textTertiary }}>{t}</span>
          ))}
        </div>
        {vantage?.githubUrl && (
          <a href={vantage.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2.5 px-6 rounded-full text-sm font-semibold no-underline" style={{ background: `${COLORS.purple}20`, color: COLORS.purple, border: `1px solid ${COLORS.purple}40` }}>
            Visit Platform &#x2197;
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Other Projects Grid ───
function OtherProjects() {
  const otherProjects = contentConfig.projects.filter(p => !p.featured);

  return (
    <div className="max-w-[900px] mx-auto px-6 pb-16">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-8" style={{ color: COLORS.textTertiary }}>MORE PROJECTS</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {otherProjects.map((project, i) => {
          const accentColor = [COLORS.cyan, COLORS.teal, COLORS.pink, COLORS.amber, COLORS.purple, COLORS.green][i % 6];
          return (
            <ProjectCard key={project.id} project={project} accentColor={accentColor} index={i} />
          );
        })}
      </div>
    </div>
  );
}

function ProjectCard({ project, accentColor, index }: { project: typeof contentConfig.projects[0]; accentColor: string; index: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      whileHover={{ borderColor: `${accentColor}50`, y: -3 }}
      className="rounded-xl p-5"
      style={{
        background: `${COLORS.surface}cc`,
        border: `1px solid ${COLORS.textTertiary}15`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease-out ${index * 0.08}s`,
      }}
    >
      <div className="text-base font-bold mb-1" style={{ color: COLORS.textPrimary }}>{project.title}</div>
      <div className="text-xs font-medium mb-2" style={{ color: accentColor }}>{project.tagline}</div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: COLORS.textSecondary }}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.technologies.map(t => (
          <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono" style={{ background: `${accentColor}12`, color: accentColor }}>{t}</span>
        ))}
      </div>
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono no-underline" style={{ color: accentColor }}>
          View Project &#x2197;
        </a>
      )}
    </motion.div>
  );
}

// ─── Articles Section ───
function ArticlesSection() {
  const { ref, visible } = useInView(0.2);

  return (
    <div ref={ref} className="max-w-[900px] mx-auto px-6 pb-16">
      <div className="text-center font-mono text-[11px] tracking-[4px] mb-8" style={{ color: COLORS.textTertiary }}>WRITING</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contentConfig.articles.map((article, i) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-5 no-underline block transition-all"
            style={{
              background: `${COLORS.surface}cc`,
              border: `1px solid ${COLORS.textTertiary}15`,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${i * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${COLORS.teal}15`, color: COLORS.teal }}>
                {article.readTime}
              </span>
              <span className="text-[10px]" style={{ color: COLORS.textTertiary }}>{article.publishedDate}</span>
            </div>
            <div className="text-sm font-bold mb-2 leading-snug" style={{ color: COLORS.textPrimary }}>{article.title}</div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: COLORS.textTertiary }}>{article.description}</p>
            <span className="text-xs font-mono" style={{ color: COLORS.teal }}>Read on Medium &#x2197;</span>
          </a>
        ))}
      </div>
      <div className="text-center mt-6">
        <a href={contentConfig.social.medium} target="_blank" rel="noopener noreferrer" className="text-xs font-mono no-underline" style={{ color: COLORS.textTertiary }}>
          View All Articles &#x2197;
        </a>
      </div>
    </div>
  );
}

// ─── CHAPTER III: CREATIONS ───
function ChapterCreations() {
  return (
    <section className="min-h-screen relative pb-20">
      <ChapterTitle number="III" title="Creations" subtitle="From concept to production — built to last." />
      <VantageShowcase />
      <OtherProjects />
      <ArticlesSection />
    </section>
  );
}

// ─── CHAPTER IV: HORIZON ───
function ChapterHorizon() {
  const { ref: ref1, visible: v1 } = useInView();
  const { ref: ref2, visible: v2 } = useInView();

  const roles = contentConfig.openToRoles.roles;

  return (
    <section className="relative pb-20">
      <ChapterTitle number="IV" title="Horizon" subtitle="Where expertise meets ambition." />

      {/* Actively Seeking Badge */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: `${COLORS.green}15`, border: `1px solid ${COLORS.green}30` }}>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}60` }} />
          <span className="text-xs font-semibold" style={{ color: COLORS.green }}>Actively Seeking Opportunities</span>
        </div>
      </div>

      <div ref={ref1} className="max-w-[700px] mx-auto mb-12 px-6 text-center" style={{ opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
        <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: COLORS.textPrimary }}>
          {contentConfig.openToRoles.description}
        </p>
      </div>

      {/* Target Roles */}
      <div className="flex flex-wrap justify-center gap-3.5 max-w-[800px] mx-auto mb-12 px-6">
        {roles.map((role, i) => (
          <motion.div
            key={role}
            whileHover={{ y: -3, borderColor: [COLORS.cyan, COLORS.purple, COLORS.teal][i % 3], boxShadow: `0 0 20px ${[COLORS.cyan, COLORS.purple, COLORS.teal][i % 3]}25` }}
            className="py-3.5 px-7 rounded-xl text-sm font-medium cursor-default"
            style={{
              background: `${COLORS.surface}cc`,
              border: `1px solid ${[COLORS.cyan, COLORS.purple, COLORS.teal][i % 3]}30`,
              color: COLORS.textPrimary,
            }}
          >
            {role}
          </motion.div>
        ))}
      </div>

      {/* Value Props */}
      <div ref={ref2} className="max-w-[700px] mx-auto mb-16 px-6" style={{ opacity: v2 ? 1 : 0, transform: v2 ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease-out' }}>
        <div className="text-center font-mono text-[11px] tracking-[4px] mb-6" style={{ color: COLORS.textTertiary }}>WHAT I BRING</div>
        <div className="space-y-3">
          {contentConfig.openToRoles.valueProps.map((prop, i) => (
            <div key={i} className="flex gap-3 text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              <span className="mt-0.5" style={{ color: [COLORS.cyan, COLORS.purple, COLORS.teal, COLORS.pink][i % 4] }}>&#x25C6;</span>
              {prop}
            </div>
          ))}
        </div>
      </div>

      {/* Visa Info */}
      <div className="max-w-[500px] mx-auto mb-16 px-6">
        <div className="rounded-xl p-4 text-center" style={{ background: `${COLORS.surface}80`, border: `1px solid ${COLORS.textTertiary}15` }}>
          <span className="text-xs" style={{ color: COLORS.textTertiary }}>{contentConfig.personal.visaStatus}</span>
        </div>
      </div>
    </section>
  );
}

// ─── CHAPTER V: CONNECT (Contact) ───
function ChapterConnect() {
  const { ref, visible } = useInView(0.2);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.open(`mailto:${contentConfig.personal.email}?subject=${subject}&body=${body}`, '_self');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [formData]);

  return (
    <section className="relative pb-10">
      <ChapterTitle number="V" title="Connect" subtitle="Let's build something extraordinary together." />

      <div ref={ref} className="max-w-[900px] mx-auto px-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono tracking-wider mb-1.5" style={{ color: COLORS.textTertiary }}>
                  {contentConfig.contact.formFields.name.label.toUpperCase()}
                </label>
                <input
                  type="text"
                  required
                  placeholder={contentConfig.contact.formFields.name.placeholder}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1"
                  style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}20`, color: COLORS.textPrimary }}
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider mb-1.5" style={{ color: COLORS.textTertiary }}>
                  {contentConfig.contact.formFields.email.label.toUpperCase()}
                </label>
                <input
                  type="email"
                  required
                  placeholder={contentConfig.contact.formFields.email.placeholder}
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1"
                  style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}20`, color: COLORS.textPrimary }}
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-wider mb-1.5" style={{ color: COLORS.textTertiary }}>
                  {contentConfig.contact.formFields.message.label.toUpperCase()}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={contentConfig.contact.formFields.message.placeholder}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-1 resize-none"
                  style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}20`, color: COLORS.textPrimary }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: submitted ? COLORS.green : `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`,
                  color: submitted ? COLORS.bg : COLORS.bg,
                  boxShadow: `0 0 20px ${submitted ? COLORS.green : COLORS.cyan}30`,
                }}
              >
                {submitted ? '✓ Opening Email Client...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-4">
            <div className="rounded-xl p-5" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}15` }}>
              <div className="font-mono text-[10px] tracking-[3px] mb-3" style={{ color: COLORS.cyan }}>DIRECT CONTACT</div>
              <a href={`mailto:${contentConfig.personal.email}`} className="block text-sm mb-2 no-underline" style={{ color: COLORS.textPrimary }}>{contentConfig.personal.email}</a>
              <a href={`tel:${contentConfig.personal.phone}`} className="block text-sm mb-2 no-underline" style={{ color: COLORS.textPrimary }}>{contentConfig.personal.phone}</a>
              <div className="text-sm" style={{ color: COLORS.textTertiary }}>{contentConfig.personal.location}</div>
            </div>

            <div className="rounded-xl p-5" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}15` }}>
              <div className="font-mono text-[10px] tracking-[3px] mb-3" style={{ color: COLORS.purple }}>CONNECT ONLINE</div>
              {[
                { label: 'LinkedIn', url: contentConfig.social.linkedin },
                { label: 'GitHub', url: contentConfig.social.github },
                { label: 'Medium', url: contentConfig.social.medium },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-sm mb-1.5 no-underline transition-all" style={{ color: COLORS.textSecondary }}>
                  {link.label} &#x2197;
                </a>
              ))}
            </div>

            <div className="rounded-xl p-5" style={{ background: `${COLORS.surface}cc`, border: `1px solid ${COLORS.textTertiary}15` }}>
              <div className="text-xs" style={{ color: COLORS.textTertiary }}>I typically respond within <span style={{ color: COLORS.green }}>24 hours</span>.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Enhanced Footer ───
function EnhancedFooter() {
  return (
    <footer className="pt-16 pb-8 px-6 relative" style={{ borderTop: `1px solid ${COLORS.textTertiary}10` }}>
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo.svg" alt="Logo" width={24} height={24} />
              <span className="font-bold text-sm" style={{ color: COLORS.textPrimary }}>{contentConfig.personal.name}</span>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: COLORS.textTertiary }}>{contentConfig.personal.tagline}</p>
            <p className="text-xs" style={{ color: COLORS.textTertiary }}>{contentConfig.personal.location}</p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-mono text-[10px] tracking-[3px] mb-3" style={{ color: COLORS.textTertiary }}>QUICK LINKS</div>
            {['About', 'Experience', 'Skills', 'Projects', 'Writing', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="block text-xs mb-1.5 no-underline" style={{ color: COLORS.textSecondary }}>
                {link}
              </a>
            ))}
          </div>

          {/* Connect */}
          <div>
            <div className="font-mono text-[10px] tracking-[3px] mb-3" style={{ color: COLORS.textTertiary }}>CONNECT</div>
            {[
              { label: 'LinkedIn', url: contentConfig.social.linkedin },
              { label: 'GitHub', url: contentConfig.social.github },
              { label: 'Medium', url: contentConfig.social.medium },
              { label: 'Kaggle', url: contentConfig.social.kaggle },
            ].map(link => (
              <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-xs mb-1.5 no-underline" style={{ color: COLORS.textSecondary }}>
                {link.label} &#x2197;
              </a>
            ))}
            <a href={`mailto:${contentConfig.personal.email}`} className="block text-xs mb-1.5 no-underline mt-2" style={{ color: COLORS.textSecondary }}>{contentConfig.personal.email}</a>
            <a href={`tel:${contentConfig.personal.phone}`} className="block text-xs no-underline" style={{ color: COLORS.textSecondary }}>{contentConfig.personal.phone}</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-2" style={{ borderTop: `1px solid ${COLORS.textTertiary}10` }}>
          <div className="text-[11px] font-mono" style={{ color: COLORS.textTertiary }}>
            Designed with precision. Built with purpose.
          </div>
          <div className="text-[10px]" style={{ color: COLORS.textTertiary }}>
            {contentConfig.personal.visaStatus}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Divider ───
function Divider({ color }: { color: string }) {
  return <div className="h-[1px] max-w-[200px] mx-auto" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />;
}

// ─── MAIN COMPONENT ───
export default function CinematicPortfolio() {
  return (
    <div className="min-h-screen relative" style={{ background: COLORS.bg, color: COLORS.textPrimary, fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <style jsx global>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scrollDot {
          0% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        ::selection { background: ${COLORS.cyan}30; color: ${COLORS.textPrimary}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(${COLORS.cyan}, ${COLORS.purple}); border-radius: 3px; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
      `}</style>

      <ParticleField count={35} />
      <ProgressBar />
      <CinematicHero />
      <Divider color={COLORS.cyan} />
      <ChapterOrigin />
      <Divider color={COLORS.purple} />
      <ChapterArsenal />
      <Divider color={COLORS.teal} />
      <ChapterCreations />
      <Divider color={COLORS.pink} />
      <ChapterHorizon />
      <Divider color={COLORS.cyan} />
      <ChapterConnect />
      <EnhancedFooter />
    </div>
  );
}
