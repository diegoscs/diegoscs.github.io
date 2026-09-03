'use client';

import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function NotFound() {
  const { d } = useLanguage();

  return (
    <main id="conteudo" className="container-page flex min-h-screen flex-col justify-center py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{d.notFound.title}</h1>
      <p className="mt-4 max-w-md text-muted">{d.notFound.body}</p>
      <Link
        href="/"
        className="mt-8 inline-flex w-fit items-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-surface"
      >
        {d.notFound.cta}
      </Link>
    </main>
  );
}
