
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  category: z.string().min(3, 'Category must be at least 3 characters long.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters long.'),
  content: z.string().min(20, 'Content must be at least 20 characters long.'),
});

export default function CreateBlogPostPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof blogPostSchema>>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      category: '',
      excerpt: '',
      content: '',
    },
  });

  function onSubmit(values: z.infer<typeof blogPostSchema>) {
    console.log(values);
    toast({
      title: 'Blog Post Submitted!',
      description: 'Your post has been submitted for review.',
    });
    form.reset();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Create a New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., The Art of PCB Design" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Electronics, Music, Web Development" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt / Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short summary of the blog post."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the full content of your blog post here. You can use Markdown."
                        rows={15}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" size="lg" className="w-full">
                Publish Post
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
