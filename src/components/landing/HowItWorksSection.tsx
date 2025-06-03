
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserPlus, Eye, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Icon } from 'lucide-react';

interface StepItem {
  id: string;
  icon: Icon;
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    id: 'signup',
    icon: UserPlus,
    title: 'Sign Up & Explore',
    description: 'Create your free account in seconds and browse our comprehensive library of DSA topics and algorithms.',
  },
  {
    id: 'visualize',
    icon: Eye,
    title: 'Visualize & Learn',
    description: 'Dive into interactive visualizations. See algorithms in action, step-by-step, with your own custom inputs.',
  },
  {
    id: 'code',
    icon: Terminal,
    title: 'Code & Conquer',
    description: 'Test your knowledge in our built-in coding environment. Solve problems, get feedback, and track your mastery.',
  },
];

interface TimelineStepProps {
  step: StepItem;
  isLeft: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, isLeft }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the item is visible
        rootMargin: "0px 0px -20px 0px", // Start animation a bit before it's fully in view
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
      observer.disconnect();
    };
  }, []);

  const IconComponent = step.icon;

  return (
    <div
      ref={ref}
      className={cn(
        'w-full md:flex items-start relative', // Use items-start for better alignment if content heights vary
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      {/* Desktop Spacer: Pushes card to one side or the other */}
      <div className="hidden md:block md:w-[calc(50%-1rem)]"></div> {/* 1rem is approx half of dot + space */}
      
      {/* Timeline Dot - Desktop */}
      <div className="hidden md:block absolute w-5 h-5 rounded-full border-4 border-background bg-accent z-10
                      left-1/2 top-4 transform -translate-x-1/2"> 
      </div>
      {/* Timeline Dot - Mobile */}
      <div className="md:hidden absolute w-4 h-4 rounded-full border-[3px] border-background bg-accent z-10
                      left-4 top-2 transform -translate-x-1/2">
      </div>

      {/* Content Card */}
      <div
        className={cn(
          'w-full md:w-[calc(50%-2rem)]', // Card width for desktop
          'ml-[calc(1rem+0.5rem+0.5rem)] md:ml-0', // Mobile: left-4(1rem) + dot-width-approx(0.5rem) + gap(0.5rem)
          'transform transition-all duration-700 ease-out delay-100',
          isVisible
            ? 'opacity-100 translate-x-0 translate-y-0'
            : 'opacity-0',
          // Desktop initial positions (based on isLeft)
          !isVisible && isLeft && 'md:-translate-x-12',
          !isVisible && !isLeft && 'md:translate-x-12',
          // Mobile initial position (common slide up)
          !isVisible && 'translate-y-10 md:translate-y-0'
        )}
      >
        <Card
          className={cn(
            'shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out backdrop-blur-sm border border-primary/20 hover:border-accent text-left',
            'bg-card/60'
          )}
        >
          <CardHeader>
            <div className="flex items-center space-x-3">
              <IconComponent className="h-8 w-8 text-primary flex-shrink-0" />
              <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{step.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent text-center overflow-x-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-16 md:mb-24 text-primary">
          Get Started in 3 Simple Steps
        </h2>
        
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-primary/20 transform -translate-x-1/2 h-full" aria-hidden="true"></div>
          {/* Vertical Line - Mobile */}
          <div className="md:hidden absolute top-0 bottom-0 left-4 w-0.5 bg-primary/20 h-full" aria-hidden="true"></div>

          {/* Items Container */}
          <div className="space-y-12 md:space-y-20"> {/* Vertical spacing between items */}
            {steps.map((step, index) => (
              <TimelineStep
                key={step.id}
                step={step}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
