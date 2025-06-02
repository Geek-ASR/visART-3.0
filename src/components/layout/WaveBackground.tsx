
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
    initialClassName: 'top-[-80vh] left-[-50vw] w-[200vw] h-[200vh] bg-primary/20',
    parallaxFactor: 0.05, // Was 0.1
    rotateDeg: -40,
  },
  {
    id: 'wave2',
    initialClassName: 'bottom-[-70vh] right-[-60vw] w-[220vw] h-[180vh] bg-accent/20',
    parallaxFactor: 0.1, // Was 0.2
    rotateDeg: 30,
  },
  {
    id: 'wave3',
    initialClassName: 'top-[0vh] left-[-70vw] w-[250vw] h-[150vh] bg-foreground/10',
    parallaxFactor: 0.15, // Was 0.3
    rotateDeg: -55,
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
          waveEl.style.transform = `rotate(${config.rotateDeg}deg) translateY(${translateY}px)`;
        }
      });
    };

    // Set initial positions
    handleScroll();

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
            'absolute rounded-full', // transform is now applied via style
            wave.initialClassName
          )}
          style={{
            transform: `rotate(${wave.rotateDeg}deg) translateY(0px)`, // Initial transform
          }}
        />
      ))}
    </div>
  );
}
