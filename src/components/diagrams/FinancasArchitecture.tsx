'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

/**
 * Diagrama de arquitetura desenhado à mão em SVG (sem lib de gráfico).
 * Cores vêm dos tokens do tema, então funciona em dark e light mode.
 */
export function FinancasArchitecture() {
  const { locale } = useLanguage();
  const pt = locale === 'pt';

  const label = {
    telegram: pt ? 'Bot do Telegram' : 'Telegram bot',
    telegramSub: pt ? 'envia o extrato de qualquer lugar' : 'sends the statement from anywhere',
    sources: pt ? 'Extratos OFX e XLSX' : 'OFX and XLSX statements',
    sourcesSub: pt ? 'Nubank · Itaú' : 'Nubank · Itaú',
    ingest: pt ? 'Parser + normalização' : 'Parser + normalisation',
    ingestSub: pt ? 'TypeScript' : 'TypeScript',
    supabase: pt ? 'Supabase — Auth e RLS por usuário' : 'Supabase — Auth and per-user RLS',
    postgres: 'PostgreSQL',
    bronze: pt ? 'bronze — transação como veio' : 'bronze — transaction as received',
    silver: pt ? 'silver — schema único + categoria' : 'silver — single schema + category',
    gold: pt ? 'gold — agregações por período' : 'gold — aggregates by period',
    app: pt ? 'App Next.js' : 'Next.js app',
    appSub: pt ? 'Vercel · dashboards' : 'Vercel · dashboards',
    hash: pt
      ? 'hash natural sha256(conta|data|valor|descrição|ocorrência) — reenviar o mesmo extrato não duplica'
      : 'natural hash sha256(account|date|amount|description|occurrence) — re-sending a statement never duplicates',
    title: pt
      ? 'Fluxo do pipeline de finanças pessoais: extratos OFX e XLSX enviados pelo bot do Telegram, normalizados em TypeScript, gravados nas camadas bronze, silver e gold do Postgres no Supabase e consumidos por um app Next.js na Vercel'
      : 'Personal finance pipeline flow: OFX and XLSX statements sent through the Telegram bot, normalised in TypeScript, written to the bronze, silver and gold layers of Postgres on Supabase and consumed by a Next.js app on Vercel',
  };

  const ink = 'rgb(var(--ink))';
  const muted = 'rgb(var(--muted))';
  const line = 'rgb(var(--line))';
  const accent = 'rgb(var(--accent))';
  const elevated = 'rgb(var(--elevated))';

  return (
    <figure className="my-8 overflow-x-auto rounded-xl border border-line bg-elevated p-4">
      <svg
        viewBox="0 0 960 330"
        role="img"
        aria-label={label.title}
        className="h-auto w-full min-w-[720px]"
      >
        <title>{label.title}</title>

        <defs>
          <marker
            id="arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill={accent} />
          </marker>
        </defs>

        {/* Gatilho: o bot do Telegram */}
        <g>
          <rect
            x="222"
            y="20"
            width="180"
            height="54"
            rx="10"
            fill="none"
            stroke={accent}
            strokeOpacity="0.7"
          />
          <text x="312" y="43" fontSize="13" fill={accent} textAnchor="middle" fontWeight="600">
            {label.telegram}
          </text>
          <text x="312" y="61" fontSize="10" fill={muted} textAnchor="middle">
            {label.telegramSub}
          </text>
        </g>
        <line
          x1="312"
          y1="76"
          x2="312"
          y2="136"
          stroke={accent}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* 1 — Fontes */}
        <g>
          <rect x="20" y="140" width="170" height="76" rx="10" fill="none" stroke={line} />
          <text x="105" y="172" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.sources}
          </text>
          <text x="105" y="192" fontSize="11" fill={muted} textAnchor="middle">
            {label.sourcesSub}
          </text>
        </g>
        <line
          x1="192"
          y1="178"
          x2="218"
          y2="178"
          stroke={accent}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* 2 — Ingestão */}
        <g>
          <rect x="222" y="140" width="180" height="76" rx="10" fill="none" stroke={line} />
          <text x="312" y="172" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.ingest}
          </text>
          <text x="312" y="192" fontSize="11" fill={muted} textAnchor="middle">
            {label.ingestSub}
          </text>
        </g>
        <line
          x1="404"
          y1="178"
          x2="430"
          y2="178"
          stroke={accent}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* 3 — Supabase com as três camadas */}
        <g>
          <rect
            x="434"
            y="96"
            width="286"
            height="176"
            rx="12"
            fill="none"
            stroke={accent}
            strokeOpacity="0.45"
            strokeDasharray="6 5"
          />
          <text x="577" y="88" fontSize="11" fill={accent} textAnchor="middle" fontFamily="var(--font-mono)">
            {label.supabase}
          </text>
          <text x="577" y="118" fontSize="12" fill={ink} textAnchor="middle" fontWeight="600">
            {label.postgres}
          </text>

          <rect x="450" y="128" width="254" height="28" rx="6" fill={elevated} stroke={line} />
          <text x="577" y="146" fontSize="11" fill={ink} textAnchor="middle">
            {label.bronze}
          </text>

          <path d="M577 158 L577 166" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <rect x="450" y="170" width="254" height="28" rx="6" fill={elevated} stroke={line} />
          <text x="577" y="188" fontSize="11" fill={ink} textAnchor="middle">
            {label.silver}
          </text>

          <path d="M577 200 L577 208" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <rect x="450" y="212" width="254" height="28" rx="6" fill={elevated} stroke={line} />
          <text x="577" y="230" fontSize="11" fill={ink} textAnchor="middle">
            {label.gold}
          </text>
        </g>
        <line
          x1="722"
          y1="178"
          x2="748"
          y2="178"
          stroke={accent}
          strokeWidth="1.5"
          markerEnd="url(#arrowhead)"
        />

        {/* 4 — App de consumo */}
        <g>
          <rect x="752" y="140" width="180" height="76" rx="10" fill="none" stroke={line} />
          <text x="842" y="172" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.app}
          </text>
          <text x="842" y="192" fontSize="11" fill={muted} textAnchor="middle">
            {label.appSub}
          </text>
        </g>

        {/* Portão de idempotência entre a ingestão e a bronze */}
        <path
          d="M312 220 L312 286 L577 286 L577 250"
          fill="none"
          stroke={muted}
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <text
          x="444"
          y="308"
          fontSize="11"
          fill={muted}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
        >
          {label.hash}
        </text>
      </svg>
      <figcaption className="sr-only">{label.title}</figcaption>
    </figure>
  );
}
