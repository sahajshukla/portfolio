'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

interface Connection {
  from: Node;
  to: Node;
}

interface NeuralNetworkBgProps {
  activeWordIndex?: number;
}

// Seeded random for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateNetwork() {
  const generatedNodes: Node[] = [];

  const layers = [
    { count: 4, x: 10 },
    { count: 6, x: 25 },
    { count: 5, x: 45 },
    { count: 6, x: 65 },
    { count: 4, x: 85 },
  ];

  let id = 0;
  layers.forEach((layer, layerIndex) => {
    const spacing = 80 / (layer.count + 1);
    for (let i = 0; i < layer.count; i++) {
      const seed = layerIndex * 100 + i;
      generatedNodes.push({
        id: id++,
        x: layer.x + (seededRandom(seed) - 0.5) * 6,
        y: spacing * (i + 1) + 10 + (seededRandom(seed + 50) - 0.5) * 4,
        size: 1.5 + seededRandom(seed + 100) * 1,
        delay: layerIndex * 0.15 + i * 0.05,
      });
    }
  });

  const generatedConnections: Connection[] = [];
  let prevLayerStart = 0;
  let prevLayerEnd = layers[0].count;

  for (let l = 1; l < layers.length; l++) {
    const currLayerStart = prevLayerEnd;
    const currLayerEnd = currLayerStart + layers[l].count;

    for (let i = currLayerStart; i < currLayerEnd; i++) {
      const seed = l * 1000 + i;
      const connectCount = 2;
      const connected = new Set<number>();

      for (let c = 0; c < connectCount; c++) {
        const targetIndex = prevLayerStart + Math.floor(seededRandom(seed + c * 10) * (prevLayerEnd - prevLayerStart));
        if (!connected.has(targetIndex)) {
          connected.add(targetIndex);
          generatedConnections.push({
            from: generatedNodes[targetIndex],
            to: generatedNodes[i],
          });
        }
      }
    }

    prevLayerStart = currLayerStart;
    prevLayerEnd = currLayerEnd;
  }

  return { nodes: generatedNodes, connections: generatedConnections };
}

// Pre-generate on module load for consistency
const networkData = generateNetwork();

export default function NeuralNetworkBg({ activeWordIndex = 0 }: NeuralNetworkBgProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { nodes, connections } = networkData;

  // Pulse intensity based on word changes
  const pulseKey = activeWordIndex;

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0, 217, 255, 0.05)" />
            <stop offset="50%" stopColor="rgba(0, 217, 255, 0.15)" />
            <stop offset="100%" stopColor="rgba(0, 217, 255, 0.05)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        <g className="connections">
          {connections.map((conn, i) => (
            <motion.line
              key={`conn-${i}`}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke="url(#connectionGradient)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{
                duration: 1.5,
                delay: conn.from.delay + 0.5,
                ease: 'easeOut',
              }}
            />
          ))}
        </g>

        {/* Data flow animation along connections */}
        {connections.slice(0, 6).map((conn, i) => (
          <motion.circle
            key={`flow-${i}-${pulseKey}`}
            r="0.3"
            fill="#00d9ff"
            initial={{
              cx: conn.from.x,
              cy: conn.from.y,
              opacity: 0
            }}
            animate={{
              cx: [conn.from.x, conn.to.x],
              cy: [conn.from.y, conn.to.y],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.5 + 1.5,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Nodes */}
        <g className="nodes">
          {nodes.map((node) => (
            <motion.g key={node.id}>
              {/* Outer glow - very subtle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size * 1.5}
                fill="rgba(0, 217, 255, 0.05)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 4,
                  delay: node.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              {/* Core node */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                fill="#00d9ff"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: node.delay,
                  ease: 'backOut',
                }}
              />
            </motion.g>
          ))}
        </g>

        {/* Pulse wave on word change - very subtle */}
        <motion.circle
          key={`pulse-${pulseKey}`}
          cx="50"
          cy="50"
          r="5"
          fill="none"
          stroke="rgba(0, 217, 255, 0.15)"
          strokeWidth="0.2"
          initial={{ r: 5, opacity: 0.3 }}
          animate={{ r: 60, opacity: 0 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}
