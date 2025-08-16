import type { Tutorial } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';

type TutorialCardProps = {
  tutorial: Tutorial;
};

export function TutorialCard({ tutorial }: TutorialCardProps) {
  return (
    <Link href={`/tutorials/${tutorial.id}`} className="group block bg-card hover:bg-background transition-colors">
       <Card className="border-0 shadow-none rounded-none h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Badge variant="outline">{tutorial.category}</Badge>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {tutorial.duration}</span>
          </div>
          <CardTitle className="font-headline text-lg">{tutorial.title}</CardTitle>
          <CardDescription className="text-sm line-clamp-2">{tutorial.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
           <p className="text-sm font-semibold mb-2">Prerequisites:</p>
           <ul className="space-y-1">
             {tutorial.prerequisites.map(p => (
                <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{p}</span>
                </li>
             ))}
           </ul>
        </CardContent>
        <CardFooter>
            <Button variant="link" className="p-0 text-accent group-hover:underline">
                Start Tutorial <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </CardFooter>
       </Card>
    </Link>
  );
}
