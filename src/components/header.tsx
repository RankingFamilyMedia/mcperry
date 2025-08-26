'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, CircuitBoard, X, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme-toggle';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/idea-generator', label: 'AI Ideas' },
  { href: '/brand-advisor', label: 'Brand Advisor' },
  { href: '/shop', label: 'Shop' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/services', label: 'Services' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <CircuitBoard className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              McPerry Imaginations
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
             <Link
                href="/admin/inventory"
                className={cn(
                  'transition-colors hover:text-primary flex items-center gap-1',
                  pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex-1 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <CircuitBoard className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">
                McPerry Imaginations
              </span>
            </Link>
          </div>
          <SheetContent side="left" className="pr-0">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b pb-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <CircuitBoard className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">
                    McPerry Imaginations
                  </span>
                </Link>
                <SheetTrigger asChild>
                   <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </SheetTrigger>
              </div>

              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary',
                      pathname.startsWith(link.href) ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Link
                    href="/admin/inventory"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-medium transition-colors hover:text-primary flex items-center gap-2',
                      pathname.startsWith('/admin') ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                   <Shield className="h-5 w-5" /> Admin
                  </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <Button asChild>
            <Link href="/projects/create">Create Project</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
