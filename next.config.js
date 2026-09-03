/** @type {import('next').NextConfig} */
// basePath configurável por env var: em GitHub Pages de projeto use
// NEXT_PUBLIC_BASE_PATH=/nome-do-repo  (vazio para domínio próprio ou user.github.io)
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

module.exports = nextConfig;
