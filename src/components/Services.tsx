'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Facebook, MessageCircle, Users, Truck, CreditCard, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage, Translation } from '../i18n';

type ServiceKey = Exclude<keyof Translation['services'], 'title' | 'subtitle'>;

const serviceItems: {
  icon: React.ElementType;
  key: ServiceKey;
  gradient: string;
  bloomIcon: React.ElementType;
}[] = [
  {
    icon: Facebook,
    key: 'facebookAds',
    gradient: 'from-blue-500 to-indigo-600',
    bloomIcon: Sparkles,
  },
  {
    icon: MessageCircle,
    key: 'whatsappSales',
    gradient: 'from-green-500 to-emerald-600',
    bloomIcon: Sparkles,
  },
  {
    icon: Users,
    key: 'customerAcquisition',
    gradient: 'from-purple-500 to-pink-600',
    bloomIcon: Sparkles,
  },
  {
    icon: Truck,
    key: 'logistics',
    gradient: 'from-orange-500 to-red-600',
    bloomIcon: Sparkles,
  },
  {
    icon: CreditCard,
    key: 'payment',
    gradient: 'from-cyan-500 to-blue-600',
    bloomIcon: Sparkles,
  },
  {
    icon: GraduationCap,
    key: 'training',
    gradient: 'from-amber-500 to-yellow-600',
    bloomIcon: Sparkles,
  },
];

interface BloomParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

function ServiceCard({ service, serviceData, index }: { 
  service: typeof serviceItems[0]; 
  serviceData: { title: string; description: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<BloomParticle[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const newParticles: BloomParticle[] = [...Array(12)].map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: i * 0.05,
      color: Math.random() > 0.5 ? '#6366f1' : Math.random() > 0.5 ? '#a855f7' : '#ec4899',
    }));
    setParticles(newParticles);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTimeout(() => setParticles([]), 600);
  };

  return (
    <motion.div
      ref={cardRef}
      key={service.key}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
    >
      <motion.div
        className="glass-card rounded-2xl p-6 lg:p-8 relative overflow-hidden"
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(99, 102, 241, 0.25)' 
            : '0 4px 24px rgba(0, 0, 0, 0.4)',
          borderColor: isHovered ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.15)',
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), ${service.gradient.replace('from-', 'rgba(').replace('-500', ', 0.1)').replace(' to-', ', rgba(').replace('-600', ', 0.05)')})`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br rounded-full -translate-y-1/2 translate-x-1/2"
          style={{ background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` }}
          animate={{
            scale: isHovered ? 2 : 0.8,
            opacity: isHovered ? 0.15 : 0.05,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />

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
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isHovered ? [0, 1.5, 0] : 0,
              opacity: isHovered ? [0, 1, 0] : 0,
              y: isHovered ? -40 : 0,
              x: isHovered ? (Math.random() - 0.5) * 60 : 0,
            }}
            transition={{
              duration: 1.2,
              delay: particle.delay,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}

        <div className="relative">
          <motion.div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 relative overflow-hidden`}
            animate={{
              scale: isHovered ? 1.15 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <service.icon className="w-7 h-7 text-white relative z-10" />
          </motion.div>

          <motion.div
            className="absolute -top-2 -right-2 opacity-0"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? [0, 1.2, 1] : 0,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <service.bloomIcon className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          <h3 className="relative text-xl font-semibold mb-3 text-foreground">
            <motion.span
              animate={{
                color: isHovered ? '#818cf8' : '#fafafa',
              }}
              transition={{ duration: 0.3 }}
            >
              {serviceData.title}
            </motion.span>
          </h3>

          <p className="relative text-foreground-subtle leading-relaxed mb-6">
            {serviceData.description}
          </p>

          <motion.div
            className="relative flex items-center text-primary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-sm font-semibold">了解更多</span>
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <ArrowRight className="w-4 h-4 ml-2" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block glass-light px-4 py-2 rounded-full text-sm text-foreground-subtle mb-6"
          >
            {t.services.subtitle}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.services.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            一站式外贸增长解决方案，助力您的企业快速开拓全球市场
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceItems.map((service, index) => {
            const serviceData = t.services[service.key];
            return (
              <ServiceCard
                key={service.key}
                service={service}
                serviceData={serviceData}
                index={index}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto click-scale glow-border"
          >
            <span>获取免费咨询</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
