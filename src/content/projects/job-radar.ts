import type { Project } from '../types';

const project: Project = {
  slug: 'job-radar',
  order: 3,
  featured: true,
  title: {
    pt: 'Job Radar',
    en: 'Job Radar',
  },
  tagline: {
    pt: 'Coleta vagas de Greenhouse e Gupy, filtra por whitelist de empresas e mantém o funil de candidaturas no Notion.',
    en: 'Pulls jobs from Greenhouse and Gupy, filters by a company whitelist and keeps the application funnel in Notion.',
  },
  problem: {
    pt: 'Acompanhar vagas em dezenas de páginas de carreira toma tempo, e o status de cada candidatura se perde entre a caixa de entrada e a memória.',
    en: 'Watching openings across dozens of career pages takes time, and the status of each application gets lost between the inbox and memory.',
  },
  solution: {
    pt: 'Workflows em n8n consomem as APIs de vagas, filtram por uma whitelist de empresas, gravam as vagas novas no Notion e mandam um resumo no Telegram. Um segundo fluxo monitora o e-mail, classifica as mensagens com IA (convite para entrevista, recusa, teste técnico) e atualiza o status da candidatura correspondente.',
    en: 'n8n workflows consume the job APIs, filter by a company whitelist, write new openings to Notion and send a Telegram digest. A second flow monitors email, classifies messages with AI (interview invite, rejection, take-home) and updates the status of the matching application.',
  },
  result: {
    pt: 'Vagas relevantes chegam sozinhas e o funil no Notion reflete o estado real das candidaturas sem atualização manual.',
    en: 'Relevant openings arrive on their own and the Notion funnel reflects the real state of each application with no manual updates.',
  },
  stack: ['n8n', 'Notion API', 'Telegram API', 'Python', 'IA / LLM', 'REST APIs'],
  // Repositório ainda privado — descomente quando publicar:
  // repoUrl: '',
};

export default project;
