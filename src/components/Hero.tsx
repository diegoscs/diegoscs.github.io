'use client';

import { profile } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { asset } from '@/lib/site';
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from './Icons';

export function Hero() {
  const { d, t, locale } = useLanguage();

  return (
    <section className="pb-16 pt-16 sm:pb-24 sm:pt-24">
      <div className="container-page">
        <p className="animate-fade-up font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {t(profile.role)}
        </p>

        <h1 className="mt-5 max-w-3xl animate-fade-up text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          {profile.name}
        </h1>

        <p className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-muted sm:text-xl">
          {t(profile.headline)}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
          />
          {d.hero.available} · {t(profile.location)}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90"
          >
            {d.hero.ctaProjects}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>

          <a
            href={asset(profile.cv[locale])}
            download
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <DownloadIcon className="h-4 w-4" />
            {d.hero.ctaCv}
          </a>

          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-line sm:block" />

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={d.hero.github}
            className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={d.hero.linkedin}
            className="rounded-full border border-line p-2.5 text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
