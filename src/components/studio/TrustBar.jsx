import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { staggerContainer, fadeIn, fadeUp, viewportOnce } from '@/lib/motion';

export default function TrustBar() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section className="relative py-14">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-center text-mist/50 text-xs tracking-[0.3em] uppercase mb-8"
        >
          {t.trust.subtitle}
        </motion.p>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-16 gap-y-5"
        >
          {t.trust.logos.map((logo, i) => (
            <motion.span
              key={i}
              variants={fadeIn}
              className={`text-mist/40 hover:text-mist/70 transition-colors text-base sm:text-lg font-display font-semibold tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}
            >
              {logo}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}