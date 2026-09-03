'use client';

import { useMemo, useState } from 'react';
import { getAllProjects, getAllTechnologies } from '@/content/projects';
import { useLanguage } from '@/i18n/LanguageProvider';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

const ALL = '__all__';

export function Projects() {
  const { d } = useLanguage();
  const [filter, setFilter] = useState<string>(ALL);

  // A lista e o filtro saem do índice de conteúdo: adicionar um projeto
  // é criar um arquivo, nunca editar este componente.
  const projects = useMemo(() => getAllProjects(), []);
  const technologies = useMemo(() => getAllTechnologies(), []);

  const visible = filter === ALL ? projects : projects.filter((p) => p.stack.includes(filter));

  return (
    <section id="projetos" className="section" aria-labelledby="projetos-titulo">
      <div className="container-page">
        <div id="projetos-titulo">
          <SectionHeading
            index="03"
            title={d.sections.projects}
            subtitle={d.sections.projectsSubtitle}
          />
        </div>

        <div
          role="group"
          aria-label={d.projects.filterLabel}
          className="mb-8 flex flex-wrap gap-1.5"
        >
          <FilterChip
            active={filter === ALL}
            onClick={() => setFilter(ALL)}
            label={d.projects.all}
          />
          {technologies.map((tech) => (
            <FilterChip
              key={tech}
              active={filter === tech}
              onClick={() => setFilter(tech)}
              label={tech}
            />
          ))}
        </div>

        <p aria-live="polite" className="mb-6 font-mono text-xs text-muted">
          {d.projects.count(visible.length)}
        </p>

        {visible.length === 0 ? (
          <p className="text-sm text-muted">{d.projects.empty}</p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {visible.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={Math.min(i, 4) * 70} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${
        active
          ? 'border-accent bg-accent text-surface'
          : 'border-line text-muted hover:border-accent/50 hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}
