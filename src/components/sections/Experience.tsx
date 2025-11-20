'use client';

import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import Card from '@/components/Card';
import contentConfig from '@/config/contentConfig';

export default function Experience() {
  return (
    <Section id="experience" background="default">
      <div className="section-container">
        <SectionHeader
          title="Experience"
          subtitle="My journey across major financial and technology firms, building audit automation and data analytics solutions."
        />

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-teal opacity-30" />

          {/* Experience Items */}
          <div className="space-y-12">
            {contentConfig.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 ${
                  index % 2 === 0 ? '' : 'md:grid-flow-dense'
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent-cyan shadow-glow-cyan z-10" />

                {/* Content Card */}
                <div className={index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}>
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
                          <span className="text-text-tertiary text-sm">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-text-tertiary text-sm">
                          {exp.location}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-text-secondary italic">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start text-text-secondary text-sm"
                          >
                            <svg
                              className="w-4 h-4 text-accent-cyan mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M9 5l7 7-7 7" />
                            </svg>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan text-xs font-medium rounded-full border border-accent-cyan/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Spacer for alternating layout */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`} />
              </motion.div>
            ))}
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
          <a
            href="#resume"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
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
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
