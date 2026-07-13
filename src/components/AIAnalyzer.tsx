'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Sparkles, Search, TrendingUp, Globe, BarChart3, Zap, ArrowRight } from 'lucide-react';
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
    <section id="ai-analyzer" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow-accent opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 glass-light px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{locale === 'zh' ? 'AI驱动分析' : 'AI-Powered Analysis'}</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.aiAnalyzer.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            智能洞察全球市场趋势，把握最佳商机
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 lg:p-10 mb-8 lg:mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-subtle" />
              <input
                type="text"
                placeholder={locale === 'zh' ? '输入产品名称或行业关键词，例如：电子产品、服装、机械...' : 'Enter product name or industry keyword, e.g. electronics, clothing, machinery...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 click-scale"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{locale === 'zh' ? '全球市场趋势' : 'Global Market Trends'}</h3>
                <p className="text-sm text-foreground-subtle">{locale === 'zh' ? '实时市场数据' : 'Real-time market data'}</p>
              </div>
            </div>

            <div className="space-y-3">
              {marketData.map((item, index) => (
                <motion.div
                  key={item.regionEn}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-xl hover:bg-background/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-foreground-subtle group-hover:text-primary transition-colors" />
                    <span className="text-foreground group-hover:text-primary-light transition-colors">{locale === 'zh' ? item.regionZh : item.regionEn}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-foreground-subtle">{locale === 'zh' ? '热度' : 'Volume'}: {locale === 'zh' ? item.volumeZh : item.volumeEn}</span>
                    <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-success' : item.trend === 'down' ? 'text-red-500' : 'text-foreground-subtle'}`}>
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
            className="glass-card rounded-2xl p-6 lg:p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{locale === 'zh' ? 'AI智能建议' : 'AI Smart Recommendations'}</h3>
                <p className="text-sm text-foreground-subtle">{locale === 'zh' ? '基于数据分析的精准建议' : 'Data-driven insights'}</p>
              </div>
            </div>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <motion.div
                  key={tip.titleEn}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-background/50 rounded-xl hover:bg-background/80 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <tip.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1 group-hover:text-primary-light transition-colors">{locale === 'zh' ? tip.titleZh : tip.titleEn}</div>
                    <div className="text-sm text-foreground-subtle">{locale === 'zh' ? tip.descZh : tip.descEn}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

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
            <span>{locale === 'zh' ? '预约完整分析报告' : 'Get Full Analysis Report'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
