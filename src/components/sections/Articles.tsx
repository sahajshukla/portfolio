'use client';

import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import Card from '@/components/Card';
import contentConfig from '@/config/contentConfig';

export default function Articles() {
  return (
    <Section id="writing" background="elevated">
      <div className="section-container">
        <SectionHeader
          title="Writing"
          subtitle="Exploring the mathematical foundations of data science, statistics, and information theory."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentConfig.articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card hover={true} className="h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    {/* Medium Icon */}
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-white/5">
                        <svg
                          className="w-5 h-5 text-text-secondary"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                        </svg>
                      </div>
                      {article.readTime && (
                        <span className="text-text-tertiary text-xs">
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-text-primary leading-tight group-hover:text-accent-cyan transition-colors">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {article.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-text-tertiary text-xs">
                      {article.publishedDate}
                    </span>
                    <div className="flex items-center text-accent-cyan text-sm font-medium group">
                      <span className="mr-2">Read on Medium</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* More Writing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={contentConfig.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 glass hover:bg-white/10 text-text-primary font-medium rounded-lg transition-all"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
            </svg>
            View All Articles on Medium
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
