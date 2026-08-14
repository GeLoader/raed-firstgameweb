import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const { lang } = useLanguage();
  const t = T[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 mashrabiya-grid opacity-15" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="absolute inset-0 rotate-45 border border-gold/60" />
                <span className="absolute inset-1 rotate-45 border border-azure/40" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="font-display font-bold text-mist text-lg">{t.nav.studio}</span>
            </div>
            <p className={`text-mist/55 text-sm leading-relaxed max-w-xs ${lang === 'ar' ? 'font-arabic' : ''}`}>
              {t.footer.tagline}
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="h-9 w-9 rounded-full border border-white/12 flex items-center justify-center text-mist/60 hover:text-gold hover:border-gold/40 transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <p className={`text-mist text-sm font-semibold mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.footer.services}</p>
            <ul className="space-y-2.5">
              {t.services.items.slice(0, 5).map((s, i) => (
                <li key={i}>
                  <a href="#services" className={`text-mist/55 hover:text-gold text-sm transition-colors ${lang === 'ar' ? 'font-arabic' : ''}`}>{s.title}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <p className={`text-mist text-sm font-semibold mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.footer.company}</p>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-mist/55 hover:text-gold text-sm transition-colors">{t.footer.nav.about}</a></li>
              <li><a href="#" className="text-mist/55 hover:text-gold text-sm transition-colors">{t.footer.nav.careers}</a></li>
              <li><a href="#" className="text-mist/55 hover:text-gold text-sm transition-colors">{t.footer.nav.blog}</a></li>
              <li><a href="#cases" className="text-mist/55 hover:text-gold text-sm transition-colors">{t.nav.links.caseStudies}</a></li>
            </ul>
          </motion.div>

          {/* Regions */}
          <motion.div variants={fadeUp}>
            <p className={`text-mist text-sm font-semibold mb-4 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.footer.regions}</p>
            <ul className="space-y-2.5">
              {t.footer.regionsList.map((r, i) => (
                <li key={i}><a href="#mena" className={`text-mist/55 hover:text-gold text-sm transition-colors ${lang === 'ar' ? 'font-arabic' : ''}`}>{r}</a></li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10"
        >
          <p className="text-mist/40 text-xs">© {year} {t.nav.studio}. {t.footer.rights}</p>
          <div className="flex gap-5">
            {t.footer.legal.map((l, i) => (
              <a key={i} href="#" className={`text-mist/40 hover:text-gold text-xs transition-colors ${lang === 'ar' ? 'font-arabic' : ''}`}>{l}</a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}