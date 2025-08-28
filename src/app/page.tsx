import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Music,
  Code,
  Dumbbell,
  Wrench,
  Users,
  CircuitBoard,
  Database,
  ShoppingCart,
  Calendar,
  Mic,
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { placeholderBlogPosts } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';

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

const services = [
  {
    icon: <CircuitBoard className="w-8 h-8 text-primary" />,
    title: 'PCB Design & Sales',
    description:
      'Custom PCB design for all modules and sale of pre-made boards.',
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: 'DIY Amplifiers & Repairs',
    description:
      'Build your own custom-wattage home audio amplifiers and expert electronic repair services.',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Web & App Development',
    description:
      'Full-stack web design and application development to bring your digital ideas to life.',
  },
  {
    icon: <Database className="w-8 h-8 text-primary" />,
    title: 'Data Management',
    description:
      'Robust data management solutions to keep your information organized and secure.',
  },
  {
    icon: <Music className="w-8 h-8 text-primary" />,
    title: 'Music Production & Distribution',
    description:
      'Full-service music production and global distribution to get your tracks heard.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Music & Sports Promotions',
    description:
      'Artist promotions and comprehensive support for athletes and sports events.',
  },
  {
    icon: <Mic className="w-8 h-8 text-primary" />,
    title: 'Musician for Booking',
    description:
      'Hire a professional musician for your events, studio sessions, and collaborations.',
  },
  {
    icon: <Calendar className="w-8 h-8 text-primary" />,
    title: 'Event Organization',
    description:
      'Professional event organization services for sports and music events.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
                    fill
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

      {/* About Summary Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
                Welcome to McPerry Imaginations
              </h2>
              <p className="text-muted-foreground mb-4">
                McPerry Imaginations is a multifaceted creative hub where innovation knows no bounds. We are a collective of creators, thinkers, and makers dedicated to pushing the boundaries of technology, art, and music.
              </p>
              <p className="text-muted-foreground mb-6">
                From composing chart-topping hits as Sugar Ranking to engineering complex electronics and developing cutting-edge web applications, our passion lies in bringing ambitious ideas to life. We also dedicate ourselves to nurturing talent, whether it's promoting the next world champion athlete or managing the careers of rising artists.
              </p>
               <Button asChild>
                <Link href="/about">
                  Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="About McPerry Imaginations"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
                data-ai-hint="creative workspace"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              A diverse range of services to empower your creative and business goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="bg-card hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  {service.icon}
                  <div className="flex-1">
                    <CardTitle className="font-headline">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/services">
                  Explore All Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
              From the Blog
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Latest news, tutorials, and insights from our team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderBlogPosts.slice(0,3).map(post => (
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
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/blog">
                Read More Posts <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
