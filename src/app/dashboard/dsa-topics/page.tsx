
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';

interface LearningPath {
  id: string;
  emoji: string;
  title: string;
  description: string;
  topics: string[];
  actionLink: string;
}

const learningPathsData: LearningPath[] = [
  {
    id: 'beginner-ds',
    emoji: '🚀',
    title: 'Beginner Path: Ground Zero - Data Structures 101',
    description: 'Master the core building blocks of programming.',
    topics: [
      'Arrays & Strings',
      'Linked Lists',
      'Stacks & Queues',
      'Hash Maps & Sets',
      'Recursion Basics',
    ],
    actionLink: '#',
  },
  {
    id: 'problem-solving',
    emoji: '⚡',
    title: 'Logic Lab: Problem Solving Essentials',
    description: 'Build your problem-solving muscle through core patterns.',
    topics: [
      'Two Pointers',
      'Sliding Window',
      'Binary Search',
      'Bit Manipulation',
      'Math & Number Theory',
    ],
    actionLink: '#',
  },
  {
    id: 'trees-hierarchies',
    emoji: '🌲',
    title: 'Structural Thinking: Trees & Hierarchies',
    description: 'Understand and manipulate hierarchical data structures.',
    topics: [
      'Binary Trees',
      'Binary Search Trees (BSTs)',
      'Tree Traversals',
      'Trie (Prefix Trees)',
      'N-ary Trees',
    ],
    actionLink: '#',
  },
  {
    id: 'dynamic-programming',
    emoji: '🧠',
    title: 'Dynamic Depth: Mastering DP',
    description: 'Unravel one of the most important topics in DSA.',
    topics: [
      'Memoization vs Tabulation',
      '1D DP Problems',
      '2D DP Grids',
      'DP on Subsequences',
      'DP on Trees & Graphs',
    ],
    actionLink: '#',
  },
  {
    id: 'graph-galaxy',
    emoji: '🛰️',
    title: 'Graph Galaxy: Explore Connected Worlds',
    description: 'Dive deep into graph algorithms and networks.',
    topics: [
      'Graph Representations',
      'DFS & BFS',
      'Topological Sort',
      'Dijkstra & Bellman-Ford',
      'Union-Find & MSTs',
    ],
    actionLink: '#',
  },
  {
    id: 'algo-architect',
    emoji: '🧩',
    title: 'Algorithm Architect: Greedy & Backtracking',
    description: 'Master optimization and decision-making strategies.',
    topics: [
      'Greedy Algorithms',
      'Activity Selection Problems',
      'Backtracking Basics',
      'N-Queens & Sudoku Solver',
      'Subsets & Permutations',
    ],
    actionLink: '#',
  },
  {
    id: 'codebreaker-advanced',
    emoji: '🔐',
    title: 'Codebreaker: Advanced Topics & Tricks',
    description: 'Tackle niche topics that often appear in coding interviews.',
    topics: [
      'Segment Trees & Binary Indexed Trees',
      'Monotonic Stacks/Queues',
      'Sweep Line Algorithms',
      'Reservoir Sampling',
      'Trie + Bit Manipulation',
    ],
    actionLink: '#',
  },
  {
    id: 'interview-impact',
    emoji: '🎯',
    title: 'Interview Impact: Real Interview Problems',
    description: 'Solve real-world problems asked by top tech companies.',
    topics: [
      'Pattern-Based Interview Questions',
      'Google/Amazon/Uber Style Questions',
      'Case-Based Recursion & DP',
      'Mix of Medium-Hard Problems',
    ],
    actionLink: '#',
  },
  {
    id: 'theory-craft',
    emoji: '🧬',
    title: 'TheoryCraft: Computational Complexity & NP',
    description: 'Understand the theoretical side of CS and algorithmic limits.',
    topics: [
      'Time & Space Complexity',
      'Master Theorem & Recurrence',
      'NP-Complete Problems',
      'Reductions & Hardness',
      'Approximation Algorithms',
    ],
    actionLink: '#',
  },
  {
    id: 'system-solver',
    emoji: '🏗️',
    title: 'System Solver: Real-World DSA & Design',
    description: 'Apply DSA to real-world applications & systems.',
    topics: [
      'Caching & LRU',
      'Rate Limiter with Queues',
      'Job Scheduling',
      'Search Engines & Indexing',
      'System Design with DSA',
    ],
    actionLink: '#',
  },
];

export default function DsaTopicsPage() {
  return (
    <div className="space-y-8">
      <header className="pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Learning Paths</h1>
        <p className="text-muted-foreground mt-1">
          Choose a path to start your structured learning journey in Data Structures and Algorithms.
        </p>
      </header>

      <div className="space-y-10">
        {learningPathsData.map((path, index) => (
          <React.Fragment key={path.id}>
            <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <span className="text-3xl md:text-4xl mt-1">{path.emoji}</span>
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-semibold text-primary">
                      {index + 1}. {path.title}
                    </CardTitle>
                    <CardDescription className="mt-1 text-base">
                      {path.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Topics Covered:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-2">
                    {path.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href={path.actionLink}>
                    Start This Path <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            {index < learningPathsData.length - 1 && <Separator className="my-6 md:my-8" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

    