
'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WaveConfig {
  id: string;
  gradientId: string;
  pathD: string;
  startColor: string;
  endColor: string;
  initialTopVh: number; // Approximate vertical position in vh units from the top
  heightVh: number; // Approximate height of the wave layer in vh
  opacity: number;
  parallaxFactor: number;
}

const wavesConfig: WaveConfig[] = [
  {
    id: 'wave-svg-1',
    gradientId: 'gradWave1',
    // Gentle, broad wave for the background
    pathD: "M0,192 C200,100 400,280 600,192 S1000,100 1200,192 S1400,280 1600,192 L1600,350 L0,350 Z",
    startColor: 'hsl(215 50% 92% / 0.6)', // Light secondary
    endColor: 'hsl(215 40% 96% / 0.3)',   // Very light secondary
    initialTopVh: 55,
    heightVh: 50, 
    opacity: 0.8,
    parallaxFactor: 0.09,
  },
  {
    id: 'wave-svg-2',
    gradientId: 'gradWave2',
    // Mid-ground wave with more definition
    pathD: "M0,224 C250,150 450,300 700,224 S950,150 1200,224 S1450,300 1600,224 L1600,350 L0,350 Z",
    startColor: 'hsl(260 60% 85% / 0.65)', // Light accent (purple)
    endColor: 'hsl(260 50% 92% / 0.35)',  // Very light accent
    initialTopVh: 50,
    heightVh: 55,
    opacity: 0.9,
    parallaxFactor: 0.06,
  },
  {
    id: 'wave-svg-3',
    gradientId: 'gradWave3',
    // Foreground wave, most prominent
    pathD: "M0,256 C300,180 500,320 800,256 S1100,180 1400,256 S1700,320 1900,256 L1900,350 L0,350 Z",
    startColor: 'hsl(231 70% 80% / 0.7)', // Light primary (blue)
    endColor: 'hsl(231 60% 90% / 0.4)',   // Very light primary
    initialTopVh: 45,
    heightVh: 60,
    opacity: 1,
    parallaxFactor: 0.03,
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
          // Apply only translateY for parallax, rotation is handled by SVG path
          waveEl.style.transform = `translateY(${translateY}px)`;
        }
      });
    };
    
    // Initialize positions
    waveRefs.current.forEach((waveEl) => {
      if (waveEl) {
        waveEl.style.transform = `translateY(0px)`;
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
          className="absolute left-0 w-full"
          style={{ 
            top: `${wave.initialTopVh}vh`, 
            height: `${wave.heightVh}vh`,
            opacity: wave.opacity,
          }}
        >
          <svg
            viewBox="0 0 1600 350" // Adjusted viewBox width to match path coordinates
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id={wave.gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: wave.startColor }} />
                <stop offset="100%" style={{ stopColor: wave.endColor }} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${wave.gradientId})`}
              d={wave.pathD}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
