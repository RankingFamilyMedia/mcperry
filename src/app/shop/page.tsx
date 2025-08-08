import { ProductCard } from '@/components/product-card';
import { placeholderProducts } from '@/lib/placeholder-data';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
          Affiliate Shop
        </h1>
        <p className="text-lg text-muted-foreground">
          Curated tools and components to bring your projects to life.
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {placeholderProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
