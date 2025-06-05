
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, LayoutGrid, FunctionSquare, Code2, HelpCircle, FileCode2, PlayCircle, Layers3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface ExerciseComponentDetail {
  icon: LucideIcon;
  label: string;
}

interface ExerciseDetail {
  id: string;
  exerciseNumber: string;
  components: ExerciseComponentDetail[];
  actionText: "View" | "Solve";
  actionLink: string;
}

const vectorExercisesData: ExerciseDetail[] = [
  {
    id: 'vectors-ex1',
    exerciseNumber: 'Exercise 01',
    components: [
      { icon: BookOpen, label: 'Theory' },
      { icon: LayoutGrid, label: 'Applications & Amortized Analysis' },
    ],
    actionText: 'View',
    actionLink: '#', // Placeholder for actual theory page
  },
  {
    id: 'vectors-ex2',
    exerciseNumber: 'Exercise 02',
    components: [
      { icon: FunctionSquare, label: 'Common Operations Algorithm' },
      { icon: Code2, label: 'Code Implementations' },
    ],
    actionText: 'View',
    actionLink: '#', // Placeholder for actual algorithm/code page
  },
  {
    id: 'vectors-ex3',
    exerciseNumber: 'Exercise 03',
    components: [
      { icon: HelpCircle, label: 'Quiz 1: Conceptual Understanding' },
    ],
    actionText: 'Solve',
    actionLink: '#', // Placeholder for actual quiz page
  },
  {
    id: 'vectors-ex4',
    exerciseNumber: 'Exercise 04',
    components: [
      { icon: HelpCircle, label: 'Quiz 2: Performance & Scenario Analysis' },
    ],
    actionText: 'Solve',
    actionLink: '#', // Placeholder for actual quiz page
  },
  {
    id: 'vectors-ex5',
    exerciseNumber: 'Exercise 05',
    components: [
      { icon: FileCode2, label: 'Challenge 1: Implement Dynamic Array' },
    ],
    actionText: 'Solve',
    actionLink: '#', // Placeholder for actual challenge page
  },
];

export default function VectorExercisesPage() {
  const totalExercises = vectorExercisesData.length;
  // Placeholder date, replace with actual or dynamic date later
  const lastUpdatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });


  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/beginner-ds">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Beginner Path
        </Link>
      </Button>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Layers3 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Vectors / Dynamic Arrays</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {lastUpdatedDate}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
           <Button variant="default" size="sm" asChild>
            {/* Placeholder link for vector visualizer */}
            <Link href="#"> 
              <PlayCircle className="mr-2 h-4 w-4" /> Start Vector Visualization
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground whitespace-nowrap self-center sm:self-auto">
            {totalExercises} exercises
          </p>
        </div>
      </div>

      <Separator />

      {/* Exercises List */}
      <div className="space-y-6">
        {vectorExercisesData.map((exercise) => (
          <div key={exercise.id}>
            <p className="text-xs text-muted-foreground mb-1">{exercise.exerciseNumber}</p>
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {exercise.components.map((component, index) => (
                    <div key={index} className="flex items-center text-sm text-foreground">
                      <component.icon className="mr-2 h-4 w-4 text-primary" />
                      <span>{component.label}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" asChild className="w-full sm:w-auto mt-2 sm:mt-0">
                  <Link href={exercise.actionLink}>{exercise.actionText}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
