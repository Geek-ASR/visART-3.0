
'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimationOverlay } from '@/components/landing/AnimationOverlay';
import { CommunitySection } from '@/components/landing/CommunitySection';
import { ContributorSection } from '@/components/landing/ContributorSection';

export default function HomePage() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('animationPlayed')) {
      setAnimationComplete(true);
    }
  }, []);

  const handleAnimationFinish = () => {
    setAnimationComplete(true);
    sessionStorage.setItem('animationPlayed', 'true');
  };

  if (!animationComplete) {
    return <AnimationOverlay onAnimationComplete={handleAnimationFinish} />;
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CommunitySection />
      <ContributorSection />
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6 text-primary">Ready to Elevate Your DSA Skills?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join VisART today and transform the way you learn Data Structures and Algorithms.
          </p>
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/solve">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
