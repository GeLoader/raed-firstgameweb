import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { SectionHeading } from './Services';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { Image } from '@/components/ui/image';
import { MapPin } from 'lucide-react';

const CASE_IMGS = [
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/93ec24a62_generated_81ea7d90.png',
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/18fcd0a8c_generated_52444111.png',
];

export default function CaseStudies() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section id="cases" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow={t.cases.eyebrow} title={t.cases.title} subtitle={t.cases.subtitle} lang={lang} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-16 flex flex-col gap-8"
        >
          {t.cases.items.map((c, i) => (
            <motion.article
              key={i}
              variants={fadeUp}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center glass rounded-3xl overflow-hidden p-3 sm:p-4"
            >
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
                <Image
                  src={CASE_IMGS[i % CASE_IMGS.length]}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fittingType="fill"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/70 to-transparent" />
              </div>

              <div className="p-4 sm:p-8">
                <div className="flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase mb-3">
                  <MapPin className="h-3.5 w-3.5" /> {c.region} · {c.client}
                </div>
                <h3 className={`text-2xl sm:text-3xl font-display font-bold text-mist leading-tight ${lang === 'ar' ? 'font-arabic' : ''}`}>
                  {c.title}
                </h3>
                <p className={`mt-4 text-mist/65 text-base leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>{c.summary}</p>

                <div className="mt-7 grid grid-cols-2 gap-4">
                  <div className="border-s-2 border-gold/40 ps-4 rtl:border-s-0 rtl:border-e-2 rtl:ps-0 rtl:pe-4">
                    <p className="text-3xl sm:text-4xl font-display font-bold text-gold-gradient">{c.metric1}</p>
                    <p className={`text-mist/55 text-xs mt-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{c.metric1Label}</p>
                  </div>
                  <div className="border-s-2 border-azure/40 ps-4 rtl:border-s-0 rtl:border-e-2 rtl:ps-0 rtl:pe-4">
                    <p className="text-3xl sm:text-4xl font-display font-bold text-azure-gradient">{c.metric2}</p>
                    <p className={`text-mist/55 text-xs mt-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{c.metric2Label}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}