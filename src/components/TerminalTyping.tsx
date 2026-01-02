'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statements = [
  { text: 'analyzed $466B+ in financial transactions', icon: '>' },
  { text: 'automated 65+ IT control tests', icon: '>' },
  { text: 'deployed LLM pipelines to production', icon: '>' },
  { text: 'reduced latency by 40% with Redis caching', icon: '>' },
  { text: 'built zero-trust audit platform', icon: '>' },
];

export default function TerminalTyping() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const currentStatement = statements[currentIndex];

  const typeText = useCallback((text: string, index: number) => {
    if (index <= text.length) {
      setDisplayText(text.slice(0, index));
      setTimeout(() => typeText(text, index + 1), 40 + Math.random() * 30);
    } else {
      setIsTyping(false);
      // Wait before switching to next statement
      setTimeout(() => {
        setIsTyping(true);
        setDisplayText('');
        setCurrentIndex((prev) => (prev + 1) % statements.length);
      }, 2500);
    }
  }, []);

  useEffect(() => {
    if (isTyping) {
      typeText(currentStatement.text, 0);
    }
  }, [currentIndex, isTyping, currentStatement.text, typeText]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.3 }}
      className="glass rounded-lg px-4 py-3 max-w-xl mx-auto mt-6 font-mono text-sm"
    >
      <div className="flex items-center space-x-2">
        {/* Terminal dots */}
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="text-text-tertiary text-xs ml-2">terminal</span>
      </div>

      <div className="mt-3 min-h-[24px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center"
          >
            <span className="text-accent-cyan mr-2">{currentStatement.icon}</span>
            <span className="text-text-secondary">{displayText}</span>
            <motion.span
              animate={{ opacity: showCursor ? 1 : 0 }}
              className="inline-block w-2 h-4 bg-accent-cyan ml-0.5"
              style={{ marginBottom: '-2px' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
