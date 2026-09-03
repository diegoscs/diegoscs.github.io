export type Locale = 'pt' | 'en';

/** Todo texto de conteúdo é bilíngue. */
export type Localized = { pt: string; en: string };

export type CodeLanguage = 'python' | 'sql' | 'yaml' | 'bash' | 'ts' | 'json';

/** Ids de diagramas SVG desenhados à mão em src/components/diagrams. */
export type DiagramId =
  | 'financas-architecture'
  | 'financas-dashboard-geral'
  | 'financas-dashboard-categorias';

export type CaseStudySection = {
  heading: Localized;
  /** Markdown simples: parágrafos, **negrito**, `código`, listas com "- " e [links](url). */
  body: Localized;
  image?: { src: string; alt: Localized };
  code?: { language: CodeLanguage; content: string; caption?: Localized };
  diagram?: DiagramId;
};

export type CaseStudy = {
  sections: CaseStudySection[];
};

export type Project = {
  /** Igual ao nome do arquivo em src/content/projects/ e à URL /projetos/[slug]. */
  slug: string;
  /** Ordem de exibição na home (menor primeiro). */
  order: number;
  featured: boolean;
  title: Localized;
  /** 1 linha, aparece no card. */
  tagline: Localized;
  problem: Localized;
  solution: Localized;
  result: Localized;
  /** Alimenta o filtro por tecnologia da home. */
  stack: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Caminho dentro de /public, ex: "/projects/financas-cover.png". */
  cover?: string;
  /** Se existir, gera a página de detalhe /projetos/[slug]. */
  caseStudy?: CaseStudy;
};
