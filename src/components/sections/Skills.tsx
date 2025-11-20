'use client';

import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import Card from '@/components/Card';
import contentConfig from '@/config/contentConfig';

const categoryIcons: Record<string, JSX.Element> = {
  'Audit, Risk & Compliance': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  'Data & Analytics': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  'Engineering & Systems': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  'Cloud & Infrastructure': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  'Security & Architecture': (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  ),
};

export default function Skills() {
  return (
    <Section id="skills" background="elevated">
      <div className="section-container">
        <SectionHeader
          title={contentConfig.skills.title}
          subtitle="A comprehensive skill set spanning audit, analytics, engineering, and cloud technologies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentConfig.skills.categories.map((category, index) => (
            <Card key={category.name} delay={index * 0.1}>
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                    {categoryIcons[category.name]}
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {category.name}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + skillIndex * 0.02,
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 bg-white/5 hover:bg-accent-cyan/10 hover:border-accent-cyan/30 border border-white/10 text-text-secondary hover:text-accent-cyan text-xs rounded-md transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Skills Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-text-tertiary text-sm">
            Always learning and expanding my skill set. Currently exploring LLM fine-tuning, vector databases, and advanced RAG architectures.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
