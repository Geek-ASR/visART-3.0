import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <HeroSection />
      <FeaturesSection />
      <section className="py-16 md:py-24 text-center bg-secondary/30 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">Ready to Elevate Your DSA Skills?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join AlgoVisuals today and transform the way you learn Data Structures and Algorithms.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/solve">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
