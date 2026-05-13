'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   Shared useInView hook
   ───────────────────────────────────────────────────────────────────── */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
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

/* ─────────────────────────────────────────────────────────────────────
   BellCurveAmbient
   A slow-breathing gaussian curve drawn in SVG. Quietly mathematical.
   Used behind the hero — references Sahaj's CLT article without saying so.
   ───────────────────────────────────────────────────────────────────── */
export function BellCurveAmbient({
  color,
  secondary,
  opacity = 0.18,
}: {
  color: string;
  secondary?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ overflow: 'hidden' }}
    >
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="bell-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="35%" stopColor={color} stopOpacity={opacity * 0.8} />
            <stop offset="65%" stopColor={color} stopOpacity={opacity} />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bell-fade-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={secondary ?? color} stopOpacity="0" />
            <stop offset="50%" stopColor={secondary ?? color} stopOpacity={opacity * 0.4} />
            <stop offset="100%" stopColor={secondary ?? color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Primary bell — slow breathe */}
        <path
          d="M -100 500 Q 200 500 350 400 T 600 200 T 850 400 T 1100 500 T 1400 500"
          stroke="url(#bell-fade)"
          strokeWidth="1.2"
          fill="none"
          style={{
            transformOrigin: '50% 50%',
            animation: 'bell-breathe 14s ease-in-out infinite',
          }}
        />
        {/* Secondary ghost — slower, offset, secondary color (sage) */}
        <path
          d="M -100 520 Q 250 520 400 430 T 650 240 T 900 430 T 1150 520 T 1400 520"
          stroke="url(#bell-fade-2)"
          strokeWidth="0.8"
          fill="none"
          style={{
            transformOrigin: '50% 50%',
            animation: 'bell-breathe-2 22s ease-in-out infinite',
          }}
        />
        {/* Standard-deviation tick marks under the curve */}
        {[-2, -1, 0, 1, 2].map((sd) => {
          const x = 600 + sd * 130;
          const tickColor = sd === 0 ? color : secondary ?? color;
          return (
            <g key={sd} opacity={opacity * 1.5}>
              <line x1={x} y1={510} x2={x} y2={530} stroke={tickColor} strokeWidth="0.6" />
              <text
                x={x}
                y={545}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill={tickColor}
                letterSpacing="0.2em"
                opacity={0.7}
              >
                {sd === 0 ? 'μ' : sd > 0 ? `+${sd}σ` : `${sd}σ`}
              </text>
            </g>
          );
        })}
      </svg>

      <style jsx>{`
        @keyframes bell-breathe {
          0%, 100% { transform: scaleY(1) translateX(0); }
          50% { transform: scaleY(1.08) translateX(8px); }
        }
        @keyframes bell-breathe-2 {
          0%, 100% { transform: scaleY(0.95) translateX(0); }
          50% { transform: scaleY(1.05) translateX(-12px); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   CareerCurve
   An equity-curve-style line chart of career trajectory. Hover any node
   to surface that role's detail in the inspector beneath the chart.
   ───────────────────────────────────────────────────────────────────── */
export type CareerNode = {
  year: string;
  yearShort: string;
  role: string;
  company: string;
  /** Span of the engagement, e.g. "Aug 2021 — Jan 2024" */
  period?: string;
  /** Top quantified achievement for the role */
  achievement?: string;
  /** Short stack chip list */
  stack?: string[];
};

export function CareerCurve({
  nodes,
  fg,
  accent,
  secondary,
  hairline,
  faint,
  muted,
}: {
  nodes: CareerNode[];
  fg: string;
  accent: string;
  secondary?: string;
  hairline: string;
  faint: string;
  muted: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // Index of the node whose detail panel is currently shown.
  // Defaults to most recent (last node) until user starts inspecting.
  const [pinnedIdx, setPinnedIdx] = useState<number>(nodes.length - 1);
  const activeIdx = hoveredIdx ?? pinnedIdx;

  const width = 1100;
  const height = 320;
  const padX = 60;
  const padY = 40;

  // y-values: gentle rising curve mapped to "career altitude"
  // We hand-curate altitudes to feel like a rising equity curve, with a small
  // dip in 2021 (transition year), then steady climb.
  const altitudes = [0.15, 0.32, 0.52, 0.68, 0.85];

  const points = nodes.map((n, i) => {
    const x = padX + (i * (width - 2 * padX)) / (nodes.length - 1);
    const y = height - padY - altitudes[i] * (height - 2 * padY);
    return { x, y, ...n };
  });

  // Smooth Catmull-Rom style path using cubic bezier
  const pathD = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (p.x - prev.x) * 0.5;
      const cp1y = prev.y;
      const cp2x = prev.x + (p.x - prev.x) * 0.5;
      const cp2y = p.y;
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
    })
    .join(' ');

  // Area fill path (close to bottom for shading)
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: 'clamp(220px, 26vw, 340px)' }}
      >
        <defs>
          <linearGradient id="career-area" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Baseline gridlines — three faint horizontals */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padX}
            y1={height - padY - p * (height - 2 * padY)}
            x2={width - padX}
            y2={height - padY - p * (height - 2 * padY)}
            stroke={hairline}
            strokeWidth="0.5"
            strokeDasharray="2 4"
          />
        ))}

        {/* Y-axis baseline */}
        <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke={hairline} strokeWidth="0.7" />

        {/* Area fill — fades in after path draws */}
        <path
          d={areaD}
          fill="url(#career-area)"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.4s ease-out 1.4s',
          }}
        />

        {/* Main path — draws on scroll into view */}
        <path
          d={pathD}
          stroke={accent}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3000"
          strokeDashoffset={visible ? 0 : 3000}
          style={{
            transition: 'stroke-dashoffset 2.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* Milestone nodes + labels */}
        {points.map((p, i) => {
          const nodeColor = i === points.length - 1 ? accent : i % 2 === 0 ? accent : secondary ?? accent;
          const isActive = i === activeIdx;
          const isHovered = i === hoveredIdx;
          return (
            <g
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.4 + i * 0.18}s`,
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => setPinnedIdx(i)}
            >
              {/* Dotted dropline */}
              <line
                x1={p.x}
                y1={p.y + 4}
                x2={p.x}
                y2={height - padY}
                stroke={nodeColor}
                strokeOpacity={isActive ? 0.65 : 0.3}
                strokeWidth="0.6"
                strokeDasharray="1.5 3"
                style={{ transition: 'stroke-opacity 0.3s ease' }}
              />
              {/* Outer hover ring — expands when hovered */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 14 : 7}
                fill="none"
                stroke={nodeColor}
                strokeWidth="0.7"
                strokeOpacity={isActive ? 0.8 : 0.4}
                style={{ transition: 'r 0.35s cubic-bezier(0.22, 1, 0.36, 1), stroke-opacity 0.3s ease' }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 4 : 3}
                fill={nodeColor}
                style={{ transition: 'r 0.3s ease' }}
              />
              {/* Invisible larger hit area for easier hovering */}
              <circle cx={p.x} cy={p.y} r="26" fill="transparent" />
              {/* Year tick */}
              <text
                x={p.x}
                y={height - padY + 18}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9.5"
                fill={isActive ? nodeColor : faint}
                letterSpacing="0.2em"
                style={{ transition: 'fill 0.3s ease' }}
              >
                {p.yearShort}
              </text>
              {/* Role / company label above the node */}
              <text
                x={p.x}
                y={p.y - 16}
                textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                fontFamily="var(--font-spectral), Georgia, serif"
                fontStyle="italic"
                fontSize="13"
                fill={fg}
                fontWeight="400"
              >
                {p.company}
              </text>
              <text
                x={p.x}
                y={p.y - 30}
                textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                fill={faint}
                letterSpacing="0.22em"
              >
                {p.role.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Inspector — shows hovered (or pinned) node detail */}
      <div
        className="mt-2 grid md:grid-cols-12 gap-x-10 gap-y-4 items-start"
        style={{ minHeight: 92 }}
      >
        <div className="md:col-span-3">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: faint,
            }}
          >
            Inspecting · {nodes[activeIdx]?.period ?? nodes[activeIdx]?.year}
          </div>
          <div
            className="mt-2"
            style={{
              fontFamily: 'var(--font-spectral), Georgia, serif',
              fontVariationSettings: "'opsz' 144",
              fontSize: 22,
              lineHeight: 1.15,
              fontWeight: 400,
              color: fg,
              letterSpacing: '-0.01em',
            }}
          >
            {nodes[activeIdx]?.company}
          </div>
          <div
            className="mt-1.5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: muted,
            }}
          >
            {nodes[activeIdx]?.role}
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-5">
          <p
            style={{
              fontFamily: 'var(--font-spectral), Georgia, serif',
              fontVariationSettings: "'opsz' 9",
              fontSize: 16,
              lineHeight: 1.7,
              fontWeight: 400,
              color: muted,
              fontStyle: 'italic',
            }}
          >
            {nodes[activeIdx]?.achievement ?? '…'}
          </p>
          {nodes[activeIdx]?.stack && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {nodes[activeIdx].stack!.map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: faint,
                    paddingLeft: i === 0 ? 0 : 12,
                    borderLeft: i === 0 ? 'none' : `1px solid ${hairline}`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div
        className="mt-3"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9.5,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: faint,
          opacity: 0.65,
        }}
      >
        Hover any node to inspect · click to pin
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   PenroseSketch
   Hand-drawn impossible triangle. Self-draws on scroll into view.
   Click to reveal "Finance / Data / AI" labels on each side and rotate
   the figure once. Click again to dismiss.
   ───────────────────────────────────────────────────────────────────── */
