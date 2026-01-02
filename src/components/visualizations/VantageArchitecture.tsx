'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: string;
  description: string;
}

interface Connection {
  from: string;
  to: string;
  label?: string;
  bidirectional?: boolean;
}

const nodes: ArchNode[] = [
  {
    id: 'user',
    label: 'User Query',
    sublabel: 'Natural Language',
    x: 100,
    y: 35,
    color: '#00d9ff',
    description: 'Users input natural language audit queries like "Show all transactions over $1M from Q4"',
  },
  {
    id: 'frontend',
    label: 'Next.js Frontend',
    sublabel: 'React + TypeScript',
    x: 100,
    y: 95,
    color: '#00d9ff',
    description: 'Modern React frontend with real-time collaboration, audit trail logging, and responsive design',
  },
  {
    id: 'backend',
    label: 'FastAPI Backend',
    sublabel: 'Microservices',
    x: 100,
    y: 155,
    color: '#a855f7',
    description: 'Async Python backend handling authentication, workpaper generation, and evidence pipelines',
  },
  {
    id: 'llm',
    label: 'OpenSQL-7B',
    sublabel: 'Self-Hosted LLM',
    x: 220,
    y: 155,
    color: '#14b8a6',
    description: 'Self-hosted language model converting natural language queries to optimized SQL',
  },
  {
    id: 'database',
    label: 'PostgreSQL',
    sublabel: 'Audit Data Store',
    x: 100,
    y: 215,
    color: '#60a5fa',
    description: 'Relational database storing audit workpapers, evidence, control tests, and user data',
  },
  {
    id: 'security',
    label: 'AES-256',
    sublabel: 'Encryption Layer',
    x: 100,
    y: 275,
    color: '#fbbf24',
    description: 'Per-audit encryption keys, isolated key management, and zero-trust architecture principles',
  },
];

const connections: Connection[] = [
  { from: 'user', to: 'frontend' },
  { from: 'frontend', to: 'backend' },
  { from: 'backend', to: 'llm', label: 'NL Query', bidirectional: true },
  { from: 'backend', to: 'database' },
  { from: 'database', to: 'security' },
];

export default function VantageArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const getConnectionPath = (conn: Connection) => {
    const from = getNodeById(conn.from);
    const to = getNodeById(conn.to);
    if (!from || !to) return '';

    if (from.x === to.x) {
      // Vertical connection
      return `M ${from.x} ${from.y + 18} L ${to.x} ${to.y - 18}`;
    } else {
      // Horizontal connection (for LLM)
      return `M ${from.x + 45} ${from.y} L ${to.x - 45} ${to.y}`;
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* SVG Architecture Diagram */}
      <div className="relative w-full aspect-[300/320] max-w-[300px] mx-auto">
        <svg viewBox="0 0 300 320" className="w-full h-full">
          <defs>
            {/* Gradient for connections */}
            <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00d9ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrow marker */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#00d9ff" opacity="0.6" />
            </marker>
          </defs>

          {/* Connection lines */}
          {connections.map((conn, i) => (
            <motion.g key={`${conn.from}-${conn.to}`}>
              <motion.path
                d={getConnectionPath(conn)}
                fill="none"
                stroke="url(#connectionGrad)"
                strokeWidth="2"
                strokeDasharray="4 2"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
              />

              {/* Animated data packet */}
              {inView && (
                <motion.circle
                  r="3"
                  fill="#00d9ff"
                  filter="url(#nodeGlow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    offsetDistance: ['0%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + i * 0.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  style={{
                    offsetPath: `path("${getConnectionPath(conn)}")`,
                  }}
                />
              )}

              {/* Connection label */}
              {conn.label && (
                <motion.text
                  x={170}
                  y={145}
                  fill="#a0a0b0"
                  fontSize="8"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  {conn.label}
                </motion.text>
              )}
            </motion.g>
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id;

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Node glow on hover */}
                {isActive && (
                  <motion.rect
                    x={node.x - 47}
                    y={node.y - 19}
                    width={94}
                    height={38}
                    rx={6}
                    fill={`${node.color}15`}
                    stroke={node.color}
                    strokeWidth={1.5}
                    filter="url(#nodeGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Node background */}
                <rect
                  x={node.x - 43}
                  y={node.y - 15}
                  width={86}
                  height={30}
                  rx={5}
                  fill="rgba(18, 18, 24, 0.95)"
                  stroke={isActive ? node.color : `${node.color}50`}
                  strokeWidth={isActive ? 1.5 : 1}
                />

                {/* Color indicator */}
                <rect
                  x={node.x - 43}
                  y={node.y - 15}
                  width={3}
                  height={30}
                  rx={1.5}
                  fill={node.color}
                />

                {/* Node label */}
                <text
                  x={node.x + 2}
                  y={node.y - 2}
                  fill="#f0f0f5"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {node.label}
                </text>

                {/* Node sublabel */}
                <text
                  x={node.x + 2}
                  y={node.y + 9}
                  fill="#707080"
                  fontSize="7"
                  textAnchor="middle"
                >
                  {node.sublabel}
                </text>
              </motion.g>
            );
          })}

          {/* Zero-Trust Badge */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <rect
              x={175}
              y={260}
              width={80}
              height={22}
              rx={11}
              fill="rgba(251, 191, 36, 0.1)"
              stroke="#fbbf24"
              strokeWidth={1}
            />
            <circle cx={186} cy={271} r={3} fill="#fbbf24">
              <animate
                attributeName="opacity"
                values="1;0.4;1"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <text x={196} y={275} fill="#fbbf24" fontSize="8" fontWeight="600">
              Zero-Trust
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Description tooltip */}
      <motion.div
        className="mt-4 p-3 glass rounded-lg border border-white/10 min-h-[60px]"
        animate={{ borderColor: activeNode ? nodes.find(n => n.id === activeNode)?.color : 'rgba(255,255,255,0.1)' }}
      >
        {activeNode ? (
          <motion.div
            key={activeNode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm"
          >
            <span
              className="font-semibold"
              style={{ color: nodes.find(n => n.id === activeNode)?.color }}
            >
              {nodes.find(n => n.id === activeNode)?.label}:
            </span>
            <span className="text-text-secondary ml-2">
              {nodes.find(n => n.id === activeNode)?.description}
            </span>
          </motion.div>
        ) : (
          <p className="text-text-tertiary text-sm text-center">
            Hover over components to learn more about the architecture
          </p>
        )}
      </motion.div>
    </div>
  );
}
