import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { SectionHeading } from './Services';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { base44 } from '@/api/base44Client';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return;
    setStatus('submitting');
    try {
      await base44.entities.Lead.create({
        name: form.name.trim(),
        email: form.email.trim(),
        requirements: form.message.trim(),
        source: 'contact',
        language: lang,
        scope: 'AA',
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('idle');
    }
  };

  const info = [
    { icon: Mail, label: t.contact.emailLabel, value: t.contact.emailValue },
    { icon: Phone, label: t.contact.phoneLabel, value: t.contact.phoneValue },
    { icon: MapPin, label: t.contact.officeLabel, value: t.contact.officeValue },
    { icon: Clock, label: t.contact.hoursLabel, value: t.contact.hoursValue },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} lang={lang} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Info */}
          <motion.div variants={fadeUp} className="glass-strong rounded-3xl p-7 sm:p-10">
            <div className="grid sm:grid-cols-2 gap-5">
              {info.map((it, i) => {
                const Icon = it.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-obsidian/40 border border-white/8">
                    <span className="h-10 w-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-gold" />
                    </span>
                    <div>
                      <p className={`text-xs text-mist/50 tracking-wide ${lang === 'ar' ? 'font-arabic' : ''}`}>{it.label}</p>
                      <p className="text-mist text-sm font-medium mt-0.5" dir="ltr">{it.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a href="#scope" className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold mt-8">
              {t.contact.cta}
            </a>
          </motion.div>

          {/* Form */}
          <motion.form variants={fadeUp} onSubmit={submit} className="glass-strong rounded-3xl p-7 sm:p-10">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="h-14 w-14 text-gold mb-4" />
                <p className={`text-mist/80 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.contact.sent}</p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-ghost-gold mt-5 px-5 py-2 rounded-full text-sm">
                  {lang === 'ar' ? 'إرسال أخرى' : 'Send another'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={t.onboarding.fields.name}
                    className="w-full bg-obsidian/60 border border-white/12 focus:border-gold/50 rounded-xl px-4 py-3 text-mist text-sm outline-none transition-colors" />
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    type="email" placeholder={t.onboarding.fields.email}
                    className="w-full bg-obsidian/60 border border-white/12 focus:border-gold/50 rounded-xl px-4 py-3 text-mist text-sm outline-none transition-colors" />
                </div>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5} placeholder={t.contact.message}
                  className="w-full bg-obsidian/60 border border-white/12 focus:border-gold/50 rounded-xl px-4 py-3 text-mist text-sm outline-none transition-colors resize-none" />
                <button type="submit" disabled={status === 'submitting'}
                  className="btn-gold w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold">
                  <Send className="h-4 w-4" /> {status === 'submitting' ? '...' : t.contact.send}
                </button>
              </div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}