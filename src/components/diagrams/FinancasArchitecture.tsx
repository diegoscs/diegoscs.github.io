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
    orchestrator: pt
      ? 'GitHub Actions — agenda (cron diário) e executa o pipeline'
      : 'GitHub Actions — schedules (daily cron) and runs the pipeline',
    telegram: pt ? 'Bot do Telegram' : 'Telegram bot',
    telegramSub: pt ? 'upload do extrato' : 'statement upload',
    ingest: pt ? 'Ingestão Python' : 'Python ingestion',
    ingestSub: pt ? 'parser OFX + XLSX' : 'OFX + XLSX parser',
    store: 'Supabase',
    storeSub: 'PostgreSQL',
    transform: 'dbt-core',
    bronze: pt ? 'bronze — extrato bruto' : 'bronze — raw statement',
    silver: pt ? 'silver — normalizado' : 'silver — normalised',
    gold: pt ? 'gold — fato + dimensão' : 'gold — fact + dimension',
    bi: 'Metabase',
    biSub: pt ? 'dashboards' : 'dashboards',
    title: pt
      ? 'Fluxo do pipeline de finanças pessoais, do bot do Telegram até os dashboards no Metabase, orquestrado por GitHub Actions'
      : 'Personal finance pipeline flow, from the Telegram bot to Metabase dashboards, orchestrated by GitHub Actions',
  };

  const ink = 'rgb(var(--ink))';
  const muted = 'rgb(var(--muted))';
  const line = 'rgb(var(--line))';
  const accent = 'rgb(var(--accent))';
  const elevated = 'rgb(var(--elevated))';

  return (
    <figure className="my-8 overflow-x-auto rounded-xl border border-line bg-elevated p-4">
      <svg
        viewBox="0 0 960 340"
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

        {/* Orquestrador: envolve todo o fluxo */}
        <rect
          x="16"
          y="52"
          width="928"
          height="248"
          rx="14"
          fill="none"
          stroke={accent}
          strokeOpacity="0.45"
          strokeDasharray="6 5"
        />
        <text x="32" y="38" fontSize="12" fill={accent} fontFamily="var(--font-mono)">
          {label.orchestrator}
        </text>

        {/* 1 — Telegram */}
        <g>
          <rect x="40" y="140" width="150" height="72" rx="10" fill="none" stroke={line} />
          <text x="115" y="170" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.telegram}
          </text>
          <text x="115" y="190" fontSize="11" fill={muted} textAnchor="middle">
            {label.telegramSub}
          </text>
        </g>
        <line x1="192" y1="176" x2="218" y2="176" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* 2 — Ingestão */}
        <g>
          <rect x="222" y="140" width="150" height="72" rx="10" fill="none" stroke={line} />
          <text x="297" y="170" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.ingest}
          </text>
          <text x="297" y="190" fontSize="11" fill={muted} textAnchor="middle">
            {label.ingestSub}
          </text>
        </g>
        <line x1="374" y1="176" x2="400" y2="176" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* 3 — Supabase */}
        <g>
          <rect x="404" y="140" width="150" height="72" rx="10" fill="none" stroke={line} />
          <text x="479" y="170" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.store}
          </text>
          <text x="479" y="190" fontSize="11" fill={muted} textAnchor="middle">
            {label.storeSub}
          </text>
        </g>
        <line x1="556" y1="176" x2="582" y2="176" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* 4 — dbt com as três camadas */}
        <g>
          <rect x="586" y="104" width="200" height="144" rx="10" fill="none" stroke={accent} strokeOpacity="0.7" />
          <text x="686" y="126" fontSize="13" fill={accent} textAnchor="middle" fontWeight="600">
            {label.transform}
          </text>

          <rect x="602" y="138" width="168" height="26" rx="6" fill={elevated} stroke={line} />
          <text x="686" y="155" fontSize="11" fill={ink} textAnchor="middle">
            {label.bronze}
          </text>

          <path d="M686 166 L686 174" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <rect x="602" y="178" width="168" height="26" rx="6" fill={elevated} stroke={line} />
          <text x="686" y="195" fontSize="11" fill={ink} textAnchor="middle">
            {label.silver}
          </text>

          <path d="M686 206 L686 214" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

          <rect x="602" y="218" width="168" height="26" rx="6" fill={elevated} stroke={line} />
          <text x="686" y="235" fontSize="11" fill={ink} textAnchor="middle">
            {label.gold}
          </text>
        </g>
        <line x1="788" y1="176" x2="814" y2="176" stroke={accent} strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        {/* 5 — Metabase */}
        <g>
          <rect x="818" y="140" width="120" height="72" rx="10" fill="none" stroke={line} />
          <text x="878" y="170" fontSize="13" fill={ink} textAnchor="middle" fontWeight="600">
            {label.bi}
          </text>
          <text x="878" y="190" fontSize="11" fill={muted} textAnchor="middle">
            {label.biSub}
          </text>
        </g>

        {/* Retorno: dbt build também roda os testes e falha o workflow */}
        <path
          d="M686 262 L686 282 L297 282 L297 216"
          fill="none"
          stroke={muted}
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />
        <text x="490" y="298" fontSize="11" fill={muted} textAnchor="middle" fontFamily="var(--font-mono)">
          {pt ? 'dbt test falhou → reprocessa a bronze' : 'dbt test failed → reprocess bronze'}
        </text>
      </svg>
      <figcaption className="sr-only">{label.title}</figcaption>
    </figure>
  );
}
