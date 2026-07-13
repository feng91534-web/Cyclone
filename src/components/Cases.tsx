'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, ArrowRight, Star } from 'lucide-react';
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
  },
];

export default function Cases() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="cases" ref={ref} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.cases.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.cases.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.companyEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">{locale === 'zh' ? caseItem.companyZh : caseItem.companyEn}</h3>
                    <span className="text-sm text-muted-foreground">{locale === 'zh' ? caseItem.industryZh : caseItem.industryEn}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(caseItem.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">{locale === 'zh' ? '业务挑战' : 'Business Challenge'}</div>
                  <div className="text-sm">{locale === 'zh' ? caseItem.challengeZh : caseItem.challengeEn}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-muted-foreground mb-2">{locale === 'zh' ? '解决方案' : 'Solution'}</div>
                  <div className="text-sm">{locale === 'zh' ? caseItem.solutionZh : caseItem.solutionEn}</div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {Object.entries(caseItem.results).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-secondary/50 rounded-lg">
                      <div className="text-lg font-bold text-green-500">{value}</div>
                      <div className="text-xs text-muted-foreground">
                        {locale === 'zh' 
                          ? key === 'leads' ? '线索量' : key === 'conversion' ? '转化率' : '营收'
                          : key === 'leads' ? 'Leads' : key === 'conversion' ? 'Conversion' : 'Revenue'
                        }
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-sm text-muted-foreground pl-6 italic">
                    {locale === 'zh' ? caseItem.testimonialZh : caseItem.testimonialEn}
                  </p>
                  <div className="mt-3 flex items-center space-x-2 pl-6">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                      {(locale === 'zh' ? caseItem.authorZh : caseItem.authorEn)[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{locale === 'zh' ? caseItem.authorZh : caseItem.authorEn}</div>
                      <div className="text-xs text-muted-foreground">{locale === 'zh' ? caseItem.roleZh : caseItem.roleEn}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center text-primary text-sm font-medium"
                >
                  <span>{locale === 'zh' ? '查看完整案例' : 'View Full Case'}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
