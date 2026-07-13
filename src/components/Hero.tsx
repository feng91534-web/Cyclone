'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  speed: number;
  color: string;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
    const generatedParticles: Particle[] = [...Array(40)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      speed: 0.02 + Math.random() * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);

        const newPoint: TrailPoint = {
          id: trailIdRef.current++,
          x: (e.clientX - rect.left) / rect.width * 100,
          y: (e.clientY - rect.top) / rect.height * 100,
          opacity: 1,
        };
        setTrail((prev) => [...prev.slice(-15), newPoint]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((point) => ({ ...point, opacity: point.opacity - 0.08 }))
          .filter((point) => point.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x;
          let newY = particle.y;

          const dx = mouseX.get() * 100 - particle.x;
          const dy = mouseY.get() * 100 - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150 && distance > 0) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            newX -= Math.cos(angle) * force * 3;
            newY -= Math.sin(angle) * force * 3;
          }

          newX += (particle.baseX - particle.x) * particle.speed;
          newY += (particle.baseY - particle.y) * particle.speed;

          return { ...particle, x: newX, y: newY };
        })
      );

      requestAnimationFrame(animateParticles);
    };

    const animationId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animationId);
  }, [mouseX, mouseY]);

  const layer1X = useTransform(mouseX, [0, 1], [-40, 40]);
  const layer1Y = useTransform(mouseY, [0, 1], [-40, 40]);
  const layer2X = useTransform(mouseX, [0, 1], [-60, 60]);
  const layer2Y = useTransform(mouseY, [0, 1], [-60, 60]);
  const layer3X = useTransform(mouseX, [0, 1], [-80, 80]);
  const layer3Y = useTransform(mouseY, [0, 1], [-80, 80]);
  const contentX = useTransform(mouseX, [0, 1], [-20, 20]);
  const contentY = useTransform(mouseY, [0, 1], [-20, 20]);

  const mouseXPercent = useTransform(mouseX, (val) => `${val * 100}%`);
  const mouseYPercent = useTransform(mouseY, (val) => `${val * 100}%`);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 bg-gradient-hero" />

      <motion.div
        className="absolute inset-0"
        style={{ x: layer1X, y: layer1Y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-15"
        style={{ x: layer2X, y: layer2Y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer3X, y: layer3Y }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M5,45 Q20,40 35,45 Q50,50 65,45 Q80,40 95,45"
            fill="none"
            stroke="rgba(99,102,241,0.25)"
            strokeWidth="0.15"
            filter="url(#lineGlow)"
          />
          <path
            d="M5,55 Q20,50 35,55 Q50,60 65,55 Q80,50 95,55"
            fill="none"
            stroke="rgba(168,85,247,0.2)"
            strokeWidth="0.15"
            filter="url(#lineGlow)"
          />
          <path
            d="M5,65 Q20,60 35,65 Q50,70 65,65 Q80,60 95,65"
            fill="none"
            stroke="rgba(236,72,153,0.15)"
            strokeWidth="0.15"
            filter="url(#lineGlow)"
          />
        </svg>
      </motion.div>

      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: 12,
            height: 12,
            opacity: point.opacity * 0.4,
            background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)',
            boxShadow: '0 0 20px rgba(99,102,241,0.6), 0 0 40px rgba(168,85,247,0.3)',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0.5, 1.5], opacity: [0.6, 0] }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="absolute w-64 h-64 rounded-full pointer-events-none"
        style={{
          left: mouseXPercent,
          top: mouseYPercent,
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 28 }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          left: mouseXPercent,
          top: mouseYPercent,
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      <motion.div
        className="absolute w-4 h-4 rounded-full pointer-events-none z-50"
        style={{
          left: mouseXPercent,
          top: mouseYPercent,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(99,102,241,0.6)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ x: contentX, y: contentY }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-foreground-subtle">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tighter font-display"
          >
            <span className="text-gradient">{t.hero.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl lg:text-2xl text-foreground-subtle max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 click-scale"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:border-primary/30 transition-all click-scale"
            >
              <Play className="w-5 h-5" />
              <span>{t.hero.secondaryCta}</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 sm:gap-12 max-w-2xl mx-auto"
          >
            {[
              { value: '2000+', label: t.hero.stats.clients },
              { value: '150+', label: t.hero.stats.countries },
              { value: '300%', label: t.hero.stats.revenue },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.15 }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-foreground-subtle">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 glass-light rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
