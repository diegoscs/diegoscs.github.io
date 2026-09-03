#!/usr/bin/env node
// Gera public/og.png, a imagem de preview usada ao compartilhar o link.
// Rodar só quando o texto mudar:  npx --yes sharp-cli --version  ||  npm i -D sharp
//   node scripts/og-image.mjs
// O PNG fica commitado, então o build de produção não depende deste script.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const NAME = 'Diego Soares Candido da Silva';
const ROLE = 'ENGENHEIRO DE DADOS · DATA ENGINEER';
const TAGLINE = 'Pipelines em GCP, BigQuery, dbt, Python e Spark.';
const PLACE = 'São Paulo, Brasil · aberto a oportunidades';
const STACK = ['Python', 'SQL', 'dbt', 'BigQuery', 'PySpark', 'PostgreSQL'];

const INK = '#eaebed';
const MUTED = '#989da5';
const LINE = '#272a30';
const ACCENT = '#eeb347';
const BG = '#0b0c0e';

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Larguras aproximadas por caractere, o bastante para posicionar as pílulas.
const chipWidths = STACK.map((tech) => tech.length * 13 + 36);
let x = 80;
const chips = STACK.map((tech, i) => {
  const width = chipWidths[i];
  const rect = `<rect x="${x}" y="486" width="${width}" height="46" rx="9" fill="none" stroke="${LINE}"/>
    <text x="${x + width / 2}" y="515" font-size="22" fill="${MUTED}" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif">${escape(tech)}</text>`;
  x += width + 14;
  return rect;
}).join('\n  ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${ACCENT}"/>

  <circle cx="86" cy="112" r="6" fill="${ACCENT}"/>
  <text x="106" y="120" font-size="24" fill="${ACCENT}" letter-spacing="3" font-family="Segoe UI, Arial, Helvetica, sans-serif">${escape(ROLE)}</text>

  <text x="80" y="240" font-size="72" font-weight="bold" fill="${INK}" font-family="Segoe UI, Arial, Helvetica, sans-serif">${escape(NAME)}</text>

  <text x="80" y="330" font-size="32" fill="${MUTED}" font-family="Segoe UI, Arial, Helvetica, sans-serif">${escape(TAGLINE)}</text>
  <text x="80" y="382" font-size="32" fill="${MUTED}" font-family="Segoe UI, Arial, Helvetica, sans-serif">${escape(PLACE)}</text>

  ${chips}

  <text x="80" y="590" font-size="22" fill="#4a5058" font-family="Consolas, monospace">diegoscs.github.io</text>
</svg>`;

const sharp = (await import('sharp')).default;
const out = join(process.cwd(), 'public', 'og.png');
await sharp(Buffer.from(svg)).png().toFile(out);
writeFileSync(join(process.cwd(), 'scripts', 'og-image.svg'), svg, 'utf8');
console.log(`  Gerado ${out}`);
