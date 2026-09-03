'use client';

import { experience } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Experience() {
  const { d, t } = useLanguage();

  return (
    <section id="experiencia" className="section" aria-labelledby="experiencia-titulo">
      <div className="container-page">
        <div id="experiencia-titulo">
          <SectionHeading index="04" title={d.sections.experience} />
        </div>

        <ol className="relative border-l border-line">
          {experience.map((item, i) => (
            <Reveal as="li" key={item.company} delay={i * 80} className="relative pb-12 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${
                  item.current ? 'bg-accent' : 'bg-line'
                }`}
              />
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {t(item.period)}
              </p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{t(item.role)}</h3>
              <p className="mt-0.5 text-sm text-accent">{item.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {t(item.description)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
