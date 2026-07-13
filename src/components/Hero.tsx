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
  duration: number;
  delay: number;
  opacity: number;
}

export default function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const layer1X = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);
  const layer2X = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);
  const layer3X = useTransform(mouseX, [-0.5, 0.5], [-70, 70]);
  const layer3Y = useTransform(mouseY, [-0.5, 0.5], [-70, 70]);
  const layer4X = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const layer4Y = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);
  const contentX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const contentY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-hero" />

      <motion.div
        className="absolute inset-0"
        style={{ x: layer1X, y: layer1Y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ x: layer2X, y: layer2Y }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ x: layer3X, y: layer3Y }}
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
              background: `radial-gradient(circle, rgba(99,102,241,${particle.opacity}) 0%, transparent 70%)`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, 20, 0],
              opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ x: layer4X, y: layer4Y }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <path
            d="M15,40 Q20,35 25,40 Q30,45 35,42 Q40,38 45,42 Q50,46 55,44 Q60,42 65,46 Q70,50 75,48 Q80,46 85,50"
            fill="none"
            stroke="rgba(99,102,241,0.3)"
            strokeWidth="0.1"
          />
          <path
            d="M10,50 Q15,48 20,52 Q25,56 30,54 Q35,52 40,56 Q45,60 50,58 Q55,56 60,60 Q65,64 70,62 Q75,60 80,64 Q85,68 90,66"
            fill="none"
            stroke="rgba(168,85,247,0.2)"
            strokeWidth="0.1"
          />
          <circle cx="25" cy="35" r="0.3" fill="rgba(99,102,241,0.4)" />
          <circle cx="45" cy="45" r="0.4" fill="rgba(168,85,247,0.4)" />
          <circle cx="65" cy="55" r="0.3" fill="rgba(99,102,241,0.4)" />
          <circle cx="80" cy="60" r="0.4" fill="rgba(168,85,247,0.4)" />
          <circle cx="35" cy="50" r="0.3" fill="rgba(99,102,241,0.3)" />
          <circle cx="55" cy="60" r="0.3" fill="rgba(168,85,247,0.3)" />
        </svg>
      </motion.div>

      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-rose-500/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        style={{ x: contentX, y: contentY }}
      >
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
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
          className="w-6 h-10 glass rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </motion.div>
      </motion.div>
    </section>
  );
}
