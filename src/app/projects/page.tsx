import { ProjectCard } from '@/components/project-card';
import { placeholderProjects } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          DIY Projects
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your next creation. Filter by difficulty or search for a specific project.
        </p>
      </section>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-10" />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {placeholderProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button variant="outline">
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
