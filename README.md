# Portfólio — Diego Soares Candido da Silva

Site de portfólio em **Next.js (App Router) + TypeScript + Tailwind**, exportado como site estático (`output: 'export'`) e publicado no GitHub Pages.

Bilíngue PT/EN com toggle no header, dark mode com toggle respeitando `prefers-color-scheme`, e conteúdo separado do código: projetos, experiência e textos moram em `src/content`, nunca dentro dos componentes.

---

## Como rodar

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera o site estático em out/
```

O `npm run build` já faz o export estático — não existe passo separado de `next export`.

---

## Como adicionar um projeto

1. Rode `npm run new:project` e informe o slug (ex.: `pipeline-clima`). O script cria `src/content/projects/pipeline-clima.ts` com todos os campos vazios e registra o import no índice.
2. Preencha os campos `pt`/`en` do arquivo (título, tagline, problema, solução, resultado, `stack`, `repoUrl`/`liveUrl`) — o card já aparece na home e as tecnologias entram no filtro sozinhas.
3. Se o projeto merece página própria, descomente o bloco `caseStudy` e adicione as seções: a rota `/projetos/<slug>` passa a ser gerada no build.

Nenhum componente precisa ser editado para adicionar, remover ou reordenar projetos — a ordem vem do campo `order`.

---

## Como editar os textos bilíngues

Todo texto tem duas fontes, e nenhuma delas é JSX:

| O quê | Onde |
| --- | --- |
| Texto de **interface** (menus, botões, rótulos) | `src/i18n/dictionary.ts` |
| Texto de **conteúdo** (projetos, case studies) | `src/content/projects/*.ts` |
| Perfil, stack, experiência, formação, contato | `src/content/profile.ts` |

Todo campo de conteúdo é do tipo `Localized = { pt: string; en: string }` — escreva as duas versões e o toggle do header cuida do resto. O idioma inicial vem de `navigator.language` e a escolha fica salva em `localStorage`.

Nos textos de case study (`body`) vale um markdown reduzido: parágrafos separados por linha em branco, `**negrito**`, `` `código` ``, listas com `- ` e `[link](url)`.

---

## Estrutura

```
src/
├── app/                  # rotas (App Router), sitemap.ts, robots.ts
│   └── projetos/[slug]/  # páginas geradas só para projetos com caseStudy
├── components/           # UI; diagrams/ tem os SVGs desenhados à mão
├── content/
│   ├── types.ts          # Localized, Project, CaseStudy
│   ├── profile.ts        # dados pessoais, stack, experiência, formação
│   └── projects/         # um arquivo por projeto + index.ts (agrega e ordena)
├── i18n/                 # dicionário de interface, provider de idioma e tema
└── lib/site.ts           # basePath, URL canônica, helper asset()
```

---

## Como fazer deploy

O deploy é automático: todo push na `main` dispara `.github/workflows/deploy.yml`, que roda o build, adiciona o `.nojekyll` e publica no GitHub Pages.

Para ligar pela primeira vez:

1. No repositório, **Settings → Pages → Source: GitHub Actions**.
2. Faça push na `main`. O workflow injeta o `basePath` correto sozinho (via `actions/configure-pages`), então funciona tanto em `usuario.github.io` quanto em Pages de projeto (`usuario.github.io/portfolio`).
3. Ajuste a URL canônica em `src/lib/site.ts` (usada em Open Graph e no `sitemap.xml`).

Para rodar o build local simulando Pages de projeto:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

---

## Arquivos a preencher

- `public/cv/diego-silva-cv-pt.pdf` e `public/cv/diego-silva-cv-en.pdf`
- `public/projects/` — capas e screenshots referenciados nos projetos
- E-mail, GitHub e LinkedIn em `src/content/profile.ts`
- URLs de repositório em cada arquivo de `src/content/projects/`
