'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Facebook, MessageCircle, Users, Truck, CreditCard, GraduationCap, 
  ArrowRight, Sparkles, Zap, Target, Globe2, Package, Wallet, BookOpen 
} from 'lucide-react';
import { useLanguage } from '../i18n';

const serviceItems = [
  {
    icon: Facebook,
    premiumIcon: Target,
    title: 'Facebook Ads',
    subtitle: '精准获客',
    description: '专业的Facebook广告投放策略，帮您在全球市场精准找到目标客户，实现高效获客。',
    stats: { value: '500+', label: '成功案例' },
    gradient: 'from-primary/20 to-accent/10',
    borderColor: 'border-primary/20',
  },
  {
    icon: MessageCircle,
    premiumIcon: Zap,
    title: 'WhatsApp营销',
    subtitle: '高效转化',
    description: '通过WhatsApp建立深度客户关系，专业的话术培训和自动化工具提升转化率。',
    stats: { value: '85%', label: '回复率' },
    gradient: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    icon: Users,
    premiumIcon: Globe2,
    title: '海外客户开发',
    subtitle: '全球布局',
    description: '利用AI技术和专业团队，在全球150+国家为您挖掘高质量海外客户资源。',
    stats: { value: '150+', label: '覆盖国家' },
    gradient: 'from-accent/20 to-rose-500/10',
    borderColor: 'border-accent/20',
  },
  {
    icon: Truck,
    premiumIcon: Package,
    title: '跨境物流',
    subtitle: '无忧配送',
    description: '整合全球优质物流资源，提供门到门一站式跨境物流解决方案。',
    stats: { value: '98%', label: '准时率' },
    gradient: 'from-orange-500/20 to-amber-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    icon: CreditCard,
    premiumIcon: Wallet,
    title: '国际支付',
    subtitle: '安全便捷',
    description: '多种国际支付渠道，支持多币种结算，资金安全有保障。',
    stats: { value: '30+', label: '支付方式' },
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: GraduationCap,
    premiumIcon: BookOpen,
    title: '外贸培训',
    subtitle: '能力提升',
    description: '实战派外贸导师授课，从入门到精通，打造专业外贸团队。',
    stats: { value: '2000+', label: '培训学员' },
    gradient: 'from-amber-500/20 to-yellow-500/10',
    borderColor: 'border-amber-500/20',
  },
];

function ServiceCard({ service, index }: { 
  service: typeof serviceItems[0]; 
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        className={`relative h-full rounded-2xl p-8 overflow-hidden border transition-all duration-500 ${service.borderColor}`}
        animate={{
          backgroundColor: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(15,15,22,0.6)',
          backdropFilter: isHovered ? 'blur(24px)' : 'blur(16px)',
          borderColor: isHovered ? 'rgba(99,102,241,0.4)' : service.borderColor,
          boxShadow: isHovered 
            ? '0 0 60px rgba(99,102,241,0.1), inset 0 0 60px rgba(99,102,241,0.02)' 
            : '0 4px 24px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"
          animate={{
            scale: isHovered ? 2 : 1,
            opacity: isHovered ? 1 : 0.5,
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />

        <div className="relative">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient.replace('/20', '/30').replace('/10', '/20')} flex items-center justify-center mb-6 border border-white/5`}
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 3 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <service.icon className="w-7 h-7 text-white/90" />
          </motion.div>

          <motion.div
            className="absolute -top-3 -right-3"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? [0, 1.2, 1] : 0,
              rotate: isHovered ? 0 : -45,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </motion.div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-medium text-primary/70 tracking-wider uppercase">
              {service.subtitle}
            </span>
            <div className="w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-primary-light transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-foreground-subtle text-sm leading-relaxed mb-6">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gradient">{service.stats.value}</span>
              <span className="text-xs text-foreground-subtle">{service.stats.label}</span>
            </div>
            
            <motion.div
              className="flex items-center gap-2 text-primary text-sm font-medium"
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 8,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span>了解更多</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
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
    <section id="services" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-background-layer" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block glass-light px-5 py-2.5 rounded-full text-sm text-primary tracking-wider uppercase mb-6"
          >
            {t.services.subtitle}
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight font-display">
            <span className="text-white">一站式</span>
            <br className="hidden sm:block" />
            <span className="text-gradient">全球增长解决方案</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
            从获客到成交，从物流到结算，NZFK为您提供全链路外贸服务，让全球生意更简单
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {serviceItems.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-primary text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center space-x-3 mx-auto click-scale glow-border"
          >
            <span>立即免费咨询</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}