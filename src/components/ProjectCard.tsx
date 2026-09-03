'use client';

import Link from 'next/link';
import type { Project } from '@/content/types';
import { useLanguage } from '@/i18n/LanguageProvider';
import { ArrowIcon, ExternalIcon, GitHubIcon } from './Icons';

export function ProjectCard({ project }: { project: Project }) {
  const { d, t } = useLanguage();
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-line bg-elevated p-6 transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">
          {hasCaseStudy ? (
            <Link
              href={`/projetos/${project.slug}`}
              className="after:absolute after:inset-0 hover:text-accent"
            >
              {t(project.title)}
            </Link>
          ) : (
            t(project.title)
          )}
        </h3>
        {project.featured && (
          <span className="shrink-0 rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
            {d.projects.featured}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{t(project.tagline)}</p>

      <dl className="mt-5 space-y-2.5 border-l border-line pl-4 text-sm">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {d.projects.problem}
          </dt>
          <dd className="mt-0.5 text-muted">{t(project.problem)}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {d.projects.result}
          </dt>
          <dd className="mt-0.5 text-muted">{t(project.result)}</dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex flex-wrap items-center gap-4 pt-1 text-sm">
        {hasCaseStudy && (
          <Link
            href={`/projetos/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-medium text-accent"
          >
            {d.projects.caseStudy}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-4 w-4" />
            {d.projects.repo}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-ink"
          >
            <ExternalIcon className="h-4 w-4" />
            {d.projects.live}
          </a>
        )}
      </div>

    </article>
  );
}
