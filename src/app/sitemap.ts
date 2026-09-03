import type { MetadataRoute } from 'next';
import { getProjectsWithCaseStudy } from '@/content/projects';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...getProjectsWithCaseStudy().map((project) => ({
      url: `${siteUrl}/projetos/${project.slug}/`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
