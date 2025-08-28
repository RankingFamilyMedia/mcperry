
import { placeholderBlogPosts } from '@/lib/placeholder-data';
import { BlogPost } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

async function getBlogPosts(): Promise<BlogPost[]> {
    // In a real application, you would fetch this from your CMS
    // For now, we'll use the placeholder data.
    // try {
    //     const res = await fetch('https://mcpettyimaginations.online/api/posts');
    //     if (!res.ok) {
    //         throw new Error('Failed to fetch posts');
    //     }
    //     return res.json();
    // } catch (error) {
    //     console.error(error);
    //     // Fallback to placeholder data if API fails
    //     return placeholderBlogPosts;
    // }
    return placeholderBlogPosts;
}


export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
                    The Blog
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    News, tutorials, and insights from our team.
                </p>
            </section>

            <div className="text-center mb-8">
                <Button asChild>
                    <Link href="/admin/blog/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Write a New Post
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="group">
                        <Card className="h-full flex flex-col overflow-hidden hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                        <div className="aspect-video relative">
                            <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={post.aiHint}
                            />
                        </div>
                        <CardHeader>
                            <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                            <CardTitle className="font-headline text-xl group-hover:text-accent">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground">{post.date} &middot; by {post.author}</p>
                        </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
