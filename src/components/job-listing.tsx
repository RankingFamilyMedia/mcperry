import type { Job } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';

type JobListingProps = {
  job: Job;
};

export function JobListing({ job }: JobListingProps) {
  return (
    <Card className="transition-all duration-300 hover:border-primary hover:shadow-md">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <CardTitle className="font-headline text-xl text-primary">{job.title}</CardTitle>
                 <CardDescription>{job.company}</CardDescription>
            </div>
            <Badge variant="secondary">{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{job.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4" />
                <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
            </div>
        </div>
        <Button asChild>
          <Link href={job.applyUrl}>
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
