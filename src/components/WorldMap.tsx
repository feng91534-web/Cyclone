'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Globe, TrendingUp, Users, Zap } from 'lucide-react';

const locations = [
  { name: 'Guangzhou', country: 'China', x: 18, y: 40, clients: 500, deals: 1250, revenue: '$2.8M' },
  { name: 'New York', country: 'USA', x: 22, y: 34, clients: 350, deals: 890, revenue: '$1.9M' },
  { name: 'Berlin', country: 'Germany', x: 48, y: 32, clients: 200, deals: 520, revenue: '$1.2M' },
  { name: 'London', country: 'UK', x: 44, y: 30, clients: 180, deals: 460, revenue: '$1.1M' },
  { name: 'Tokyo', country: 'Japan', x: 88, y: 38, clients: 150, deals: 380, revenue: '$0.9M' },
  { name: 'Sydney', country: 'Australia', x: 80, y: 70, clients: 120, deals: 310, revenue: '$0.7M' },
  { name: 'Sao Paulo', country: 'Brazil', x: 32, y: 64, clients: 100, deals: 250, revenue: '$0.6M' },
  { name: 'Mumbai', country: 'India', x: 58, y: 46, clients: 90, deals: 220, revenue: '$0.5M' },
];

const regions = [
  { label: 'North America', value: 35, color: '#6366f1', growth: '+18%' },
  { label: 'Europe', value: 28, color: '#a855f7', growth: '+15%' },
  { label: 'Asia Pacific', value: 25, color: '#ec4899', growth: '+22%' },
  { label: 'Others', value: 12, color: '#f59e0b', growth: '+8%' },
];

export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  return (
    <section id="map" ref={ref} className="py-32 relative overflow-hidden">
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
            Global Network
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight font-display">
            <span className="text-white">覆盖</span>
            <span className="text-gradient">全球市场</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
            服务网络遍布全球150+国家和地区，助力您的企业开拓海外市场
          </p>
        </motion.div>

        <div className="relative h-80 sm:h-96 lg:h-[550px] mb-12">
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/5 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="xMidYMid slice">
              <defs>
                <filter id="mapGlow">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.06" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="100" height="50" fill="url(#oceanGradient)" />
              
              <path d="M5,15 Q12,12 20,14 L28,13 Q35,11 42,13 L50,14 Q58,16 65,14 L72,12 Q80,10 88,12" 
                fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="0.3" filter="url(#mapGlow)"/>
              <path d="M8,20 Q15,18 22,20 L30,19 Q38,17 45,19 L53,20 Q60,22 68,20 L75,18 Q83,16 90,18" 
                fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth="0.25" />
              <path d="M6,28 Q14,25 22,27 L30,26 Q38,24 46,26 L54,27 Q62,29 70,27 L78,25 Q86,23 94,25" 
                fill="none" stroke="rgba(236,72,153,0.15)" strokeWidth="0.25" />
              
              <ellipse cx="18" cy="18" rx="8" ry="5" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="0.2" />
              <ellipse cx="48" cy="16" rx="12" ry="7" fill="none" stroke="rgba(168,85,247,0.18)" strokeWidth="0.2" />
              <ellipse cx="75" cy="15" rx="10" ry="6" fill="none" stroke="rgba(236,72,153,0.15)" strokeWidth="0.2" />
              <ellipse cx="88" cy="19" rx="6" ry="4" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="0.2" />
              
              <ellipse cx="16" cy="35" rx="5" ry="8" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="0.18" />
              <ellipse cx="58" cy="32" rx="15" ry="10" fill="none" stroke="rgba(168,85,247,0.16)" strokeWidth="0.18" />
              <ellipse cx="82" cy="38" rx="8" ry="5" fill="none" stroke="rgba(236,72,153,0.14)" strokeWidth="0.18" />
              
              <ellipse cx="32" cy="42" rx="6" ry="4" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="0.15" />
              
              {locations.map((loc, i) => (
                <line 
                  key={`line-${i}`}
                  x1={loc.x} y1={loc.y} 
                  x2={18} y2={40} 
                  stroke="rgba(99,102,241,0.1)" 
                  strokeWidth="0.1" 
                  strokeDasharray="0.3 0.5"
                />
              ))}
            </svg>

            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => setActiveLocation(location.name)}
                onMouseLeave={() => setActiveLocation(null)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  activeLocation === location.name ? 'z-20' : ''
                }`}
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
              >
                <motion.div
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.25,
                  }}
                  className="w-6 h-6 rounded-full"
                  style={{ 
                    backgroundColor: '#6366f1',
                    boxShadow: `0 0 20px rgba(99,102,241,0.5)`
                  }}
                />
                
                <motion.div
                  animate={{
                    scale: activeLocation === location.name ? 1.3 : 1,
                    boxShadow: activeLocation === location.name 
                      ? '0 0 25px rgba(99,102,241,0.8)' 
                      : '0 0 15px rgba(99,102,241,0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />

                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ 
                    opacity: activeLocation === location.name ? 1 : 0, 
                    y: activeLocation === location.name ? 0 : 10,
                    scale: activeLocation === location.name ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
                >
                  <div className="glass-strong px-5 py-4 rounded-2xl min-w-[200px] border border-primary/20 shadow-xl shadow-primary/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white text-sm">{location.name}</h4>
                      <span className="text-xs text-foreground-subtle">{location.country}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-primary/60" />
                          <span className="text-xs text-foreground-subtle">Clients</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{location.clients}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-accent/60" />
                          <span className="text-xs text-foreground-subtle">Deals</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{location.deals}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-success/60" />
                          <span className="text-xs text-foreground-subtle">Revenue</span>
                        </div>
                        <span className="text-sm font-semibold text-gradient">{location.revenue}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            <div className="absolute bottom-4 left-4 glass-light px-4 py-2 rounded-full flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-xs text-foreground-subtle">150+ Countries</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
        >
          {regions.map((region, index) => (
            <motion.div
              key={region.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="relative rounded-2xl p-6 bg-black/30 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer group"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                style={{ backgroundColor: region.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
              />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-foreground-subtle group-hover:text-white transition-colors">
                  {region.label}
                </span>
                <span className="flex items-center text-xs text-success">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {region.growth}
                </span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-3xl lg:text-4xl font-bold text-white">{region.value}</span>
                <span className="text-sm text-foreground-subtle">%</span>
              </div>
              
              <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: region.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${region.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1.1 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-primary text-white px-10 py-5 rounded-2xl font-semibold text-lg flex items-center space-x-3 mx-auto click-scale glow-border"
          >
            <span>Expand Global Reach</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}