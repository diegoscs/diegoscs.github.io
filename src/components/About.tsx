'use client';

import { profile } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function About() {
  const { d, t } = useLanguage();

  return (
    <section id="sobre" className="section" aria-labelledby="sobre-titulo">
      <div className="container-page">
        <Reveal>
          <div id="sobre-titulo">
            <SectionHeading index="01" title={d.sections.about} />
          </div>
          <div className="grid gap-6 text-base leading-relaxed text-muted md:grid-cols-2 md:gap-10">
            <p>{t(profile.about)}</p>
            <p>{t(profile.about2)}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
