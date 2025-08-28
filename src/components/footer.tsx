import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} McPerry Imaginations. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
          <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">Tools</Link>
          <Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shop</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
