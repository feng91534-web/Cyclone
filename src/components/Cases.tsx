'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, ArrowRight, Star, TrendingUp, Target, DollarSign } from 'lucide-react';
import { useLanguage } from '../i18n';

const cases = [
  {
    companyZh: '深圳某电子科技公司',
    companyEn: 'Shenzhen Electronics Tech',
    industryZh: '电子产品',
    industryEn: 'Electronics',
    challengeZh: '传统外贸模式获客成本高，客户转化率低',
    challengeEn: 'High customer acquisition cost and low conversion rate with traditional trade',
    solutionZh: 'Facebook广告精准投放 + WhatsApp私域运营',
    solutionEn: 'Facebook Ads Precision Targeting + WhatsApp Private Domain',
    results: {
      leads: '+300%',
      conversion: '+180%',
      revenue: '+250%',
    },
    testimonialZh: '合作3个月，客户量翻了3倍，转化率从5%提升到14%。团队专业度很高，值得信赖！',
    testimonialEn: 'After 3 months of cooperation, clients tripled, conversion rate increased from 5% to 14%. The team is highly professional and trustworthy!',
    authorZh: '张总',
    authorEn: 'Mr. Zhang',
    roleZh: 'CEO',
    roleEn: 'CEO',
    rating: 5,
    highlight: true,
  },
  {
    companyZh: '浙江某服装工厂',
    companyEn: 'Zhejiang Garment Factory',
    industryZh: '服装纺织',
    industryEn: 'Garment & Textile',
    challengeZh: '欧美市场竞争激烈，品牌知名度低',
    challengeEn: 'Fierce competition in US/European markets with low brand awareness',
    solutionZh: '全渠道客户开发 + 海外社媒营销',
    solutionEn: 'Omni-channel Customer Development + Overseas Social Media',
    results: {
      leads: '+280%',
      conversion: '+150%',
      revenue: '+220%',
    },
    testimonialZh: '之前一直做B2B批发，合作后帮助我们打开了直接面对海外消费者的渠道，利润空间提升很多。',
    testimonialEn: 'Previously focused on B2B wholesale. After cooperation, we opened direct-to-consumer channels, significantly improving profit margins.',
    authorZh: '李总',
    authorEn: 'Ms. Li',
    roleZh: '总经理',
    roleEn: 'General Manager',
    rating: 5,
    highlight: false,
  },
  {
    companyZh: '东莞某机械制造企业',
    companyEn: 'Dongguan Machinery Manufacturing',
    industryZh: '机械设备',
    industryEn: 'Machinery Equipment',
    challengeZh: '产品专业性强，难以找到精准客户',
    challengeEn: 'Highly specialized products making it hard to find targeted clients',
    solutionZh: 'AI市场分析 + 定向客户开发',
    solutionEn: 'AI Market Analysis + Targeted Customer Development',
    results: {
      leads: '+220%',
      conversion: '+160%',
      revenue: '+190%',
    },
    testimonialZh: '机械产品比较特殊，他们的AI分析帮我们找到了很多潜在客户，成交率很高。',
    testimonialEn: 'Machinery products are special. Their AI analysis helped us find many potential clients with high closing rates.',
    authorZh: '王总',
    authorEn: 'Mr. Wang',
    roleZh: '销售总监',
    roleEn: 'Sales Director',
    rating: 5,
    highlight: false,
  },
];

export default function Cases() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

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
            {locale === 'zh' ? '成功案例' : 'Success Cases'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.cases.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            {t.cases.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.companyEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card glass-card-hover rounded-2xl overflow-hidden relative ${caseItem.highlight ? 'ring-1 ring-primary/30' : ''}`}
            >
              {caseItem.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-primary text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>{locale === 'zh' ? '精选' : 'Featured'}</span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 lg:p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{locale === 'zh' ? caseItem.companyZh : caseItem.companyEn}</h3>
                    <span className="text-sm text-foreground-subtle">{locale === 'zh' ? caseItem.industryZh : caseItem.industryEn}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(caseItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-background/60 rounded-xl border border-border">
                  <div className="text-xs font-semibold text-foreground-subtle uppercase tracking-wider mb-2 flex items-center">
                    <Target className="w-3 h-3 mr-2" />
                    {locale === 'zh' ? '业务挑战' : 'Business Challenge'}
                  </div>
                  <div className="text-sm text-foreground-muted">{locale === 'zh' ? caseItem.challengeZh : caseItem.challengeEn}</div>
                </div>

                <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-2" />
                    {locale === 'zh' ? '解决方案' : 'Solution'}
                  </div>
                  <div className="text-sm text-foreground">{locale === 'zh' ? caseItem.solutionZh : caseItem.solutionEn}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(caseItem.results).map(([key, value]) => (
                    <motion.div
                      key={key}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + Object.keys(caseItem.results).indexOf(key) * 0.05 }}
                      className="text-center p-3 bg-background/50 rounded-xl hover:bg-background/80 transition-colors"
                    >
                      <div className={`text-xl lg:text-2xl font-bold ${key === 'leads' ? 'text-primary' : key === 'conversion' ? 'text-green-400' : 'text-accent'}`}>
                        {value}
                      </div>
                      <div className="text-xs text-foreground-subtle mt-1">
                        {locale === 'zh' 
                          ? key === 'leads' ? '线索量' : key === 'conversion' ? '转化率' : '营收'
                          : key === 'leads' ? 'Leads' : key === 'conversion' ? 'Conversion' : 'Revenue'
                        }
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="relative bg-background/40 rounded-xl p-4 border border-border">
                  <Quote className="absolute top-2 left-2 w-6 h-6 text-primary/20" />
                  <p className="text-sm text-foreground-subtle pl-6 italic leading-relaxed">
                    {locale === 'zh' ? caseItem.testimonialZh : caseItem.testimonialEn}
                  </p>
                  <div className="mt-4 flex items-center space-x-3 pl-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {(locale === 'zh' ? caseItem.authorZh : caseItem.authorEn)[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{locale === 'zh' ? caseItem.authorZh : caseItem.authorEn}</div>
                      <div className="text-xs text-foreground-subtle">{locale === 'zh' ? caseItem.roleZh : caseItem.roleEn}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                <motion.button
                  whileHover={{ x: 6 }}
                  className="w-full flex items-center justify-center text-primary text-sm font-semibold py-3 px-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors group"
                >
                  <span>{locale === 'zh' ? '查看完整案例' : 'View Full Case'}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 lg:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto click-scale glow-border"
          >
            <DollarSign className="w-5 h-5" />
            <span>{locale === 'zh' ? '获取专属增长方案' : 'Get Custom Growth Plan'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="mt-4 text-sm text-foreground-subtle">
            {locale === 'zh' ? '免费咨询，量身定制您的外贸增长策略' : 'Free consultation, customized foreign trade growth strategy'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
