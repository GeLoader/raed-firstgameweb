import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { SectionHeading } from './Services';
import { Image } from '@/components/ui/image';
import { ArrowRight } from 'lucide-react';

const PORTFOLIO_IMGS = [
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/4720ac6e7_generated_38ad97fb.png',
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/18fcd0a8c_generated_52444111.png',
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/b512d67e4_generated_d556ba43.png',
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/cc07f8ac6_generated_79d45402.png',
  'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/ef3909480_generated_67cd6ff2.png',
];

export default function Portfolio() {
  const { lang } = useLanguage();
  const t = T[lang];
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });

  // Translate horizontally across the tall section
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%']);

  const items = t.portfolio.items;

  return (
    <section id="portfolio" ref={containerRef} className="relative" style={{ height: `${items.length * 70}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Heading */}
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 w-full pt-24">
          <SectionHeading eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} subtitle={t.portfolio.subtitle} lang={lang} />
        </div>

        {/* Horizontal track */}
        <motion.div style={{ x }} className="flex gap-6 sm:gap-8 ps-5 sm:ps-8 mt-12 will-change-transform">
          {items.map((item, i) => (
            <PortfolioCard key={i} item={item} img={PORTFOLIO_IMGS[i % PORTFOLIO_IMGS.length]} lang={lang} t={t} />
          ))}
          {/* Closing CTA card */}
          <div className="flex-none w-[80vw] sm:w-[440px] flex items-center ps-2">
            <a href="#scope" className="glass rounded-2xl p-8 h-full flex flex-col justify-center hover:border-gold/40 transition-colors">
              <p className="text-gold text-sm tracking-widest uppercase mb-3">+ {t.portfolio.items.length} titles</p>
              <h3 className="text-2xl font-display font-semibold text-mist mb-4">{t.hero.ctaPrimary}</h3>
              <span className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold w-fit">
                {t.nav.cta} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioCard({ item, img, lang, t }) {
  return (
    <article className="group relative flex-none w-[85vw] sm:w-[460px] h-[62vh] rounded-2xl overflow-hidden glass">
      <Image src={img} alt={item.name} className="absolute inset-0 h-full w-full object-cover" fittingType="fill" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />

      {/* HUD overlay on hover */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between text-[11px] font-mono text-azure/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="border border-azure/30 rounded px-2 py-1 bg-obsidian/40">{item.engine}</span>
        <span className="border border-azure/30 rounded px-2 py-1 bg-obsidian/40">{item.polys}</span>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7">
        <span className="inline-block text-[11px] text-gold tracking-[0.2em] uppercase mb-2">{item.region}</span>
        <h3 className={`text-2xl sm:text-3xl font-display font-bold text-mist ${lang === 'ar' ? 'font-arabic' : ''}`}>
          {item.name}
        </h3>
        <p className={`text-mist/70 text-sm mt-1 ${lang === 'ar' ? 'font-arabic' : ''}`}>{item.category}</p>

        <div className="mt-5 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">
          <div className="flex flex-wrap gap-2 mb-4">
            {item.platforms.split(' · ').map((p) => (
              <span key={p} className="text-[11px] text-mist/70 border border-white/15 rounded-full px-2.5 py-1">{p}</span>
            ))}
          </div>
          <a href="#scope" className="inline-flex items-center gap-2 text-gold text-sm font-medium">
            {t.portfolio.cta} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </article>
  );
}