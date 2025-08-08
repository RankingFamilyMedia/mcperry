import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  CircuitBoard,
  Code,
  Dumbbell,
  Music,
  Sparkles,
} from 'lucide-react';

const featureCards = [
  {
    title: 'DIY Projects',
    description: 'Explore detailed electronics projects with tutorials and schematics.',
    link: '/projects',
    icon: <CircuitBoard className="h-10 w-10 text-primary" />,
  },
  {
    title: 'AI Idea Generator',
    description: 'Get inspired with AI-powered project ideas based on your skills.',
    link: '/idea-generator',
    icon: <Sparkles className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Music & Film',
    description: 'Discover music production, artist services, and video creation.',
    link: '/services',
    icon: <Music className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Web & Apps',
    description: 'Boost your business with custom websites and applications.',
    link: '/services',
    icon: <Code className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Sports Promotion',
    description: 'Training and promotion for aspiring world champion athletes.',
    link: '/services',
    icon: <Dumbbell className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Affiliate Shop',
    description: 'Browse our curated list of products and tools for your projects.',
    link: '/shop',
    icon: <CircuitBoard className="h-10 w-10 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-primary mb-4 animate-fade-in-down">
          McPerry Imaginations
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in-up">
          A universe of creativity where technology, music, and ambition
          collide. From intricate DIY electronics to groundbreaking digital
          solutions, we bring your ideas to life.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/projects">
              Browse Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/idea-generator">Get AI Ideas</Link>
          </Button>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <Card
              key={card.title}
              className="bg-card hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-4">
                {card.icon}
                <div className="flex-1">
                  <CardTitle className="font-headline">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="p-0 text-accent">
                  <Link href={card.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
