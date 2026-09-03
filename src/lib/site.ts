export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** URL canônica do site — usada em metadata, sitemap e Open Graph. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://diegoscs.github.io';

/**
 * Prefixa um caminho de /public com o basePath.
 * Necessário porque <img> e href de arquivos estáticos não recebem basePath sozinhos.
 */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}
