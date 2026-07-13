'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowRight, Play, Zap, Globe, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
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
    const colors = ['#6366f1', '#a855f7', '#ec4899', '#8b5cf6', '#c084fc'];
    const generatedParticles: Particle[] = [...Array(50)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.01 + 0.005,
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
        };
        setTrail((prev) => [...prev.slice(-15), newPoint]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const mouseXPercent = useTransform(mouseX, (val) => `${val * 100}%`);
  const mouseYPercent = useTransform(mouseY, (val) => `${val * 100}%`);

  const layer1X = useTransform(mouseX, [0, 1], [-20, 20]);
  const layer1Y = useTransform(mouseY, [0, 1], [-20, 20]);

  const layer2X = useTransform(mouseX, [0, 1], [-40, 40]);
  const layer2Y = useTransform(mouseY, [0, 1], [-40, 40]);

  const layer3X = useTransform(mouseX, [0, 1], [-60, 60]);
  const layer3Y = useTransform(mouseY, [0, 1], [-60, 60]);

  const layer4X = useTransform(mouseX, [0, 1], [-80, 80]);
  const layer4Y = useTransform(mouseY, [0, 1], [-80, 80]);

  const layer5X = useTransform(mouseX, [0, 1], [-100, 100]);
  const layer5Y = useTransform(mouseY, [0, 1], [-100, 100]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-none"
    >
      <div className="absolute inset-0 bg-background" />

      <motion.div
        className="absolute inset-0"
        style={{ x: layer1X, y: layer1Y }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer2X, y: layer2Y }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            }}
            animate={{
              x: [0, Math.sin(particle.id) * 50, 0],
              y: [0, Math.cos(particle.id) * 30, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: 5 + particle.id * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer3X, y: layer3Y }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="mapGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path d="M8,30 Q20,25 35,30 Q50,35 65,30 Q80,25 95,30" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="0.15" filter="url(#mapGlow)"/>
          <path d="M5,45 Q18,40 33,45 Q48,50 63,45 Q78,40 95,45" fill="none" stroke="rgba(168,85,247,0.25)" strokeWidth="0.15" filter="url(#mapGlow)"/>
          <path d="M8,60 Q22,55 38,60 Q54,65 70,60 Q86,55 95,60" fill="none" stroke="rgba(236,72,153,0.2)" strokeWidth="0.15" filter="url(#mapGlow)"/>
          <ellipse cx="20" cy="35" rx="10" ry="6" fill="none" stroke="rgba(99,102,241,0.25)" strokeWidth="0.1"/>
          <ellipse cx="48" cy="42" rx="18" ry="10" fill="none" stroke="rgba(168,85,247,0.2)" strokeWidth="0.1"/>
          <ellipse cx="72" cy="38" rx="14" ry="8" fill="none" stroke="rgba(236,72,153,0.18)" strokeWidth="0.1"/>
          <ellipse cx="88" cy="48" rx="8" ry="5" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="0.1"/>
          <circle cx="22" cy="33" r="0.3" fill="rgba(99,102,241,0.4)" className="animate-pulse"/>
          <circle cx="50" cy="40" r="0.4" fill="rgba(168,85,247,0.4)" className="animate-pulse" style={{ animationDelay: '0.5s' }}/>
          <circle cx="74" cy="36" r="0.3" fill="rgba(236,72,153,0.4)" className="animate-pulse" style={{ animationDelay: '1s' }}/>
          <circle cx="90" cy="46" r="0.25" fill="rgba(99,102,241,0.35)" className="animate-pulse" style={{ animationDelay: '1.5s' }}/>
          <circle cx="38" cy="52" r="0.25" fill="rgba(168,85,247,0.3)" className="animate-pulse" style={{ animationDelay: '0.8s' }}/>
          <circle cx="60" cy="58" r="0.25" fill="rgba(236,72,153,0.3)" className="animate-pulse" style={{ animationDelay: '1.2s' }}/>
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer4X, y: layer4Y }}
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-500/3 rounded-full blur-[150px]" />
        <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[80px] animate-pulse-glow" />
        <div className="absolute bottom-32 right-32 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[90px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-light px-4 py-2 rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-subtle">{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="text-5xl sm:text-6xl lg:text-8xl xl:text-[8rem] font-bold tracking-tighter font-display mb-6"
          >
            <span className="text-gradient">NZFK</span>
            <br />
            <span className="text-white">Global Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-foreground-subtle max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 glow-border"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 hover:border-primary/30 transition-all"
            >
              <Play className="w-5 h-5" />
              <span>{t.hero.secondaryCta}</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Globe, value: '150+', label: t.hero.stats.countries },
              { icon: Users, value: '2000+', label: t.hero.stats.clients },
              { icon: TrendingUp, value: '300%', label: t.hero.stats.revenue },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                className="glass-card glass-card-hover rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-foreground-subtle">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${point.x}%`,
            top: `${point.y}%`,
            width: 8 + index * 0.5,
            height: 8 + index * 0.5,
            opacity: (index + 1) / trail.length * 0.5,
            background: 'radial-gradient(circle, rgba(99,102,241,0.9) 0%, rgba(168,85,247,0.5) 50%, transparent 70%)',
            boxShadow: `0 0 ${10 + index}px rgba(99,102,241,0.5), 0 0 ${20 + index * 2}px rgba(168,85,247,0.3)`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0.5, 1.2], opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      ))}

      <motion.div
        className="absolute w-5 h-5 rounded-full pointer-events-none z-50"
        style={{
          left: mouseXPercent,
          top: mouseYPercent,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 12px rgba(255,255,255,0.9), 0 0 24px rgba(99,102,241,0.7), 0 0 40px rgba(168,85,247,0.4)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 28 }}
      />

      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          left: mouseXPercent,
          top: mouseYPercent,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 25 }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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