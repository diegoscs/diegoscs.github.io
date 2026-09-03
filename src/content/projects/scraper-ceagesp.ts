import type { Project } from '../types';

const project: Project = {
  slug: 'scraper-ceagesp',
  order: 4,
  featured: false,
  title: {
    pt: 'Scraper CEAGESP',
    en: 'CEAGESP Scraper',
  },
  tagline: {
    pt: 'Coleta automatizada das cotações do atacado hortifrúti, sempre na data mais recente publicada.',
    en: 'Automated collection of wholesale produce quotes, always from the latest published date.',
  },
  problem: {
    pt: 'As cotações do CEAGESP só existem em um formulário web, uma categoria por vez, sem API nem histórico para download.',
    en: 'CEAGESP quotes only exist behind a web form, one category at a time, with no API and no downloadable history.',
  },
  solution: {
    pt: 'Um scraper em Python resolve a data mais recente disponível no formulário, itera todas as categorias de produto, faz o parse das tabelas e consolida tudo num dataset tabular por data e produto.',
    en: 'A Python scraper resolves the most recent available date in the form, iterates every product category, parses the tables and consolidates everything into a tabular dataset by date and product.',
  },
  result: {
    pt: 'Série histórica própria de preços do atacado, pronta para análise de sazonalidade e variação por produto.',
    en: 'A private historical series of wholesale prices, ready for seasonality and per-product variation analysis.',
  },
  stack: ['Python', 'BeautifulSoup', 'Pandas', 'Web Scraping'],
  // Repositório ainda privado — descomente quando publicar:
  // repoUrl: '',
};

export default project;
