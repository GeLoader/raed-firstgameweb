import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { Menu, X, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { lang, toggleLang } = useLanguage();
  const t = T[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#services', label: t.nav.links.services },
    { href: '#portfolio', label: t.nav.links.portfolio },
    { href: '#cases', label: t.nav.links.caseStudies },
    { href: '#mena', label: t.nav.links.mena },
    { href: '#contact', label: t.nav.links.contact },
  ];

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-[padding,background-color,box-shadow] duration-500 ${
        scrolled ? 'py-3 glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]' : 'py-5 bg-transparent'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-3 group" aria-label={t.nav.studio}>
          <span className="relative flex h-9 w-9 items-center justify-center">
            <span className="absolute inset-0 rotate-45 border border-gold/60 group-hover:border-gold transition-colors" />
            <span className="absolute inset-1 rotate-45 border border-azure/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
          </span>
          <span className="font-display font-bold tracking-tight text-lg text-mist leading-none">
            {t.nav.studio}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-mist/70 hover:text-gold transition-colors duration-300 relative after:absolute after:bottom-[-6px] after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-gold after:transition-all after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 text-sm text-mist/80 hover:text-gold transition-colors px-3 py-2 rounded-full border border-white/10 hover:border-gold/40"
            aria-label="Switch language"
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">{t.nav.switchTo}</span>
          </button>
          <a
            href="#scope"
            className="hidden sm:inline-flex btn-gold px-5 py-2.5 rounded-full text-sm font-semibold"
          >
            {t.nav.cta}
          </a>
          <button
            className="lg:hidden text-mist p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass-strong mt-3 mx-4 rounded-2xl p-5 animate-accordion-down">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-mist/80 hover:text-gold text-base"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#scope" onClick={() => setOpen(false)} className="btn-gold inline-block px-5 py-2.5 rounded-full text-sm font-semibold mt-1">
                {t.nav.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </motion.header>
  );
}