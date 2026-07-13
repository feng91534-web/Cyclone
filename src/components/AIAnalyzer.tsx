'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Search, TrendingUp, Globe, BarChart3, Zap } from 'lucide-react';
import { useLanguage } from '../i18n';

const marketData = [
  { regionZh: '北美市场', regionEn: 'North America', trend: 'up', growth: '+23.5%', volumeZh: '高', volumeEn: 'High' },
  { regionZh: '欧洲市场', regionEn: 'Europe', trend: 'up', growth: '+18.2%', volumeZh: '中高', volumeEn: 'Medium-High' },
  { regionZh: '东南亚市场', regionEn: 'Southeast Asia', trend: 'up', growth: '+35.8%', volumeZh: '高', volumeEn: 'High' },
  { regionZh: '南美市场', regionEn: 'South America', trend: 'stable', growth: '+5.2%', volumeZh: '中', volumeEn: 'Medium' },
  { regionZh: '中东市场', regionEn: 'Middle East', trend: 'up', growth: '+28.4%', volumeZh: '中高', volumeEn: 'Medium-High' },
];

const tips = [
  { icon: Zap, titleZh: '热门产品推荐', titleEn: 'Hot Products', descZh: '根据当前市场趋势，建议重点关注智能家居产品', descEn: 'Based on current market trends, focus on smart home products' },
  { icon: Globe, titleZh: '目标市场', titleEn: 'Target Markets', descZh: '东南亚市场增长最快，建议优先布局', descEn: 'Southeast Asia is growing fastest, prioritize this market' },
  { icon: TrendingUp, titleZh: '最佳投放时间', titleEn: 'Best Time', descZh: '建议在当地时间晚上8-10点进行广告投放', descEn: 'Suggested ad time: 8-10 PM local time' },
];

export default function AIAnalyzer() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <section id="ai-analyzer" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{locale === 'zh' ? 'AI驱动分析' : 'AI-Powered Analysis'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.aiAnalyzer.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.aiAnalyzer.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={locale === 'zh' ? '输入产品名称或行业关键词，例如：电子产品、服装、机械...' : 'Enter product name or industry keyword, e.g. electronics, clothing, machinery...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>{locale === 'zh' ? '分析中...' : 'Analyzing...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{locale === 'zh' ? '开始分析' : 'Start Analysis'}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">{locale === 'zh' ? '全球市场趋势' : 'Global Market Trends'}</h3>
            </div>

            <div className="space-y-4">
              {marketData.map((item, index) => (
                <motion.div
                  key={item.regionEn}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <span>{locale === 'zh' ? item.regionZh : item.regionEn}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{locale === 'zh' ? '热度' : 'Volume'}: {locale === 'zh' ? item.volumeZh : item.volumeEn}</span>
                    <span className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {item.growth}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{locale === 'zh' ? 'AI智能建议' : 'AI Smart Recommendations'}</h3>
            </div>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.titleEn}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{locale === 'zh' ? tip.titleZh : tip.titleEn}</div>
                    <div className="text-sm text-muted-foreground">{locale === 'zh' ? tip.descZh : tip.descEn}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
