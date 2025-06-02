
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
    initialClassName: 'top-[70vh] left-[-50vw] w-[250vw] h-[30vh] bg-primary/30 rounded-t-full opacity-75',
    parallaxFactor: 0.03,
    rotateDeg: -3,
  },
  {
    id: 'wave2',
    initialClassName: 'top-[60vh] left-[-70vw] w-[300vw] h-[35vh] bg-accent/30 rounded-t-full opacity-65',
    parallaxFactor: 0.06,
    rotateDeg: 2,
  },
  {
    id: 'wave3',
    initialClassName: 'top-[50vh] left-[-60vw] w-[280vw] h-[40vh] bg-foreground/15 rounded-t-full opacity-55',
    parallaxFactor: 0.09,
    rotateDeg: -1,
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

    waveRefs.current.forEach((waveEl, index) => {
      if (waveEl) {
        const config = wavesConfig[index];
        waveEl.style.transform = `rotate(${config.rotateDeg}deg) translateY(0px)`;
      }
    });
    
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
        />
      ))}
    </div>
  );
}