export function PenroseSketch({
  color,
  secondary,
  size = 220,
}: {
  color: string;
  secondary?: string;
  size?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.4);
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={ref} style={{ width: size, height: size * 1.08 }}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size * 1.08}
        style={{ cursor: 'pointer' }}
        onClick={() => setExpanded((v) => !v)}
      >
        {/* Rotating group for click effect */}
        <g
          style={{
            transformOrigin: '100px 110px',
            transform: expanded ? 'rotate(360deg)' : 'rotate(0deg)',
            transition: 'transform 1.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <g
            fill="none"
            stroke={color}
            strokeWidth="0.9"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="800"
            strokeDashoffset={visible ? 0 : 800}
            style={{ transition: 'stroke-dashoffset 2.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            <path d="M 100 30 L 184 174 L 16 174 Z" />
            <path d="M 100 62 L 158 162 L 42 162 Z" />
            <path d="M 100 30 L 184 174 L 168 174 L 110 72 Z" />
            <path d="M 184 174 L 16 174 L 28 156 L 168 156 Z" />
            <path d="M 16 174 L 100 30 L 110 48 L 38 174 Z" />
          </g>
        </g>

        {/* Three side labels appear on click */}
        {([
          ['Finance', 28, 130, color],
          ['Data',    172, 130, color],
          ['AI',      100, 192, secondary ?? color],
        ] as const).map(([txt, x, y, c]) => (
          <text
            key={txt as string}
            x={x as number}
            y={y as number}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            fontWeight="400"
            letterSpacing="0.3em"
            fill={c as string}
            style={{
              textTransform: 'uppercase',
              opacity: expanded ? 0.85 : 0,
              transition: `opacity 0.7s ease ${expanded ? 1.2 : 0}s`,
            }}
          >
            {String(txt).toUpperCase()}
          </text>
        ))}

        <text
          x="100"
          y="14"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="6.5"
          fill={color}
          fontWeight="400"
          letterSpacing="0.3em"
          opacity={visible ? 0.5 : 0}
          style={{ transition: 'opacity 1s ease-out 2s' }}
        >
          PENROSE, 1958 · CLICK
        </text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   AgentConstellation
   The real Vantage hero feature: 14 named AI agents (8 visualized) that
   monitor, synthesize, and reason about audit data. Each agent has a
   name, a job, and a personality. Hover or click reveals what each does.

   Source: Vantage CAPABILITIES.md §2 (AI Agent System), as of March 2026.
   ───────────────────────────────────────────────────────────────────── */

export type Agent = {
  short: string;
  internalName: string;
  role: string;
  body: string;
};

const AGENTS: Agent[] = [
  {
    short: 'Radar',
    internalName: 'risk_monitor',
    role: 'Continuous risk monitoring',
    body: 'Watches the entire risk register continuously. Recomputes scores from connector signals (Jira, GitHub, AWS, Slack, ServiceNow) and raises Radar findings when something drifts past threshold.',
  },
  {
    short: 'Shield',
    internalName: 'risk_synthesizer',
    role: 'Cross-source synthesis',
    body: 'Combines the risk register with OSINT, observations, and EDGAR filings to produce a composite, defensible risk view. Audits the audit-trail.',
  },
  {
    short: 'Sage',
    internalName: 'anomaly_detector',
    role: 'Statistical anomalies',
    body: 'Benford’s Law, z-scores, clustering. Sage is the agent that surfaces the fabricated journal entries and the suspicious privilege escalations. Math, not vibes.',
  },
  {
    short: 'Beacon',
    internalName: 'attention_analyst',
    role: 'Attention scoring',
    body: 'Compares where the audit team is focused against where the data says they should be. A quiet voice that points at the corner you forgot.',
  },
  {
    short: 'Webby',
    internalName: 'osint_collector',
    role: 'External intelligence',
    body: 'CVEs, regulatory filings, sanctions lists, breach disclosures, EDGAR. Pulls the world’s news into the audit context so the team isn’t the last to know.',
  },
  {
    short: 'Iris',
    internalName: 'audit_retrospective',
    role: 'Two years of pattern',
    body: 'Analyzes two years of completed audits across team sizing, control effectiveness, timeline efficiency, finding patterns, PBC turnaround, and scope accuracy. The Brain.',
  },
  {
    short: 'Cog',
    internalName: 'model_governance',
    role: 'AI model governance',
    body: 'Logs every LLM call across every agent. Token counts, latency, cost, anomaly flags. Makes sure the agents stay inside their own envelope.',
  },
  {
    short: 'Architect',
    internalName: 'agent_architect',
    role: 'Natural language to agent',
    body: 'You describe an agent in plain English. Architect emits a structured specification with cost estimate, risk class, and required approvals. The agent that builds agents.',
  },
];

export function AgentConstellation({
  fg,
  bg,
  muted,
  faint,
  accent,
  secondary,
  hairline,
}: {
  fg: string;
  bg: string;
  muted: string;
  faint: string;
  accent: string;
  secondary?: string;
  hairline: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pinnedIdx, setPinnedIdx] = useState<number>(0);
  const activeIdx = hoveredIdx ?? pinnedIdx;

  const width = 800;
  const height = 480;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 180;

  const positions = AGENTS.map((_, i) => {
    const angle = (i / AGENTS.length) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      angle,
    };
  });

  return (
    <div
      ref={ref}
      className="rounded-sm overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fg}0a, ${fg}03)`,
        border: `1px solid ${hairline}`,
        borderTop: `1px solid ${accent}38`,
        boxShadow: `0 1px 0 ${accent}10, inset 0 1px 0 ${fg}05`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${hairline}` }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: accent, opacity: 0.6 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: muted, opacity: 0.3 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: muted, opacity: 0.3 }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: muted }}>
            Vantage · agent constellation · live
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: faint }}>
          8 of 14 shown
        </span>
      </div>

      {/* SVG canvas */}
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 'clamp(320px, 38vw, 480px)' }}>
          {/* Connecting lines from center to each framework */}
          {positions.map((p, i) => {
            const active = i === activeIdx;
            return (
              <line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke={active ? accent : hairline}
                strokeWidth={active ? 1.1 : 0.6}
                strokeOpacity={active ? 0.85 : 0.55}
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 1.2s ease ${0.2 + i * 0.05}s, stroke 0.3s ease, stroke-width 0.3s ease`,
                }}
              />
            );
          })}

          {/* Outer orbit hairline */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={hairline}
            strokeWidth="0.4"
            strokeDasharray="1.5 4"
            opacity={visible ? 0.5 : 0}
            style={{ transition: 'opacity 1.6s ease 0.6s' }}
          />

          {/* Agent nodes */}
          {positions.map((p, i) => {
            const f = AGENTS[i];
            const active = i === activeIdx;
            const r = active ? 38 : 30;
            return (
              <g
                key={f.short}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setPinnedIdx(i)}
                style={{
                  cursor: 'pointer',
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.6s ease ${0.4 + i * 0.08}s`,
                }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={active ? `${accent}22` : bg}
                  stroke={accent}
                  strokeWidth={active ? 1.3 : 0.7}
                  style={{ transition: 'r 0.35s cubic-bezier(0.22, 1, 0.36, 1), fill 0.3s ease, stroke-width 0.3s ease' }}
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize={f.short.length > 5 ? 9.5 : 11}
                  fontWeight="500"
                  letterSpacing="0.18em"
                  fill={active ? accent : fg}
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {f.short}
                </text>
                {/* Larger invisible hit area */}
                <circle cx={p.x} cy={p.y} r={r + 16} fill="transparent" />
              </g>
            );
          })}

          {/* Central Vantage node */}
          <circle
            cx={cx}
            cy={cy}
            r={62}
            fill={bg}
            stroke={accent}
            strokeWidth="1.4"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 1.4s ease 1.2s' }}
          />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontFamily="var(--font-spectral), Georgia, serif"
            fontStyle="italic"
            fontSize="22"
            fill={fg}
            fontWeight="400"
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 1s ease 1.6s' }}
          >
            Vantage
          </text>
          <text
            x={cx}
            y={cy + 16}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="8"
            fontWeight="400"
            letterSpacing="0.3em"
            fill={muted}
            opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 1s ease 1.8s' }}
          >
            AUDIT OS
          </text>
          {/* Inner pulse ring at center */}
          {secondary && (
            <circle
              cx={cx}
              cy={cy}
              r={62}
              fill="none"
              stroke={secondary}
              strokeWidth="0.5"
              opacity={visible ? 0.5 : 0}
              style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: visible ? 'compliance-pulse 4s ease-in-out infinite' : 'none',
              }}
            />
          )}
        </svg>
      </div>

      {/* Detail panel */}
      <div className="px-6 py-5" style={{ borderTop: `1px solid ${hairline}` }}>
        <div className="flex items-center gap-4 mb-2">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em', textTransform: 'uppercase', color: accent }}>
            {AGENTS[activeIdx].short}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: faint }}>
            {AGENTS[activeIdx].internalName} · {AGENTS[activeIdx].role}
          </span>
        </div>
        <p
          className="mt-3 max-w-[680px]"
          style={{
            fontFamily: 'var(--font-spectral), Georgia, serif',
            fontVariationSettings: "'opsz' 9",
            fontSize: 16,
            lineHeight: 1.7,
            color: muted,
            fontStyle: 'italic',
          }}
        >
          {AGENTS[activeIdx].body}
        </p>
        <div className="mt-4" style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: faint, opacity: 0.65 }}>
          Hover any agent to inspect · click to pin · six more agents under the hood
        </div>
      </div>

      <style jsx>{`
        @keyframes compliance-pulse {
          0%, 100% { transform: scale(1); opacity: 0.45; }
          50% { transform: scale(1.08); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   JovianRotation
   A live time mark with a slightly fascinating premise: Jupiter rotates
   on its axis every 9 hours 55 minutes 30 seconds. We show the current
   position inside that cycle, updated every thirty seconds.

   Tasteful because:
   · doesn't reveal the year
   · doesn't reveal the day
   · doesn't reveal even local time
   · just a quiet astronomical detail that ticks slowly forward
   ───────────────────────────────────────────────────────────────────── */

const JOVIAN_PERIOD_SEC = 9 * 3600 + 55 * 60 + 30; // 35,730s

export function JovianRotation({ withLabel = true }: { withLabel?: boolean }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const sec = Math.floor(Date.now() / 1000) % JOVIAN_PERIOD_SEC;
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const body = `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m`;
      setText(withLabel ? `Jovian · ${body}` : body);
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, [withLabel]);

  // Reserve width during SSR so layout doesn't shift on hydrate
  return (
    <span style={{ display: 'inline-block', minWidth: withLabel ? '12ch' : '8ch' }}>
      {text ?? ' '}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   BenfordsBars
   A tiny side element. Shows the Benford's Law distribution that
   Vantage's "Sage" anomaly agent uses to detect fabricated journal
   entries. Bars rise on scroll-into-view; hover bars for exact value.
   ───────────────────────────────────────────────────────────────────── */

const BENFORD = [30.1, 17.6, 12.5, 9.7, 7.9, 6.7, 5.8, 5.1, 4.6];

export function BenfordsBars({
  accent,
  hairline,
  faint,
  muted,
  width = 240,
  height = 96,
}: {
  accent: string;
  hairline: string;
  faint: string;
  muted: string;
  width?: number;
  height?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const max = Math.max(...BENFORD);
  const barW = (width - 16) / 9;

  return (
    <div ref={ref} className="inline-block" style={{ width }}>
      <svg width={width} height={height + 22} viewBox={`0 0 ${width} ${height + 22}`}>
        {/* baseline */}
        <line x1={8} y1={height} x2={width - 8} y2={height} stroke={hairline} strokeWidth="0.6" />
        {/* bars */}
        {BENFORD.map((p, i) => {
          const x = 8 + i * barW + barW * 0.18;
          const w = barW * 0.64;
          const h = (p / max) * (height - 14);
          const y = height - h;
          const hovered = hoverIdx === i;
          return (
            <g
              key={i}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={x}
                y={visible ? y : height}
                width={w}
                height={visible ? h : 0}
                fill={hovered ? accent : `${accent}cc`}
                style={{
                  transition: `y 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s, height 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.06}s, fill 0.25s ease`,
                }}
              />
              <text
                x={x + w / 2}
                y={height + 12}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                fill={faint}
                letterSpacing="0.1em"
              >
                {i + 1}
              </text>
              {hovered && (
                <text
                  x={x + w / 2}
                  y={y - 4}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  fill={accent}
                  letterSpacing="0.05em"
                >
                  {p}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div
        className="mt-1"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9.5,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: muted,
        }}
      >
        Benford&apos;s Law · first-digit distribution
      </div>
      <div
        className="mt-2 max-w-[280px]"
        style={{
          fontFamily: 'var(--font-spectral), Georgia, serif',
          fontVariationSettings: "'opsz' 9",
          fontSize: 13,
          lineHeight: 1.65,
          color: muted,
          fontStyle: 'italic',
        }}
      >
        The expected distribution of leading digits in naturally occurring datasets.
        Vantage&apos;s Sage agent uses it to spot fabricated journal entries.
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ContactForm
   A graceful name / email / message form that opens the user's mail
   client (mailto) with prefilled subject and body. Three fields, one
   submit button. Editorial styling, no chrome.
   ───────────────────────────────────────────────────────────────────── */

export function ContactForm({
  email,
  fg,
  muted,
  faint,
  accent,
  hairline,
}: {
  email: string;
  fg: string;
  muted: string;
  faint: string;
  accent: string;
  hairline: string;
}) {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio note from ${name || 'a visitor'}`);
    const body = encodeURIComponent(
      `${message}\n\n— from ${name}${from ? ` (${from})` : ''}`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self');
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-spectral), Georgia, serif',
    fontVariationSettings: "'opsz' 9",
    fontSize: 16,
    color: fg,
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${hairline}`,
    width: '100%',
    padding: '12px 0 8px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: faint,
  };

  return (
    <form onSubmit={submit} className="space-y-7 max-w-[560px]">
      <div>
        <label style={labelStyle}>Your name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="A. Auditor"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = hairline; }}
        />
      </div>
      <div>
        <label style={labelStyle}>How to reach you</label>
        <input
          type="email"
          required
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="you@firm.com"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = hairline; }}
        />
      </div>
      <div>
        <label style={labelStyle}>A note</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          style={{ ...inputStyle, resize: 'none', minHeight: 100 }}
          onFocus={(e) => { e.currentTarget.style.borderColor = accent; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = hairline; }}
        />
      </div>
      <div className="pt-4 flex items-baseline justify-between gap-4">
        <button
          type="submit"
          className="no-underline inline-flex items-center gap-3 pb-1"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10.5,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: sent ? accent : fg,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderBottom: `1px solid ${sent ? accent : fg}`,
            paddingBottom: 4,
            transition: 'color 0.4s ease, border-color 0.4s ease',
          }}
        >
          <span>{sent ? 'Mail client opened' : 'Send a note'}</span>
          <svg width="16" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </button>
        <span style={{ ...labelStyle, fontSize: 9 }}>
          Opens your mail client
        </span>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   ChessKnightMoves
   A small mathematical grace note. Knight on a board; click any of its
   eight legal moves and the knight glides there. Mathematical chess,
   no game logic.
   ───────────────────────────────────────────────────────────────────── */

const KNIGHT_DELTAS: [number, number][] = [
  [1, 2], [2, 1], [2, -1], [1, -2],
  [-1, -2], [-2, -1], [-2, 1], [-1, 2],
];

export function ChessKnightMoves({
  fg,
  accent,
  secondary,
  hairline,
  muted,
  faint,
  size = 240,
}: {
  fg: string;
  accent: string;
  secondary?: string;
  hairline: string;
  muted: string;
  faint: string;
  size?: number;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.3);
  const [pos, setPos] = useState<[number, number]>([3, 4]); // d4
  const [trail, setTrail] = useState<[number, number][]>([]);
  const [count, setCount] = useState(0);

  const legalMoves = KNIGHT_DELTAS
    .map(([dx, dy]) => [pos[0] + dx, pos[1] + dy] as [number, number])
    .filter(([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8);

  const moveTo = (target: [number, number]) => {
    setTrail((t) => [...t, pos].slice(-6));
    setPos(target);
    setCount((c) => c + 1);
  };

  const sq = size / 8;
  const fileLabels = 'abcdefgh';
  const rankLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];
  const sage = secondary ?? accent;

  return (
    <div ref={ref} className="inline-block" style={{ opacity: visible ? 1 : 0, transition: 'opacity 1.2s ease' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid */}
        {[...Array(8)].map((_, r) =>
          [...Array(8)].map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * sq}
              y={r * sq}
              width={sq}
              height={sq}
              fill="transparent"
              stroke={hairline}
              strokeWidth={0.4}
            />
          ))
        )}

        {/* Coordinate labels (corners only for minimalism) */}
        <text x={2} y={size - 2} fontFamily="var(--font-mono)" fontSize="7" fill={faint} letterSpacing="0.2em">
          a1
        </text>
        <text x={size - 12} y={9} fontFamily="var(--font-mono)" fontSize="7" fill={faint} letterSpacing="0.2em">
          h8
        </text>

        {/* Trail line */}
        {trail.length > 0 && (
          <polyline
            points={[...trail, pos].map(([x, y]) => `${(x + 0.5) * sq},${(y + 0.5) * sq}`).join(' ')}
            fill="none"
            stroke={accent}
            strokeOpacity={0.35}
            strokeWidth={0.7}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        )}

        {/* Trail dots (visited squares) */}
        {trail.map(([x, y], i) => (
          <circle
            key={`trail-${i}`}
            cx={(x + 0.5) * sq}
            cy={(y + 0.5) * sq}
            r={1.6}
            fill={accent}
            opacity={0.15 + (i / trail.length) * 0.3}
          />
        ))}

        {/* Legal move dots */}
        {legalMoves.map(([x, y], i) => (
          <g
            key={`move-${i}`}
            style={{ cursor: 'pointer' }}
            onClick={() => moveTo([x, y])}
          >
            <circle
              cx={(x + 0.5) * sq}
              cy={(y + 0.5) * sq}
              r={sq * 0.42}
              fill="transparent"
            />
            <circle
              cx={(x + 0.5) * sq}
              cy={(y + 0.5) * sq}
              r={3.2}
              fill={sage}
              opacity={0.55}
              style={{ transition: 'r 0.25s ease, opacity 0.25s ease' }}
            />
          </g>
        ))}

        {/* Knight glyph */}
        <g
          style={{
            transform: `translate(${pos[0] * sq}px, ${pos[1] * sq}px)`,
            transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <text
            x={sq / 2}
            y={sq * 0.72}
            textAnchor="middle"
            fontSize={sq * 0.62}
            fill={accent}
          >
            ♞
          </text>
        </g>
      </svg>

      {/* Caption */}
      <div className="mt-3 flex items-baseline justify-between" style={{ width: size }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9.5,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: muted,
        }}>
          {fileLabels[pos[0]]}{rankLabels[pos[1]]} · {count} moves
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: faint,
        }}>
          click any dot
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   NLtoSQLDemo
   A typed-out demo cycling through 3 audit-relevant natural-language
   queries and their SQL. Lives inside the Vantage case to show what
   the platform actually does, not what it claims to do.
   ───────────────────────────────────────────────────────────────────── */

type Query = {
  ask: string;
  sql: string;
  meta: string;
};

const QUERIES: Query[] = [
  {
    ask: 'Show me the top 10 journal entries flagged for fraud last quarter.',
    sql:
`SELECT entry_id, amount, account, flag_reason
FROM journal_entries
WHERE fraud_score > 0.85
  AND posted_at >= now() - interval '90 days'
ORDER BY amount DESC
LIMIT 10;`,
    meta: '3 results · 247ms · audit_db.journal_entries',
  },
  {
    ask: 'Which ITGC controls failed across the engagement?',
    sql:
`SELECT c.control_id, c.domain, t.tested_on, t.outcome
FROM controls c
JOIN test_results t ON t.control_id = c.control_id
WHERE c.framework = 'ITGC'
  AND t.outcome = 'fail'
ORDER BY t.tested_on DESC;`,
    meta: '7 results · 184ms · audit_db.controls',
  },
  {
    ask: 'List approvals pending more than seven days.',
    sql:
`SELECT w.workpaper_id, w.owner, w.opened_at,
       now() - w.opened_at AS pending_for
FROM workpapers w
WHERE w.status = 'pending_review'
  AND w.opened_at < now() - interval '7 days'
ORDER BY w.opened_at;`,
    meta: '12 results · 91ms · audit_db.workpapers',
  },
];

const TYPE_ASK_MS = 32;
const TYPE_SQL_MS = 18;
const HOLD_AFTER_SQL_MS = 4200;

export function NLtoSQLDemo({
  bg,
  fg,
  muted,
  faint,
  accent,
  hairline,
}: {
  bg: string;
  fg: string;
  muted: string;
  faint: string;
  accent: string;
  hairline: string;
}) {
  const { ref, visible } = useInView<HTMLDivElement>(0.2);
  const [qIdx, setQIdx] = useState(0);
  const [askText, setAskText] = useState('');
  const [sqlText, setSqlText] = useState('');
  const [phase, setPhase] = useState<'asking' | 'compiled' | 'idle'>('asking');
  const [paused, setPaused] = useState(false);
  // Pause is tracked via ref so hover doesn't restart the entire animation.
  const pausedRef = useRef(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  // Drives the typing animation.
  useEffect(() => {
    if (!visible) return;
    const q = QUERIES[qIdx];
    let active = true;

    const sleep = (ms: number) => new Promise<void>((res) => window.setTimeout(res, ms));
    const waitWhilePaused = async () => {
      while (pausedRef.current && active) await sleep(80);
    };

    const run = async () => {
      // Reset
      setAskText('');
      setSqlText('');
      setPhase('asking');

      // Type ask
      for (let i = 0; i <= q.ask.length; i++) {
        await waitWhilePaused();
        if (!active) return;
        await sleep(TYPE_ASK_MS);
        if (!active) return;
        setAskText(q.ask.slice(0, i));
      }
      // Pause between ask and SQL
      await waitWhilePaused();
      await sleep(600);
      if (!active) return;

      // Type SQL
      for (let i = 0; i <= q.sql.length; i++) {
        await waitWhilePaused();
        if (!active) return;
        await sleep(TYPE_SQL_MS);
        if (!active) return;
        setSqlText(q.sql.slice(0, i));
      }
      setPhase('compiled');

      // Hold, then advance — also pausable
      const holdEnd = Date.now() + HOLD_AFTER_SQL_MS;
      while (Date.now() < holdEnd && active) {
        await waitWhilePaused();
        if (!active) return;
        await sleep(120);
      }
      if (!active) return;
      setQIdx((idx) => (idx + 1) % QUERIES.length);
    };

    run();

    return () => { active = false; };
  }, [visible, qIdx]);

  const cycle = () => setQIdx((idx) => (idx + 1) % QUERIES.length);
  const q = QUERIES[qIdx];

  return (
    <div
      ref={ref}
      className="rounded-sm overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${fg}0a, ${fg}03)`,
        border: `1px solid ${hairline}`,
        borderTop: `1px solid ${accent}38`,
        boxShadow: `0 1px 0 ${accent}10, inset 0 1px 0 ${fg}05`,
        backdropFilter: 'blur(2px)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={cycle}
      role="button"
      tabIndex={0}
    >
      {/* Demo header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${hairline}` }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: accent, opacity: 0.6 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: muted, opacity: 0.3 }} />
            <span className="w-2 h-2 rounded-full" style={{ background: muted, opacity: 0.3 }} />
          </div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: muted,
          }}>
            Vantage · Vera · NL → SQL · live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: faint,
          }}>
            {qIdx + 1} / {QUERIES.length}
          </span>
          {paused && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: accent,
            }}>
              paused
            </span>
          )}
        </div>
      </div>

      {/* Ask line */}
      <div className="px-6 py-5">
        <div className="flex items-baseline gap-3 mb-2">
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: accent,
          }}>
            ask ›
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-spectral), Georgia, serif',
            fontVariationSettings: "'opsz' 144",
            fontSize: 'clamp(20px, 1.9vw, 26px)',
            lineHeight: 1.4,
            fontWeight: 400,
            color: fg,
            letterSpacing: '-0.012em',
            minHeight: '2.6em',
          }}
        >
          <span style={{ fontStyle: 'italic' }}>{askText}</span>
          {phase === 'asking' && (
            <span
              style={{
                display: 'inline-block',
                width: '0.5em',
                height: '1em',
                marginLeft: 2,
                background: accent,
                verticalAlign: 'text-bottom',
                animation: 'caret-blink 1s steps(2) infinite',
              }}
            />
          )}
        </div>
      </div>

      <div className="h-px mx-6" style={{ background: hairline }} />

      {/* SQL block */}
      <div className="px-6 py-5">
        <div className="flex items-baseline gap-3 mb-3">
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: muted,
          }}>
            sql ›
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: faint,
          }}>
            self-hosted · OpenSQL-7B
          </span>
        </div>
        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.7,
            color: muted,
            margin: 0,
            whiteSpace: 'pre-wrap',
            minHeight: '7em',
          }}
        >
          {sqlText.split('\n').map((line, i) => (
            <div key={i}>
              <span style={{ color: faint, marginRight: 14, userSelect: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ color: fg }}>{colorizeSQL(line, accent, muted, fg)}</span>
            </div>
          ))}
          {phase !== 'asking' && phase !== 'compiled' && (
            <span style={{ color: accent }}>▌</span>
          )}
        </pre>
      </div>

      <div className="h-px mx-6" style={{ background: hairline }} />

      {/* Result line */}
      <div className="px-6 py-3.5 flex items-center justify-between">
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: phase === 'compiled' ? accent : faint,
          transition: 'color 0.4s ease',
        }}>
          {phase === 'compiled' ? `↳ ${q.meta}` : 'compiling…'}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.25em',
          textTransform: 'uppercase', color: faint,
        }}>
          click to advance
        </span>
      </div>

      <style jsx>{`
        @keyframes caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Lightweight SQL syntax tinting — keywords italic in accent, the rest in muted.
function colorizeSQL(line: string, accent: string, muted: string, fg: string): React.ReactNode {
  const keywords = [
    'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'ON', 'ORDER BY', 'LIMIT', 'GROUP BY',
    'AS', 'IN', 'INTERVAL', 'now()'
  ];
  // Split keeping delimiters
  const parts: React.ReactNode[] = [];
  let remaining = line;
  let key = 0;
  while (remaining.length > 0) {
    let matched = false;
    for (const k of keywords) {
      if (remaining.toUpperCase().startsWith(k)) {
        parts.push(
          <span
            key={key++}
            style={{ fontStyle: 'italic', color: accent }}
          >
            {remaining.slice(0, k.length)}
          </span>
        );
        remaining = remaining.slice(k.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Take chars until next potential keyword or space
      let i = 1;
      while (i < remaining.length && /[A-Za-z0-9_]/.test(remaining[i]) === /[A-Za-z0-9_]/.test(remaining[0])) {
        i++;
      }
      parts.push(<span key={key++} style={{ color: fg }}>{remaining.slice(0, i)}</span>);
      remaining = remaining.slice(i);
    }
  }
  return <>{parts}</>;
}

/* ─────────────────────────────────────────────────────────────────────
   Figure — animated counter
   ───────────────────────────────────────────────────────────────────── */
export function Figure({
  value,
  prefix = '',
  suffix = '',
  duration = 1800,
  format,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const { ref, visible } = useInView<HTMLSpanElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    let raf: number;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);

  const rendered = format ? format(n) : n.toLocaleString();
  return (
    <span ref={ref}>
      {prefix}{rendered}{suffix}
    </span>
  );
}
