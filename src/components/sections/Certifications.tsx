'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';

export default function Certifications() {
  const certifications = [
    {
      name: 'Databricks Fundamentals Accreditation',
      issuer: 'Databricks Academy',
      date: 'November 2025',
      pdfUrl: '/certifications/databricks-fundamentals.pdf',
    },
    {
      name: 'Get Started with Databricks for Data Engineering',
      issuer: 'Databricks Academy',
      date: 'November 2025',
      pdfUrl: '/certifications/databricks-data-engineering.pdf',
    },
  ];

  return (
    <Section id="certifications" background="elevated">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Certifications
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Professional certifications and accreditations
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-full px-6 py-3 flex items-center gap-3 hover:border-accent-cyan/50 hover:bg-surface-light/80 transition-all duration-300 cursor-pointer">
                <svg
                  className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-text-primary group-hover:text-accent-cyan transition-colors duration-300">
                    {cert.name}
                  </span>
                  <span className="text-xs text-text-tertiary">
                    {cert.issuer} • {cert.date}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-text-tertiary group-hover:text-accent-cyan transition-colors duration-300 ml-2 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
