'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Facebook, MessageCircle, Users, Truck, CreditCard, GraduationCap } from 'lucide-react';
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
    <section id="services" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.services.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => {
            const serviceData = t.services[service.key];
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group glass rounded-2xl p-6 card-hover cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{serviceData.title}</h3>
                <p className="text-muted-foreground">
                  {serviceData.description}
                </p>

              <div className="mt-4 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">了解更多</span>
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
