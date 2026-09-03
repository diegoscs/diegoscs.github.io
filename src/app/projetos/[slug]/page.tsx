import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyView } from '@/components/CaseStudyView';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getProjectBySlug, getProjectsWithCaseStudy } from '@/content/projects';

type Params = { slug: string };

/** Só projetos com caseStudy viram página; os demais ficam como card na home. */
export function generateStaticParams(): Params[] {
  return getProjectsWithCaseStudy().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = project.title.pt;
  const description = `${project.tagline.pt} · ${project.tagline.en}`;
  const url = `/projetos/${project.slug}/`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      ...(project.cover ? { images: [{ url: project.cover }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) notFound();

  return (
    <>
      <Header variant="sub" />
      <main id="conteudo">
        <CaseStudyView project={project} />
      </main>
      <Footer />
    </>
  );
}
