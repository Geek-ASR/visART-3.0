
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  List, // For Arrays
  Link2, // For Linked Lists
  Binary, // For Trees
  ArrowDownUp, // For Sorting
  Share2, // For Graphs
  Puzzle, // For Dynamic Programming
  BookOpen, 
  Lightbulb,
  Code
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DsaTopic {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  imageUrl: string;
  imageAlt: string;
  imageAiHint: string;
  theoryLink: string;
  problemsLink: string;
}

const dsaTopicsData: DsaTopic[] = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Fundamental data structure for storing ordered collections of elements. Explore operations, traversals, and common array-based problems.',
    icon: List,
    category: 'Data Structure',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Abstract representation of an array',
    imageAiHint: 'abstract array',
    theoryLink: '#',
    problemsLink: '#',
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'Dynamic data structure where elements are linked using pointers. Learn about singly, doubly, and circular lists.',
    icon: Link2,
    category: 'Data Structure',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Abstract representation of a linked list',
    imageAiHint: 'linked list',
    theoryLink: '#',
    problemsLink: '#',
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'Hierarchical data structure. Dive into binary trees, binary search trees (BSTs), traversals (in-order, pre-order, post-order), and balancing.',
    icon: Binary,
    category: 'Data Structure',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Abstract representation of a tree structure',
    imageAiHint: 'data tree',
    theoryLink: '#',
    problemsLink: '#',
  },
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    description: 'Techniques for arranging elements in a specific order. Understand algorithms like Bubble, Merge, Quick, and Heap Sort.',
    icon: ArrowDownUp,
    category: 'Algorithm',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Visual representation of sorting',
    imageAiHint: 'sorting bars',
    theoryLink: '#',
    problemsLink: '#',
  },
  {
    id: 'graphs',
    title: 'Graph Algorithms',
    description: 'Explore data structures for representing networks. Learn traversals like BFS, DFS, and algorithms for shortest paths and MSTs.',
    icon: Share2,
    category: 'Algorithm',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Abstract representation of a graph network',
    imageAiHint: 'network graph',
    theoryLink: '#',
    problemsLink: '#',
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: 'Powerful technique for solving complex problems by breaking them down into simpler subproblems. Master memoization and tabulation.',
    icon: Puzzle,
    category: 'Algorithmic Paradigm',
    imageUrl: 'https://placehold.co/600x400.png',
    imageAlt: 'Abstract representation of dynamic programming concepts',
    imageAiHint: 'puzzle logic',
    theoryLink: '#',
    problemsLink: '#',
  },
];

export default function DsaTopicsPage() {
  return (
    <div className="space-y-6">
      <header className="pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Data Structures & Algorithms</h1>
        <p className="text-muted-foreground mt-1">
          Browse through various DSA topics to learn, visualize, and solve problems.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dsaTopicsData.map((topic) => (
          <Card key={topic.id} className="flex flex-col overflow-hidden bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0 relative">
              <Image
                src={topic.imageUrl}
                alt={topic.imageAlt}
                width={600}
                height={400}
                className="w-full h-40 object-cover"
                data-ai-hint={topic.imageAiHint}
              />
              <div className="absolute top-3 right-3 bg-primary/80 backdrop-blur-sm text-primary-foreground p-2 rounded-full shadow-lg">
                <topic.icon className="h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {topic.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 bg-muted/30 border-t">
              <div className="flex w-full space-x-3">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={topic.theoryLink}>
                    <BookOpen className="mr-2 h-4 w-4" /> Learn Theory
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={topic.problemsLink}>
                     <Code className="mr-2 h-4 w-4" /> Solve Problems
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
