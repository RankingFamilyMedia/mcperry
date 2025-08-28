import ContactForm from '@/app/services/repairs/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Contact Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question, a project idea, or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline">Send us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
            <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle className="font-headline">Contact Information</CardTitle>
                    <CardDescription>You can also reach us through the following channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail className="w-6 h-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Email</h3>
                            <a href="mailto:info@mcperryimaginations.online" className="text-muted-foreground hover:text-primary">info@mcperryimaginations.online</a>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <Phone className="w-6 h-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Phone</h3>
                            <p className="text-muted-foreground">+233277632966</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                        <MapPin className="w-6 h-6 text-primary" />
                        <div>
                            <h3 className="font-semibold">Address</h3>
                            <p className="text-muted-foreground">2nd ponpon streets, dansoman accra</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
