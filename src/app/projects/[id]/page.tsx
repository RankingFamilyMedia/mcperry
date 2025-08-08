import { placeholderProjects } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import ProjectDetailsClient from './project-details-client';

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return placeholderProjects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = placeholderProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}
