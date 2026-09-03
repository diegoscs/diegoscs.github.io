'use client';

import Link from 'next/link';
import type { Project } from '@/content/types';
import { useLanguage } from '@/i18n/LanguageProvider';
import { CodeBlock } from './CodeBlock';
import { FinanceCategoriesMock } from './diagrams/FinanceCategoriesMock';
import { FinanceOverviewMock } from './diagrams/FinanceOverviewMock';
import { FinancasArchitecture } from './diagrams/FinancasArchitecture';
import { ArrowIcon, ExternalIcon, GitHubIcon } from './Icons';
import { Markdown } from './Markdown';
import { Reveal } from './Reveal';

const DIAGRAMS = {
  'financas-architecture': FinancasArchitecture,
  'financas-dashboard-geral': FinanceOverviewMock,
  'financas-dashboard-categorias': FinanceCategoriesMock,
} as const;

export function CaseStudyView({ project }: { project: Project }) {
  const { d, t } = useLanguage();
  const sections = project.caseStudy?.sections ?? [];

  return (
    <article className="container-page py-12 sm:py-16">
      <nav aria-label={d.caseStudy.backShort}>
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {d.caseStudy.back}
        </Link>
      </nav>

      <header className="mt-8 border-b border-line pb-10">
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t(project.title)}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{t(project.tagline)}</p>

        <ul className="mt-7 flex flex-wrap gap-1.5" aria-label={d.caseStudy.stack}>
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.repoUrl || project.liveUrl) && (
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:opacity-80"
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
                className="inline-flex items-center gap-1.5 text-accent hover:opacity-80"
              >
                <ExternalIcon className="h-4 w-4" />
                {d.projects.live}
              </a>
            )}
          </div>
        )}
      </header>

      <section aria-label={d.caseStudy.overview} className="border-b border-line py-10">
        <dl className="grid gap-6 sm:grid-cols-3">
          {(
            [
              [d.projects.problem, project.problem],
              [d.projects.solution, project.solution],
              [d.projects.result, project.result],
            ] as const
          ).map(([term, value]) => (
            <div key={term}>
              <dt className="font-mono text-[11px] uppercase tracking-wider text-accent">{term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{t(value)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mx-auto max-w-3xl">
        {sections.map((section, i) => {
          const Diagram = section.diagram ? DIAGRAMS[section.diagram] : null;

          return (
            <Reveal as="section" key={i} className="scroll-mt-24 pt-12">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t(section.heading)}
              </h2>

              <div className="mt-2 text-muted">
                <Markdown text={t(section.body)} />
              </div>

              {Diagram && <Diagram />}

              {section.code && (
                <CodeBlock
                  code={section.code.content}
                  language={section.code.language}
                  caption={section.code.caption ? t(section.code.caption) : undefined}
                />
              )}

            </Reveal>
          );
        })}
      </div>

      <footer className="mt-16 border-t border-line pt-8">
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-accent hover:opacity-80"
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          {d.caseStudy.back}
        </Link>
      </footer>
    </article>
  );
}
