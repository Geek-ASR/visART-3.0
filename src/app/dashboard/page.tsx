
'use client';

import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const courses = [
  { 
    id: 'ml', 
    title: 'Machine Learning', 
    description: 'Explore various machine learning algorithms, data preprocessing techniques, model evaluation methods, and deployment strategies.', 
    image: 'https://placehold.co/600x400.png',
    aiHint: 'machine learning technology',
    progress: 70,
  },
  { 
    id: 'blockchain', 
    title: 'Blockchain', 
    description: 'Explore the core concepts of decentralized ledgers, cryptographic security, and consensus mechanisms.', 
    image: 'https://placehold.co/600x400.png', 
    aiHint: 'blockchain digital',
    progress: 45,
  },
  { 
    id: 'stats', 
    title: 'Statistics', 
    description: 'Learn about data collection, descriptive statistics, probability theory, hypothesis testing, and inferential statistics.', 
    image: 'https://placehold.co/600x400.png', 
    aiHint: 'statistics chart',
    progress: 85,
  },
];


export default function DashboardPage() {
  const learningScrollContainerRef = useRef<HTMLDivElement>(null);
  const courseScrollContainerRef = useRef<HTMLDivElement>(null); 
  const [activeLearningDotIndex, setActiveLearningDotIndex] = useState(0);
  const learningItemEffectiveWidth = 300 + 16; // card min-width (300px) + space-x-4 gap (1rem = 16px)


  const scrollLearningTopics = (direction: 'left' | 'right') => {
    if (!learningScrollContainerRef.current || learningTopics.length === 0) return;

    let newIndex;
    if (direction === 'left') {
      newIndex = Math.max(activeLearningDotIndex - 1, 0);
    } else {
      newIndex = Math.min(activeLearningDotIndex + 1, learningTopics.length - 1);
    }

    if (newIndex !== activeLearningDotIndex) {
        learningScrollContainerRef.current.scrollTo({
            left: newIndex * learningItemEffectiveWidth,
            behavior: 'smooth',
        });
        setActiveLearningDotIndex(newIndex);
    }
  };
  
  useEffect(() => {
    const container = learningScrollContainerRef.current;
    if (!container || learningTopics.length === 0) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      const currentScrollLeft = container.scrollLeft;
      scrollTimeout = setTimeout(() => {
        const newIndex = Math.round(currentScrollLeft / learningItemEffectiveWidth);
        const clampedIndex = Math.max(0, Math.min(newIndex, learningTopics.length - 1));
        setActiveLearningDotIndex(clampedIndex);
      }, 150); // Debounce time
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(scrollTimeout);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [learningTopics.length, learningItemEffectiveWidth]);


  const scrollCourses = (direction: 'left' | 'right') => {
    if (courseScrollContainerRef.current) {
      const scrollAmount = 320; 
      courseScrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
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
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <Button variant="outline" size="sm">Read Theory</Button>
                    <Button variant="outline" size="sm">Visualize</Button>
                    <Button variant="outline" size="sm">Start Quiz</Button>
                    <Button variant="outline" size="sm">Start Challenge</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {learningTopics.length > 0 && (
            <div className="flex justify-center space-x-1.5 mt-4">
                {learningTopics.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${i === activeLearningDotIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/50'}`}
                    />
                ))}
            </div>
          )}
        </ClientOnly>
      </section>

      {/* Continue Course Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Continue Course</h2>
           <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scrollCourses('left')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => scrollCourses('right')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ClientOnly>
          <div ref={courseScrollContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-card shadow-md overflow-hidden">
                <div className="relative h-40 w-full">
                  <Image 
                      src={course.image} 
                      alt={course.title} 
                      fill // Changed from layout="fill" to fill
                      style={{objectFit: 'cover'}} // Changed from objectFit="cover"
                      data-ai-hint={course.aiHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription className="text-xs h-16 overflow-hidden text-ellipsis">
                    {course.description}
                  </CardDescription>
                  <Progress value={course.progress} aria-label={`${course.title} progress ${course.progress}%`} />
                </CardContent>
                 <CardFooter>
                   <Button variant="link" className="px-0 text-primary hover:text-primary/80 text-sm">View Course</Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </ClientOnly>
      </section>
    </>
  );
}
