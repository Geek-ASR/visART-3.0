
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, LayoutGrid, FunctionSquare, Code2, HelpCircle, FileCode2, PlayCircle } from 'lucide-react';
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

const arrayExercisesData: ExerciseDetail[] = [
  {
    id: 'arrays-ex1',
    exerciseNumber: 'Exercise 01',
    components: [
      { icon: BookOpen, label: 'Theory' },
      { icon: LayoutGrid, label: 'Applications' },
    ],
    actionText: 'View',
    actionLink: '/dashboard/dsa-topics/arrays/exercises/theory-applications-intro',
  },
  {
    id: 'arrays-ex2',
    exerciseNumber: 'Exercise 02',
    components: [
      { icon: FunctionSquare, label: 'Algorithm' },
      { icon: Code2, label: 'Code' },
    ],
    actionText: 'View',
    actionLink: '/dashboard/dsa-topics/arrays/exercises/algorithm-code',
  },
  {
    id: 'arrays-ex3',
    exerciseNumber: 'Exercise 03',
    components: [
      { icon: HelpCircle, label: 'Quiz 1: Conceptual Understanding' },
    ],
    actionText: 'Solve',
    actionLink: '/dashboard/dsa-topics/arrays/exercises/quiz-conceptual',
  },
  {
    id: 'arrays-ex4',
    exerciseNumber: 'Exercise 04',
    components: [
      { icon: HelpCircle, label: 'Quiz 2: Scenario-Based and Algorithm Analysis' },
    ],
    actionText: 'Solve',
    actionLink: '/dashboard/dsa-topics/arrays/exercises/quiz-scenario-analysis',
  },
  {
    id: 'arrays-ex5',
    exerciseNumber: 'Exercise 05',
    components: [
      { icon: FileCode2, label: 'Challenge 1: Two Sum' }, // Updated label
    ],
    actionText: 'Solve',
    actionLink: '/dashboard/dsa-topics/arrays/challenge/two-sum', // Updated link
  },
];

export default function ArrayExercisesPage() {
  const totalExercises = arrayExercisesData.length;

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Arrays</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: 12th May, 24
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
           <Button variant="default" size="sm" asChild>
            <Link href="#">
              <PlayCircle className="mr-2 h-4 w-4" /> Start Arrays Visualization
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
        {arrayExercisesData.map((exercise) => (
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
