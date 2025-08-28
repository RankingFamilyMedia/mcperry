import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Target, Lightbulb } from 'lucide-react';

const teamMembers = [
  {
    name: 'McPerry',
    role: 'Founder & Lead Innovator',
    bio: 'The driving force behind McPerry Imaginations, with a passion for music, technology, and pushing creative boundaries.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'innovator portrait'
  },
  {
    name: 'Alex Doe',
    role: 'Lead Developer & DIY Expert',
    bio: 'A master of code and circuits, Alex brings complex technical projects to life with precision and expertise.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'developer portrait'
  },
  {
    name: 'Jane Smith',
    role: 'Brand Strategist & Artist Manager',
    bio: 'Jane shapes the narrative, managing talent and building the brands that define the future of our creative endeavors.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'manager portrait'
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          About McPerry Imaginations
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are a multifaceted creative hub where innovation knows no bounds. We are a collective of creators, thinkers, and makers dedicated to pushing the boundaries of technology, art, and music.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold font-headline text-primary mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground mb-4">
              Founded on the principle that creativity should not be siloed, McPerry Imaginations began as a small workshop tinkering with electronics and producing music. It has since grown into a dynamic enterprise that encompasses web development, artist management, and sports promotion.
            </p>
            <p className="text-muted-foreground">
              Our journey is one of constant learning and evolution, driven by a desire to bring ambitious ideas to life and to empower others to do the same.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src="https://placehold.co/600x400.png"
              alt="McPerry Imaginations Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint="creative team working"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 text-center">
        <h2 className="text-3xl font-bold font-headline mb-4">Our Mission & Vision</h2>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-4xl">
            <div className="flex flex-col items-center">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-headline mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                    To provide a platform where technology, art, and ambition converge, empowering creators to realize their full potential and bring innovative projects to the world.
                </p>
            </div>
             <div className="flex flex-col items-center">
                <Lightbulb className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-headline mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                    To build a global community of innovators and artists who collaborate and inspire one another, creating a future where imagination is the most valuable asset.
                </p>
            </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
                Meet the Team
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                The minds behind the magic.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
                <CardContent className="pt-6">
                    <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={120}
                        height={120}
                        className="rounded-full mx-auto mb-4 border-4 border-secondary"
                        data-ai-hint={member.aiHint}
                    />
                    <h3 className="text-xl font-headline font-bold">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                    <p className="text-muted-foreground mt-2 text-sm">{member.bio}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
