
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

const titleText = "The Art of Visualizing Algorithms";
const waveSpeed = 50;
const greenDuration = 700;

export function HeroSection() {
  const actualCharsToAnimate = titleText.split('').filter(char => char !== ' ');
  const [animatedCharsState, setAnimatedCharsState] = useState(Array(actualCharsToAnimate.length).fill(false));

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    actualCharsToAnimate.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setAnimatedCharsState((prev) => {
            const newAnimatedChars = [...prev];
            newAnimatedChars[index] = true;
            return newAnimatedChars;
          });
        }, index * waveSpeed)
      );

      timeouts.push(
        setTimeout(() => {
          setAnimatedCharsState((prev) => {
            const newAnimatedChars = [...prev];
            newAnimatedChars[index] = false;
            return newAnimatedChars;
          });
        }, index * waveSpeed + greenDuration)
      );
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const renderAnimatedTitle = () => {
    const elements = [];
    let nonSpaceCharIndex = 0;
    for (let i = 0; i < titleText.length; i++) {
      const char = titleText[i];
      if (char === ' ') {
        elements.push(<React.Fragment key={`space-${i}`}> </React.Fragment>);
      } else {
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
        <div className="flex items-center justify-center space-x-4">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/solve">
              <PlayCircle className="mr-2 h-5 w-5" /> Get Started
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/visualizer">Explore All Features</Link>
          </Button>
        </div>
        <div className="mt-16 rounded-lg shadow-2xl mx-auto overflow-hidden" style={{ maxWidth: '800px' }}>
          <Image
            src="https://placehold.co/800x450.png"
            alt="Algorithm visualization placeholder"
            width={800}
            height={450}
            className="w-full h-auto"
            data-ai-hint="abstract technology"
          />
        </div>
      </div>
    </section>
  );
}
