
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

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
          <svg width="100%" height="auto" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="2" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5"/>
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/> 
                </feMerge>
              </filter>
            </defs>

            <rect width="100%" height="100%" fill="#FFFDE7" />

            <g transform="translate(150, 225)"> 
              <ellipse cx="0" cy="0" rx="60" ry="90" fill="#FFCC80" filter="url(#dropshadow)"/>
              <circle cx="0" cy="-100" r="40" fill="#FFE0B2" filter="url(#dropshadow)"/>
              <path d="M 20 -40 Q 100 -30, 180 -60 L 200 -50 L 170 -30 Q 90 -5, 20 -10 Z" fill="#A1887F" filter="url(#dropshadow)">
                <animateTransform attributeName="transform"
                                  type="rotate"
                                  values="0 20 -40; 5 20 -40; 0 20 -40"
                                  keyTimes="0; 0.5; 1"
                                  dur="3s"
                                  repeatCount="indefinite"
                                  />
              </path>
              <circle cx="200" cy="-55" r="15" fill="#FFE0B2"/>
            </g>

            <g fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fill="#6D4C41">
              <text x="450" y="150" fontSize="70" opacity="0.9">0</text>
              <text x="550" y="250" fontSize="70" opacity="0.9">1</text>
              <text x="650" y="120" fontSize="70" opacity="0.9">1</text>
              <text x="400" y="100" fontSize="40" opacity="0.7">1</text>
              <text x="480" y="300" fontSize="40" opacity="0.7">0</text>
              <text x="580" y="80" fontSize="40" opacity="0.7">0</text>
              <text x="700" y="320" fontSize="40" opacity="0.7">1</text>
              <text x="500" y="190" fontSize="30" opacity="0.6">1</text>
              <text x="620" y="350" fontSize="30" opacity="0.6">0</text>
              <text x="380" y="250" fontSize="30" opacity="0.6">0</text>
              <text x="720" y="200" fontSize="40" opacity="0.7">0</text>

              <line x1="420" y1="180" x2="450" y2="200" stroke="#BCAAA4" strokeWidth="3" opacity="0.5"/>
              <line x1="530" y1="100" x2="560" y2="120" stroke="#BCAAA4" strokeWidth="3" opacity="0.5"/>
              <line x1="600" y1="280" x2="630" y2="300" stroke="#BCAAA4" strokeWidth="3" opacity="0.5"/>
            </g>
            
            <circle cx="100" cy="80" r="30" fill="#FFF59D" opacity="0.4"/>
            <ellipse cx="700" cy="380" rx="50" ry="25" fill="#FFF59D" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
