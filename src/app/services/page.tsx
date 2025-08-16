import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Music, Code, Dumbbell, Wrench, Film, Users } from 'lucide-react';

const services = [
  {
    icon: <Music className="w-8 h-8 text-primary" />,
    title: 'Music Production & Distribution',
    description: 'Studio recording, mixing, mastering, beat production, and global music distribution through Grinomuzik.com.',
    link: '#',
  },
  {
    icon: <Music className="w-8 h-8 text-primary" />,
    title: 'Sugar Ranking Music',
    description: 'mcperry as sugarranking.',
    link: '/services/sugar-ranking',
  },
  {
    icon: <Film className="w-8 h-8 text-primary" />,
    title: 'Music Videos & Films',
    description: 'Professional production of compelling music videos and short films to bring your artistic vision to life.',
    link: '#',
  },
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Websites & Apps',
    description: 'Custom websites and applications designed to boost your business, complete with rich SEO profiling.',
    link: '#',
  },
  {
    icon: <Wrench className="w-8 h-8 text-primary" />,
    title: 'Electronic Repair Services',
    description: 'Expert repair services for a wide range of electronic devices. Get a quote today.',
    link: '/services/repairs',
  },
  {
    icon: <Dumbbell className="w-8 h-8 text-primary" />,
    title: 'Sports Promotion',
    description: 'Comprehensive training, motivation, and psychological conditioning to forge world champion footballers and boxers.',
    link: '#',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Artist & Influencer Management',
    description: 'Full-service management for artists and influencers, including personnel, deals, and social media strategy.',
    link: '#',
  },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          From the recording studio to the digital frontier, we provide expert services to elevate your brand and career.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
                {service.icon}
                <CardTitle className="font-headline">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardContent>
              <Button asChild variant="outline">
                <Link href={service.link}>
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
