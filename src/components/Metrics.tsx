'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Users, ShoppingCart, DollarSign, ArrowRight, Activity, BarChart3, Clock, Zap } from 'lucide-react';
import { useLanguage } from '../i18n';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  isActive?: boolean;
}

function Counter({ end, duration = 2, suffix = '', prefix = '', isActive = true }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    
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
  }, [end, duration, isActive]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const metricCards = [
  {
    icon: Users,
    label: 'Total Clients',
    value: 2847,
    change: '+18.5%',
    trend: 'up',
    color: 'primary',
  },
  {
    icon: DollarSign,
    label: 'Total Revenue',
    value: 12580000,
    suffix: '',
    prefix: '$',
    change: '+24.3%',
    trend: 'up',
    color: 'accent',
  },
  {
    icon: ShoppingCart,
    label: 'Monthly Leads',
    value: 12456,
    change: '+12.8%',
    trend: 'up',
    color: 'success',
  },
  {
    icon: Activity,
    label: 'Conversion Rate',
    value: 8,
    suffix: '%',
    change: '+3.2%',
    trend: 'up',
    color: 'warning',
  },
];

const revenueData = [
  { month: 'Jan', value: 65 },
  { month: 'Feb', value: 78 },
  { month: 'Mar', value: 82 },
  { month: 'Apr', value: 75 },
  { month: 'May', value: 90 },
  { month: 'Jun', value: 85 },
  { month: 'Jul', value: 95 },
  { month: 'Aug', value: 88 },
  { month: 'Sep', value: 100 },
  { month: 'Oct', value: 92 },
  { month: 'Nov', value: 98 },
  { month: 'Dec', value: 110 },
];

const topMarkets = [
  { name: 'United States', share: 32, color: '#6366f1' },
  { name: 'Germany', share: 18, color: '#a855f7' },
  { name: 'United Kingdom', share: 15, color: '#ec4899' },
  { name: 'Australia', share: 12, color: '#f59e0b' },
  { name: 'Other', share: 23, color: '#374151' },
];

export default function Metrics() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCard, setActiveCard] = useState<string | null>(null);

  return (
    <section id="metrics" ref={ref} className="py-32 relative overflow-hidden">
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
            Analytics Dashboard
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight font-display">
            <span className="text-white">实时业务</span>
            <span className="text-gradient">数据看板</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
            追踪关键业务指标，洞察全球增长趋势，数据驱动决策
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8"
        >
          {metricCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setActiveCard(card.label)}
              onMouseLeave={() => setActiveCard(null)}
              className={`relative rounded-2xl p-6 lg:p-8 cursor-pointer border transition-all duration-500 ${
                activeCard === card.label 
                  ? 'bg-white/5 backdrop-blur-2xl border-primary/40 shadow-lg shadow-primary/10' 
                  : 'bg-black/30 backdrop-blur-xl border-white/5'
              }`}
            >
              <motion.div
                className={`absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 ${
                  card.color === 'primary' ? 'bg-primary/20' :
                  card.color === 'accent' ? 'bg-accent/20' :
                  card.color === 'success' ? 'bg-success/20' : 'bg-warning/20'
                }`}
                animate={{ scale: activeCard === card.label ? 1.5 : 1 }}
                transition={{ duration: 0.5 }}
              />
              
              <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                card.color === 'primary' ? 'bg-primary/10' :
                card.color === 'accent' ? 'bg-accent/10' :
                card.color === 'success' ? 'bg-success/10' : 'bg-warning/10'
              }`}>
                <card.icon className={`w-7 h-7 ${
                  card.color === 'primary' ? 'text-primary' :
                  card.color === 'accent' ? 'text-accent' :
                  card.color === 'success' ? 'text-success' : 'text-warning'
                }`} />
              </div>

              <div className="relative text-sm text-foreground-subtle mb-3 uppercase tracking-wider">{card.label}</div>
              <div className="relative text-4xl lg:text-5xl font-bold text-white mb-4">
                <Counter end={card.value} prefix={card.prefix} suffix={card.suffix} isActive={isInView} />
              </div>

              <div className="relative flex items-center text-sm">
                <TrendingUp className={`w-4 h-4 mr-1 ${card.trend === 'up' ? 'text-success' : 'text-red-400'}`} />
                <span className={`font-medium ${card.trend === 'up' ? 'text-success' : 'text-red-400'}`}>{card.change}</span>
                <span className="text-foreground-subtle ml-2">vs last month</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 glass-card rounded-3xl p-6 lg:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Revenue Growth</h3>
                <p className="text-sm text-foreground-subtle">Last 12 months</p>
              </div>
              <div className="flex items-center gap-4 text-sm mt-4 sm:mt-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span className="text-foreground-subtle">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <span className="text-foreground-subtle">Target</span>
                </div>
              </div>
            </div>

            <div className="h-48 flex items-end justify-between gap-3">
              {revenueData.map((data, index) => (
                <motion.div
                  key={data.month}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: `${Math.min(data.value, 100)}%`, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                  className="flex-1 relative group"
                >
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/60 via-accent/40 to-transparent rounded-t-xl" 
                    style={{ height: `${Math.min(data.value, 100)}%` }}
                  />
                  <motion.div
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary to-accent rounded-t-xl"
                    initial={{ height: 0 }}
                    whileInView={{ height: `${Math.min(data.value, 100)}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                    style={{ opacity: 0.6 }}
                  />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 glass-light px-2 py-1 rounded-lg text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    ${data.value}K
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-xs text-foreground-subtle">
              {revenueData.map((data) => (
                <span key={data.month}>{data.month}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card rounded-3xl p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Market Share</h3>
                <p className="text-sm text-foreground-subtle">By Region</p>
              </div>
              <BarChart3 className="w-5 h-5 text-foreground-subtle" />
            </div>

            <div className="space-y-4">
              {topMarkets.map((market, index) => (
                <motion.div
                  key={market.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground-subtle group-hover:text-white transition-colors">
                      {market.name}
                    </span>
                    <span className="text-sm font-semibold text-white">{market.share}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: market.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${market.share}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="glass-card rounded-3xl p-6 lg:p-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Real-time Performance</h3>
                <p className="text-sm text-foreground-subtle">Live metrics updating every 5 seconds</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-success font-medium">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Active Campaigns', value: '156', icon: Clock },
              { label: 'Pending Deals', value: '847', icon: ShoppingCart },
              { label: 'Avg Deal Size', value: '$12.8K', icon: DollarSign },
              { label: 'Win Rate', value: '68%', icon: Activity },
              { label: 'Avg Response', value: '2.3h', icon: Clock },
              { label: 'NPS Score', value: '82', icon: TrendingUp },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
              >
                <item.icon className="w-5 h-5 text-primary/60 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-xs text-foreground-subtle">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-primary text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center space-x-3 mx-auto click-scale glow-border"
          >
            <span>Access Full Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}