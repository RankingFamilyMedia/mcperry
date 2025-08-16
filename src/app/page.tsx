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
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const featureCards = [
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
    title: 'Music & Film',
    description:
      'Discover music production, artist services, and video creation.',
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
];

const heroSlides = [
  {
    title: 'Imagine. Create. Inspire.',
    description:
      'A universe of creativity where technology, music, and ambition collide. From intricate DIY electronics to groundbreaking digital solutions, we bring your ideas to life.',
    buttonText: 'Browse Projects',
    buttonLink: '/projects',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'creative technology',
  },
  {
    title: 'Your Sound, Amplified.',
    description:
      'Professional music production, distribution, and artist management services to elevate your career.',
    buttonText: 'Our Services',
    buttonLink: '/services',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'music production',
  },
  {
    title: 'Build Your Digital Presence.',
    description:
      'Custom websites, applications, and SEO strategies to help your business thrive online.',
    buttonText: 'Web Development',
    buttonLink: '/services',
    imageUrl: 'https://placehold.co/1200x600.png',
    aiHint: 'web development',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="w-full">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] md:h-[70vh]">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                    data-ai-hint={slide.aiHint}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight mb-4 animate-fade-in-down">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in-up">
                      {slide.description}
                    </p>
                    <Button asChild size="lg">
                      <Link href={slide.buttonLink}>
                        {slide.buttonText}{' '}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
              Our Universe of Creativity
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Explore our services and projects.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </section>
      </div>
    </div>
  );
}
