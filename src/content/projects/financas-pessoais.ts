import type { Project } from '../types';

const project: Project = {
  slug: 'financas-pessoais',
  order: 1,
  featured: true,
  title: {
    pt: 'Pipeline de Finanças Pessoais',
    en: 'Personal Finance Pipeline',
  },
  tagline: {
    pt: 'Extratos de dois bancos viram uma base analítica em camadas, com deduplicação por hash e app próprio de consumo.',
    en: 'Statements from two banks become a layered analytical base, deduplicated by hash, with a consumption app of my own.',
  },
  problem: {
    pt: 'Nubank exporta OFX, Itaú exporta XLSX. A categorização era manual em planilha, sem histórico consolidado nem visão de evolução patrimonial.',
    en: 'Nubank exports OFX, Itaú exports XLSX. Categorisation was manual in a spreadsheet, with no consolidated history and no view of net worth over time.',
  },
  solution: {
    pt: 'Bot do Telegram recebe o extrato, um parser em TypeScript detecta o banco, normaliza a descrição e calcula um hash natural que torna a ingestão idempotente; o Postgres no Supabase guarda as camadas bronze, silver e gold e um app Next.js consome.',
    en: 'A Telegram bot receives the statement, a TypeScript parser detects the bank, normalises the description and computes a natural hash that makes ingestion idempotent; Postgres on Supabase holds the bronze, silver and gold layers and a Next.js app consumes them.',
  },
  result: {
    pt: 'Fluxo de caixa, fatura por categoria e evolução patrimonial em um app em produção, com o mesmo extrato podendo ser reenviado sem duplicar uma linha.',
    en: 'Cash flow, bill by category and net worth evolution in a production app, where the same statement can be re-sent without duplicating a single row.',
  },
  stack: [
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Supabase',
    'Next.js',
    'SQL',
    'Telegram API',
    'Vercel',
  ],
  repoUrl: 'https://github.com/diegoscs/financas-pipeline',
  liveUrl: 'https://financas-pipeline.vercel.app',
  // Imagem de Open Graph — descomente quando o arquivo existir em /public/projects:
  // cover: '/projects/financas-pessoais-cover.png',
  caseStudy: {
    sections: [
      {
        heading: { pt: 'Contexto e problema', en: 'Context and problem' },
        body: {
          pt: 'Eu acompanhava minhas finanças em uma planilha. Todo mês baixava o extrato do Nubank em **OFX** e o do Itaú em **XLSX**, copiava as linhas na mão, padronizava colunas que não batiam e classificava cada transação por categoria.\n\nTrês problemas apareciam sempre: os formatos não compartilham nenhum nome de coluna; lançamentos duplicados entravam quando eu reimportava um período sobreposto; e não existia histórico consolidado — cada mês era uma aba isolada, sem evolução de saldo nem comparação de categorias ao longo do ano.\n\nTratei como problema de engenharia de dados: ingestão de fontes heterogêneas, normalização em camadas, regras de categorização versionadas e uma camada de consumo pronta para análise.',
          en: 'I used to track my finances in a spreadsheet. Every month I downloaded the Nubank statement as **OFX** and the Itaú one as **XLSX**, pasted rows by hand, reconciled columns that did not line up and tagged every transaction with a category.\n\nThree problems kept coming back: the formats share no column names; duplicated entries slipped in whenever I re-imported an overlapping period; and there was no consolidated history — each month was its own isolated tab, with no balance evolution and no way to compare categories across the year.\n\nI treated it as a data engineering problem: ingestion from heterogeneous sources, layered normalisation, versioned categorisation rules and a consumption layer ready for analysis.',
        },
      },
      {
        heading: { pt: 'Arquitetura', en: 'Architecture' },
        body: {
          pt: 'O fluxo tem um ponto de entrada — o bot do Telegram, que recebe o arquivo de onde eu estiver — e uma fonte de verdade: o Postgres no Supabase. Entre os dois fica o portão que sustenta o resto: o **hash natural**, que torna a ingestão idempotente.',
          en: 'The flow has one entry point — the Telegram bot, which takes the file wherever I am — and one source of truth: Postgres on Supabase. Between them sits the gate that holds everything together: the **natural hash**, which makes ingestion idempotent.',
        },
        diagram: 'financas-architecture',
      },
      {
        heading: { pt: 'Camadas medallion', en: 'Medallion layers' },
        body: {
          pt: 'As camadas são implementadas em SQL no próprio Postgres, cada estágio com uma responsabilidade e sem sobrescrever a origem.\n\n**Bronze — a transação como veio.** A linha entra com a data, o valor e a descrição que o banco escreveu, mais a origem (`ofx_itau`, `api_nubank`, `telegram`) e o `hash_natural`. Se uma regra mudar, dá para reprocessar tudo sem baixar os arquivos de novo.\n\n**Silver — schema único e categoria.** Aqui os bancos passam a falar a mesma língua, sob duas convenções que valem para o pipeline inteiro: valor positivo é entrada, valor negativo é saída — nunca uma coluna separada de débito/crédito; e transferência entre contas minhas, incluindo aporte em investimento e pagamento de fatura, é marcada `eh_interna` e não conta como gasto nem como receita. A categorização não é `case when`: vive na tabela `regras_categoria`, com regex, prioridade e nível de confiança, então mudar uma regra é um insert, não um deploy.\n\n**Gold — agregações por período e categoria.** É o que o app lê direto: gasto por categoria no ciclo, fluxo de caixa mensal e evolução do patrimônio.',
          en: 'The layers are implemented in SQL inside Postgres itself, each stage with one responsibility and never overwriting the source.\n\n**Bronze — the transaction as it arrived.** The row lands with the date, amount and description the bank wrote, plus its origin (`ofx_itau`, `api_nubank`, `telegram`) and the `hash_natural`. If a rule changes, everything can be reprocessed without downloading the files again.\n\n**Silver — one schema and a category.** This is where the banks start speaking the same language, under two conventions that hold across the whole pipeline: a positive amount is money in, a negative amount is money out — never a separate debit/credit column; and a transfer between my own accounts, including investment contributions and card bill payments, is flagged `eh_interna` and counts as neither spend nor income. Categorisation is not a `case when`: it lives in the `regras_categoria` table, with a regex, a priority and a confidence score, so changing a rule is an insert, not a deploy.\n\n**Gold — aggregates by period and category.** This is what the app reads directly: spend by category in the cycle, monthly cash flow and net worth evolution.',
        },
      },
      {
        heading: {
          pt: 'O hash natural: reenviar o mesmo extrato não duplica',
          en: 'The natural hash: re-sending a statement never duplicates',
        },
        body: {
          pt: 'Extratos se sobrepõem — você baixa "últimos 90 dias" três vezes e as mesmas compras voltam. A chave de idempotência é um `sha256` de conta, data, valor, descrição normalizada e **índice de ocorrência**.\n\nO índice de ocorrência é a parte que não é óbvia: dois cafés de R$ 19,90 no mesmo lugar no mesmo dia são gastos distintos e legítimos. Sem numerá-los, o hash colide e o dedupe descarta um deles em silêncio — o pior tipo de bug, porque o número fica errado sem nada quebrar.',
          en: 'Statements overlap — you download "last 90 days" three times and the same purchases come back. The idempotency key is a `sha256` of account, date, amount, normalised description and **occurrence index**.\n\nThe occurrence index is the non-obvious part: two R$ 19.90 coffees at the same place on the same day are distinct, legitimate expenses. Without numbering them the hash collides and dedupe silently drops one — the worst kind of bug, because the number goes wrong without anything breaking.',
        },
        code: {
          language: 'ts',
          caption: {
            pt: 'web/src/lib/normalize.ts — código do projeto',
            en: 'web/src/lib/normalize.ts — project code',
          },
          content: [
            '// Prefixos de gateway: "Mp *Doutorgranola", "Dm*Spotify", "Anthropic* Claude"',
            'const GATEWAY = /^(MP|DM|PAG|PAGSEGURO|IUGU|STONE)\\s*\\*\\s*/i;',
            '// Padding de caractere repetido que o Itaú insere: "1518aaaaaaaaguaruja"',
            'const PADDING = /([A-Z])\\1{3,}/g;',
            '',
            'export function normalizarDescricao(bruta: string | null | undefined): string {',
            '  let s = translitera(bruta ?? "").toUpperCase().trim();',
            '  s = s.replace(GATEWAY, "");',
            '  s = s.replace(PADDING, "$1");',
            '  return s.replace(/\\s+/g, " ").trim();',
            '}',
            '',
            '/**',
            ' * Numera transações idênticas dentro do arquivo e calcula o hash.',
            ' *',
            ' * Dois cafés de R$ 19,90 no mesmo lugar no mesmo dia são gastos distintos e',
            ' * legítimos. Sem o índice de ocorrência o hash colide e o dedupe descarta um',
            ' * deles silenciosamente. Como o índice deriva da ordem estável do arquivo,',
            ' * reprocessar o mesmo arquivo gera exatamente os mesmos hashes.',
            ' */',
            'export async function atribuirHashes<T extends ComHash>(transacoes: T[]): Promise<T[]> {',
            '  const contador = new Map<string, number>();',
            '  for (const t of transacoes) {',
            '    t.descricao = normalizarDescricao(t.descricao);',
            '    const chave = `${t.conta_id}|${t.data}|${formatarValor(t.valor)}|${t.descricao}`;',
            '    const n = (contador.get(chave) ?? 0) + 1;',
            '    contador.set(chave, n);',
            '    t.ocorrencia = n;',
            '    t.hash_natural = await calcularHash(t.conta_id, t.data, t.valor, t.descricao, n);',
            '  }',
            '  return transacoes;',
            '}',
          ].join('\n'),
        },
      },
      {
        heading: {
          pt: 'O que quase estragou os números',
          en: 'What nearly ruined the numbers',
        },
        body: {
          pt: 'Os erros mais caros não foram de código, foram de leitura do domínio. Três exemplos que estão no parser hoje:\n\n**A caixinha do Nubank.** O RDB é dinheiro saindo e voltando da minha própria aplicação, dentro da mesma conta. Em um extrato de julho, 8 de 23 lançamentos eram RDB, e o padrão é evidente: um `Resgate RDB +184,00` seguido de um Pix de -74,00 e um boleto de -110,00 no mesmo dia. O resgate existe só para bancar o gasto. Contando os dois, o mês somava **R$ 2.027,85 de saída quando o gasto real foi R$ 416,95** — quase cinco vezes maior.\n\n**Renda que nunca foi renda.** "Transferência de saldo NuInvest" é dinheiro voltando da corretora para a conta. Sem uma regra própria, entrava como receita: R$ 268,61 de "entrada" que era só o meu próprio dinheiro mudando de lugar. E como o texto contém "Transferência", a regra precisa ser testada **antes** do padrão de Pix.\n\n**Acento virando duplicata.** O OFX do Nubank declara `CHARSET:1252` no header. Decodificar como UTF-8 transforma "Refeição" em "Refei??o" — descrição diferente, hash diferente, linha duplicada na base. O parser lê o header antes de escolher o decoder.',
          en: 'The costliest mistakes were not code bugs but domain-reading bugs. Three that live in the parser today:\n\n**Nubank\'s savings pocket.** RDB is money leaving and returning to my own investment inside the same account. In one July statement, 8 of 23 entries were RDB, and the pattern is obvious: a `Resgate RDB +184.00` followed by a -74.00 Pix and a -110.00 bill the same day. The withdrawal exists only to fund the spend. Counting both made the month total **R$ 2,027.85 of outflow when the real spend was R$ 416.95** — nearly five times higher.\n\n**Income that was never income.** "NuInvest balance transfer" is money coming back from the brokerage into the account. With no rule of its own it landed as revenue: R$ 268.61 of "income" that was just my own money moving. And because the text contains "Transferência", that rule has to be tested **before** the Pix pattern.\n\n**An accent turning into a duplicate.** The Nubank OFX declares `CHARSET:1252` in its header. Decoding it as UTF-8 turns "Refeição" into "Refei??o" — different description, different hash, duplicated row. The parser reads the header before choosing the decoder.',
        },
        code: {
          language: 'ts',
          caption: {
            pt: 'web/src/lib/parsers/ofx.ts — código do projeto',
            en: 'web/src/lib/parsers/ofx.ts — project code',
          },
          content: [
            '/**',
            ' * RDB é a "caixinha" do Nubank: dinheiro indo e voltando da sua própria',
            ' * aplicação, dentro da mesma conta.',
            ' *',
            ' * No extrato de julho real, 8 de 23 lançamentos eram RDB, e o padrão é',
            ' * evidente: `Resgate RDB +184,00` seguido de `Pix -74,00` e `boleto -110,00`',
            ' * no mesmo dia. O resgate existe só para bancar o gasto. Contar os dois faz o',
            ' * mês somar R$ 2.027,85 de saída quando o gasto real foi R$ 416,95.',
            ' */',
            'const RDB = /\\b(APLICA[ÇC][ÃA]O|RESGATE)\\s+RDB\\b|\\bRDB\\b/i;',
            '',
            '/**',
            ' * O header diz CHARSET:1252. Decodificar como UTF-8 transforma acento em',
            ' * caractere de substituição, e aí "Refeição" vira "Refei??o" — descrição',
            ' * diferente, hash diferente, duplicata na base.',
            ' */',
            'function decodificar(buf: ArrayBuffer): string {',
            '  const cabecalho = new TextDecoder("ascii").decode(buf.slice(0, 512));',
            '  const ehLatin = /CHARSET:\\s*(1252|8859-1)/i.test(cabecalho)',
            '    || /ENCODING:\\s*USASCII/i.test(cabecalho);',
            '  try {',
            '    return new TextDecoder(ehLatin ? "windows-1252" : "utf-8").decode(buf);',
            '  } catch {',
            '    return new TextDecoder("utf-8").decode(buf);',
            '  }',
            '}',
            '',
            '/**',
            ' * Descobre o banco pelo próprio arquivo.',
            ' *',
            ' * O OFX se identifica em <ORG> (nome) e <FID> (código Febraban). Sem isso,',
            ' * nada impede subir um OFX do Nubank tendo selecionado Itaú — os dois',
            ' * exportam OFX e a extensão é a mesma. Isso já aconteceu: a fatura do Nubank',
            ' * foi parar dentro da conta do Itaú.',
            ' */',
            'const BANCOS_OFX: { instituicao: string; org: RegExp; fid?: string }[] = [',
            '  { instituicao: "nubank", org: /\\bNU\\s*PAGAMENTOS|\\bNUBANK\\b/i, fid: "260" },',
            '  { instituicao: "itau",   org: /\\bITA[UÚ]\\b/i,                  fid: "341" },',
            '  // ... bradesco, santander, bb, caixa, inter, c6',
            '];',
          ].join('\n'),
        },
      },
      {
        heading: {
          pt: 'Regra de negócio: o ciclo do cartão',
          en: 'Business rule: the card cycle',
        },
        body: {
          pt: 'Fatura de cartão não respeita mês do calendário, e ignorar isso quebra a conta de um jeito silencioso. Em 04/08, a fatura do Itaú que vence dia 10 já fechou em 03/08 e cobre compras de 04/07 em diante. Se eu começasse a medir "do primeiro dia do mês", o pagamento dela sairia da conta no dia 10 sem contrapartida nenhuma — dinheiro saindo sem gasto que o explique, e todo o consumo de julho invisível.\n\nPor isso o sistema calcula um **marco zero**: a data a partir da qual precisa existir dado para os números fecharem não é "um mês atrás", é o início do ciclo da fatura mais antiga ainda não paga. Fatura já paga não entra, porque as compras e o pagamento estão os dois fora da janela e nada fica pendurado.\n\nDecisões desse tipo estão registradas como ADRs no repositório — `ADR-003` é justamente a regra do ciclo do cartão.',
          en: 'A card bill does not respect the calendar month, and ignoring that breaks the maths silently. On 04/08 the Itaú bill due on the 10th has already closed on 03/08 and covers purchases from 04/07 onwards. If I started measuring "from the first day of the month", its payment would leave the account on the 10th with no counterpart — money going out with no spend to explain it, and all of July\'s consumption invisible.\n\nSo the system computes a **zero mark**: the date from which data must exist for the numbers to add up is not "a month ago", it is the start of the cycle of the oldest unpaid bill. An already-paid bill does not count, because its purchases and its payment both sit outside the window and nothing is left dangling.\n\nDecisions like this are recorded as ADRs in the repository — `ADR-003` is exactly the card cycle rule.',
        },
      },
      {
        heading: { pt: 'Decisões técnicas', en: 'Technical decisions' },
        body: {
          pt: '**Camadas em SQL, sem framework de transformação.** As camadas são views e tabelas no próprio Postgres. Para o volume de um extrato pessoal, um orquestrador de transformação adicionaria uma dependência e um passo de build sem resolver nenhum problema que eu tivesse — a ordem das camadas é linear e cabe no schema. Se o projeto crescer para várias fontes com dependências cruzadas, é aí que dbt passa a se pagar.\n\n**Supabase em vez de Postgres local.** O banco precisa estar acessível de fora da minha máquina: o app na Vercel lê dele e a ingestão pelo bot escreve nele de qualquer lugar. Um Postgres no notebook obrigaria a manter a máquina ligada. Junto vêm Auth e RLS, que passaram a importar quando o app deixou de ser só meu.\n\n**Telegram em vez de pasta monitorada.** Uma pasta sincronizada só funciona no computador onde está montada. O extrato costuma chegar quando eu abro o app do banco no celular — mandar o arquivo para o bot é o caminho mais curto entre baixar e ingerir.\n\n**Port do Python para TypeScript, com teste de paridade.** A ingestão nasceu em Python e migrou para TypeScript junto com o app. O risco era brutal: o `hash_natural` das linhas já gravadas foi calculado pelo Python, e um único byte de diferença na normalização faria toda a base ser vista como nova e duplicar em silêncio. Por isso existe um script que confere os hashes gerados pelo TypeScript contra as linhas que o Python gravou — a tabela de transliteração ("ª" vira "a", "°" vira "deg") existe justamente para reproduzir o `unidecode` do Python, caractere por caractere.',
          en: '**Layers in SQL, no transformation framework.** The layers are views and tables in Postgres itself. At the volume of a personal statement, a transformation orchestrator would add a dependency and a build step without solving any problem I actually had — the layer order is linear and fits in the schema. If the project grows to several sources with cross dependencies, that is when dbt starts paying for itself.\n\n**Supabase instead of a local Postgres.** The database has to be reachable from outside my machine: the app on Vercel reads from it and bot ingestion writes to it from anywhere. A Postgres on my laptop would mean keeping the laptop on. Auth and RLS come with it, which started to matter once the app was no longer only mine.\n\n**Telegram instead of a watched folder.** A synced folder only works on the machine where it is mounted. Statements usually show up when I open the banking app on my phone — sending the file to a bot is the shortest path from download to ingestion.\n\n**Porting Python to TypeScript, with a parity test.** Ingestion started in Python and moved to TypeScript alongside the app. The risk was severe: the `hash_natural` of every stored row was computed by Python, and a single byte of difference in normalisation would make the whole base look new and silently duplicate. So there is a script that checks the hashes generated by TypeScript against the rows Python wrote — the transliteration table ("ª" to "a", "°" to "deg") exists precisely to reproduce Python\'s `unidecode`, character by character.',
        },
      },
      {
        heading: { pt: 'A interface: visão geral', en: 'The interface: overview' },
        body: {
          pt: 'As agregações da camada gold alimentam a tela principal: quanto saiu no período, dividido entre cartão e Pix, os indicadores de entrada, saída e sobra, e o gasto mês a mês.\n\nOs mockups abaixo reproduzem o layout real da aplicação com **valores fictícios** — os números do meu extrato não vão para o portfólio. O app está em produção e o link está no topo desta página.',
          en: 'The gold-layer aggregates feed the main screen: how much went out in the period, split between card and Pix, the in/out/left indicators, and month-by-month spend.\n\nThe mockups below reproduce the real layout of the app with **fictional figures** — my actual statement numbers do not go into a portfolio. The app is in production and the link is at the top of this page.',
        },
        diagram: 'financas-dashboard-geral',
      },
      {
        heading: { pt: 'A interface: fatura por categoria', en: 'The interface: bill by category' },
        body: {
          pt: 'A aba de cartão consolida a fatura dos dois bancos dentro do ciclo de fechamento e quebra o total por categoria. A fatia de "não classificado" é o termômetro da categorização: quanto menor, melhor está a tabela de regras — e é ela que define a fila de revisão, por ordem de confiança.',
          en: 'The card tab consolidates both banks into one closing-cycle bill and breaks the total down by category. The "uncategorised" slice is the categorisation thermometer: the smaller it is, the better the rules table is doing — and it drives the review queue, ordered by confidence.',
        },
        diagram: 'financas-dashboard-categorias',
      },
      {
        heading: { pt: 'Resultados e aprendizados', en: 'Results and lessons' },
        body: {
          pt: 'O que era uma tarde de planilha por mês virou um app em produção: o extrato vai para o bot e o número já está certo quando eu abro. O ganho maior não foi tempo, foi confiança nos números — e ela veio de tratar as regras de negócio como código versionado, não como ajuste manual na planilha.\n\nO que eu levo desse projeto: **em dado financeiro, o bug caro é o silencioso**. Nada quebrou quando o RDB inflou a saída em cinco vezes, nem quando o acento mal decodificado duplicou uma linha — o sistema seguiu rodando e entregando o número errado. Foi isso que me fez colocar a idempotência no centro do desenho, em vez de tratar como detalhe de implementação.\n\nO que eu faria diferente: escreveria o teste de paridade de hash **antes** de começar o port do Python, não depois de desconfiar do resultado; e fecharia o schema da silver no primeiro dia, em vez de deixar cada banco com colunas próprias e reconciliar depois.',
          en: 'What used to be an afternoon of spreadsheet work each month is now a production app: the statement goes to the bot and the number is already right when I open it. The real gain was not time but trust in the numbers — and that came from treating business rules as versioned code rather than manual spreadsheet fixes.\n\nWhat I take from this project: **in financial data, the expensive bug is the silent one**. Nothing broke when RDB inflated outflow fivefold, or when a mis-decoded accent duplicated a row — the system kept running and kept serving the wrong number. That is what pushed idempotency to the centre of the design instead of treating it as an implementation detail.\n\nWhat I would do differently: write the hash parity test **before** starting the Python port, not after getting suspicious about the result; and lock the silver schema on day one instead of letting each bank keep its own columns and reconciling later.',
        },
      },
    ],
  },
};

export default project;
