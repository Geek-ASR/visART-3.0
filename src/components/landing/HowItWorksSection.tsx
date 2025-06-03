
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserPlus, Eye, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary mb-4" />,
    title: 'Sign Up & Explore',
    description: 'Create your free account in seconds and browse our comprehensive library of DSA topics and algorithms.',
  },
  {
    icon: <Eye className="h-10 w-10 text-primary mb-4" />,
    title: 'Visualize & Learn',
    description: 'Dive into interactive visualizations. See algorithms in action, step-by-step, with your own custom inputs.',
  },
  {
    icon: <Terminal className="h-10 w-10 text-primary mb-4" />,
    title: 'Code & Conquer',
    description: 'Test your knowledge in our built-in coding environment. Solve problems, get feedback, and track your mastery.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-transparent text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-12 text-primary">
          Get Started in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className={cn(
                "shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out backdrop-blur-sm border border-primary/20 hover:border-accent hover:scale-[1.02]",
                "bg-card/60" // Consistent with FeaturesSection cards
              )}
            >
              <CardHeader className="items-center text-center">
                {step.icon}
                <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
