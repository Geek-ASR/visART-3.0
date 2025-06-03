
'use client';

import { Button } from '@/components/ui/button';
import { Github, BookText, GitFork } from 'lucide-react';
import Link from 'next/link';

export function ContributorSection() {
  return (
    <section className="py-16 md:py-24 bg-card/50 backdrop-blur-sm rounded-lg shadow-lg border border-primary/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Side: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
              Be a Contributor
            </h2>
            <p className="text-lg text-muted-foreground">
              VisART is more than just a platform; it's a community-driven project. We believe that the best way to learn is to build and share. If you're passionate about DSA and want to make a difference, join us! Contribute your code, ideas, or documentation and help us grow.
            </p>
            <p className="text-lg text-muted-foreground">
              Don't just be a viewer – be a part of the journey. Let's build the future of interactive DSA learning together!
            </p>
          </div>

          {/* Right Side: GitHub Icon and Buttons */}
          <div className="flex flex-col items-center space-y-6">
            <Github className="h-20 w-20 md:h-24 md:w-24 text-primary" />
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm md:max-w-md">
              <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="https://github.com/Geek-ASR/VisART" target="_blank" rel="noopener noreferrer">
                  <GitFork className="mr-2 h-5 w-5" /> GitHub Repo
                </Link>
              </Button>
              <div className="p-[1.5px] rounded-lg bg-gradient-to-br from-purple-400 via-fuchsia-500 to-indigo-600 shadow-[0_0_8px_1px] shadow-purple-500/40 hover:shadow-[0_0_12px_2px] hover:shadow-purple-500/50 transition-all duration-300 w-full">
                <Button
                  size="lg"
                  asChild
                  className="w-full bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground font-semibold rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background/80 transition-colors duration-150"
                >
                  {/* Replace # with actual docs link when available */}
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    <BookText className="mr-2 h-5 w-5" /> Development Docs
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
