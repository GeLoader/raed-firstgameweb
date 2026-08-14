import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { SectionHeading } from './Services';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { CheckCircle2, MapPin } from 'lucide-react';

export default function MenaHub() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [active, setActive] = useState(0);
  const tab = t.mena.tabs[active];

  return (
    <section id="mena" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 mashrabiya-grid opacity-25" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow={t.mena.eyebrow} title={t.mena.title} subtitle={t.mena.subtitle} lang={lang} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Tabs */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto hide-scrollbar">
            {t.mena.tabs.map((tb, i) => (
              <button
                key={tb.key}
                onClick={() => setActive(i)}
                className={`text-start flex-shrink-0 lg:flex-shrink px-5 py-4 rounded-2xl border transition-all duration-300 ${
                  active === i
                    ? 'glass-strong border-gold/50'
                    : 'border-white/10 hover:border-gold/30 bg-obsidian/40'
                }`}
              >
                <span className={`block text-xs text-mist/50 tracking-wider uppercase ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {tb.country}
                </span>
                <span className={`block text-lg font-display font-semibold mt-0.5 ${active === i ? 'text-gold' : 'text-mist'} ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {tb.city}
                </span>
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="glass-strong rounded-3xl p-7 sm:p-10 min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2 text-azure text-sm mb-4">
                  <MapPin className="h-4 w-4" /> {tab.city}, {tab.country}
                </div>
                <h2 className={`text-2xl sm:text-4xl font-display font-bold text-mist leading-tight mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {tab.h2}
                </h2>
                <p className={`text-mist/65 text-base sm:text-lg leading-relaxed max-w-2xl ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {tab.body}
                </p>

                <div className="mt-8">
                  <p className="text-xs text-mist/50 tracking-[0.2em] uppercase mb-4">{lang === 'ar' ? 'إشارات الثقة' : 'Trust Signals'}</p>
                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className="grid sm:grid-cols-3 gap-3"
                  >
                    {tab.signals.map((s, i) => (
                      <motion.li key={i} variants={fadeUp} className="flex items-center gap-2.5 glass rounded-xl p-4">
                        <CheckCircle2 className="h-5 w-5 text-gold flex-shrink-0" />
                        <span className={`text-sm text-mist/80 ${lang === 'ar' ? 'font-arabic' : ''}`}>{s}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <a href="#scope" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mt-8">
                  {t.nav.cta}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}