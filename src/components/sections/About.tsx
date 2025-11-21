'use client';

import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import GitHubStats from '@/components/GitHubStats';
import GitHubCalendar from '@/components/GitHubCalendar';
import contentConfig from '@/config/contentConfig';

export default function About() {
  return (
    <Section id="about" background="elevated">
      <div className="section-container">
        <SectionHeader
          title={contentConfig.about.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {contentConfig.about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-text-secondary text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Highlights Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6 lg:sticky lg:top-24"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-6">
                Quick Facts
              </h3>
              <ul className="space-y-4">
                {contentConfig.about.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <svg
                      className="w-5 h-5 text-accent-cyan mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {highlight}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Education */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-text-primary font-medium text-sm">
                      MS Business Intelligence & Analytics
                    </p>
                    <p className="text-text-tertiary text-xs mt-1">
                      Stevens Institute of Technology
                    </p>
                  </div>
                  <div>
                    <p className="text-text-primary font-medium text-sm">
                      BE Electronics & Telecommunication
                    </p>
                    <p className="text-text-tertiary text-xs mt-1">
                      University of Mumbai
                    </p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Interests
                </h4>
                <div className="flex flex-wrap gap-2">
                  {['Probability Theory', 'Information Theory', 'Statistics', 'Creative Writing', 'Music', 'Mechanical Watches'].map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 text-text-secondary text-xs rounded-full transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* GitHub Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Open Source Contributions
            </h3>
            <p className="text-text-tertiary text-sm">
              Real-time activity from{' '}
              <a
                href="https://github.com/sahajshukla"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                @sahajshukla
              </a>
            </p>
          </div>

          <GitHubStats username="sahajshukla" />

          <div className="glass rounded-xl p-6">
            <GitHubCalendar username="sahajshukla" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
