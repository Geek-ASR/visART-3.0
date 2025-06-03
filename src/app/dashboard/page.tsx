
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample Data
const learningTopics = [
  { id: 'strings', title: 'Strings', exercises: 12, progress: 60, color: 'bg-blue-500' },
  { id: 'binary_tree', title: 'Binary Tree', exercises: 15, progress: 30, color: 'bg-green-500' },
  { id: 'graphs', title: 'Graphs', exercises: 20, progress: 75, color: 'bg-purple-500' },
  { id: 'sorting', title: 'Sorting Algorithms', exercises: 10, progress: 40, color: 'bg-red-500' },
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
  return (
    <>
      {/* Continue Learning Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Continue Learning</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
          {learningTopics.map((topic) => (
            <Card key={topic.id} className="min-w-[300px] bg-muted shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
                <CardDescription>{topic.exercises} exercises</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={topic.progress} aria-label={`${topic.title} progress ${topic.progress}%`} />
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Button variant="outline" size="sm" className="bg-card hover:bg-card/80">Read Theory</Button>
                  <Button variant="outline" size="sm" className="bg-card hover:bg-card/80">Visualize</Button>
                  <Button variant="outline" size="sm" className="bg-card hover:bg-card/80">Start Quiz</Button>
                  <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">Start Challenge</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center space-x-1.5 mt-4">
            {Array(learningTopics.length).fill(0).map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/50'}`}></div>
            ))}
        </div>
      </section>

      {/* Continue Course Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-foreground">Continue Course</h2>
           <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-muted shadow-md overflow-hidden">
              <div className="relative h-40 w-full">
                <Image 
                    src={course.image} 
                    alt={course.title} 
                    layout="fill" 
                    objectFit="cover"
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
      </section>
    </>
  );
}

// Helper for hiding scrollbar, add to globals.css if not already present
// .scrollbar-hide::-webkit-scrollbar { display: none; }
// .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
