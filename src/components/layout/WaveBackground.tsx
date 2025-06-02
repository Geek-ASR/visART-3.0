
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WaveProps {
  id: string;
  initialClassName: string;
  parallaxFactor: number;
  rotateDeg: number;
}

const wavesConfig: WaveProps[] = [
  {
    id: 'wave1',
    initialClassName: 'top-[70vh] left-[-100vw] w-[300vw] h-[50vh] bg-primary/20 rounded-full',
    parallaxFactor: 0.05,
    rotateDeg: -8, 
  },
  {
    id: 'wave2',
    initialClassName: 'top-[35vh] left-[-120vw] w-[350vw] h-[55vh] bg-accent/20 rounded-full',
    parallaxFactor: 0.1,
    rotateDeg: 6,  
  },
  {
    id: 'wave3',
    initialClassName: 'top-[-5vh] left-[-150vw] w-[400vw] h-[60vh] bg-foreground/10 rounded-full',
    parallaxFactor: 0.15,
    rotateDeg: -4, 
  },
];

export function WaveBackground() {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      waveRefs.current.forEach((waveEl, index) => {
        if (waveEl) {
          const config = wavesConfig[index];
          const translateY = scrollY * config.parallaxFactor;
          // Ensure rotation is part of the transform
          waveEl.style.transform = `rotate(${config.rotateDeg}deg) translateY(${translateY}px)`;
        }
      });
    };

    // Set initial positions including rotation
    waveRefs.current.forEach((waveEl, index) => {
      if (waveEl) {
        const config = wavesConfig[index];
        waveEl.style.transform = `rotate(${config.rotateDeg}deg) translateY(0px)`;
      }
    });
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[-1] overflow-hidden">
      {wavesConfig.map((wave, index) => (
        <div
          key={wave.id}
          ref={(el) => (waveRefs.current[index] = el)}
          className={cn(
            'absolute', 
            wave.initialClassName
          )}
          // Initial transform set in useEffect to ensure refs are populated
        />
      ))}
    </div>
  );
}
