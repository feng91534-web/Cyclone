'use client';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Footer() {
  const { t, locale } = useLanguage();

  const footerLinks = [
    {
      titleZh: '服务',
      titleEn: 'Services',
      links: [
        { zh: 'Facebook广告获客', en: 'Facebook Ads' },
        { zh: 'WhatsApp销售转化', en: 'WhatsApp Conversion' },
        { zh: '海外客户开发', en: 'Overseas Acquisition' },
        { zh: '物流与仓储', en: 'Logistics & Fulfillment' },
        { zh: '国际支付解决方案', en: 'Payment Solutions' },
        { zh: '外贸培训', en: 'Trade Training' },
      ],
    },
    {
      titleZh: '关于',
      titleEn: 'About',
      links: [
        { zh: '公司介绍', en: 'About Us' },
        { zh: '成功案例', en: 'Case Studies' },
        { zh: '团队成员', en: 'Team' },
        { zh: '新闻动态', en: 'News' },
        { zh: '加入我们', en: 'Careers' },
      ],
    },
    {
      titleZh: '资源',
      titleEn: 'Resources',
      links: [
        { zh: '博客文章', en: 'Blog' },
        { zh: '白皮书', en: 'Whitepapers' },
        { zh: '行业报告', en: 'Reports' },
        { zh: '常见问题', en: 'FAQ' },
        { zh: '联系我们', en: 'Contact' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <div className="text-xl font-bold text-white tracking-tighter mb-1">NZFK</div>
                <div className="text-xs text-foreground-subtle tracking-widest uppercase">Global Growth</div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                {locale === 'zh' ? '专注于帮助中国企业拓展海外市场，通过数字化营销和智能工具实现全球化增长。' : 'Focused on helping Chinese enterprises expand into overseas markets, achieving global growth through digital marketing and intelligent tools.'}
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((section, index) => (
            <motion.div
              key={section.titleEn}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="font-semibold mb-4">{locale === 'zh' ? section.titleZh : section.titleEn}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.en}>
                    <a href="#" className="text-muted-foreground hover:text-white transition-colors">
                      {locale === 'zh' ? link.zh : link.en}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              2024 Guangzhou NZFK Technology Co., Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">{locale === 'zh' ? '隐私政策' : 'Privacy Policy'}</a>
              <a href="#" className="hover:text-white transition-colors">{locale === 'zh' ? '服务条款' : 'Terms of Service'}</a>
              <a href="#" className="hover:text-white transition-colors">{locale === 'zh' ? 'Cookie政策' : 'Cookie Policy'}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
