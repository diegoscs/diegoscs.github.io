import type { CodeLanguage } from '@/content/types';

const KEYWORDS: Record<CodeLanguage, string[]> = {
  sql: [
    'select','from','where','with','as','and','or','not','null','case','when','then','else','end',
    'join','left','right','inner','on','group','by','order','partition','over','union','all',
    'insert','update','create','table','view','distinct','limit','coalesce','cast','is','asc','desc',
  ],
  python: [
    'import','from','def','class','return','if','elif','else','for','while','in','not','and','or',
    'None','True','False','try','except','finally','with','as','yield','lambda','raise','continue','break','pass',
  ],
  ts: [
    'import','from','export','default','const','let','var','function','return','if','else','for','while',
    'type','interface','class','extends','new','await','async','try','catch','finally','null','undefined','true','false',
  ],
  yaml: ['true','false','null','on','off'],
  bash: ['if','then','fi','for','do','done','while','case','esac','export','echo','cd','function','local','return'],
  json: ['true','false','null'],
};

const TOKEN_CLASS = {
  comment: 'text-muted italic',
  string: 'text-accent',
  template: 'text-accent/80',
  keyword: 'font-medium text-ink',
  number: 'text-ink/80',
} as const;

type Token = { text: string; kind: keyof typeof TOKEN_CLASS | 'plain' };

/**
 * Highlight deliberadamente simples: comentários, strings, blocos Jinja do dbt,
 * palavras-chave e números. Evita puxar uma lib de highlight para o bundle.
 */
function tokenize(code: string, language: CodeLanguage): Token[] {
  const keywords = KEYWORDS[language] ?? [];
  const pattern = new RegExp(
    [
      '(--[^\\n]*|#[^\\n]*|//[^\\n]*)', // comentários
      '(\\{\\{[^}]*\\}\\}|\\{%[^%]*%\\})', // Jinja (dbt)
      '(\'(?:[^\'\\\\]|\\\\.)*\'|"(?:[^"\\\\]|\\\\.)*")', // strings
      keywords.length ? `\\b(${keywords.join('|')})\\b` : '(\\b\\B)',
      '(\\b\\d+(?:\\.\\d+)?\\b)', // números
    ].join('|'),
    'g',
  );

  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), kind: 'plain' });
    }
    const kind: Token['kind'] = match[1]
      ? 'comment'
      : match[2]
        ? 'template'
        : match[3]
          ? 'string'
          : match[4]
            ? 'keyword'
            : 'number';
    tokens.push({ text: match[0], kind });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < code.length) tokens.push({ text: code.slice(lastIndex), kind: 'plain' });
  return tokens;
}

export function CodeBlock({
  code,
  language,
  caption,
}: {
  code: string;
  language: CodeLanguage;
  caption?: string;
}) {
  const tokens = tokenize(code, language);

  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-line bg-elevated">
      <div className="flex items-center justify-between border-b border-line px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
          {language}
        </span>
        {caption && <span className="truncate pl-4 text-xs text-muted">{caption}</span>}
      </div>
      <div className="overflow-x-auto">
        <pre className="p-4 text-[13px] leading-relaxed">
          <code className="font-mono text-muted">
            {tokens.map((token, i) =>
              token.kind === 'plain' ? (
                token.text
              ) : (
                <span key={i} className={TOKEN_CLASS[token.kind]}>
                  {token.text}
                </span>
              ),
            )}
          </code>
        </pre>
      </div>
    </figure>
  );
}
