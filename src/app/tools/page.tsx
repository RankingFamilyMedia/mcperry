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
  Briefcase,
  BookOpen,
  Wrench,
  Bot,
} from 'lucide-react';

const toolCards = [
  {
    title: 'DIY Projects',
    description:
      'Explore detailed electronics projects with tutorials and schematics.',
    link: '/projects',
    icon: <CircuitBoard className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Tutorials',
    description:
      'Learn new skills with our structured books and collections.',
    link: '/tutorials',
    icon: <BookOpen className="h-10 w-10 text-primary" />,
  },
  {
    title: 'AI Idea Generator',
    description:
      'Get inspired with AI-powered project ideas based on your skills.',
    link: '/idea-generator',
    icon: <Sparkles className="h-10 w-10 text-primary" />,
  },
  {
    title: 'AI Brand Advisor',
    description:
      'Unify your brand with creative, AI-driven strategic advice.',
    link: '/brand-advisor',
    icon: <Bot className="h-10 w-10 text-primary" />,
  },
   {
    title: 'Repair Services',
    description: 'Expert repair services for a wide range of electronic devices.',
    link: '/services/repairs',
    icon: <Wrench className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Affiliate Shop',
    description:
      'Browse our curated list of products and tools for your projects.',
    link: '/shop',
    icon: <CircuitBoard className="h-10 w-10 text-primary" />,
  },
  {
    title: 'Job Board',
    description: 'Find your next career opportunity in tech, music, and more.',
    link: '/jobs',
    icon: <Briefcase className="h-10 w-10 text-primary" />,
  },
   {
    title: 'Create a Project',
    description: 'Share your own DIY projects with the community.',
    link: '/projects/create',
    icon: <Code className="h-10 w-10 text-primary" />,
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
       <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Tools & Resources
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of creative and development tools to spark your next project.
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {toolCards.map((card, index) => (
          <Card
            key={card.title}
            className="bg-card hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {card.icon}
              <div className="flex-1">
                <CardTitle className="font-headline">{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription>{card.description}</CardDescription>
              <Button
                asChild
                variant="link"
                className="p-0 text-accent mt-4"
              >
                <Link href={card.link}>
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
