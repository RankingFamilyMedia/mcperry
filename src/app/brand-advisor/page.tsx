import BrandAdvisorClient from './brand-advisor-client';

export default function BrandAdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          AI Brand Advisor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get strategic advice on how to unify your diverse talents and create a cohesive brand message.
        </p>
      </section>
      <BrandAdvisorClient />
    </div>
  );
}
