import type { Project } from '../types';

const project: Project = {
  slug: 'pipeline-fipe',
  order: 5,
  featured: false,
  title: {
    pt: 'Pipeline FIPE',
    en: 'FIPE Pipeline',
  },
  tagline: {
    pt: 'Extração e modelagem dos preços de veículos da Tabela FIPE em um dataset consultável.',
    en: 'Extraction and modelling of vehicle prices from the FIPE table into a queryable dataset.',
  },
  problem: {
    pt: 'A Tabela FIPE é navegada em cascata — marca, modelo, ano — e cada consulta devolve um preço isolado, sem visão comparativa nem histórico.',
    en: 'The FIPE table is browsed as a cascade — brand, model, year — and each query returns one isolated price, with no comparison and no history.',
  },
  solution: {
    pt: 'Extração percorrendo a hierarquia de marcas, modelos e anos, com normalização de nomes e tipos, carga em tabelas modeladas e histórico por referência mensal.',
    en: 'Extraction walking the brand, model and year hierarchy, with name and type normalisation, load into modelled tables and history kept per monthly reference.',
  },
  result: {
    pt: 'Base própria de preços que permite comparar modelos, acompanhar depreciação por ano e cruzar categorias.',
    en: 'A private price base that allows comparing models, tracking depreciation by year and cross-referencing categories.',
  },
  stack: ['Python', 'Pandas', 'SQL', 'REST APIs', 'ETL'],
  // Repositório ainda privado — descomente quando publicar:
  // repoUrl: '',
};

export default project;
