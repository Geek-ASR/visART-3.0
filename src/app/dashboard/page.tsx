
'use client';

import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import { ClientOnly } from '@/components/layout/ClientOnly';

// Sample Data
const learningTopics = [
  { id: 'strings', title: 'Strings', exercises: 12, progress: 60, color: 'bg-blue-500' },
  { id: 'binary_tree', title: 'Binary Tree', exercises: 15, progress: 30, color: 'bg-green-500' },
  { id: 'graphs', title: 'Graphs', exercises: 20, progress: 75, color: 'bg-purple-500' },
  { id: 'sorting', title: 'Sorting Algorithms', exercises: 10, progress: 40, color: 'bg-red-500' },
  { id: 'linked_list', title: 'Linked Lists', exercises: 8, progress: 50, color: 'bg-yellow-500' },
  { id: 'dynamic_programming', title: 'Dynamic Programming', exercises: 25, progress: 20, color: 'bg-indigo-500' },
];

export default function DashboardPage() {
  const learningScrollContainerRef = useRef<HTMLDivElement>(null);
  const learningItemEffectiveWidth = 300 + 16; // card min-width (300px) + space-x-4 gap (1rem = 16px)

  const scrollLearningTopics = (direction: 'left' | 'right') => {
    if (!learningScrollContainerRef.current || learningTopics.length === 0) return;

    const container = learningScrollContainerRef.current;
    const currentScrollLeft = container.scrollLeft;
    
    const visualCurrentIndex = Math.round(currentScrollLeft / learningItemEffectiveWidth);

    let newIndex;
    if (direction === 'left') {
      newIndex = Math.max(visualCurrentIndex - 1, 0);
    } else {
      const itemsInView = Math.floor(container.clientWidth / learningItemEffectiveWidth);
      const maxIndex = Math.max(0, learningTopics.length - itemsInView); 
      newIndex = Math.min(visualCurrentIndex + 1, maxIndex);
      if (visualCurrentIndex === newIndex && newIndex === maxIndex && learningTopics.length > itemsInView) {
         // If we are at the last "page" and try to go right, don't change index
      } else if (visualCurrentIndex === newIndex && newIndex === maxIndex && learningTopics.length <= itemsInView) {
        // If all items are in view, don't scroll
        return;
      }
    }
    
    container.scrollTo({
        left: newIndex * learningItemEffectiveWidth,
        behavior: 'smooth',
    });
  };
  
  return (
    <>
      {/* Continue Learning Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Continue Learning</h2>
          {learningTopics.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scrollLearningTopics('left')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scrollLearningTopics('right')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <ClientOnly>
          <div ref={learningScrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
            {learningTopics.map((topic) => (
              <Card key={topic.id} className="min-w-[300px] bg-card shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{topic.title}</CardTitle>
                  <CardDescription>{topic.exercises} exercises</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={topic.progress} aria-label={`${topic.title} progress ${topic.progress}%`} />
                  <Button variant="outline" size="sm" className="w-full">
                    <Terminal className="mr-2 h-4 w-4" /> Exercises
                  </Button>
                </CardContent>
              </Card>
            ))}
            {learningTopics.length === 0 && (
              <p className="text-muted-foreground">No learning topics available yet.</p>
            )}
          </div>
        </ClientOnly>
      </section>
    </>
  );
}
