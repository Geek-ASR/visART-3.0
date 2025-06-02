
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimationNodeProps {
  text: string;
  isVisible: boolean;
  isLast?: boolean;
}

const AnimationNode: React.FC<AnimationNodeProps> = ({ text, isVisible, isLast }) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row items-center transition-all duration-1000 ease-out',
        isVisible 
          ? 'opacity-100 transform md:translate-x-0 translate-y-0' 
          : 'opacity-0 transform md:-translate-x-10 translate-y-10 md:translate-y-0'
      )}
    >
      <div className="bg-primary text-primary-foreground p-4 md:p-6 rounded-lg shadow-xl text-center min-w-[150px] md:min-w-[200px] max-w-[200px] md:max-w-none">
        <p className="text-sm md:text-lg font-semibold">{text}</p>
      </div>
      {!isLast && (
        <div className="hidden md:block w-8 md:w-12 h-1 bg-primary mx-2 md:mx-4"></div>
      )}
      {!isLast && (
         <div className="block md:hidden w-1 h-8 bg-primary my-2 md:my-0"></div>
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
        }, index * 1200) // Stagger the appearance of nodes
      );
    });

    // After all nodes are set to appear, wait a bit then start fading out overlay
    timeouts.push(
      setTimeout(() => {
        setFadeOutOverlay(true);
      }, nodesContent.length * 1200 + 1000) // Wait for last node animation + 1s
    );
    
    // After fade out animation, call onAnimationComplete
    timeouts.push(
      setTimeout(() => {
        onAnimationComplete();
      }, nodesContent.length * 1200 + 1000 + 1000) // Wait for fade out (1s)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onAnimationComplete]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-gray-900 flex items-center overflow-hidden',
        fadeOutOverlay ? 'opacity-0 pointer-events-none' : 'opacity-100',
        'transition-opacity duration-1000 ease-in-out'
      )}
    >
      <div className="w-full flex justify-start items-center pl-4 sm:pl-8 md:pl-12 lg:pl-16">
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
