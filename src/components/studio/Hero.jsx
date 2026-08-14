import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { staggerContainer, fadeUp } from '@/lib/motion';

const HERO_IMG = 'https://media.base44.com/images/public/6a7e3a9bc6bdb1ddd0bf8ae5/cc07f8ac6_generated_79d45402.png';

export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden flex items-center">
      {/* Cinematic background with parallax */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src={HERO_IMG}
          alt="Futuristic warrior on neon-lit Arabian desert dunes looking toward a crystalline sci-fi city"
          className="absolute inset-0 h-full w-full object-cover"
          fittingType="fill"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/55 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-transparent to-obsidian/40 rtl:bg-gradient-to-l" />
      </motion.div>

      {/* Mashrabiya overlay */}
      <div className="absolute inset-0 mashrabiya-grid opacity-40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 w-full pt-32 pb-20"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-7">
            <span className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-medium tracking-[0.25em] uppercase">
              {t.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-mist leading-[1.05] tracking-tight"
          >
            <span className="block text-5xl sm:text-7xl lg:text-8xl">{t.hero.title1}</span>
            <span className="block text-4xl sm:text-6xl lg:text-7xl text-gold-gradient mt-2">
              {t.hero.title2}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mt-8 text-mist/75 text-lg sm:text-xl max-w-2xl ${lang === 'ar' ? 'font-arabic' : ''}`}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#portfolio"
              className="btn-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </a>
            <a
              href="#cases"
              className="btn-ghost-gold inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-4 sm:gap-10 max-w-xl">
            {[t.hero.stat1, t.hero.stat2, t.hero.stat3].map((s, i) => (
              <div key={i} className="border-s-2 border-gold/40 ps-4 rtl:border-s-0 rtl:border-e-2 rtl:ps-0 rtl:pe-4">
                <p className="text-mist text-sm sm:text-base font-medium leading-snug">{s}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-mist/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.div>
    </section>
  );
}