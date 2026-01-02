'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Section, { SectionHeader } from '@/components/Section';
import Card from '@/components/Card';
import TiltCard from '@/components/TiltCard';
import MagneticButton from '@/components/MagneticButton';
import contentConfig from '@/config/contentConfig';

// Key metrics for each company
const companyMetrics: Record<string, { metric: string; label: string }> = {
  bdiplus: { metric: '40%', label: 'latency reduction' },
  nomura: { metric: '$466B', label: 'analyzed' },
  blackrock: { metric: '65+', label: 'controls tested' },
  elitefit: { metric: '93%', label: 'accuracy' },
  techconsulting: { metric: '88%', label: 'model accuracy' },
};

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Section id="experience" background="default">
      <div className="section-container">
        <SectionHeader
          title="Experience"
          subtitle="My journey across major financial and technology firms, building audit automation and data analytics solutions."
        />

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <motion.div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5"
            style={{
              background: 'linear-gradient(to bottom, #00d9ff, #a855f7, #14b8a6)',
            }}
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Experience Items */}
          <div className="space-y-12">
            {contentConfig.experience.map((exp, index) => {
              const metric = companyMetrics[exp.id];

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                    index % 2 === 0 ? '' : 'md:grid-flow-dense'
                  }`}
                >
                  {/* Timeline dot with hover metric */}
                  <div
                    className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 z-10"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <motion.div
                      className="relative cursor-pointer"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                      {/* Outer pulse ring */}
                      <motion.div
                        className="absolute inset-0 w-5 h-5 -m-0.5 rounded-full bg-accent-cyan/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      {/* Core dot */}
                      <div className="w-4 h-4 rounded-full bg-accent-cyan shadow-glow-cyan border-2 border-background" />
                    </motion.div>

                    {/* Metric popup */}
                    <AnimatePresence>
                      {hoveredIndex === index && metric && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 -top-16 glass px-4 py-2 rounded-lg whitespace-nowrap z-20"
                        >
                          <div className="text-center">
                            <div className="text-accent-cyan font-bold text-lg">{metric.metric}</div>
                            <div className="text-text-tertiary text-xs">{metric.label}</div>
                          </div>
                          {/* Arrow */}
                          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/10" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Card */}
                  <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}>
                    <TiltCard tiltIntensity={5}>
                      <Card hover={true} delay={0}>
                        <div className="space-y-4">
                          {/* Header */}
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                                {exp.title}
                              </h3>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                              <p className="text-accent-cyan font-semibold">
                                {exp.company}
                              </p>
                              <motion.span
                                className="text-text-tertiary text-sm px-3 py-1 bg-white/5 rounded-full"
                                whileHover={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}
                              >
                                {exp.period}
                              </motion.span>
                            </div>
                            <p className="text-text-tertiary text-sm flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {exp.location}
                            </p>
                          </div>

                          {/* Description */}
                          <p className="text-text-secondary italic border-l-2 border-accent-cyan/30 pl-3">
                            {exp.description}
                          </p>

                          {/* Achievements */}
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                className="flex items-start text-text-secondary text-sm group"
                              >
                                <svg
                                  className="w-4 h-4 text-accent-cyan mr-2 mt-0.5 flex-shrink-0 group-hover:text-accent-purple transition-colors"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="group-hover:text-text-primary transition-colors">{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="pt-4 border-t border-white/10">
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, i) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 + i * 0.03 }}
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'rgba(0, 217, 255, 0.2)',
                                  }}
                                  className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full border border-accent-cyan/20 cursor-default transition-colors"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </TiltCard>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <MagneticButton
            href="/resume.pdf"
            download="Sahaj_Shukla_Resume.pdf"
            strength={0.3}
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Resume
          </MagneticButton>
        </motion.div>
      </div>
    </Section>
  );
}
