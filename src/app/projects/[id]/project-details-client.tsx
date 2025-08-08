'use client';

import type { Project } from '@/lib/types';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { analyzeComments } from '@/ai/flows/analyze-comments';
import { useToast } from '@/hooks/use-toast';
import { Bot, CircuitBoard, List, MessageSquare, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProjectDetailsClient({ project }: { project: Project }) {
  const [comments, setComments] = useState(
    project.comments.map((c) => `${c.author}: ${c.text}`).join('\n')
  );
  const [analysisResult, setAnalysisResult] = useState<{
    summary: string;
    relevantResources: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyzeComments = async () => {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeComments({ comments });
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing comments:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze comments. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">{project.category}</Badge>
              <CardTitle className="text-4xl font-headline text-primary">
                {project.title}
              </CardTitle>
              <CardDescription>By {project.author}</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full mb-6">
                <CarouselContent>
                  <CarouselItem>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={1200}
                      height={675}
                      className="rounded-lg object-cover w-full aspect-video"
                      data-ai-hint={project.aiHint}
                    />
                  </CarouselItem>
                  {project.instructions.map(
                    (step) =>
                      step.imageUrl && (
                        <CarouselItem key={step.step}>
                          <Image
                            src={step.imageUrl}
                            alt={`Step ${step.step}`}
                            width={1200}
                            height={675}
                            className="rounded-lg object-cover w-full aspect-video"
                            data-ai-hint="project step"
                          />
                        </CarouselItem>
                      )
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><List /> Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.instructions.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {step.step}
                      </div>
                      {index < project.instructions.length - 1 && <div className="w-px h-full bg-border mt-2" />}
                    </div>
                    <div>
                      <p className="font-medium text-lg">Step {step.step}</p>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CircuitBoard /> Components</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        {project.components.map(c => <li key={c}>{c}</li>)}
                    </ul>
                </CardContent>
            </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare/> Community Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={8}
                  placeholder="Enter comments here, one per line..."
                  className="bg-background"
                />
                <Button onClick={handleAnalyzeComments} disabled={isLoading} className="w-full">
                  {isLoading ? (
                    'Analyzing...'
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Analyze Comments
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {(isLoading || analysisResult) && (
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot /> AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-16 w-full" />
                    <Separator />
                    <Skeleton className="h-4 w-1/3" />
                     <Skeleton className="h-12 w-full" />
                  </div>
                )}
                {analysisResult && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Summary</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.summary}</p>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Relevant Resources</h4>
                      <p className="text-sm text-muted-foreground">{analysisResult.relevantResources}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
