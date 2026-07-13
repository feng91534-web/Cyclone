'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../i18n';

const worldMapPath = (
  <svg viewBox="0 0 1000 500" className="w-full h-auto">
    <defs>
      <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path
      d="M120,180 Q140,160 160,170 L200,160 Q220,150 240,160 L280,170 Q300,180 320,170 L360,160 Q380,150 400,160 L440,170 Q460,180 480,170 L520,160 Q540,150 560,160 L600,170 Q620,180 640,170 L680,160 Q700,150 720,160 L760,170 Q780,180 800,170 L840,160 Q860,150 880,160"
      fill="none"
      stroke="url(#mapGradient)"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <path
      d="M100,200 L140,190 L180,200 L220,190 L260,200 L300,190 L340,200 L380,190 L420,200 L460,190 L500,200 L540,190 L580,200 L620,190 L660,200 L700,190 L740,200 L780,190 L820,200 L860,190 L900,200"
      fill="none"
      stroke="url(#mapGradient)"
      strokeWidth="1"
      opacity="0.2"
    />
    <path
      d="M200,100 Q220,80 240,90 L280,80 Q300,70 320,80"
      fill="none"
      stroke="#6366f1"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M500,80 Q520,60 540,70 L580,60 Q600,50 620,60"
      fill="none"
      stroke="#6366f1"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M700,100 Q720,80 740,90 L780,80 Q800,70 820,80"
      fill="none"
      stroke="#6366f1"
      strokeWidth="1.5"
      opacity="0.4"
    />
    <path
      d="M150,250 Q170,230 190,240 L230,230 Q250,220 270,230"
      fill="none"
      stroke="#8b5cf6"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <path
      d="M450,250 Q470,230 490,240 L530,230 Q550,220 570,230"
      fill="none"
      stroke="#8b5cf6"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <path
      d="M750,250 Q770,230 790,240 L830,230 Q850,220 870,230"
      fill="none"
      stroke="#8b5cf6"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <path
      d="M300,300 L350,280 L400,300 L450,280 L500,300"
      fill="none"
      stroke="#ec4899"
      strokeWidth="1"
      opacity="0.2"
    />
    <path
      d="M600,300 L650,280 L700,300 L750,280 L800,300"
      fill="none"
      stroke="#ec4899"
      strokeWidth="1"
      opacity="0.2"
    />
    <ellipse cx="350" cy="200" rx="80" ry="50" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="550" cy="200" rx="100" ry="60" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="750" cy="200" rx="90" ry="55" fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.4" />
    <ellipse cx="200" cy="220" rx="50" ry="40" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
    <ellipse cx="850" cy="220" rx="40" ry="35" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
  </svg>
);

const locations = [
  { nameZh: '中国', nameEn: 'China', x: 18, y: 40, clients: 500 },
  { nameZh: '美国', nameEn: 'USA', x: 75, y: 36, clients: 350 },
  { nameZh: '德国', nameEn: 'Germany', x: 48, y: 32, clients: 200 },
  { nameZh: '英国', nameEn: 'UK', x: 44, y: 30, clients: 180 },
  { nameZh: '日本', nameEn: 'Japan', x: 88, y: 38, clients: 150 },
  { nameZh: '澳大利亚', nameEn: 'Australia', x: 80, y: 70, clients: 120 },
  { nameZh: '巴西', nameEn: 'Brazil', x: 32, y: 64, clients: 100 },
  { nameZh: '印度', nameEn: 'India', x: 58, y: 46, clients: 90 },
];

const regions = [
  { labelZh: '北美', labelEn: 'North America', value: '35%' },
  { labelZh: '欧洲', labelEn: 'Europe', value: '28%' },
  { labelZh: '亚太', labelEn: 'Asia Pacific', value: '25%' },
  { labelZh: '其他', labelEn: 'Others', value: '12%' },
];

export default function WorldMap() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="map" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.map.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.map.subtitle}
          </p>
        </motion.div>

        <div className="relative h-80 sm:h-96 lg:h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-5xl"
            >
              {worldMapPath}
            </motion.div>
          </div>

          {locations.map((location, index) => (
            <motion.div
              key={location.nameEn}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
                className="w-6 h-6 bg-primary rounded-full"
              />
              <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 glass px-3 py-1 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                <div className="text-sm font-medium">{locale === 'zh' ? location.nameZh : location.nameEn}</div>
                <div className="text-xs text-muted-foreground">{location.clients} {locale === 'zh' ? '客户' : 'clients'}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6"
        >
          {regions.map((stat) => (
            <div key={stat.labelEn} className="text-center glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{locale === 'zh' ? stat.labelZh : stat.labelEn}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
