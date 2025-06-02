
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
                <style type="text/css">
                    {`
                        .binary-digit { fill: #8B4513; font-family: Arial, Helvetica, sans-serif; font-weight: bold; }
                        .figure-skin-light { fill: #FFE0B2; }
                        .figure-skin-medium { fill: #FFDBAC; }
                        .figure-accent-brown { fill: #A0522D; }
                        .yellow-highlight { fill: #FFFACD; }
                        .yellow-accent { fill: #FFEE99; }
                    `}
                </style>
            </defs>

            {/* Stylized Humanoid Figure Group */}
            <g transform="translate(200, 225)" filter="url(#dropshadow)">
                {/* Head */}
                <circle cx="0" cy="-100" r="35" className="figure-skin-light"/>
                <path d="M -15 -115 Q 0 -125 15 -115" stroke="#A0522D" strokeWidth="3" fill="none" opacity="0.7" /> 
                <circle cx="-12" cy="-98" r="5" fill="#6D4C41" /> 
                <circle cx="12" cy="-98" r="5" fill="#6D4C41" />  

                {/* Torso - built from geometric shapes */}
                <rect x="-40" y="-70" width="80" height="100" rx="20" className="figure-skin-medium"/>
                <circle cx="0" cy="-20" r="30" className="figure-skin-light" opacity="0.6"/>
                <path d="M -20 -50 L 0 -30 L 20 -50 Z M -10 -15 L 10 -15 L 0 5 Z" className="figure-accent-brown" opacity="0.4"/>
                
                {/* Arm (Reaching) - Segmented */}
                <g id="reachingArm">
                    <animateTransform attributeName="transform"
                                        type="rotate"
                                        values="0 0 -50; -8 0 -50; 0 0 -50"
                                        keyTimes="0; 0.5; 1"
                                        dur="3s"
                                        repeatCount="indefinite"/>
                    {/* Upper Arm */}
                    <rect x="35" y="-65" width="20" height="55" rx="10" className="figure-accent-brown" transform="rotate(20 45 -60)"/>
                    {/* Forearm */}
                    <rect x="70" y="-95" width="18" height="65" rx="9" className="figure-skin-medium" transform="rotate(40 79 -90)"/>
                    {/* Hand */}
                    <circle cx="95" cy="-135" r="12" className="figure-skin-light" transform="rotate(40 79 -90)"/>
                </g>

                {/* Other Arm (Simpler) */}
                <g transform="translate(-55, -35) rotate(-25)">
                    <rect x="0" y="0" width="18" height="50" rx="9" className="figure-accent-brown"/>
                    <circle cx="9" cy="55" r="10" className="figure-skin-light"/>
                </g>

                {/* Legs (Abstract and short) */}
                <rect x="-30" y="30" width="28" height="45" rx="12" className="figure-accent-brown"/>
                <rect x="2" y="30" width="28" height="45" rx="12" className="figure-accent-brown"/>
            </g>

            {/* Floating Binary Code */}
            <g className="binary-digit">
                {/* Group 1 - Near Hand */}
                <text x="310" y="100" fontSize="40" opacity="0.95" filter="url(#dropshadow)">1</text>
                <text x="345" y="150" fontSize="30" opacity="0.85">0</text>
                <text x="280" y="160" fontSize="25" opacity="0.7">1</text>
                
                {/* General Floating Digits */}
                <text x="450" y="70" fontSize="55" opacity="0.9" filter="url(#dropshadow)">0</text>
                <text x="530" y="130" fontSize="45" opacity="0.85" filter="url(#dropshadow)">1</text>
                <text x="620" y="90" fontSize="38" opacity="0.75">1</text>
                <text x="380" y="260" fontSize="28" opacity="0.65">0</text>
                <text x="580" y="310" fontSize="50" opacity="0.9" filter="url(#dropshadow)">1</text>
                <text x="670" y="250" fontSize="33" opacity="0.7">0</text>
                <text x="330" y="370" fontSize="38" opacity="0.8">1</text>
                <text x="720" y="190" fontSize="22" opacity="0.55">0</text>
                <text x="700" y="400" fontSize="28" opacity="0.6">1</text>
                
                <text x="480" y="200" fontSize="35" opacity="0.7">
                    <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" repeatCount="indefinite" />
                    1
                </text>
                <text x="640" y="340" fontSize="28" opacity="0.6">
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -12; 0 0" dur="4.5s" repeatCount="indefinite" />
                    0
                </text>
                <text x="400" y="190" fontSize="26" opacity="0.65">
                    <animateTransform attributeName="transform" type="translate" values="0 0; 0 8; 0 0" dur="3s" repeatCount="indefinite" />
                    0
                </text>
                 <text x="550" y="240" font-size="30" opacity="0.7" filter="url(#dropshadow)">
                    <animateTransform attributeName="transform" type="translate" values="0 0; 5 -5; 0 0" dur="5s" repeatCount="indefinite" />
                    1
                </text>
            </g>

            {/* Decorative Accent Elements (Light Yellow & accents) */}
            <circle cx="100" cy="70" r="25" className="yellow-highlight" opacity="0.4"/>
            <ellipse cx="720" cy="390" rx="45" ry="22" className="yellow-highlight" opacity="0.4"/>
            <path d="M 60 120 Q 110 90 160 120 T 260 120" stroke="#FFEE99" stroke-width="3" fill="none" opacity="0.35"/>
            <path d="M 580 40 Q 615 75 580 110 Q 545 75 580 40 Z" className="yellow-accent" opacity="0.25"/>
             <rect x="30" y="300" width="50" height="50" rx="10" className="yellow-highlight" opacity="0.2" transform="rotate(-15 55 325)"/>
             <circle cx="750" cy="80" r="15" className="yellow-accent" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
