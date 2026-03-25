'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
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

  const chapter = progress < 0.33 ? 'I' : progress < 0.66 ? 'II' : 'III';
  const label = progress < 0.33 ? 'ORIGIN' : progress < 0.66 ? 'ARSENAL' : 'HORIZON';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center gap-3 px-6 py-3" style={{ background: `linear-gradient(180deg, ${COLORS.bg}ee, transparent)` }}>
      <span className="font-mono text-xs tracking-[3px] min-w-[120px]" style={{ color: COLORS.cyan }}>
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

      <div className="max-w-[800px] mx-auto px-6 pb-20 relative">
        <div
          ref={ref2}
          className="absolute top-0 bottom-0"
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

  return (
    <div ref={ref} className="max-w-[800px] mx-auto px-6" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease-out' }}>
      <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.surface}, ${COLORS.bg})`, border: `1px solid ${COLORS.purple}30` }}>
        <div className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] rounded-full" style={{ background: `radial-gradient(circle, ${COLORS.purple}15, transparent)` }} />
        <div className="font-mono text-[11px] tracking-[3px] mb-3" style={{ color: COLORS.purple }}>FLAGSHIP PROJECT</div>
        <h3 className="text-2xl md:text-4xl font-extrabold mb-2" style={{ color: COLORS.textPrimary }}>Vantage AuditOS</h3>
        <p className="text-base leading-relaxed mb-8 max-w-[600px]" style={{ color: COLORS.textSecondary }}>
          AI-powered, zero-trust audit automation. Built end-to-end — from architecture to deployment — using FastAPI, Next.js, PostgreSQL, and a self-hosted LLM.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ background: `${COLORS.purple}15`, borderColor: `${COLORS.purple}50` }} className="p-4 rounded-xl cursor-default" style={{ background: `${COLORS.bg}80`, border: `1px solid ${COLORS.textTertiary}15`, transition: 'all 0.3s' }}>
              <div className="text-[22px] mb-2">{f.icon}</div>
              <div className="text-[13px] font-bold mb-1" style={{ color: COLORS.textPrimary }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: COLORS.textTertiary }}>{f.desc}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {['FastAPI', 'Next.js', 'PostgreSQL', 'OpenSQL-7B', 'Docker', 'AES-256', 'Terraform'].map(t => (
            <span key={t} className="px-3 py-1 rounded-md font-mono text-[11px]" style={{ background: `${COLORS.textTertiary}15`, color: COLORS.textTertiary }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CHAPTER III: HORIZON ───
function ChapterHorizon() {
  const { ref: ref1, visible: v1 } = useInView();
  const { ref: ref2, visible: v2 } = useInView();
  const { ref: ref3, visible: v3 } = useInView();

  const roles = ['Senior Data Analyst', 'BI Manager', 'Audit Data Engineer', 'Data Engineering Lead', 'Technical PM', 'Senior IT Auditor'];

  return (
    <section className="min-h-screen relative pb-28">
      <ChapterTitle number="III" title="Horizon" subtitle="Where expertise meets ambition." />

      <div ref={ref1} className="max-w-[700px] mx-auto mb-20 px-6 text-center" style={{ opacity: v1 ? 1 : 0, transform: v1 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
        <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: COLORS.textPrimary }}>
          I&apos;m seeking senior technical roles where{' '}
          <span className="font-semibold" style={{ color: COLORS.cyan }}>business intelligence</span>,{' '}
          <span className="font-semibold" style={{ color: COLORS.purple }}>domain expertise</span>, and{' '}
          <span className="font-semibold" style={{ color: COLORS.teal }}>engineering depth</span>{' '}
          converge to drive strategic impact.
        </p>
      </div>

      <div ref={ref2} className="flex flex-wrap justify-center gap-3.5 max-w-[800px] mx-auto mb-20 px-6">
        {roles.map((role, i) => (
          <motion.div
            key={role}
            whileHover={{ y: -3, borderColor: [COLORS.cyan, COLORS.purple, COLORS.teal][i % 3], boxShadow: `0 0 20px ${[COLORS.cyan, COLORS.purple, COLORS.teal][i % 3]}25` }}
            className="py-3.5 px-7 rounded-xl text-sm font-medium cursor-default"
            style={{
              background: `${COLORS.surface}cc`,
              border: `1px solid ${[COLORS.cyan, COLORS.purple, COLORS.teal][i % 3]}30`,
              color: COLORS.textPrimary,
              opacity: v2 ? 1 : 0,
              transform: v2 ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease-out ${i * 0.08}s`,
            }}
          >
            {role}
          </motion.div>
        ))}
      </div>

      <VantageShowcase />

      <div ref={ref3} className="text-center pt-20 pb-10 px-6" style={{ opacity: v3 ? 1 : 0, transform: v3 ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s ease-out' }}>
        <h3 className="text-2xl md:text-4xl font-bold mb-6" style={{ color: COLORS.textPrimary }}>
          Let&apos;s build something{' '}
          <span style={{ background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            extraordinary
          </span>
        </h3>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href={`mailto:${contentConfig.personal.email}`} className="py-3.5 px-9 rounded-full font-bold text-[15px] no-underline transition-all" style={{ background: `linear-gradient(135deg, ${COLORS.cyan}, ${COLORS.purple})`, color: COLORS.bg, boxShadow: `0 0 24px ${COLORS.cyan}40` }}>
            Get In Touch
          </a>
          <a href="/resume.pdf" className="py-3.5 px-9 rounded-full font-semibold text-[15px] no-underline transition-all" style={{ background: 'transparent', border: `1.5px solid ${COLORS.textTertiary}40`, color: COLORS.textPrimary }}>
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Cinematic Hero ───
function CinematicHero() {
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

        <p className="text-[15px] md:text-lg font-light leading-relaxed max-w-[560px] mx-auto mb-12" style={{ color: COLORS.textSecondary }}>
          From audit floors at BlackRock and Nomura to architecting production AI systems — this is the story of how domain expertise meets engineering depth.
        </p>
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
      <ChapterHorizon />

      <footer className="text-center pt-16 pb-10" style={{ borderTop: `1px solid ${COLORS.textTertiary}10` }}>
        <div className="flex justify-center gap-6 mb-6">
          {[
            { label: 'LinkedIn', url: contentConfig.social.linkedin },
            { label: 'GitHub', url: contentConfig.social.github },
            { label: 'Medium', url: contentConfig.social.medium },
            { label: 'Email', url: `mailto:${contentConfig.personal.email}` },
          ].map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[13px] tracking-wider no-underline transition-colors hover:text-accent-cyan" style={{ color: COLORS.textTertiary }}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="text-xs font-mono opacity-50" style={{ color: COLORS.textTertiary }}>
          Designed with precision. Built with purpose.
        </div>
      </footer>
    </div>
  );
}
