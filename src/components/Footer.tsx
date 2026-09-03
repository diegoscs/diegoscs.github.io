'use client';

import { profile } from '@/content/profile';
import { useLanguage } from '@/i18n/LanguageProvider';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export function Footer() {
  const { d } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="text-sm text-muted">
          <p>
            © {year} {profile.name}.
          </p>
          <p className="mt-1">{d.footer.built}</p>
        </div>

        <ul className="flex items-center gap-2">
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={d.hero.github}
              className="block rounded-full border border-line p-2.5 text-muted transition-colors hover:text-accent"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={d.hero.linkedin}
              className="block rounded-full border border-line p-2.5 text-muted transition-colors hover:text-accent"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${profile.email}`}
              aria-label={profile.email}
              className="block rounded-full border border-line p-2.5 text-muted transition-colors hover:text-accent"
            >
              <MailIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
