import { Fragment, type ReactNode } from 'react';

/**
 * Markdown propositalmente mínimo — só o que os textos de conteúdo usam:
 * parágrafos (linha em branco), listas com "- ", **negrito**, `código` e [link](url).
 */
export function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);

  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n');

        if (lines.every((line) => line.trimStart().startsWith('- '))) {
          return (
            <ul key={i} className="my-4 list-disc space-y-2 pl-5 marker:text-accent">
              {lines.map((line, j) => (
                <li key={j}>{renderInline(line.trimStart().slice(2))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="my-4 leading-relaxed">
            {renderInline(block)}
          </p>
        );
      })}
    </>
  );
}

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text: string): ReactNode {
  const parts = text.split(INLINE).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="rounded border border-line bg-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline text-accent"
        >
          {link[1]}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
