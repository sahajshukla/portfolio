'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glowColor?: string;
}

export default function Card({
  children,
  className = '',
  hover = true,
  delay = 0,
  glowColor = 'rgba(0, 217, 255, 0.15)',
}: CardProps) {
  const baseClasses = 'glass rounded-xl p-6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={hover ? {
        y: -4,
        boxShadow: `0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 30px ${glowColor}`,
        borderColor: 'rgba(0, 217, 255, 0.4)',
        transition: { duration: 0.2 }
      } : undefined}
      className={`${baseClasses} ${hover ? 'cursor-pointer border border-white/10' : ''} ${className}`}
      style={{
        transition: 'border-color 0.3s ease',
      }}
    >
      {children}
    </motion.div>
  );
}
