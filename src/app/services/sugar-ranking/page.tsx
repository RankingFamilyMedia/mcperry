import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function SugarRankingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Sugar Ranking Music
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Mcperry or Mcperry imagination is known in the music indstry as SUgar Ranking
        </p>
      </section>
      
      <Card>
        <CardHeader>
          <CardTitle>Embedded App Showcase</CardTitle>
          <CardDescription>
            Here is where your dedicated Sugar Ranking application will be displayed. You can use an iframe to embed content from another URL.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center border border-dashed">
            <p className="text-muted-foreground">
              {/* You can replace this div with an iframe like this: */}
              {/* <iframe src="YOUR_APP_URL" className="w-full h-full border-0" /> */}
              Embedded Application Placeholder
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Separator className="my-12" />

      <section>
        <h2 className="text-3xl font-bold text-center font-headline mb-8">About Sugar Ranking</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-center">
            Information about Sugar Ranking, including biography, discography, and tour dates, will be loaded here from an API.
        </p>
      </section>
    </div>
  );
}
