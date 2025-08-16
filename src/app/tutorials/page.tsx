import { BookCard } from '@/components/book-card';
import { placeholderBooks } from '@/lib/placeholder-data';
import { BookOpen } from 'lucide-react';

export default function TutorialsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-6">
            <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Tutorials
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Deepen your knowledge with our curated books and collections of tutorials.
        </p>
      </section>

      <div className="space-y-12">
        {placeholderBooks.map((book) => (
          <section key={book.id}>
             <h2 className="text-3xl font-bold font-headline mb-6 text-center">{book.title}</h2>
             <BookCard book={book} />
          </section>
        ))}
      </div>
    </div>
  );
}
