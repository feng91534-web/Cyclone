'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Contact() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
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
            {locale === 'zh' ? '联系我们' : 'Contact Us'}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">{t.contact.title}</span>
          </h2>
          <p className="text-lg lg:text-xl text-foreground-subtle max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card glass-card-hover rounded-3xl p-8 lg:p-10">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex items-start space-x-4 p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{locale === 'zh' ? '电话咨询' : 'Phone Consultation'}</h4>
                    <p className="text-lg font-medium text-primary">400-888-8888</p>
                    <div className="flex items-center text-sm text-foreground-subtle mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {locale === 'zh' ? '周一至周日 9:00-22:00' : 'Mon-Sun 9:00-22:00'}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start space-x-4 p-4 bg-accent/5 rounded-xl hover:bg-accent/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{locale === 'zh' ? '邮件联系' : 'Email'}</h4>
                    <p className="text-lg font-medium text-accent">contact@globalgrowth.com</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start space-x-4 p-4 bg-green-500/5 rounded-xl hover:bg-green-500/10 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{locale === 'zh' ? '公司地址' : 'Address'}</h4>
                    <p className="text-foreground-muted">{locale === 'zh' ? '深圳市南山区科技园南区' : 'Nanshan District, Shenzhen High-Tech Park'}</p>
                    <p className="text-sm text-foreground-subtle">{locale === 'zh' ? '深圳湾科技园生态园10栋' : 'Building 10, Shenzhen Bay Tech Park'}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/10">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">{locale === 'zh' ? '快速响应' : 'Fast Response'}</h5>
                    <p className="text-sm text-foreground-subtle">
                      {locale === 'zh' ? '我们的专业顾问将在24小时内与您联系，为您提供专属的外贸增长解决方案。' : 'Our professional consultants will contact you within 24 hours to provide customized foreign trade growth solutions.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="glass-card glass-card-hover rounded-3xl p-8 lg:p-10">
              <h3 className="text-xl font-semibold text-foreground mb-6">{locale === 'zh' ? '填写咨询表单' : 'Fill out the contact form'}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-subtle mb-2">{t.contact.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/60 border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder={locale === 'zh' ? '请输入您的姓名' : 'Enter your name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-subtle mb-2">{t.contact.company}</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/60 border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder={locale === 'zh' ? '请输入公司名称' : 'Enter company name'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-subtle mb-2">{t.contact.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/60 border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder={locale === 'zh' ? '请输入邮箱地址' : 'Enter email address'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-subtle mb-2">{t.contact.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/60 border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    placeholder={locale === 'zh' ? '请输入手机号码' : 'Enter phone number'}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground-subtle mb-2">{t.contact.message}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-background/60 border border-border rounded-xl text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
                  placeholder={locale === 'zh' ? '请描述您的需求...' : 'Describe your requirements...'}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-gradient-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 click-scale glow-border"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>{locale === 'zh' ? '提交中...' : 'Submitting...'}</span>
                  </>
                ) : isSubmitted ? (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{locale === 'zh' ? '提交成功' : 'Submitted successfully'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>{t.contact.submit}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
