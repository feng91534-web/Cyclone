'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import zh from './locales/zh.json';
import en from './locales/en.json';

export type Locale = 'zh' | 'en';

export interface Translation {
  navbar: {
    home: string;
    services: string;
    cases: string;
    training: string;
    about: string;
    contact: string;
    getStarted: string;
    en: string;
    zh: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    stats: {
      clients: string;
      countries: string;
      revenue: string;
    };
  };
  services: {
    title: string;
    subtitle: string;
    facebookAds: { title: string; description: string };
    whatsappSales: { title: string; description: string };
    customerAcquisition: { title: string; description: string };
    logistics: { title: string; description: string };
    payment: { title: string; description: string };
    training: { title: string; description: string };
  };
  map: {
    title: string;
    subtitle: string;
  };
  metrics: {
    title: string;
    subtitle: string;
  };
  aiAnalyzer: {
    title: string;
    subtitle: string;
  };
  cases: {
    title: string;
    subtitle: string;
  };
  training: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
  };
  footer: {
    title: string;
    description: string;
    links: {
      services: string;
      cases: string;
      training: string;
      about: string;
      contact: string;
    };
    copyright: string;
  };
}

const translations: Record<Locale, Translation> = {
  zh,
  en,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, defaultLocale = 'zh' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
