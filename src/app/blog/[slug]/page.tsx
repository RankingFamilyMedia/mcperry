import { placeholderBlogPosts } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

async function getPost(slug: string) {
    // In a real app, fetch from a CMS:
    // const res = await fetch(`https://mcpettyimaginations.online/api/posts/${slug}`);
    // if (!res.ok) return undefined;
    // return res.json();

    const post = placeholderBlogPosts.find((p) => p.slug === slug);
    return post;
}

export async function generateStaticParams() {
  // In a real app, fetch all slugs from your CMS
  return placeholderBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
                {post.title}
            </h1>
            <p className="text-muted-foreground text-lg">
                Posted on {post.date} by {post.author}
            </p>
        </header>

        <div className="relative aspect-video mb-8">
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="rounded-lg object-cover"
                data-ai-hint={post.aiHint}
            />
        </div>
        
        {/* The content will be rendered here. If it's markdown, you'll need a library to parse it. */}
        <div className="prose lg:prose-xl dark:prose-invert max-w-none mx-auto">
            <p>{post.excerpt}</p>
            {/* For full content, you would render post.content here */}
            {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
                <p>Full blog post content would appear here...</p>
            )}
        </div>
    </article>
  );
}
