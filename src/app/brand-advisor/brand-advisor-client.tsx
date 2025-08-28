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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Loader2, Bot, Quote } from 'lucide-react';
import { brandAdvisor, BrandAdvisorOutput } from '@/ai/flows/brand-advisor';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  description: z.string().min(10, 'Please describe the brand in at least 10 characters.'),
});

const defaultDescription = "A multifaceted creator involved in music production (as Sugar Ranking), DIY electronics projects, web and app development, sports promotion for athletes, and electronic repairs.";

export default function BrandAdvisorClient() {
  const [suggestion, setSuggestion] = useState<BrandAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: defaultDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await brandAdvisor(values);
      setSuggestion(result);
    } catch (error) {
      console.error('Error getting brand advice:', error);
      toast({
        title: 'An Error Occurred',
        description: 'Failed to get a suggestion. Please try again.',
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
          <CardTitle>Brand Description</CardTitle>
          <CardDescription>Describe the person or brand you want advice for.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills, Interests, and Activities</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A musician who also codes and builds electronics..."
                        rows={6}
                        {...field}
                      />
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
                Get Advice
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
              <div className="h-4 w-full bg-muted rounded mt-2"></div>
            </CardContent>
          </Card>
        )}

        {!isLoading && !suggestion && (
           <Card className="w-full border-dashed text-center">
             <CardContent className="p-10">
               <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
               <p className="mt-4 text-muted-foreground">Your AI-powered brand advice will appear here.</p>
             </CardContent>
           </Card>
        )}
        
        {suggestion && (
          <Card className="w-full bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent"><Quote className="transform -scale-x-100" /> {suggestion.headline}</CardTitle>
            </CardHeader>
            <CardContent>
              <h4 className="font-semibold mb-2">Suggestion:</h4>
              <p className="text-muted-foreground">{suggestion.suggestion}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
