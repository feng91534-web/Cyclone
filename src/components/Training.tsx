'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Users, BookOpen, Award, ChevronRight, Check, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

const courses = [
  {
    titleZh: '外贸实战基础班',
    titleEn: 'Foreign Trade Basics',
    duration: '4周',
    durationEn: '4 Weeks',
    students: '2000+',
    levelZh: '入门',
    levelEn: 'Beginner',
    price: '1999',
    originalPrice: '2999',
    featuresZh: [
      '外贸流程全解析',
      '客户开发技巧',
      '询盘处理方法',
      '基础谈判策略',
    ],
    featuresEn: [
      'Complete Trade Process',
      'Customer Development Skills',
      'Inquiry Handling',
      'Basic Negotiation',
    ],
    popular: false,
    icon: BookOpen,
  },
  {
    titleZh: 'Facebook广告进阶班',
    titleEn: 'Facebook Ads Advanced',
    duration: '6周',
    durationEn: '6 Weeks',
    students: '1500+',
    levelZh: '进阶',
    levelEn: 'Advanced',
    price: '3999',
    originalPrice: '5999',
    featuresZh: [
      '精准受众定位',
      '广告创意设计',
      '投放策略优化',
      '数据分析与调整',
    ],
    featuresEn: [
      'Precision Audience Targeting',
      'Ad Creative Design',
      'Campaign Optimization',
      'Data Analysis',
    ],
    popular: true,
    icon: Zap,
  },
  {
    titleZh: 'WhatsApp私域运营大师班',
    titleEn: 'WhatsApp Private Domain',
    duration: '4周',
    durationEn: '4 Weeks',
    students: '1200+',
    levelZh: '高级',
    levelEn: 'Expert',
    price: '2999',
    originalPrice: '4499',
    featuresZh: [
      '私域流量搭建',
      '客户分层管理',
      '自动化运营工具',
      '转化率提升技巧',
    ],
    featuresEn: [
      'Private Domain Setup',
      'Customer Segmentation',
      'Automation Tools',
      'Conversion Optimization',
    ],
    popular: false,
    icon: Users,
  },
];

const stats = [
  { icon: BookOpen, labelZh: '实战课程', labelEn: 'Courses', value: '50+' },
  { icon: Users, labelZh: '专业讲师', labelEn: 'Instructors', value: '20+' },
  { icon: Award, labelZh: '学员好评', labelEn: 'Rating', value: '98%' },
  { icon: Clock, labelZh: '累计课时', labelEn: 'Hours', value: '1000+' },
];

export default function Training() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="training" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow-accent opacity-30" />

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
            {locale === 'zh' ? '培训课程' : 'Training Courses'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.training.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            {t.training.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card glass-card-hover rounded-2xl overflow-hidden relative ${course.popular ? 'ring-1 ring-primary/40' : ''}`}
            >
              {course.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-primary text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>{locale === 'zh' ? '最受欢迎' : 'Most Popular'}</span>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 lg:p-8 relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${course.popular ? 'bg-gradient-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      <course.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${course.popular ? 'bg-primary/20 text-primary-light' : 'bg-background/60 text-foreground-subtle'}`}>
                      {locale === 'zh' ? course.levelZh : course.levelEn}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-foreground-subtle mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {locale === 'zh' ? course.duration : course.durationEn}
                  </span>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" />
                    {course.students} {locale === 'zh' ? '学员' : 'students'}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-4">{locale === 'zh' ? course.titleZh : course.titleEn}</h3>

                <div className="flex items-baseline space-x-3 mb-6">
                  <span className="text-4xl font-bold text-gradient">{course.price}</span>
                  <span className="text-lg text-foreground-subtle line-through">{course.originalPrice}</span>
                  <span className="text-sm text-foreground-subtle">{locale === 'zh' ? '元' : 'CNY'}</span>
                </div>

                <div className="space-y-3 mb-8">
                  {(locale === 'zh' ? course.featuresZh : course.featuresEn).map((feature, idx) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 + idx * 0.05 }}
                      className="flex items-center text-sm"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-foreground-muted">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 ${course.popular ? 'bg-gradient-primary text-white click-scale glow-border' : 'border border-border hover:border-primary/50 hover:bg-primary/5 transition-all click-scale'}`}
                >
                  <span>{locale === 'zh' ? '立即报名' : 'Enroll Now'}</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card glass-card-hover rounded-xl p-6 text-center cursor-pointer"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl lg:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-foreground-subtle">{locale === 'zh' ? stat.labelZh : stat.labelEn}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 lg:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto click-scale glow-border"
          >
            <BookOpen className="w-5 h-5" />
            <span>{locale === 'zh' ? '查看全部课程' : 'View All Courses'}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <p className="mt-4 text-sm text-foreground-subtle">
            {locale === 'zh' ? '不确定选哪门课？预约免费咨询，帮您推荐最适合的课程' : 'Not sure which course? Book a free consultation to get personalized recommendations'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
