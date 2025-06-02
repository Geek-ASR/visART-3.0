
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const titleText = "The Art of Visualizing Algorithms";

export function HeroSection() {
  // Create an array of only the non-space characters for animation state
  const actualCharsToAnimate = titleText.split('').filter(char => char !== ' ');
  const [animatedCharsState, setAnimatedCharsState] = useState(Array(actualCharsToAnimate.length).fill(false));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    actualCharsToAnimate.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setAnimatedCharsState((prev) => {
            const newAnimatedChars = [...prev];
            newAnimatedChars[index] = true; // Animate non-space characters
            return newAnimatedChars;
          });
        }, index * 75) // Wave speed for each non-space character
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const renderAnimatedTitle = () => {
    const elements = [];
    let nonSpaceCharIndex = 0;
    for (let i = 0; i < titleText.length; i++) {
      const char = titleText[i];
      if (char === ' ') {
        // Render spaces as React Fragments containing a space string
        elements.push(<React.Fragment key={`space-${i}`}> </React.Fragment>);
      } else {
        // Render non-space characters within spans for animation
        elements.push(
          <span
            key={`char-${i}`}
            className={cn(
              'transition-colors duration-300 ease-in-out',
              animatedCharsState[nonSpaceCharIndex] ? 'text-green-400' : ''
            )}
          >
            {char}
          </span>
        );
        nonSpaceCharIndex++;
      }
    }
    return elements;
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30 rounded-lg shadow-lg">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 text-primary">
          {renderAnimatedTitle()}
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
