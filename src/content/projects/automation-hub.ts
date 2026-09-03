import type { Project } from '../types';

const project: Project = {
  slug: 'automation-hub',
  order: 2,
  featured: true,
  title: {
    pt: 'Automation Hub',
    en: 'Automation Hub',
  },
  tagline: {
    pt: 'n8n em Docker orquestrando jobs Python, com log de execução em Postgres e alertas no Telegram.',
    en: 'n8n on Docker orchestrating Python jobs, with an execution log in Postgres and Telegram alerts.',
  },
  problem: {
    pt: 'Automações espalhadas em cron e scripts avulsos: quando uma falhava — ou simplesmente não rodava — eu só descobria dias depois, ao notar o dado faltando.',
    en: 'Automations scattered across cron jobs and one-off scripts: when one failed — or simply never ran — I only found out days later, when the data was missing.',
  },
  solution: {
    pt: 'Um n8n autohospedado em Docker centraliza o agendamento e dispara os jobs Python. Cada execução grava início, sucesso ou erro numa tabela de log no Postgres, os erros viram alerta no Telegram e um watchdog compara o esperado com o executado para avisar quando um job "não rodou hoje".',
    en: 'A self-hosted n8n on Docker centralises scheduling and triggers the Python jobs. Every run writes start, success or error to a log table in Postgres, failures raise a Telegram alert, and a watchdog compares expected against actual runs to flag jobs that "did not run today".',
  },
  result: {
    pt: 'Uma superfície única para agendar, um histórico consultável de execuções e falha silenciosa detectada no mesmo dia em vez de na semana seguinte.',
    en: 'One surface for scheduling, a queryable run history, and silent failures caught the same day instead of the following week.',
  },
  stack: ['n8n', 'Docker', 'Python', 'PostgreSQL', 'Telegram API'],
  // Repositório ainda privado — descomente quando publicar:
  // repoUrl: '',
};

export default project;
