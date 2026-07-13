'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Facebook, MessageCircle, Users, Truck, CreditCard, GraduationCap, ArrowRight } from 'lucide-react';
import { useLanguage, Translation } from '../i18n';

type ServiceKey = Exclude<keyof Translation['services'], 'title' | 'subtitle'>;

const serviceItems: {
  icon: React.ElementType;
  key: ServiceKey;
  gradient: string;
}[] = [
  {
    icon: Facebook,
    key: 'facebookAds',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: MessageCircle,
    key: 'whatsappSales',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Users,
    key: 'customerAcquisition',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Truck,
    key: 'logistics',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: CreditCard,
    key: 'payment',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: GraduationCap,
    key: 'training',
    gradient: 'from-amber-500 to-yellow-600',
  },
];

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
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass-card glass-card-hover rounded-2xl p-6 lg:p-8 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                
                <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="relative text-xl font-semibold mb-3 text-foreground group-hover:text-primary-light transition-colors">
                  {serviceData.title}
                </h3>
                <p className="relative text-foreground-subtle leading-relaxed mb-6">
                  {serviceData.description}
                </p>

                <div className="relative flex items-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-sm font-semibold">了解更多</span>
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
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
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto click-scale"
          >
            <span>获取免费咨询</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
