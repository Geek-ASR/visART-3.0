
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle, BookOpen, Terminal, Users, GitFork } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

const titleText = "The Art of Visualizing Algorithms";
const waveSpeed = 50;
const greenDuration = 700;

const AnimatedStat = ({ icon: IconComponent, value, label, duration = 1500 }: { icon: React.ElementType, value: string, label: string, duration?: number }) => {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const targetNumberMatch = value.match(/\d+/);
    if (!targetNumberMatch) {
      setDisplayValue(value); // If no number, display as is
      return;
    }
    const targetNumber = parseInt(targetNumberMatch[0]);
    const suffix = value.substring(targetNumberMatch[0].length); // e.g., "+" or ""

    if (targetNumber === 0) {
      setDisplayValue(value);
      return;
    }

    let currentNumber = 0;
    const steps = duration / 16; // Aim for ~60fps updates
    const increment = targetNumber / steps;

    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(timer);
      }
      setDisplayValue(Math.ceil(currentNumber).toString() + suffix);
    }, 16);

    return () => clearInterval(timer);
  }, [value, label, duration]);

  return (
    <div className="flex flex-col items-center text-center py-4 px-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 border border-primary/20 hover:border-accent">
      <IconComponent className="w-5 h-5 md:w-6 md:h-6 mb-3 text-accent" />
      <p className="text-xl md:text-2xl font-bold text-primary mb-1">{displayValue}</p>
      <p className="text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  );
};

const statsData = [
  { value: "40+", label: "DSA Topics", icon: BookOpen },
  { value: "200+", label: "Coding Challenges", icon: Terminal },
  { value: "25+", label: "Workshops", icon: Users },
  { value: "10+", label: "Learning Paths", icon: GitFork },
];

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
    <section className="py-20 md:py-32">
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
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground focus:ring-accent"
          >
            <Link href="/visualizer">Explore All Features</Link>
          </Button>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {statsData.map((stat) => (
            <AnimatedStat
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
