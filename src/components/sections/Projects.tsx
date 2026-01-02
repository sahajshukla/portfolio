'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section, { SectionHeader } from '@/components/Section';
import Card from '@/components/Card';
import TiltCard from '@/components/TiltCard';
import VantageArchitecture from '@/components/visualizations/VantageArchitecture';
import contentConfig from '@/config/contentConfig';

export default function Projects() {
  const featuredProject = contentConfig.projects.find((p) => p.featured);
  const otherProjects = contentConfig.projects.filter((p) => !p.featured);

  return (
    <Section id="projects" background="default">
      <div className="section-container">
        <SectionHeader
          title="Projects"
          subtitle="Building production-grade systems that solve real-world audit and data challenges."
        />

        {/* Featured Project - Vantage */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-accent-cyan/30 hover:border-accent-cyan/50 transition-all duration-300">
              {/* Featured Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="px-3 py-1 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full">
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    Featured Project
                  </span>
                </div>
                <svg
                  className="w-5 h-5 text-accent-cyan animate-pulse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left Column - Main Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src="/Vantage_logo_purple.png"
                          alt="Vantage AuditOS Logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                        {featuredProject.title}
                      </h3>
                    </div>
                    <p className="text-accent-cyan text-base sm:text-lg font-medium mb-4">
                      {featuredProject.tagline}
                    </p>
                    <p className="text-text-secondary text-base sm:text-lg leading-relaxed">
                      {featuredProject.description}
                    </p>
                  </div>

                  {/* Full Description */}
                  <div className="space-y-3">
                    {featuredProject.fullDescription.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-text-secondary text-sm leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-gradient-to-r from-accent-cyan/20 to-accent-purple/20 text-accent-cyan text-xs font-medium rounded-md border border-accent-cyan/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {featuredProject.githubUrl && (
                    <div className="flex gap-4">
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-accent-cyan text-background font-semibold rounded-lg hover:scale-105 transition-transform"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Visit Platform
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column - Highlights */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary mb-4 uppercase tracking-wider">
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {featuredProject.highlights.map((highlight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <div className="mr-3 mt-1">
                            <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-glow-cyan" />
                          </div>
                          <span className="text-text-secondary text-sm leading-relaxed">
                            {highlight}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Interactive Architecture Diagram */}
                  <div>
                    <h5 className="text-sm font-semibold text-text-primary mb-3 uppercase tracking-wider">
                      System Architecture
                    </h5>
                    <VantageArchitecture />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              Other Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <TiltCard key={project.id} tiltIntensity={8}>
                  <Card delay={index * 0.1}>
                    <div className="space-y-4">
                    <div>
                      <h4 className="text-xl font-bold text-text-primary mb-2">
                        {project.title}
                      </h4>
                      <p className="text-accent-cyan text-sm font-medium mb-3">
                        {project.tagline}
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed mb-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start text-text-secondary text-xs"
                        >
                          <svg
                            className="w-3 h-3 text-accent-cyan mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-white/5 text-text-tertiary text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    </div>
                  </Card>
                </TiltCard>
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
