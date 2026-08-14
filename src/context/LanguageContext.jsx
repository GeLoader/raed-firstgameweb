import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

// Gulf / GCC countries mapped to locale
const GCC_MAP = {
  SA: 'ar', // Saudi Arabia
  AE: 'ar', // UAE
  QA: 'ar', // Qatar
  KW: 'ar', // Kuwait
  BH: 'ar', // Bahrain
  OM: 'ar', // Oman
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [detected, setDetected] = useState(false);

  // Detect by stored preference, then browser locale, then timezone (Gulf region)
  useEffect(() => {
    const stored = localStorage.getItem('af_lang');
    if (stored === 'ar' || stored === 'en') {
      setLang(stored);
      setDetected(true);
      return;
    }

    // Browser language
    const browserLang = (navigator.language || 'en').toLowerCase();
    if (browserLang.startsWith('ar')) {
      setLang('ar');
      setDetected(true);
      return;
    }

    // Timezone-based Gulf detection
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const gulfTz = ['Riyadh', 'Dubai', 'Qatar', 'Kuwait', 'Bahrain', 'Muscat', 'Khartoum', 'Baghdad']
        .some((c) => tz.includes(c));
      if (gulfTz) {
        setLang('ar');
        setDetected(true);
        return;
      }
    } catch (e) { /* ignore */ }

    setDetected(true);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('af_lang', next);
      return next;
    });
  }, []);

  const changeLang = useCallback((l) => {
    setLang(l);
    localStorage.setItem('af_lang', l);
  }, []);

  // Apply <html> lang + dir
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const value = { lang, dir: lang === 'ar' ? 'rtl' : 'ltr', toggleLang, changeLang, detected };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

export { GCC_MAP };