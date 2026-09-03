import type { Project } from '../types';

const project: Project = {
  slug: 'candido-digital',
  order: 7,
  featured: true,
  title: {
    pt: 'Candido Digital',
    en: 'Candido Digital',
  },
  tagline: {
    pt: 'Operação freelance de automação e web para PMEs — sites, dashboards e a Secretária Virtual no WhatsApp.',
    en: 'Freelance automation and web practice for small businesses — sites, dashboards and the WhatsApp Virtual Receptionist.',
  },
  problem: {
    pt: 'Pequenos negócios perdem cliente no primeiro contato: mensagem no WhatsApp fora do horário, agenda em papel e nenhuma visão de quantos atendimentos viraram venda.',
    en: 'Small businesses lose customers at first contact: WhatsApp messages after hours, a paper calendar and no view of how many conversations turned into sales.',
  },
  solution: {
    pt: 'Entrego sites, dashboards e automações sob medida. O carro-chefe é a Secretária Virtual: uma recepcionista de WhatsApp com IA que atende, qualifica e agenda sozinha — n8n orquestrando, Evolution API na conexão com o WhatsApp, Redis mantendo o contexto da conversa, Supabase como base de clientes e agendamentos e Google Calendar fechando o horário.',
    en: 'I deliver websites, dashboards and bespoke automations. The flagship is the Virtual Receptionist: an AI WhatsApp agent that answers, qualifies and books on its own — n8n orchestrating, Evolution API on the WhatsApp connection, Redis holding conversation context, Supabase as the customer and booking base, and Google Calendar closing the slot.',
  },
  result: {
    pt: 'Atendimento 24/7 sem contratar equipe, agenda preenchida automaticamente e histórico de conversas virando dado para o negócio.',
    en: 'Round-the-clock service without hiring, a calendar that fills itself, and conversation history turned into business data.',
  },
  stack: ['n8n', 'Evolution API', 'Redis', 'Supabase', 'Google Calendar API', 'IA / LLM', 'Next.js', 'Docker'],
  // TODO: substituir pela URL real do site
  liveUrl: 'https://candidodigital.com.br',
};

export default project;
