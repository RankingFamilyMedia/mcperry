import type { Product } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-1">
      <CardHeader>
        <div className="aspect-square overflow-hidden rounded-t-lg border-b">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.aiHint}
          />
        </div>
        <CardTitle className="font-headline pt-4">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{product.price}</p>
        <Button asChild variant="ghost" size="sm" className="text-accent">
          <Link href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
            Buy Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
