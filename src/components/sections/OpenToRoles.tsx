'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import contentConfig from '@/config/contentConfig';

export default function OpenToRoles() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section id="open-to-roles" background="default">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 via-accent-purple/20 to-accent-teal/20" />
            <div className="absolute inset-0 glass" />

            {/* Content */}
            <div className="relative p-8 md:p-12">
              {/* Status Indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 mb-6"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                  Actively Seeking Opportunities
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold gradient-text mb-4"
              >
                {contentConfig.openToRoles.title}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg text-text-secondary mb-8 leading-relaxed"
              >
                {contentConfig.openToRoles.description}
              </motion.p>

              {/* Roles Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  Target Roles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {contentConfig.openToRoles.roles.map((role, index) => (
                    <motion.div
                      key={role}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                      className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:border-accent-cyan/30 hover:bg-white/10 transition-all"
                    >
                      <svg
                        className="w-5 h-5 text-accent-cyan mr-3 flex-shrink-0"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-text-primary text-sm font-medium">
                        {role}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Value Props */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">
                  What I Bring to Your Team
                </h3>
                <ul className="space-y-3">
                  {contentConfig.openToRoles.valueProps.map((prop, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
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
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-text-secondary leading-relaxed">
                        {prop}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Visa Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="mb-8 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-accent-teal mr-3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary text-sm">
                    {contentConfig.personal.visaStatus}
                  </span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={scrollToContact}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  {contentConfig.openToRoles.ctaText}
                </motion.button>

                <motion.a
                  href={contentConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-8 py-4 glass hover:bg-white/10 text-text-primary text-center font-semibold rounded-lg transition-all flex items-center justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  View LinkedIn
                </motion.a>

                <motion.a
                  href="#resume"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-8 py-4 glass hover:bg-white/10 text-text-primary text-center font-semibold rounded-lg transition-all flex items-center justify-center"
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
                  Resume
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
