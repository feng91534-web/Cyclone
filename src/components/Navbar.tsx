'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n';

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navbar.home, href: '#hero' },
    { name: t.navbar.services, href: '#services' },
    { name: t.navbar.cases, href: '#cases' },
    { name: t.navbar.training, href: '#training' },
    { name: t.navbar.contact, href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            className="flex flex-col items-start"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tighter">NZFK</span>
            <span className="text-[10px] sm:text-xs text-foreground-subtle tracking-widest uppercase">Global Growth</span>
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-foreground-subtle hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
                className="glass-light flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-foreground-subtle hover:text-foreground transition-all hover:border-primary/30"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{locale === 'zh' ? t.navbar.en : t.navbar.zh}</span>
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-semibold flex items-center space-x-2 click-scale glow-border"
              >
                <span>{t.navbar.getStarted}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <button
            className="md:hidden text-foreground-subtle hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden mt-4 glass-strong rounded-xl p-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-foreground-subtle hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.name}
                  </motion.a>
                ))}

                <div className="border-t border-border my-2" />

                <motion.button
                  onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
                  className="flex items-center space-x-2 text-foreground-subtle hover:text-foreground transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Globe className="w-4 h-4" />
                  <span>{locale === 'zh' ? t.navbar.en : t.navbar.zh}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 mt-2 click-scale"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <span>{t.navbar.getStarted}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
