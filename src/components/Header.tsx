'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useTheme } from '@/i18n/ThemeProvider';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';
import { profile } from '@/content/profile';

type NavLink = { href: string; label: string };

export function Header({ variant = 'home' }: { variant?: 'home' | 'sub' }) {
  const { d, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Em páginas de projeto os âncoras apontam para a home.
  const prefix = variant === 'home' ? '' : '/';
  const links: NavLink[] = [
    { href: `${prefix}#sobre`, label: d.nav.about },
    { href: `${prefix}#stack`, label: d.nav.stack },
    { href: `${prefix}#projetos`, label: d.nav.projects },
    { href: `${prefix}#experiencia`, label: d.nav.experience },
    { href: `${prefix}#contato`, label: d.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled ? 'border-line bg-surface/85 backdrop-blur' : 'border-transparent bg-surface'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-surface"
      >
        {d.nav.skipToContent}
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight text-ink hover:text-accent"
        >
          <span className="text-accent">/</span>
          {profile.shortName.toLowerCase().replace(/\s+/g, '-')}
        </Link>

        <nav aria-label={d.nav.menu} className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center rounded-full border border-line p-0.5 font-mono text-xs"
            role="group"
            aria-label={d.language.toggle}
          >
            {(['pt', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                aria-pressed={locale === code}
                aria-label={code === 'pt' ? d.language.pt : d.language.en}
                className={`rounded-full px-2 py-1 uppercase transition-colors ${
                  locale === code
                    ? 'bg-accent text-surface'
                    : 'text-muted hover:text-ink'
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={d.theme.toggle}
            title={theme === 'dark' ? d.theme.light : d.theme.dark}
            className="rounded-full border border-line p-2 text-muted transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? d.nav.closeMenu : d.nav.openMenu}
            className="rounded-full border border-line p-2 text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label={d.nav.menu}
          className="border-t border-line bg-surface md:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-muted hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
