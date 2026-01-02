'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  connections: number[];
}

interface InteractiveParticlesProps {
  mousePosition: { x: number; y: number };
}

export default function InteractiveParticles({ mousePosition }: InteractiveParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (mousePosition.x / 100) * rect.width,
      y: (mousePosition.y / 100) * rect.height,
    };
  }, [mousePosition]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const gridSize = 80;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * gridSize + gridSize / 2;
        const y = j * gridSize + gridSize / 2;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1.5,
          alpha: 0.3 + Math.random() * 0.2,
          connections: [],
        });
      }
    }

    // Pre-compute nearby connections for each particle
    particles.forEach((p, i) => {
      particles.forEach((other, j) => {
        if (i !== j) {
          const dx = p.baseX - other.baseX;
          const dy = p.baseY - other.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < gridSize * 1.5) {
            p.connections.push(j);
          }
        }
      });
    });

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const interactionRadius = 150;
      const pushStrength = 50;

      particlesRef.current.forEach((particle, i) => {
        // Calculate distance from mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Push particles away from mouse
        if (dist < interactionRadius && dist > 0) {
          const force = (interactionRadius - dist) / interactionRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * pushStrength * 0.02;
          particle.vy -= Math.sin(angle) * force * pushStrength * 0.02;
        }

        // Spring back to base position
        const springStrength = 0.03;
        const dampening = 0.92;

        particle.vx += (particle.baseX - particle.x) * springStrength;
        particle.vy += (particle.baseY - particle.y) * springStrength;
        particle.vx *= dampening;
        particle.vy *= dampening;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw connections
        particle.connections.forEach((j) => {
          const other = particlesRef.current[j];
          if (j > i) { // Only draw once per pair
            const connDx = particle.x - other.x;
            const connDy = particle.y - other.y;
            const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

            if (connDist < 100) {
              const alpha = (1 - connDist / 100) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });

        // Draw particle
        const distFromBase = Math.sqrt(
          Math.pow(particle.x - particle.baseX, 2) +
          Math.pow(particle.y - particle.baseY, 2)
        );
        const glowIntensity = Math.min(distFromBase / 30, 1);

        // Outer glow when displaced
        if (glowIntensity > 0.1) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
          );
          gradient.addColorStop(0, `rgba(0, 217, 255, ${glowIntensity * 0.2})`);
          gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${particle.alpha + glowIntensity * 0.3})`;
        ctx.fill();
      });

      // Draw mouse glow effect
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, interactionRadius
        );
        gradient.addColorStop(0, 'rgba(0, 217, 255, 0.03)');
        gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, interactionRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mediaQuery.matches) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
