'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/Section';

export default function Companies() {
  const companies = [
    {
      name: 'BDIPlus',
      logo: '/companies/bdiplus_logo.jpeg',
      role: 'Software Engineer II',
    },
    {
      name: 'Nomura',
      logo: '/companies/nomura_logo.jpeg',
      role: 'Associate - Finance Audit & Data Analytics',
    },
    {
      name: 'BlackRock',
      logo: '/companies/blackrock_logo.jpeg',
      role: 'Analyst - Technology Audit',
    },
    {
      name: 'EliteFit AI',
      logo: '/companies/elitefit_ai_logo.jpeg',
      role: 'Backend Developer',
    },
    {
      name: 'Technical Consulting & Research',
      logo: '/companies/technical_consulting_and_research.jpeg',
      role: 'Business Intelligence Analyst Intern',
    },
  ];

  return (
    <Section id="companies" background="default">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            5+ years across major financial services and technology firms
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-xl p-6 flex flex-col items-center justify-center h-full hover:border-accent-cyan/30 transition-all duration-300">
                <div className="relative w-20 h-20 mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-text-primary text-center mb-1">
                  {company.name}
                </h3>
                <p className="text-xs text-text-tertiary text-center line-clamp-2">
                  {company.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
