'use client';

import { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { asset } from '@/lib/site';

/**
 * Imagem de case study com placeholder.
 * Enquanto o arquivo não existir em /public, mostra um quadro com o alt —
 * quando o PNG for adicionado, a imagem real aparece sem mudar o código.
 */
export function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const { d } = useLanguage();
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <figure className="my-7">
        <div
          role="img"
          aria-label={alt}
          className="flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line bg-elevated p-6 text-center"
        >
          <FrameIcon />
          <p className="max-w-sm text-sm text-muted">{alt}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
            {d.caseStudy.placeholderImage}
          </p>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-7">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-xl border border-line bg-elevated"
      />
      <figcaption className="mt-2 text-xs text-muted">{alt}</figcaption>
    </figure>
  );
}

function FrameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7 text-line"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 16l3.5-4 2.5 3 2-2.5L18 16" />
      <circle cx="8.5" cy="9" r="1.2" />
    </svg>
  );
}
