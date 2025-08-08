import type { Project } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowDown } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1">
        <CardHeader>
           <div className="aspect-video overflow-hidden rounded-t-lg border-b">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={project.aiHint}
            />
          </div>
          <CardTitle className="font-headline pt-4">{project.title}</CardTitle>
          <CardDescription>by {project.author}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3">
            {project.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant={project.category === 'Beginner' ? 'secondary' : project.category === 'Intermediate' ? 'outline' : 'default'}>
            {project.category}
          </Badge>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span>{project.upvotes}</span>
            </div>
             <div className="flex items-center gap-1">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span>{project.downvotes}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
