import type { Localized } from './types';

// --- DADOS PESSOAIS -------------------------------------------------------
// Edite este arquivo para mudar hero, sobre, stack, experiência e contato.
// Todo texto visível é bilíngue: { pt, en }.

export const profile = {
  name: 'Diego Soares Candido da Silva',
  shortName: 'Diego Silva',
  location: { pt: 'São Paulo, SP — Brasil', en: 'São Paulo, Brazil' },
  // TODO: confirmar o e-mail que você quer publicar
  email: 'diego@exemplo.com',
  // TODO: substituir pelas URLs reais
  github: 'https://github.com/diegoscs',
  linkedin: 'https://www.linkedin.com/in/SEU-PERFIL',
  cv: {
    pt: '/cv/diego-silva-cv-pt.pdf',
    en: '/cv/diego-silva-cv-en.pdf',
  },
  role: {
    pt: 'Engenheiro de Dados Júnior',
    en: 'Junior Data Engineer',
  },
  headline: {
    pt: 'Construo pipelines que transformam dado bruto em decisão — de extratos bancários a jobs em Spark sobre Hadoop.',
    en: 'I build pipelines that turn raw data into decisions — from bank statements to Spark jobs on Hadoop.',
  },
  about: {
    pt: 'Sou analista de dados júnior na St Marche, rede de varejo premium, onde trabalho o dia a dia em GCP: modelos dbt sobre BigQuery, ingestões em Python rodando em Cloud Functions e o resultado chegando ao negócio em Power BI, com deploy versionado por GitHub Actions. Antes disso, na Prodesp, escrevi jobs em PySpark sobre Hadoop e trabalhei com Databricks — foi ali que aprendi a lidar com volume e com pipeline que não pode falhar em silêncio.',
    en: 'I am a junior data analyst at St Marche, a premium retail chain, working daily on GCP: dbt models over BigQuery, Python ingestion running on Cloud Functions, and results reaching the business through Power BI, deployed and versioned with GitHub Actions. Before that, at Prodesp, I wrote PySpark jobs on Hadoop and worked with Databricks — that is where I learned to handle volume and pipelines that must not fail silently.',
  },
  about2: {
    pt: 'Cheguei aos dados pelo suporte de infraestrutura, e essa origem ainda ajuda: sei onde as coisas quebram fora do SQL. Curso Ciência da Computação na Anhanguera, com conclusão em dezembro de 2026, e começo a pós em Machine Learning Engineering na FIAP em janeiro de 2027. Em paralelo toco a Candido Digital, minha operação de automação e desenvolvimento web para pequenos negócios. Estou aberto a oportunidades no Brasil e no exterior.',
    en: 'I got into data through infrastructure support, and that background still pays off: I know where things break outside SQL. I am studying Computer Science at Anhanguera, graduating in December 2026, and start a Machine Learning Engineering postgrad at FIAP in January 2027. Alongside that I run Candido Digital, my automation and web development practice for small businesses. I am open to opportunities in Brazil and abroad.',
  },
};

// --- STACK ----------------------------------------------------------------

export type StackGroup = { label: Localized; items: string[] };

export const stackGroups: StackGroup[] = [
  {
    label: { pt: 'Linguagens', en: 'Languages' },
    items: ['Python', 'SQL', 'PySpark', 'TypeScript', 'Bash'],
  },
  {
    label: { pt: 'Dados & Orquestração', en: 'Data & Orchestration' },
    items: ['dbt', 'Apache Spark', 'Hadoop', 'Databricks', 'n8n', 'Pandas', 'Modelagem dimensional'],
  },
  {
    label: { pt: 'Cloud', en: 'Cloud' },
    items: ['Google Cloud Platform', 'BigQuery', 'Cloud Functions', 'Cloud Storage', 'Supabase'],
  },
  {
    label: { pt: 'BI & Viz', en: 'BI & Viz' },
    items: ['Power BI', 'Metabase', 'Looker Studio'],
  },
  {
    label: { pt: 'DevOps', en: 'DevOps' },
    items: ['Git', 'GitHub Actions', 'Docker', 'Linux', 'PostgreSQL'],
  },
];

// --- EXPERIÊNCIA ----------------------------------------------------------

export type ExperienceItem = {
  company: string;
  role: Localized;
  period: Localized;
  current?: boolean;
  description: Localized;
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'St Marche',
    role: { pt: 'Analista de Dados Jr / Data Engineer', en: 'Junior Data Analyst / Data Engineer' },
    period: { pt: 'Atual', en: 'Current' },
    current: true,
    description: {
      pt: 'Pipelines e modelagem em GCP para uma rede de varejo premium: ingestões em Python rodando em Cloud Functions, transformação com dbt sobre BigQuery e entrega em Power BI, com deploy e agendamento versionados em GitHub Actions.',
      en: 'Pipelines and modelling on GCP for a premium retail chain: Python ingestion running on Cloud Functions, dbt transformation over BigQuery and delivery in Power BI, with deployment and scheduling versioned in GitHub Actions.',
    },
    stack: ['GCP', 'BigQuery', 'Python', 'SQL', 'dbt', 'Cloud Functions', 'Power BI', 'GitHub Actions'],
  },
  {
    company: 'Prodesp',
    role: { pt: 'Analista de Dados', en: 'Data Analyst' },
    period: { pt: 'jan/2025 – nov/2025', en: 'Jan 2025 – Nov 2025' },
    description: {
      pt: 'Desenvolvimento e manutenção de jobs em PySpark sobre Hadoop no ambiente de dados do governo do estado de São Paulo, com experiência prática em Databricks.',
      en: 'Development and maintenance of PySpark jobs on Hadoop in the São Paulo state government data environment, with hands-on experience in Databricks.',
    },
    stack: ['PySpark', 'Hadoop', 'Databricks', 'Python', 'SQL'],
  },
  {
    company: 'A3 Tech · Johnson & Johnson (via Algar T.I.)',
    role: { pt: 'Suporte Técnico de TI', en: 'IT Technical Support' },
    period: { pt: 'Antes da transição para dados', en: 'Before moving into data' },
    description: {
      pt: 'Atendimento e suporte de infraestrutura em ambiente corporativo — a base prática de redes, sistemas e resolução de incidentes que sustenta meu trabalho com dados hoje.',
      en: 'Corporate infrastructure support and service desk — the hands-on grounding in networks, systems and incident resolution that still underpins my data work today.',
    },
    stack: ['Windows Server', 'Redes', 'Active Directory', 'ITIL'],
  },
];

// --- FORMAÇÃO E CERTIFICAÇÕES --------------------------------------------

export type EducationItem = {
  institution: string;
  title: Localized;
  period: Localized;
  note?: Localized;
};

export const education: EducationItem[] = [
  {
    institution: 'Anhanguera',
    title: { pt: 'Bacharelado em Ciência da Computação', en: 'BSc in Computer Science' },
    period: { pt: 'Conclusão em dez/2026', en: 'Graduating Dec 2026' },
  },
  {
    institution: 'FIAP',
    title: {
      pt: 'Pós-graduação em Machine Learning Engineering',
      en: 'Postgraduate in Machine Learning Engineering',
    },
    period: { pt: 'A partir de jan/2027', en: 'Starting Jan 2027' },
  },
];

// TODO: adicionar suas certificações reais (ex: Google Cloud, dbt, Databricks)
export const certifications: EducationItem[] = [];
