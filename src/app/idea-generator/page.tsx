import IdeaGeneratorClient from "./idea-generator-client";

export default function IdeaGeneratorPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <section className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
                    AI Project Idea Generator
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Unleash your creativity. Enter your skills and interests, and let our AI spark your next big idea.
                </p>
            </section>
            <IdeaGeneratorClient />
        </div>
    )
}
