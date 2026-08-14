import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { Image } from '@/components/ui/image';
import { ArrowUpRight } from 'lucide-react';

const SERVICES_IMG = 'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/ef3909480_generated_67cd6ff2.png';

export default function Services() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src={SERVICES_IMG}
          alt="Abstract golden code-as-art filaments in obsidian void"
          className="h-full w-full object-cover"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-obsidian/80" />
      </div>
      <div className="absolute inset-0 mashrabiya-grid opacity-20" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle} lang={lang} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {t.services.items.map((s, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-7 transition-colors duration-500 hover:border-gold/40"
            >
              <div className="absolute -top-px left-7 right-7 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-azure/70 text-sm">0{i + 1}</span>
                <ArrowUpRight className="h-5 w-5 text-mist/30 group-hover:text-gold transition-colors rtl:rotate-90" />
              </div>
              <h3 className={`text-xl font-display font-semibold text-mist mb-3 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {s.title}
              </h3>
              <p className={`text-mist/65 text-sm leading-relaxed mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>
                {s.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[11px] font-medium text-azure/80 border border-azure/25 rounded-full px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, lang }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="max-w-3xl"
    >
      <div className="inline-flex items-center gap-3 mb-5">
        <span className="h-px w-8 bg-gold" />
        <span className="text-gold text-xs font-medium tracking-[0.25em] uppercase">{eyebrow}</span>
      </div>
      <h2 className={`font-display font-bold text-mist text-3xl sm:text-5xl tracking-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-mist/60 text-lg ${lang === 'ar' ? 'font-arabic' : ''}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}