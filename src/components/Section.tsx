'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  background?: 'default' | 'elevated' | 'transparent';
}

export default function Section({
  id,
  children,
  className = '',
  delay = 0,
  background = 'default',
}: SectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const backgroundClasses = {
    default: 'bg-background',
    elevated: 'bg-background-surface',
    transparent: 'bg-transparent',
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative py-16 md:py-24 ${backgroundClasses[background]} ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-section md:text-section-desktop font-bold gradient-text mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-text-secondary max-w-3xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
