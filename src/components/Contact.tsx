'use client';

import { profile } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Contact() {
  const { d } = useLanguage();

  const items = [
    {
      href: `mailto:${profile.email}`,
      label: profile.email,
      icon: <MailIcon />,
      aria: profile.email,
      external: false,
    },
    {
      href: profile.linkedin,
      label: 'LinkedIn',
      icon: <LinkedInIcon />,
      aria: d.hero.linkedin,
      external: true,
    },
    {
      href: profile.github,
      label: 'GitHub',
      icon: <GitHubIcon />,
      aria: d.hero.github,
      external: true,
    },
  ];

  return (
    <section id="contato" className="section" aria-labelledby="contato-titulo">
      <div className="container-page">
        <div id="contato-titulo">
          <SectionHeading
            index="06"
            title={d.sections.contact}
            subtitle={d.sections.contactSubtitle}
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 70}>
              <a
                href={item.href}
                aria-label={item.aria}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="flex h-full items-center gap-3 rounded-xl border border-line bg-elevated p-5 transition-colors hover:border-accent hover:text-accent"
              >
                <span aria-hidden="true" className="text-accent">
                  {item.icon}
                </span>
                <span className="break-all text-sm">{item.label}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
