'use client';

import { certifications, education } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Education() {
  const { d, t } = useLanguage();

  return (
    <section id="formacao" className="section" aria-labelledby="formacao-titulo">
      <div className="container-page">
        <div id="formacao-titulo">
          <SectionHeading index="05" title={d.sections.education} />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {education.map((item, i) => (
            <Reveal as="li" key={item.institution + item.title.en} delay={i * 70}>
              <div className="h-full rounded-xl border border-line bg-elevated p-5">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {item.institution}
                </p>
                <h3 className="mt-2 font-semibold tracking-tight">{t(item.title)}</h3>
                <p className="mt-1 text-sm text-muted">{t(item.period)}</p>
                {item.note && <p className="mt-2 text-sm text-muted">{t(item.note)}</p>}
              </div>
            </Reveal>
          ))}
        </ul>

        <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.15em] text-accent">
          {d.sections.certifications}
        </h3>
        {certifications.length === 0 ? (
          <p className="mt-3 text-sm text-muted">{d.education.none}</p>
        ) : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {certifications.map((item) => (
              <li
                key={item.institution + item.title.en}
                className="rounded-xl border border-line bg-elevated p-5"
              >
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                  {item.institution}
                </p>
                <h4 className="mt-2 font-semibold tracking-tight">{t(item.title)}</h4>
                <p className="mt-1 text-sm text-muted">{t(item.period)}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
