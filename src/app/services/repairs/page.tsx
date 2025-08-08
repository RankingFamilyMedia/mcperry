import Image from 'next/image';
import ContactForm from './contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const repairFeatures = [
    "Amplifier & Audio Gear Repair",
    "Custom PCB Troubleshooting",
    "Vintage Electronics Restoration",
    "Free Diagnostic & Quote"
]

export default function RepairsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Electronic Repair Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Breathe new life into your electronics. We offer expert repairs for a wide range of devices.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
            <Image 
                src="https://placehold.co/800x600.png"
                alt="Electronics repair workstation"
                width={800}
                height={600}
                className="rounded-lg shadow-lg"
                data-ai-hint="electronics repair"
            />
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">Get a Free Quote</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContactForm />
                </CardContent>
            </Card>
        </div>
      </div>
      
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold font-headline mb-8">Why Choose Us?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {repairFeatures.map(feature => (
                <Card key={feature} className="bg-secondary">
                    <CardContent className="p-6">
                        <CheckCircle className="h-8 w-8 text-accent mx-auto mb-4" />
                        <p className="font-semibold">{feature}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </section>

    </div>
  );
}
