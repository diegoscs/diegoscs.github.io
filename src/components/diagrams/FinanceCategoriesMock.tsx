'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

/**
 * Mockup ilustrativo da tela "Quanto gastei · Cartão".
 * Reproduz o layout da interface real; os valores são fictícios de propósito.
 */
export function FinanceCategoriesMock() {
  const { locale } = useLanguage();
  const pt = locale === 'pt';

  const l = {
    tab1: pt ? 'Geral' : 'Overview',
    tab2: pt ? 'Cartão' : 'Card',
    tab3: 'Pix',
    period: pt ? 'Março/2026' : 'March 2026',
    billLabel: pt ? 'FATURA — O QUE VOU PAGAR' : 'BILL — WHAT I WILL PAY',
    entries: pt ? '31 lançamentos · Itaú e Nubank' : '31 entries · Itaú and Nubank',
    cycle: pt
      ? 'Compras de 02/03 a 31/03 — o ciclo fecha antes do fim do mês.'
      : 'Purchases from 02/03 to 31/03 — the cycle closes before month end.',
    composition: pt ? 'COMPOSIÇÃO' : 'BREAKDOWN',
    byCategory: pt ? 'POR CATEGORIA' : 'BY CATEGORY',
    illustrative: pt ? 'mockup ilustrativo · valores fictícios' : 'illustrative mockup · fictional figures',
    title: pt
      ? 'Mockup da tela de fatura do cartão: total do mês, gráfico de rosca com a composição e lista de gastos por categoria'
      : 'Mockup of the card bill screen: monthly total, a donut chart of the breakdown and a list of spend by category',
  };

  const ink = 'rgb(var(--ink))';
  const muted = 'rgb(var(--muted))';
  const line = 'rgb(var(--line))';
  const accent = 'rgb(var(--accent))';
  const surface = 'rgb(var(--surface))';

  const categories = [
    { name: pt ? 'Não classificado' : 'Uncategorised', pct: 40, value: 'R$ 720,00', opacity: 0.22 },
    { name: pt ? 'Lazer' : 'Leisure', pct: 20, value: 'R$ 360,00', opacity: 1 },
    { name: pt ? 'Assinaturas' : 'Subscriptions', pct: 15, value: 'R$ 270,00', opacity: 0.8 },
    { name: pt ? 'Transporte' : 'Transport', pct: 12, value: 'R$ 216,00', opacity: 0.6 },
    { name: pt ? 'Alimentação fora' : 'Eating out', pct: 8, value: 'R$ 144,00', opacity: 0.45 },
    { name: pt ? 'Mercado' : 'Groceries', pct: 5, value: 'R$ 90,00', opacity: 0.32 },
  ];

  // rosca: circunferência de raio 54 ≈ 339.29
  const circumference = 339.29;
  let cumulative = 0;

  return (
    <figure className="my-7 overflow-x-auto rounded-xl border border-line bg-elevated p-4">
      <svg viewBox="0 0 660 400" role="img" aria-label={l.title} className="h-auto w-full min-w-[560px]">
        <title>{l.title}</title>

        {/* abas */}
        <g fontFamily="var(--font-sans)">
          <rect x="20" y="16" width="620" height="34" rx="8" fill={surface} stroke={line} />
          <text x="38" y="37" fontSize="11" fill={muted}>
            {l.tab1}
          </text>
          <rect x="82" y="24" width="60" height="18" rx="6" fill={accent} fillOpacity="0.16" />
          <text x="112" y="37" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
            {l.tab2}
          </text>
          <text x="160" y="37" fontSize="11" fill={muted}>
            {l.tab3}
          </text>
          <rect x="530" y="24" width="100" height="18" rx="6" fill="none" stroke={line} />
          <text x="580" y="37" fontSize="10" fill={muted} textAnchor="middle">
            {l.period}
          </text>
        </g>

        {/* total da fatura */}
        <g fontFamily="var(--font-sans)">
          <rect x="20" y="62" width="620" height="96" rx="10" fill={surface} stroke={line} />
          <text x="40" y="86" fontSize="9" fill={muted} letterSpacing="1.2" fontFamily="var(--font-mono)">
            {l.billLabel}
          </text>
          <text x="40" y="120" fontSize="28" fill={ink} fontWeight="700">
            R$ 1.800,00
          </text>
          <text x="40" y="138" fontSize="10" fill={muted}>
            {l.entries}
          </text>
          <text x="40" y="152" fontSize="10" fill={muted}>
            {l.cycle}
          </text>
        </g>

        {/* rosca */}
        <g fontFamily="var(--font-sans)">
          <text x="20" y="182" fontSize="9" fill={muted} letterSpacing="1.2" fontFamily="var(--font-mono)">
            {l.composition}
          </text>
          <rect x="20" y="192" width="220" height="176" rx="10" fill={surface} stroke={line} />
          <g transform="translate(130, 280) rotate(-90)">
            {categories.map((category) => {
              const length = (category.pct / 100) * circumference;
              const offset = -(cumulative / 100) * circumference;
              cumulative += category.pct;
              return (
                <circle
                  key={category.name}
                  r="54"
                  fill="none"
                  stroke={accent}
                  strokeOpacity={category.opacity}
                  strokeWidth="22"
                  strokeDasharray={`${length.toFixed(2)} ${circumference}`}
                  strokeDashoffset={offset.toFixed(2)}
                />
              );
            })}
          </g>
        </g>

        {/* lista por categoria */}
        <g fontFamily="var(--font-sans)">
          <text x="256" y="182" fontSize="9" fill={muted} letterSpacing="1.2" fontFamily="var(--font-mono)">
            {l.byCategory}
          </text>
          <rect x="256" y="192" width="384" height="176" rx="10" fill={surface} stroke={line} />
          {categories.map((category, i) => {
            const y = 192 + i * 29;
            return (
              <g key={category.name}>
                {i > 0 && <line x1="256" y1={y} x2="640" y2={y} stroke={line} />}
                <rect
                  x="272"
                  y={y + 11}
                  width="9"
                  height="9"
                  rx="2.5"
                  fill={accent}
                  fillOpacity={category.opacity}
                />
                <text x="292" y={y + 19} fontSize="11" fill={ink}>
                  {category.name}
                </text>
                <text x="556" y={y + 19} fontSize="11" fill={muted} textAnchor="end">
                  {category.pct}%
                </text>
                <text x="624" y={y + 19} fontSize="11" fill={ink} textAnchor="end" fontWeight="600">
                  {category.value}
                </text>
              </g>
            );
          })}
        </g>

        <text x="20" y="390" fontSize="10" fill={muted} fontFamily="var(--font-mono)">
          {l.illustrative}
        </text>
      </svg>
      <figcaption className="sr-only">{l.title}</figcaption>
    </figure>
  );
}
