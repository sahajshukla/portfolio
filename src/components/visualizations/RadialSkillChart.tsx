'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface RadialSkillChartProps {
  categories: SkillCategory[];
}

const COLORS = [
  { main: '#00d9ff', glow: 'rgba(0, 217, 255, 0.3)' },   // Cyan
  { main: '#a855f7', glow: 'rgba(168, 85, 247, 0.3)' },  // Purple
  { main: '#14b8a6', glow: 'rgba(20, 184, 166, 0.3)' },  // Teal
  { main: '#f472b6', glow: 'rgba(244, 114, 182, 0.3)' }, // Pink
  { main: '#fbbf24', glow: 'rgba(251, 191, 36, 0.3)' },  // Amber
  { main: '#60a5fa', glow: 'rgba(96, 165, 250, 0.3)' },  // Blue
];

export default function RadialSkillChart({ categories }: RadialSkillChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  // Stable hover handlers to prevent flickering
  const handleMouseEnter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const chartData = useMemo(() => {
    const total = categories.reduce((sum, cat) => sum + cat.skills.length, 0);
    let startAngle = -90; // Start from top

    return categories.map((category, index) => {
      const percentage = category.skills.length / total;
      const angle = percentage * 360;
      const endAngle = startAngle + angle;
      const midAngle = startAngle + angle / 2;

      const data = {
        ...category,
        startAngle,
        endAngle,
        midAngle,
        percentage,
        color: COLORS[index % COLORS.length],
        index,
      };

      startAngle = endAngle;
      return data;
    });
  }, [categories]);

  const createArcPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = 150 + outerR * Math.cos(startRad);
    const y1 = 150 + outerR * Math.sin(startRad);
    const x2 = 150 + outerR * Math.cos(endRad);
    const y2 = 150 + outerR * Math.sin(endRad);
    const x3 = 150 + innerR * Math.cos(endRad);
    const y3 = 150 + innerR * Math.sin(endRad);
    const x4 = 150 + innerR * Math.cos(startRad);
    const y4 = 150 + innerR * Math.sin(startRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  const getLabelPosition = (midAngle: number, radius: number) => {
    const rad = (midAngle * Math.PI) / 180;
    return {
      x: 150 + radius * Math.cos(rad),
      y: 150 + radius * Math.sin(rad),
    };
  };

  return (
    <div ref={ref} className="relative w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Chart */}
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
          <svg viewBox="0 0 300 300" className="w-full h-full">
            <defs>
              {chartData.map((segment) => (
                <filter
                  key={`glow-${segment.index}`}
                  id={`glow-filter-${segment.index}`}
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              ))}
            </defs>

            {/* Background ring */}
            <circle
              cx="150"
              cy="150"
              r="120"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="40"
            />

            {/* Segments */}
            {chartData.map((segment, i) => {
              const isActive = activeIndex === i;
              const innerR = 80;
              const outerR = 120;

              return (
                <g key={segment.name}>
                  {/* Invisible larger hit area for stable hover */}
                  <path
                    d={createArcPath(segment.startAngle, segment.endAngle, innerR - 10, outerR + 15)}
                    fill="transparent"
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={handleMouseLeave}
                  />

                  {/* Glow effect for active segment */}
                  <motion.path
                    d={createArcPath(segment.startAngle, segment.endAngle, innerR - 5, outerR + 8)}
                    fill={segment.color.glow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive ? 0.5 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* Main segment */}
                  <motion.path
                    d={createArcPath(segment.startAngle, segment.endAngle, innerR, outerR)}
                    fill={`${segment.color.main}${isActive ? '' : '40'}`}
                    stroke={segment.color.main}
                    strokeWidth={isActive ? 2 : 1}
                    initial={{ opacity: 0 }}
                    animate={inView ? {
                      opacity: 1,
                      transition: { duration: 0.5, delay: i * 0.1 }
                    } : {}}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: 'none' }}
                  />

                  {/* Segment icon indicator */}
                  {inView && (
                    <motion.circle
                      cx={getLabelPosition(segment.midAngle, 100).x}
                      cy={getLabelPosition(segment.midAngle, 100).y}
                      r={4}
                      fill={segment.color.main}
                      initial={{ scale: 0 }}
                      animate={{ scale: isActive ? 1.4 : 1 }}
                      transition={{ delay: inView ? 0.5 + i * 0.1 : 0, duration: 0.2 }}
                      style={{ pointerEvents: 'none' }}
                    />
                  )}
                </g>
              );
            })}

            {/* Center content */}
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <circle cx="150" cy="150" r="55" fill="rgba(10, 10, 15, 0.9)" />
              <circle
                cx="150"
                cy="150"
                r="55"
                fill="none"
                stroke="rgba(0, 217, 255, 0.3)"
                strokeWidth="1"
              />

              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <motion.g
                    key={activeIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <text
                      x="150"
                      y="145"
                      textAnchor="middle"
                      fill={chartData[activeIndex].color.main}
                      fontSize="24"
                      fontWeight="bold"
                    >
                      {chartData[activeIndex].skills.length}
                    </text>
                    <text
                      x="150"
                      y="165"
                      textAnchor="middle"
                      fill="#a0a0b0"
                      fontSize="10"
                    >
                      skills
                    </text>
                  </motion.g>
                ) : (
                  <motion.g
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <text
                      x="150"
                      y="140"
                      textAnchor="middle"
                      fill="#00d9ff"
                      fontSize="11"
                      fontWeight="600"
                    >
                      CORE
                    </text>
                    <text
                      x="150"
                      y="158"
                      textAnchor="middle"
                      fill="#f0f0f5"
                      fontSize="11"
                      fontWeight="600"
                    >
                      EXPERTISE
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </motion.g>
          </svg>
        </div>

        {/* Legend and Skills Display */}
        <div className="flex-1 space-y-3 w-full lg:w-auto">
          {chartData.map((segment, i) => {
            const isActive = activeIndex === i;

            return (
              <motion.div
                key={segment.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-white/10 border-opacity-50'
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}
                style={{
                  borderColor: isActive ? segment.color.main : undefined,
                  boxShadow: isActive ? `0 0 20px ${segment.color.glow}` : undefined,
                }}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: segment.color.main }}
                    />
                    <span className={`text-sm font-medium ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {segment.name}
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono"
                    style={{ color: segment.color.main }}
                  >
                    {segment.skills.length} skills
                  </span>
                </div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                        {segment.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.03 }}
                            className="px-2 py-1 text-xs rounded-md bg-white/5 text-text-secondary hover:text-text-primary transition-colors"
                            style={{
                              borderLeft: `2px solid ${segment.color.main}`,
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
