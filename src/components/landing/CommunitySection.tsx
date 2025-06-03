
'use client';

import { Youtube } from 'lucide-react'; // Keep Youtube from lucide-react
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M20.317 4.369a1.913 1.913 0 00-1.566-.825H5.249a1.913 1.913 0 00-1.566.825 1.913 1.913 0 00-.351 1.606l1.533 6.901c.004.015.008.03.012.044a1.902 1.902 0 00.339 1.562l.004.005a1.907 1.907 0 001.566.825h11.559a1.913 1.913 0 001.566-.825 1.913 1.913 0 00.351-1.606l-1.533-6.901a1.913 1.913 0 00-.351-1.606zM8.02 10.333c-.925 0-1.675.75-1.675 1.675s.75 1.675 1.675 1.675 1.675-.75 1.675-1.675S8.945 10.333 8.02 10.333zm7.96 0c-.925 0-1.675.75-1.675 1.675s.75 1.675 1.675 1.675 1.675-.75 1.675-1.675-.75-1.675-1.675-1.675z"/>
  </svg>
);

const InstagramGradientIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#DD2A7B' }} /> {/* Pinkish-Red */}
        <stop offset="100%" style={{ stopColor: '#8134AF' }} /> {/* Purple */}
      </linearGradient>
    </defs>
    <path
      fill="url(#instagramGradient)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);


const socialLinks = [
  {
    name: 'YouTube',
    icon: Youtube,
    href: '#', // Placeholder - replace with actual link
    iconColor: 'text-destructive group-hover:text-destructive/90',
  },
  {
    name: 'Discord',
    icon: DiscordIcon,
    href: '#', // Placeholder - replace with actual link
    iconColor: 'text-indigo-500 group-hover:text-indigo-600', 
  },
  {
    name: 'Instagram',
    icon: InstagramGradientIcon,
    href: '#', // Placeholder - replace with actual link
    // iconColor is not needed here as the gradient is self-contained
  },
];

export function CommunitySection() {
  return (
    <section className="py-16 md:py-24 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-primary">
          Join Our Vibrant Community
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Connect with fellow learners, share insights, and grow together. Follow us on our social channels!
        </p>
        <div className="flex justify-center space-x-6 md:space-x-10">
          {socialLinks.map((social) => (
            <div key={social.name} className="flex flex-col items-center space-y-2">
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className={cn(
                  'group p-3 rounded-full bg-card/70 hover:bg-card/90 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 border border-primary/30 hover:border-accent'
                )}
              >
                <social.icon className={cn("h-8 w-8 md:h-10 md:w-10 transition-colors", social.iconColor)} />
              </Link>
              <span className="text-sm text-primary font-medium">{social.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    