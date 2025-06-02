
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
        'flex flex-col md:flex-row items-center transition-all duration-500 ease-out',
        isVisible
          ? 'opacity-100 transform md:translate-x-0 translate-y-0'
          : 'opacity-0 transform md:-translate-x-10 translate-y-10 md:translate-y-0'
      )}
    >
      <div className="relative bg-slate-200 text-slate-800 p-4 md:p-6 rounded-lg shadow-xl text-center min-w-[150px] md:min-w-[200px] max-w-[200px] md:max-w-none">
        <p className="text-sm md:text-lg font-semibold">{text}</p>
      </div>
      {!isLast && (
        <>
          {/* Desktop Connector: Horizontal Line */}
          <div className="hidden md:block h-1.5 w-6 md:w-8 bg-slate-300 mx-2 md:mx-3 rounded-full" />
          {/* Mobile Connector: Vertical Line */}
          <div className="md:hidden w-1.5 h-6 bg-slate-300 my-2 rounded-full" />
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
        }, index * 600) 
      );
    });

    timeouts.push(
      setTimeout(() => {
        setFadeOutOverlay(true);
      }, nodesContent.length * 600 + 500) 
    );
    
    timeouts.push(
      setTimeout(() => {
        onAnimationComplete();
      }, nodesContent.length * 600 + 500 + 500) 
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
        'transition-opacity duration-500 ease-in-out'
      )}
    >
      <div className="w-full flex justify-start items-center pl-4 sm:pl-6 md:pl-8 lg:pl-10">
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
