
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimationNodeProps {
  text: string;
  isVisible: boolean;
  isLast?: boolean;
}

const ChainLink: React.FC<{ orientation: 'horizontal' | 'vertical'; className?: string }> = ({ orientation, className }) => (
  <div
    className={cn(
      'bg-slate-200 rounded-full',
      orientation === 'horizontal' ? 'w-6 h-2 md:w-8 md:h-3' : 'w-2 h-6 md:w-3 md:h-8',
      className
    )}
  />
);

const AnimationNode: React.FC<AnimationNodeProps> = ({ text, isVisible, isLast }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-center transition-all duration-700 ease-out', // Reduced duration
        isVisible
          ? 'opacity-100 transform md:translate-x-0 translate-y-0'
          : 'opacity-0 transform md:-translate-x-10 translate-y-10 md:translate-y-0'
      )}
    >
      <div className="bg-slate-200 text-slate-800 p-4 md:p-6 rounded-lg shadow-xl text-center min-w-[150px] md:min-w-[200px] max-w-[200px] md:max-w-none">
        <p className="text-sm md:text-lg font-semibold">{text}</p>
      </div>
      {!isLast && (
        <>
          {/* Desktop: Horizontal Chain */}
          <div className="hidden md:flex items-center mx-1 md:mx-2">
            <ChainLink orientation="horizontal" className="-mr-2" />
            <ChainLink orientation="vertical" className="z-10" />
            <ChainLink orientation="horizontal" className="-ml-2" />
          </div>
          {/* Mobile: Vertical Chain */}
          <div className="flex md:hidden flex-col items-center my-1">
            <ChainLink orientation="vertical" className="-mb-2" />
            <ChainLink orientation="horizontal" className="z-10" />
            <ChainLink orientation="vertical" className="-mt-2" />
          </div>
        </>
      )}
    </div>
  );
};

interface AnimationOverlayProps {
  onAnimationComplete: () => void;
}

const nodesContent = [
  "Learn DSA Concepts",
  "Visualize Algorithms",
  "Solve Coding Problems",
  "Track Your Progress",
  "AlgoVisuals!",
];

export function AnimationOverlay({ onAnimationComplete }: AnimationOverlayProps) {
  const [visibleNodes, setVisibleNodes] = useState<boolean[]>(
    Array(nodesContent.length).fill(false)
  );
  const [fadeOutOverlay, setFadeOutOverlay] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    nodesContent.forEach((_, index) => {
      timeouts.push(
        setTimeout(() => {
          setVisibleNodes((prev) => {
            const newVisibleNodes = [...prev];
            newVisibleNodes[index] = true;
            return newVisibleNodes;
          });
        }, index * 800) // Reduced stagger delay
      );
    });

    // After all nodes are set to appear, wait a bit then start fading out overlay
    timeouts.push(
      setTimeout(() => {
        setFadeOutOverlay(true);
      }, nodesContent.length * 800 + 700) // Adjusted delay
    );
    
    // After fade out animation, call onAnimationComplete
    timeouts.push(
      setTimeout(() => {
        onAnimationComplete();
      }, nodesContent.length * 800 + 700 + 700) // Adjusted delay for fade out (700ms)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-black flex items-center overflow-hidden',
        fadeOutOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100',
        'transition-opacity duration-700 ease-in-out' // Reduced fade-out duration
      )}
    >
      <div className="w-full flex justify-start items-center pl-4 sm:pl-6 md:pl-8 lg:pl-10"> {/* Adjusted padding */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {nodesContent.map((text, index) => (
              <AnimationNode
                key={index}
                text={text}
                isVisible={visibleNodes[index]}
                isLast={index === nodesContent.length - 1}
              />
            ))}
          </div>
      </div>
    </div>
  );
}
