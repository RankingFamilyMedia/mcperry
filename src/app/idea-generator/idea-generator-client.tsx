'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Sparkles, Loader2, CircuitBoard, AlertTriangle } from 'lucide-react';
import { generateProjectIdea, GenerateProjectIdeaOutput } from '@/ai/flows/generate-project-idea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  skills: z.string().min(3, 'Please enter at least one skill.'),
  interests: z.string().min(3, 'Please enter at least one interest.'),
});

export default function IdeaGeneratorClient() {
  const [generatedIdea, setGeneratedIdea] = useState<GenerateProjectIdeaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skills: '',
      interests: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedIdea(null);
    try {
      const result = await generateProjectIdea(values);
      setGeneratedIdea(result);
    } catch (error) {
      console.error('Error generating project idea:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to generate a project idea. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lightbulb /> Your Ingredients</CardTitle>
          <CardDescription>Tell us what you know and what you love.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., soldering, pcb design, coding" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., robotics, audio, home automation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Idea
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center">
        {isLoading && (
          <Card className="w-full animate-pulse">
            <CardHeader>
              <div className="h-8 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-1/4 bg-muted rounded mt-2"></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-5/6 bg-muted rounded"></div>
              <div className="h-8 w-1/2 bg-muted rounded mt-4"></div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !generatedIdea && (
           <Card className="w-full border-dashed text-center">
             <CardContent className="p-10">
               <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
               <p className="mt-4 text-muted-foreground">Your next project idea will appear here.</p>
             </CardContent>
           </Card>
        )}
        
        {generatedIdea && (
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle className="text-2xl font-headline text-accent">{generatedIdea.projectIdea}</CardTitle>
              <CardDescription>
                <Badge className="capitalize">{generatedIdea.difficulty}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><CircuitBoard/> Required Components</h4>
              <p className="text-muted-foreground">{generatedIdea.requiredComponents}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
