'use client';

import { stackGroups } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function StackSection() {
  const { d, t } = useLanguage();

  return (
    <section id="stack" className="section" aria-labelledby="stack-titulo">
      <div className="container-page">
        <div id="stack-titulo">
          <SectionHeading index="02" title={d.sections.stack} />
        </div>

        <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {stackGroups.map((group, i) => (
            <Reveal key={group.label.en} delay={i * 60}>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {t(group.label)}
              </dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-elevated px-2.5 py-1 text-sm text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
