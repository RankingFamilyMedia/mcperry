import type { Book } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TutorialCard } from './tutorial-card';
import Image from 'next/image';
import { Badge } from './ui/badge';

export function BookCard({ book }: { book: Book }) {
    return (
        <Card className="overflow-hidden">
            <div className="grid md:grid-cols-3">
                <div className="md:col-span-1 p-6 flex flex-col justify-between bg-secondary/50">
                    <div>
                        <CardHeader className="p-0 mb-4">
                            <Badge variant="secondary" className="w-fit mb-2">{book.category}</Badge>
                            <CardTitle className="font-headline text-3xl">{book.title}</CardTitle>
                            <CardDescription>{book.description}</CardDescription>
                        </CardHeader>
                        <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                            {book.tutorials.map(tutorial => (
                                <li key={tutorial.id}>{tutorial.title}</li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">By {book.author}</p>
                </div>
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
                        {book.tutorials.map((tutorial) => (
                            <TutorialCard key={tutorial.id} tutorial={tutorial} />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    )
}
