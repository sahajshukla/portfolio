'use client';

import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import RadialSkillChart from '@/components/visualizations/RadialSkillChart';
import contentConfig from '@/config/contentConfig';

export default function Skills() {
  return (
    <Section id="skills" background="elevated">
      <div className="section-container">
        <SectionHeader
          title={contentConfig.skills.title}
          subtitle="A comprehensive skill set spanning audit, analytics, engineering, and cloud technologies."
        />

        {/* Radial Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <RadialSkillChart categories={contentConfig.skills.categories} />
        </motion.div>

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
