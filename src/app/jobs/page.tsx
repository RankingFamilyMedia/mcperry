import { JobListing } from '@/components/job-listing';
import { placeholderJobs } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Job Board
        </h1>
        <p className="text-lg text-muted-foreground">
          Find your next career opportunity in tech, music, and more.
        </p>
      </section>
      
      <div className="text-center mb-8">
        <Button size="lg">Post a Job Opening</Button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {placeholderJobs.map((job) => (
          <JobListing key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
