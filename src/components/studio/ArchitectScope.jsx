import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations as T } from '@/i18n/translations';
import { SectionHeading } from './Services';
import { base44 } from '@/api/base44Client';
import { Check, ArrowRight, ArrowLeft, CheckCircle2, Send, RotateCcw, Gamepad2, Monitor, Smartphone, Globe, Wallet, Clock } from 'lucide-react';

const GENRE_ICONS = [Gamepad2, Gamepad2, Gamepad2, Gamepad2, Gamepad2, Gamepad2];
const PLATFORM_ICONS = [Smartphone, Monitor, Monitor, Globe];

export default function ArchitectScope() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [step, setStep] = useState(0);
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [scope, setScope] = useState('AA');
  const [form, setForm] = useState({ name: '', email: '', company: '', requirements: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const estimate = t.onboarding.estimates[scope];

  const budgetPct = (() => {
    // scale 75k–5000k -> 0..100
    const min = 0, max = 5000;
    const mid = (estimate.min + estimate.max) / 2;
    return Math.min(100, Math.max(8, ((mid - min) / (max - min)) * 100));
  })();

  const canNext = step === 0 ? !!genre : step === 1 ? !!platform : true;

  const submit = async () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t.onboarding.errors.name;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = t.onboarding.errors.email;
    if (!genre) errs.genre = t.onboarding.errors.genre;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('submitting');
    try {
      await base44.entities.Lead.create({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        genre,
        platform,
        scope,
        budget_min: estimate.min,
        budget_max: estimate.max,
        timeline_weeks: estimate.weeks,
        requirements: form.requirements.trim(),
        source: 'onboarding',
        language: lang,
      });
      setStatus('success');
    } catch (e) {
      setStatus('idle');
      setErrors({ email: lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى.' : 'Something went wrong, try again.' });
    }
  };

  const reset = () => {
    setStep(0);
    setGenre(null);
    setPlatform(null);
    setScope('AA');
    setForm({ name: '', email: '', company: '', requirements: '' });
    setErrors({});
    setStatus('idle');
  };

  return (
    <section id="scope" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian-soft to-obsidian" />
      <div className="absolute inset-0 mashrabiya-grid opacity-20" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow={t.onboarding.eyebrow} title={t.onboarding.title} subtitle={t.onboarding.subtitle} lang={lang} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Step panel */}
          <div className="glass-strong rounded-3xl p-6 sm:p-10 min-h-[460px]">
            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8">
              {t.onboarding.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className={`flex items-center gap-2 ${i === step ? 'text-gold' : i < step ? 'text-azure' : 'text-mist/40'}`}>
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border ${i === step ? 'border-gold bg-gold/10' : i < step ? 'border-azure bg-azure/10' : 'border-white/15'}`}>
                      {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className={`text-sm hidden sm:inline ${lang === 'ar' ? 'font-arabic' : ''}`}>{s}</span>
                  </div>
                  {i < t.onboarding.steps.length - 1 && <span className={`h-px flex-1 ${i < step ? 'bg-azure/40' : 'bg-white/10'}`} />}
                </React.Fragment>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-10">
                  <CheckCircle2 className="h-16 w-16 text-gold mb-5" />
                  <h3 className={`text-2xl font-display font-bold text-mist mb-2 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.onboarding.successTitle}</h3>
                  <p className={`text-mist/60 max-w-md ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.onboarding.successBody}</p>
                  <button onClick={reset} className="btn-ghost-gold mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold">
                    <RotateCcw className="h-4 w-4" /> {t.onboarding.another}
                  </button>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                  {step === 0 && (
                    <div>
                      <p className={`text-mist/60 text-sm mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.onboarding.steps[0]}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {t.onboarding.genres.map((g, i) => {
                          const Icon = GENRE_ICONS[i] || Gamepad2;
                          const sel = genre === g;
                          return (
                            <button key={g} onClick={() => setGenre(g)}
                              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${sel ? 'border-gold bg-gold/10' : 'border-white/12 hover:border-gold/40 bg-obsidian/40'}`}>
                              <Icon className={`h-7 w-7 ${sel ? 'text-gold' : 'text-mist/60 group-hover:text-gold'} transition-colors`} />
                              <span className={`text-sm font-medium ${sel ? 'text-gold' : 'text-mist/80'} ${lang === 'ar' ? 'font-arabic' : ''}`}>{g}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.genre && <p className="text-destructive text-sm mt-3">{errors.genre}</p>}
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <p className={`text-mist/60 text-sm mb-5 ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.onboarding.steps[1]}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {t.onboarding.platforms.map((p, i) => {
                          const Icon = PLATFORM_ICONS[i] || Globe;
                          const sel = platform === p;
                          return (
                            <button key={p} onClick={() => setPlatform(p)}
                              className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 ${sel ? 'border-azure bg-azure/10' : 'border-white/12 hover:border-azure/40 bg-obsidian/40'}`}>
                              <Icon className={`h-7 w-7 ${sel ? 'text-azure' : 'text-mist/60 group-hover:text-azure'} transition-colors`} />
                              <span className={`text-sm font-medium ${sel ? 'text-azure' : 'text-mist/80'} ${lang === 'ar' ? 'font-arabic' : ''}`}>{p}</span>
                            </button>
                          );
                        })}
                      </div>

                      <p className={`text-mist/60 text-sm mb-3 ${lang === 'ar' ? 'font-arabic' : ''}`}>{lang === 'ar' ? 'النطاق' : 'Scope'}</p>
                      <div className="grid grid-cols-3 gap-3">
                        {t.onboarding.scopes.map((sc) => (
                          <button key={sc} onClick={() => setScope(sc)}
                            className={`py-4 rounded-xl border font-display font-bold transition-all duration-300 ${scope === sc ? 'border-gold bg-gold/10 text-gold' : 'border-white/12 text-mist/60 hover:text-mist'}`}>
                            {sc}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label={t.onboarding.fields.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} error={errors.name} lang={lang} />
                        <Field label={t.onboarding.fields.email} value={form.email} onChange={(v) => setForm({ ...form, email: v })} error={errors.email} lang={lang} type="email" />
                      </div>
                      <Field label={t.onboarding.fields.company} value={form.company} onChange={(v) => setForm({ ...form, company: v })} lang={lang} />
                      <div>
                        <label className={`block text-xs text-mist/55 mb-1.5 tracking-wide ${lang === 'ar' ? 'font-arabic' : ''}`}>{t.onboarding.fields.requirements}</label>
                        <textarea
                          value={form.requirements}
                          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                          rows={4}
                          className="w-full bg-obsidian/60 border border-white/12 focus:border-gold/50 rounded-xl px-4 py-3 text-mist text-sm outline-none transition-colors resize-none"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav buttons */}
            {status !== 'success' && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <button
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full ${step === 0 ? 'text-mist/30 cursor-not-allowed' : 'text-mist/70 hover:text-gold'}`}
                >
                  <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {lang === 'ar' ? 'السابق' : 'Back'}
                </button>

                {step < 2 ? (
                  <button
                    disabled={!canNext}
                    onClick={() => setStep((s) => Math.min(2, s + 1))}
                    className={`btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold ${!canNext ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {lang === 'ar' ? 'التالي' : 'Next'} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={submit}
                    disabled={status === 'submitting'}
                    className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                  >
                    {status === 'submitting' ? t.onboarding.submitting : (<><Send className="h-4 w-4" /> {t.onboarding.submit}</>)}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Live estimate sidebar */}
          <div className="glass-strong rounded-3xl p-6 sm:p-8 h-fit lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-azure text-sm mb-5">
              <Wallet className="h-4 w-4" /> {t.onboarding.budgetLabel}
            </div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-display font-bold text-gold-gradient">
                {fmtBudget(estimate.min)}
              </span>
              <span className="text-mist/40 text-sm">– {fmtBudget(estimate.max)}</span>
            </div>
            <div className="h-2 rounded-full bg-obsidian/80 overflow-hidden mb-1">
              <motion.div className="h-full bg-gradient-to-r from-gold to-gold-bright rounded-full" animate={{ width: `${budgetPct}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="text-[11px] text-mist/40 mb-6">Indie → AAA scale</p>

            <div className="flex items-center gap-2 text-azure text-sm mb-3">
              <Clock className="h-4 w-4" /> {t.onboarding.timelineLabel}
            </div>
            <p className="text-2xl font-display font-bold text-azure-gradient mb-6">
              ~{estimate.weeks} {lang === 'ar' ? 'أسبوع' : 'weeks'}
            </p>

            <div className="space-y-2 text-sm">
              <Row label={lang === 'ar' ? 'النوع' : 'Genre'} value={genre || '—'} lang={lang} />
              <Row label={lang === 'ar' ? 'المنصة' : 'Platform'} value={platform || '—'} lang={lang} />
              <Row label={lang === 'ar' ? 'النطاق' : 'Scope'} value={scope} lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function fmtBudget(v) {
  // values are in thousands of USD
  if (v >= 1000) return `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}M`;
  return `$${v.toLocaleString()}k`;
}

function Field({ label, value, onChange, error, lang, type = 'text' }) {
  return (
    <div>
      <label className={`block text-xs text-mist/55 mb-1.5 tracking-wide ${lang === 'ar' ? 'font-arabic' : ''}`}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-obsidian/60 border ${error ? 'border-destructive/60' : 'border-white/12 focus:border-gold/50'} rounded-xl px-4 py-3 text-mist text-sm outline-none transition-colors`}
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}

function Row({ label, value, lang }) {
  return (
    <div className="flex items-center justify-between border-b border-white/8 pb-2">
      <span className={`text-mist/50 ${lang === 'ar' ? 'font-arabic' : ''}`}>{label}</span>
      <span className="text-mist font-medium">{value}</span>
    </div>
  );
}