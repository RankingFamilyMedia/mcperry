import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';

const TikTokIcon = (props: React.ComponentProps<'svg'>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M21 7.4V11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2C12.53 2 13.5 2.2 14.39 2.56" />
        <path d="M14.39 2.56C13.5 2.2 12.53 2 11.5 2C6.25 2 2 6.25 2 11.5C2 16.75 6.25 21 11.5 21C16.75 21 21 16.75 21 11.5V7.4" />
        <path d="M11 11.25V4.25" />
        <path d="M8 8.75C8.94 8.75 11 8.75 11 8.75" />
        <path d="M11 13.75C11 15.25 9.75 16.5 8.25 16.5C6.75 16.5 5.5 15.25 5.5 13.75C5.5 12.25 6.75 11 8.25 11" />
    </svg>
);


export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} McPerry Imaginations. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
             <a href="https://web.facebook.com/McperryImaginations" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://www.tiktok.com/@mcperryimaginations" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <TikTokIcon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://www.youtube.com/channel/UC1QHmn70fKbwC5L9Fqvyhkg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
