import type { Project } from '../types';

// --- REGISTRO DE PROJETOS -------------------------------------------------
// Um arquivo por projeto, nomeado pelo slug. Para adicionar um projeto:
// rode `npm run new:project` (ele cria o arquivo e registra aqui sozinho),
// ou crie o arquivo à mão e adicione o import + a entrada na lista abaixo.
// A ordem de exibição vem do campo `order`, não da ordem deste array.
import automationHub from './automation-hub';
import candidoDigital from './candido-digital';
import financasPessoais from './financas-pessoais';
import jobRadar from './job-radar';
import pipelineFipe from './pipeline-fipe';
import scraperCeagesp from './scraper-ceagesp';
import simuladorFinanciamento from './simulador-financiamento';

const projects: Project[] = [
  // new:project inserts here
  automationHub,
  candidoDigital,
  financasPessoais,
  jobRadar,
  pipelineFipe,
  scraperCeagesp,
  simuladorFinanciamento,
];

/** Todos os projetos, ordenados por `order` (menor primeiro). */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Só os projetos que têm case study — são estes que viram página de detalhe. */
export function getProjectsWithCaseStudy(): Project[] {
  return getAllProjects().filter((project) => project.caseStudy);
}

/** Lista única de tecnologias, derivada dos campos `stack`. Alimenta o filtro. */
export function getAllTechnologies(): string[] {
  const technologies = new Set<string>();
  for (const project of projects) {
    for (const tech of project.stack) technologies.add(tech);
  }
  return [...technologies].sort((a, b) => a.localeCompare(b));
}
