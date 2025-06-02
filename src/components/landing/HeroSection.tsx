
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 rounded-lg shadow-lg">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary">
          The Art of Visualizing Algorithms
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Visualize, learn, and code Data Structures and Algorithms like never before. VisART provides various features to enhance your logic-building skills and excel in problem-solving.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/solve">
              <PlayCircle className="mr-2 h-5 w-5" /> Start Learning
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/visualizer">Explore Visualizer</Link>
          </Button>
        </div>
        <div className="mt-16">
          <Image
            src="https://placehold.co/800x450.png"
            alt="Interactive DSA Learning Platform"
            width={800}
            height={450}
            className="rounded-lg shadow-2xl mx-auto"
            data-ai-hint="abstract data visualization"
          />
        </div>
      </div>
    </section>
  );
}
