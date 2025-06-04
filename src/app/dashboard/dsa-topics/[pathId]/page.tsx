
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Layers3d, CaseSensitive, Share2, Layers, ListOrdered, Hash, Combine, RefreshCcw, BookOpen, Eye, Terminal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SubTopic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  theoryLink: string;
  visualizeLink: string;
  problemsLink: string;
}

const pathDetailsMap: Record<string, { title: string; description: string; emoji: string; subTopics: SubTopic[] }> = {
  'beginner-ds': {
    title: 'Beginner Path: Ground Zero - Data Structures 101',
    description: 'Master the core building blocks of programming.',
    emoji: '🚀',
    subTopics: [
      { id: 'arrays', title: 'Arrays', description: 'Contiguous memory storage and basic operations.', icon: Code, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'vectors', title: 'Vectors / Dynamic Arrays', description: 'Resizable arrays and their performance.', icon: Layers3d, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'strings', title: 'Strings', description: 'Manipulation, common algorithms, and representations.', icon: CaseSensitive, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'linked-lists', title: 'Linked Lists', description: 'Pointer-based structures: singly, doubly, circular.', icon: Share2, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'stacks', title: 'Stacks', description: 'Last-In, First-Out (LIFO) data structures.', icon: Layers, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'queues', title: 'Queues', description: 'First-In, First-Out (FIFO) data structures.', icon: ListOrdered, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'hash-maps', title: 'Hash Maps (Dictionaries)', description: 'Key-value pair storage with efficient lookups.', icon: Hash, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'sets', title: 'Sets', description: 'Collections of unique elements and their operations.', icon: Combine, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
      { id: 'recursion-basics', title: 'Recursion Basics', description: 'Fundamental concepts of recursive problem-solving.', icon: RefreshCcw, theoryLink: '#', visualizeLink: '#', problemsLink: '#' },
    ],
  },
  // Add other paths here if needed in the future
};

export default function DsaPathDetailPage() {
  const params = useParams();
  const pathId = typeof params.pathId === 'string' ? params.pathId : '';
  const currentPath = pathDetailsMap[pathId];

  if (!currentPath) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-destructive">Path not found</h1>
        <p className="text-muted-foreground mt-2">The learning path you are looking for does not exist or is not yet implemented.</p>
        <Button asChild variant="link" className="mt-4">
          <Link href="/dashboard/dsa-topics">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Paths
          </Link>
        </Button>
      </div>
    );
  }

  const { title, description, emoji, subTopics } = currentPath;

  return (
    <div className="space-y-8">
      <header className="pb-2 space-y-2">
        <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
          <Link href="/dashboard/dsa-topics">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning Paths
          </Link>
        </Button>
        <div className="flex items-center space-x-3">
          <span className="text-4xl">{emoji}</span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
        <p className="text-muted-foreground mt-1 text-lg">{description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subTopics.map((topic) => (
          <Card key={topic.id} className="bg-card shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <topic.icon className="h-7 w-7 text-primary" />
                <CardTitle className="text-xl font-semibold">{topic.title}</CardTitle>
              </div>
              <CardDescription className="text-sm">{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Content for sub-topic card if needed */}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row sm:flex-wrap gap-2 pt-4">
              <Button asChild variant="outline" size="sm" className="flex-1 min-w-[120px]">
                <Link href={topic.theoryLink}>
                  <BookOpen className="mr-2 h-4 w-4" /> Learn Theory
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 min-w-[120px]">
                <Link href={topic.visualizeLink}>
                  <Eye className="mr-2 h-4 w-4" /> Visualize
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm" className="flex-1 min-w-[120px] sm:col-span-2 md:col-span-1 lg:col-span-2 bg-primary/10 text-primary border-primary/50 hover:bg-primary/20">
                <Link href={topic.problemsLink}>
                  <Terminal className="mr-2 h-4 w-4" /> Solve Problems
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
