'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
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
    color: 'text-blue-500',
  },
  {
    icon: ShoppingCart,
    labelZh: '新客户线索',
    labelEn: 'New Leads',
    value: 324,
    change: '+8.3%',
    color: 'text-green-500',
  },
  {
    icon: DollarSign,
    labelZh: '成交金额',
    labelEn: 'Revenue',
    value: 895000,
    suffix: '¥',
    change: '+15.2%',
    color: 'text-purple-500',
  },
  {
    icon: TrendingUp,
    labelZh: '转化率',
    labelEn: 'Conversion Rate',
    value: 6,
    suffix: '%',
    change: '+2.1%',
    color: 'text-orange-500',
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
    <section id="metrics" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.metrics.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.metrics.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {liveValues.map((card, index) => (
            <motion.div
              key={card.labelEn}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>

              <div className="text-sm text-muted-foreground mb-2">{locale === 'zh' ? card.labelZh : card.labelEn}</div>
              <div className="text-3xl font-bold mb-2">
                {card.suffix === '¥' ? (
                  <Counter end={card.value} prefix={card.suffix} />
                ) : (
                  <Counter end={card.value} suffix={card.suffix} />
                )}
              </div>

              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500">{card.change}</span>
                <span className="text-muted-foreground ml-2">{locale === 'zh' ? '较昨日' : 'vs Yesterday'}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{locale === 'zh' ? '实时流量趋势' : 'Real-time Traffic Trend'}</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2" />
                {locale === 'zh' ? '今日' : 'Today'}
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                {locale === 'zh' ? '昨日' : 'Yesterday'}
              </span>
            </div>
          </div>

          <div className="h-32 flex items-end justify-between gap-2">
            {[65, 78, 82, 75, 90, 85, 95, 88, 100, 92, 85, 80].map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${height}%` } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                className="flex-1 bg-gradient-to-t from-primary to-accent rounded-t-lg"
                style={{ opacity: 0.8 - index * 0.03 }}
              />
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map((time) => (
              <span key={time}>{time}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
