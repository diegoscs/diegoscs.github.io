#!/usr/bin/env node
// Cria um arquivo de projeto pré-preenchido e o registra no índice.
// Uso: npm run new:project  (pergunta o slug)  |  npm run new:project -- meu-slug

import { createInterface } from 'node:readline/promises';
import { stdin, stdout, exit } from 'node:process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PROJECTS_DIR = join(process.cwd(), 'src', 'content', 'projects');
const INDEX_FILE = join(PROJECTS_DIR, 'index.ts');
const MARKER = '  // new:project inserts here';

function toCamelCase(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());
}

function template(slug, order) {
  return `import type { Project } from '../types';

const project: Project = {
  slug: '${slug}',
  order: ${order},
  featured: false,
  title: { pt: '', en: '' },
  tagline: { pt: '', en: '' },
  problem: { pt: '', en: '' },
  solution: { pt: '', en: '' },
  result: { pt: '', en: '' },
  stack: [],
  // repoUrl: '',
  // liveUrl: '',
  // cover: '/projects/${slug}-cover.png',

  // Descomente para gerar a página /projetos/${slug}:
  // caseStudy: {
  //   sections: [
  //     {
  //       heading: { pt: '', en: '' },
  //       body: { pt: '', en: '' },
  //     },
  //   ],
  // },
};

export default project;
`;
}

async function main() {
  let slug = process.argv[2];

  if (!slug) {
    const rl = createInterface({ input: stdin, output: stdout });
    slug = (await rl.question('Slug do projeto (ex: pipeline-clima): ')).trim();
    rl.close();
  }

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    console.error(`\n  Slug inválido: "${slug}". Use apenas letras minúsculas, números e hífens.\n`);
    exit(1);
  }

  const file = join(PROJECTS_DIR, `${slug}.ts`);
  if (existsSync(file)) {
    console.error(`\n  Já existe src/content/projects/${slug}.ts\n`);
    exit(1);
  }

  let index = readFileSync(INDEX_FILE, 'utf8');
  if (!index.includes(MARKER)) {
    console.error(`\n  Marcador não encontrado em index.ts. Adicione a linha:\n${MARKER}\n`);
    exit(1);
  }

  // order = próximo número livre, para o projeto novo entrar no fim da lista
  const nextOrder = Math.max(0, ...existingOrders()) + 1;

  const identifier = toCamelCase(slug);
  index = index
    .replace(
      /\nconst projects: Project\[\]/,
      `\nimport ${identifier} from './${slug}';\n\nconst projects: Project[]`,
    )
    .replace(MARKER, `${MARKER}\n  ${identifier},`);

  writeFileSync(file, template(slug, nextOrder), 'utf8');
  writeFileSync(INDEX_FILE, index, 'utf8');

  console.log(`
  Criado  src/content/projects/${slug}.ts   (order: ${nextOrder})
  Registrado em src/content/projects/index.ts

  Agora preencha os campos pt/en do arquivo. O projeto já aparece na home.
`);
}

/** Lê os campos `order` dos arquivos de projeto existentes. */
function existingOrders() {
  const orders = [];
  for (const name of readdirSync(PROJECTS_DIR)) {
    if (name === 'index.ts' || !name.endsWith('.ts')) continue;
    const match = /order:\s*(\d+)/.exec(readFileSync(join(PROJECTS_DIR, name), 'utf8'));
    if (match) orders.push(Number(match[1]));
  }
  return orders;
}

main().catch((error) => {
  console.error(error);
  exit(1);
});
