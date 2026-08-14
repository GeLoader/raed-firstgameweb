import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/studio/Navbar';
import Hero from '@/components/studio/Hero';
import TrustBar from '@/components/studio/TrustBar';
import Services from '@/components/studio/Services';
import Portfolio from '@/components/studio/Portfolio';
import CaseStudies from '@/components/studio/CaseStudies';
import MenaHub from '@/components/studio/MenaHub';
import ArchitectScope from '@/components/studio/ArchitectScope';
import Contact from '@/components/studio/Contact';
import Footer from '@/components/studio/Footer';

// Inject dynamic Service + Article schema markup for SEO
function useSeoSchema(lang) {
  useEffect(() => {
    const id = 'af-service-schema';
    document.getElementById(id)?.remove();

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Game Development - Aether Forge Studios',
      provider: { '@type': 'Organization', name: 'Aether Forge Studios' },
      areaServed: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
      serviceType: ['Game Art Outsourcing', 'Unreal Engine Development', 'Unity Development', 'Web3 Gaming'],
      inLanguage: [lang === 'ar' ? 'ar' : 'en'],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [lang]);
}

export default function Home() {
  const { lang } = useLanguage();
  useSeoSchema(lang);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Portfolio />
        <CaseStudies />
        <MenaHub />
        <ArchitectScope />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}