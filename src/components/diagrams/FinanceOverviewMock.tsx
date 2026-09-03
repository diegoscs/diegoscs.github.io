'use client';

import { useLanguage } from '@/i18n/LanguageProvider';

/**
 * Mockup ilustrativo da tela "Quanto gastei · Geral".
 * Reproduz o layout da interface real; os valores são fictícios de propósito.
 */
export function FinanceOverviewMock() {
  const { locale } = useLanguage();
  const pt = locale === 'pt';

  const l = {
    tab1: pt ? 'Geral' : 'Overview',
    tab2: pt ? 'Cartão' : 'Card',
    tab3: 'Pix',
    period: pt ? 'Todo o período' : 'All time',
    spentLabel: pt ? 'GASTEI · TODO O PERÍODO' : 'SPENT · ALL TIME',
    card: pt ? 'Cartão' : 'Card',
    pix: pt ? 'Pix e boleto' : 'Pix and bills',
    purchases: pt ? '48 compras' : '48 purchases',
    exits: pt ? '12 saídas' : '12 outflows',
    kpi1: pt ? 'GUARDEI' : 'SAVED',
    kpi2: pt ? 'ENTROU' : 'IN',
    kpi3: pt ? 'SAIU' : 'OUT',
    kpi4: pt ? 'SOBROU' : 'LEFT',
    monthly: pt ? 'GASTEI, MÊS A MÊS' : 'SPEND, MONTH BY MONTH',
    illustrative: pt ? 'mockup ilustrativo · valores fictícios' : 'illustrative mockup · fictional figures',
    title: pt
      ? 'Mockup da tela de visão geral: total gasto dividido entre cartão e Pix, indicadores de entrada e saída e um gráfico de barras com o gasto mês a mês'
      : 'Mockup of the overview screen: total spend split between card and Pix, in/out indicators and a bar chart of monthly spend',
  };

  const ink = 'rgb(var(--ink))';
  const muted = 'rgb(var(--muted))';
  const line = 'rgb(var(--line))';
  const accent = 'rgb(var(--accent))';
  const surface = 'rgb(var(--surface))';

  const kpis = [
    { label: l.kpi1, value: 'R$ 1.900,00' },
    { label: l.kpi2, value: 'R$ 4.200,00' },
    { label: l.kpi3, value: 'R$ 2.300,00' },
    { label: l.kpi4, value: 'R$ 1.900,00' },
  ];

  // altura proporcional a valores fictícios de 1,4k / 2,1k / 1,8k
  const bars = [
    { month: pt ? 'jan' : 'Jan', total: 'R$ 1.400', h: 70 },
    { month: pt ? 'fev' : 'Feb', total: 'R$ 2.100', h: 105 },
    { month: pt ? 'mar' : 'Mar', total: 'R$ 1.800', h: 90 },
  ];

  return (
    <figure className="my-7 overflow-x-auto rounded-xl border border-line bg-elevated p-4">
      <svg viewBox="0 0 660 470" role="img" aria-label={l.title} className="h-auto w-full min-w-[560px]">
        <title>{l.title}</title>

        {/* barra de navegação do app */}
        <g fontFamily="var(--font-sans)">
          <rect x="20" y="16" width="620" height="34" rx="8" fill={surface} stroke={line} />
          <rect x="30" y="24" width="66" height="18" rx="6" fill={accent} fillOpacity="0.16" />
          <text x="63" y="37" fontSize="11" fill={accent} textAnchor="middle" fontWeight="600">
            {l.tab1}
          </text>
          <text x="122" y="37" fontSize="11" fill={muted}>
            {l.tab2}
          </text>
          <text x="176" y="37" fontSize="11" fill={muted}>
            {l.tab3}
          </text>
          <rect x="520" y="24" width="110" height="18" rx="6" fill="none" stroke={line} />
          <text x="575" y="37" fontSize="10" fill={muted} textAnchor="middle">
            {l.period}
          </text>
        </g>

        {/* total gasto + composição */}
        <g fontFamily="var(--font-sans)">
          <rect x="20" y="62" width="620" height="112" rx="10" fill={surface} stroke={line} />
          <text x="40" y="86" fontSize="9" fill={muted} letterSpacing="1.2" fontFamily="var(--font-mono)">
            {l.spentLabel}
          </text>
          <text x="40" y="120" fontSize="30" fill={ink} fontWeight="700">
            R$ 4.120,00
          </text>

          <rect x="40" y="134" width="580" height="8" rx="4" fill={ink} fillOpacity="0.75" />
          <rect x="475" y="134" width="145" height="8" rx="4" fill={accent} />

          <circle cx="45" cy="158" r="3.5" fill={ink} fillOpacity="0.75" />
          <text x="56" y="162" fontSize="11" fill={muted}>
            {l.card}
          </text>
          <text x="104" y="162" fontSize="11" fill={ink} fontWeight="600">
            R$ 3.090,00
          </text>
          <text x="182" y="162" fontSize="10" fill={muted}>
            · {l.purchases}
          </text>

          <circle cx="285" cy="158" r="3.5" fill={accent} />
          <text x="296" y="162" fontSize="11" fill={muted}>
            {l.pix}
          </text>
          <text x="372" y="162" fontSize="11" fill={ink} fontWeight="600">
            R$ 1.030,00
          </text>
          <text x="450" y="162" fontSize="10" fill={muted}>
            · {l.exits}
          </text>
        </g>

        {/* indicadores */}
        <g fontFamily="var(--font-sans)">
          {kpis.map((kpi, i) => {
            const x = 20 + i * 156;
            return (
              <g key={kpi.label}>
                <rect x={x} y="188" width="140" height="66" rx="10" fill={surface} stroke={line} />
                <text
                  x={x + 16}
                  y="210"
                  fontSize="9"
                  fill={muted}
                  letterSpacing="1.2"
                  fontFamily="var(--font-mono)"
                >
                  {kpi.label}
                </text>
                <text x={x + 16} y="234" fontSize="15" fill={ink} fontWeight="600">
                  {kpi.value}
                </text>
              </g>
            );
          })}
        </g>

        {/* gasto mês a mês */}
        <g fontFamily="var(--font-sans)">
          <text x="20" y="284" fontSize="9" fill={muted} letterSpacing="1.2" fontFamily="var(--font-mono)">
            {l.monthly}
          </text>
          <rect x="20" y="294" width="620" height="146" rx="10" fill={surface} stroke={line} />

          {[0, 1, 2, 3].map((i) => {
            const y = 410 - i * 33;
            return (
              <g key={i}>
                <line x1="70" y1={y} x2="620" y2={y} stroke={line} strokeDasharray="3 4" />
                <text x="60" y={y + 3} fontSize="9" fill={muted} textAnchor="end">
                  {['0', '750', '1.5k', '2.2k'][i]}
                </text>
              </g>
            );
          })}

          {bars.map((bar, i) => {
            const x = 150 + i * 160;
            const top = 410 - bar.h;
            const accentPart = Math.round(bar.h * 0.26);
            return (
              <g key={bar.month}>
                <rect x={x} y={top} width="52" height={accentPart} rx="3" fill={accent} />
                <rect
                  x={x}
                  y={top + accentPart}
                  width="52"
                  height={bar.h - accentPart}
                  fill={ink}
                  fillOpacity="0.75"
                />
                <text x={x + 26} y={top - 7} fontSize="10" fill={muted} textAnchor="middle">
                  {bar.total}
                </text>
                <text x={x + 26} y="426" fontSize="10" fill={muted} textAnchor="middle">
                  {bar.month}
                </text>
              </g>
            );
          })}
        </g>

        <text x="20" y="460" fontSize="10" fill={muted} fontFamily="var(--font-mono)">
          {l.illustrative}
        </text>
      </svg>
      <figcaption className="sr-only">{l.title}</figcaption>
    </figure>
  );
}
