
'use client';

import { Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
    <path d="M20.317 4.369a1.913 1.913 0 00-1.566-.825H5.249a1.913 1.913 0 00-1.566.825 1.913 1.913 0 00-.351 1.606l1.533 6.901c.004.015.008.03.012.044a1.902 1.902 0 00.339 1.562l.004.005a1.907 1.907 0 001.566.825h11.559a1.913 1.913 0 001.566-.825 1.913 1.913 0 00.351-1.606l-1.533-6.901a1.913 1.913 0 00-.351-1.606zM8.02 10.333c-.925 0-1.675.75-1.675 1.675s.75 1.675 1.675 1.675 1.675-.75 1.675-1.675S8.945 10.333 8.02 10.333zm7.96 0c-.925 0-1.675.75-1.675 1.675s.75 1.675 1.675 1.675 1.675-.75 1.675-1.675-.75-1.675-1.675-1.675z"/>
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
    icon: Instagram,
    href: '#', // Placeholder - replace with actual link
    iconColor: 'text-accent group-hover:text-accent/90', 
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
