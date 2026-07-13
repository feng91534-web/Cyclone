'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../i18n';
import { useEffect, useState, useRef } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
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
  const [stars, setStars] = useState<Star[]>([]);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const generatedStars: Star[] = [...Array(80)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);

        const newPoint: TrailPoint = {
          id: trailIdRef.current++,
          x: (e.clientX - rect.left) / rect.width * 100,
          y: (e.clientY - rect.top) / rect.height * 100,
          opacity: 1,
        };
        setTrail((prev) => [...prev.slice(-12), newPoint]);
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

  const layer1X = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  const layer2X = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  const layer3X = useTransform(mouseX, [-0.5, 0.5], [-50, 50]);
  const layer3Y = useTransform(mouseY, [-0.5, 0.5], [-50, 50]);

  const layer4X = useTransform(mouseX, [-0.5, 0.5], [-70, 70]);
  const layer4Y = useTransform(mouseY, [-0.5, 0.5], [-70, 70]);

  const layer5X = useTransform(mouseX, [-0.5, 0.5], [-90, 90]);
  const layer5Y = useTransform(mouseY, [-0.5, 0.5], [-90, 90]);

  const layer6X = useTransform(mouseX, [-0.5, 0.5], [-110, 110]);
  const layer6Y = useTransform(mouseY, [-0.5, 0.5], [-110, 110]);

  const mouseXPercent = useTransform(mouseX, (val) => `${(val + 0.5) * 100}%`);
  const mouseYPercent = useTransform(mouseY, (val) => `${(val + 0.5) * 100}%`);

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
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity, star.opacity * 1.5, star.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer2X, y: layer2Y }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="mapGlow">
              <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M10,35 Q25,30 40,35 Q55,40 70,35 Q85,30 95,35"
            fill="none"
            stroke="rgba(99,102,241,0.15)"
            strokeWidth="0.2"
            filter="url(#mapGlow)"
          />
          <path
            d="M10,50 Q25,45 40,50 Q55,55 70,50 Q85,45 95,50"
            fill="none"
            stroke="rgba(168,85,247,0.12)"
            strokeWidth="0.2"
            filter="url(#mapGlow)"
          />
          <path
            d="M10,65 Q25,60 40,65 Q55,70 70,65 Q85,60 95,65"
            fill="none"
            stroke="rgba(236,72,153,0.1)"
            strokeWidth="0.2"
            filter="url(#mapGlow)"
          />
          <ellipse cx="20" cy="40" rx="8" ry="5" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="0.15" />
          <ellipse cx="45" cy="45" rx="15" ry="8" fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth="0.15" />
          <ellipse cx="68" cy="42" rx="12" ry="7" fill="none" stroke="rgba(236,72,153,0.15)" strokeWidth="0.15" />
          <ellipse cx="85" cy="50" rx="10" ry="6" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="0.15" />
          <circle cx="22" cy="38" r="0.4" fill="rgba(99,102,241,0.3)" />
          <circle cx="47" cy="43" r="0.5" fill="rgba(168,85,247,0.3)" />
          <circle cx="70" cy="40" r="0.4" fill="rgba(236,72,153,0.3)" />
          <circle cx="87" cy="48" r="0.3" fill="rgba(99,102,241,0.25)" />
          <circle cx="35" cy="55" r="0.3" fill="rgba(168,85,247,0.2)" />
          <circle cx="55" cy="60" r="0.3" fill="rgba(236,72,153,0.2)" />
          <circle cx="75" cy="55" r="0.3" fill="rgba(99,102,241,0.2)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ x: layer3X, y: layer3Y }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/6 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-rose-500/4 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: layer4X, y: layer4Y }}
      >
        <div className="glass-card glass-card-hover rounded-3xl p-12 lg:p-16 max-w-4xl mx-4">
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

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-foreground-subtle max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

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
        </div>
      </motion.div>

      <motion.div
        className="absolute flex flex-col items-center pointer-events-none"
        style={{ x: layer5X, y: layer5Y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tighter font-display mb-4">
            <span className="text-gradient">NZFK</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-foreground-subtle tracking-widest uppercase">
            Global Growth
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pointer-events-auto"
        style={{ x: layer6X, y: layer6Y }}
      >
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 click-scale glow-border"
        >
          <span>{t.hero.cta}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:border-primary/30 transition-all click-scale"
        >
          <Play className="w-5 h-5" />
          <span>{t.hero.secondaryCta}</span>
        </motion.button>
      </motion.div>

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
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