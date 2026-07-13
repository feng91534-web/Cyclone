'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Users, BookOpen, Award, ChevronRight, Check } from 'lucide-react';
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
    <section id="training" ref={ref} className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{t.training.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.training.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${course.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {course.popular && (
                <div className="absolute top-4 right-4 bg-gradient-primary text-white text-xs px-3 py-1 rounded-full z-10">
                  {locale === 'zh' ? '最受欢迎' : 'Most Popular'}
                </div>
              )}

              <div className={`p-6 ${course.popular ? 'bg-gradient-to-br from-primary/10 to-accent/10' : 'glass'}`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium bg-secondary px-3 py-1 rounded-full">
                    {locale === 'zh' ? course.levelZh : course.levelEn}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {locale === 'zh' ? course.duration : course.durationEn}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{locale === 'zh' ? course.titleZh : course.titleEn}</h3>

                <div className="flex items-center space-x-2 mb-6">
                  <span className="text-3xl font-bold text-gradient">{course.price}</span>
                  <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
                  <span className="text-xs">{locale === 'zh' ? '元' : 'CNY'}</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {(locale === 'zh' ? course.featuresZh : course.featuresEn).map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2 ${course.popular ? 'bg-gradient-primary text-white' : 'border border-border hover:bg-secondary'}`}
                >
                  <span>{locale === 'zh' ? '立即报名' : 'Enroll Now'}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <div key={stat.labelEn} className="text-center glass rounded-xl p-6">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{locale === 'zh' ? stat.labelZh : stat.labelEn}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
