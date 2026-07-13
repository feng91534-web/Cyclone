'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | undefined;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const metricCards = [
  {
    icon: Users,
    labelZh: '今日访问',
    labelEn: 'Today\'s Visits',
    value: 12847,
    change: '+12.5%',
    iconBg: 'from-blue-500/20 to-indigo-500/20',
    iconColor: 'text-blue-400',
  },
  {
    icon: ShoppingCart,
    labelZh: '新客户线索',
    labelEn: 'New Leads',
    value: 324,
    change: '+8.3%',
    iconBg: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: DollarSign,
    labelZh: '成交金额',
    labelEn: 'Revenue',
    value: 895000,
    suffix: '',
    prefix: '¥',
    change: '+15.2%',
    iconBg: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: TrendingUp,
    labelZh: '转化率',
    labelEn: 'Conversion Rate',
    value: 6,
    suffix: '%',
    change: '+2.1%',
    iconBg: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-400',
  },
];

export default function Metrics() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [liveValues, setLiveValues] = useState(metricCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveValues(prev => prev.map(card => {
        const increment = Math.floor(Math.random() * 10);
        if (card.suffix === '%') {
          return card;
        }
        return {
          ...card,
          value: card.value + increment,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metrics" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-40" />
      
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
            {t.metrics.subtitle}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.metrics.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            实时追踪业务数据，洞察增长趋势
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {liveValues.map((card, index) => (
            <motion.div
              key={card.labelEn}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card glass-card-hover rounded-2xl p-6 lg:p-8 cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.iconBg} rounded-full -translate-y-1/2 translate-x-1/2 opacity-50`} />
              
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center mb-6 ${card.iconColor}`}>
                <card.icon className="w-6 h-6" />
              </div>

              <div className="relative text-sm text-foreground-subtle mb-3">{locale === 'zh' ? card.labelZh : card.labelEn}</div>
              <div className="relative text-3xl lg:text-4xl font-bold text-foreground mb-3">
                <Counter end={card.value} prefix={card.prefix} suffix={card.suffix} />
              </div>

              <div className="relative flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-success font-medium">{card.change}</span>
                <span className="text-foreground-subtle ml-2">{locale === 'zh' ? '较昨日' : 'vs Yesterday'}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 lg:mt-12"
        >
          <div className="glass-card rounded-3xl p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
              <div>
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">{locale === 'zh' ? '实时流量趋势' : 'Real-time Traffic Trend'}</h3>
                <p className="text-sm text-foreground-subtle">{locale === 'zh' ? '过去24小时数据' : 'Last 24 hours data'}</p>
              </div>
              <div className="flex items-center space-x-4 text-sm mt-4 lg:mt-0">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-primary rounded-full mr-2" />
                  {locale === 'zh' ? '今日' : 'Today'}
                </span>
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-accent/50 rounded-full mr-2" />
                  {locale === 'zh' ? '昨日' : 'Yesterday'}
                </span>
              </div>
            </div>

            <div className="h-40 lg:h-48 flex items-end justify-between gap-2 lg:gap-3">
              {[65, 78, 82, 75, 90, 85, 95, 88, 100, 92, 85, 80].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={isInView ? { height: `${height}%` } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-primary/80 to-accent/80 rounded-t-xl relative group"
                  style={{ opacity: 0.85 - index * 0.02 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-light px-2 py-1 rounded-lg text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-xs text-foreground-subtle">
              {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((time) => (
                <span key={time}>{time}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto click-scale"
          >
            <span>{locale === 'zh' ? '查看完整数据看板' : 'View Full Dashboard'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
