'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function Impact() {
  const metrics = [
    {
      value: 466,
      suffix: 'B+',
      prefix: '$',
      label: 'Financial Activity Analyzed',
      description: 'Fraud detection across journal entries',
    },
    {
      value: 200,
      suffix: '+',
      label: 'Concurrent Audits Tracked',
      description: 'Real-time monitoring dashboard',
    },
    {
      value: 65,
      suffix: '+',
      label: 'IT Controls Tested',
      description: 'SOX/ITGC compliance across 9 engagements',
    },
    {
      value: 40,
      suffix: '%',
      label: 'Latency Reduction',
      description: 'Redis caching optimization',
    },
    {
      value: 63,
      suffix: '%',
      label: 'Extraction Success Rate',
      description: 'Spark + Azure OpenAI pipeline',
    },
    {
      value: 35,
      suffix: '%',
      label: 'Manual Effort Reduced',
      description: 'Python automation workflows',
    },
  ];

  return (
    <Section id="impact" background="elevated">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Impact & Results
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Measurable outcomes from production systems and enterprise projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center hover:border-accent-cyan/30 transition-all duration-300 group"
            >
              <div className="mb-4">
                <div className="text-4xl md:text-5xl font-bold gradient-text">
                  <AnimatedCounter
                    to={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                    duration={2.5}
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">
                {metric.label}
              </h3>
              <p className="text-sm text-text-tertiary">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Context */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-text-tertiary text-sm">
            All metrics represent real production outcomes from BlackRock, Nomura, BDIPlus, and independent projects
          </p>
        </motion.div>
      </div>
    </Section>
  );
}
