
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, Sparkles, CheckCircle, XCircle, Code } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function ArrayTheoryApplicationsPage() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/arrays/exercises">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Array Exercises
        </Link>
      </Button>

      {/* Header */}
      <header className="pb-2 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Arrays: Core Concepts & Practical Uses</h1>
        <p className="text-muted-foreground text-lg">
          Understand the fundamentals of arrays and how they are applied in programming.
        </p>
      </header>

      <Separator />

      {/* Main Content Sections */}
      <div className="space-y-10">
        {/* Introduction to Arrays (Theory) */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Lightbulb className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Understanding Arrays: The Theory</CardTitle>
            </div>
            <CardDescription>The foundational knowledge about array data structures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">What is an Array?</h3>
              <p className="text-muted-foreground leading-relaxed">
                An array is a fundamental data structure used to store a collection of elements, typically of the same data type, in a contiguous block of memory. Each element in an array is identified by at least one array index or key.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">Key Characteristics</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Indexed Access:</strong> Elements are accessed via numerical indices (usually starting from 0). This allows for O(1) time complexity for random access if the index is known.</li>
                <li><strong>Contiguous Memory:</strong> Elements are stored sequentially in memory, which can lead to efficient cache utilization.</li>
                <li><strong>Homogeneous Elements:</strong> Typically, all elements in an array must be of the same data type (e.g., an array of integers, an array of strings). Some dynamic languages offer more flexibility.</li>
                <li><strong>Fixed Size (Static Arrays):</strong> In many languages (like C++, Java), arrays have a fixed size declared at compile-time. Dynamic arrays (like Python lists or Java ArrayLists) can resize.</li>
              </ul>
            </div>
            
            <div className="text-center">
              <Image 
                src="https://placehold.co/600x200.png" 
                alt="Array Structure Diagram" 
                width={600} 
                height={200}
                className="rounded-md border shadow-sm mx-auto"
                data-ai-hint="array diagram"
              />
              <p className="text-xs text-muted-foreground mt-2">Fig 1: Conceptual diagram of an array with indices and elements.</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">Basic Operations & Time Complexity</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Accessing an element (by index):</strong> O(1) - Constant time.</li>
                <li><strong>Searching for an element (linear search):</strong> O(n) - Linear time in the worst case.</li>
                <li><strong>Searching (binary search, if sorted):</strong> O(log n) - Logarithmic time.</li>
                <li><strong>Insertion (at the end, if space available):</strong> O(1) - Amortized constant time for dynamic arrays.</li>
                <li><strong>Insertion (at beginning/middle):</strong> O(n) - Linear time, as elements may need to be shifted.</li>
                <li><strong>Deletion (from the end):</strong> O(1) - Amortized constant time for dynamic arrays.</li>
                <li><strong>Deletion (from beginning/middle):</strong> O(n) - Linear time, as elements may need to be shifted.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Applications of Arrays */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Sparkles className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Arrays in Action: Practical Applications</CardTitle>
            </div>
            <CardDescription>Where and how arrays are commonly used in software development.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-base">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground pl-4">
              <li><strong>Storing Collections:</strong> Managing lists of items like user scores, product inventories, or daily temperature readings.</li>
              <li><strong>Implementing Other Data Structures:</strong> Arrays form the basis for many other data structures, including:
                <ul className="list-circle list-inside pl-6 mt-1 space-y-1">
                    <li>Stacks (using an array to manage LIFO behavior).</li>
                    <li>Queues (circular arrays for FIFO behavior).</li>
                    <li>Hash Tables (arrays of linked lists or using probing techniques).</li>
                    <li>Heaps (binary heaps can be efficiently represented in arrays).</li>
                </ul>
              </li>
              <li><strong>Lookup Tables &amp; Caching:</strong> Direct mapping of keys to values, like character counts or precomputed results.</li>
              <li><strong>Representing Grids &amp; Matrices:</strong> Essential for tasks like image processing (pixel data), game boards (chess, Sudoku), and mathematical computations.</li>
              <li><strong>String Implementation:</strong> Strings are often implemented as arrays of characters.</li>
              <li><strong>Sorting &amp; Searching Algorithms:</strong> Many fundamental algorithms like Bubble Sort, Merge Sort, and Binary Search operate directly on arrays.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Advantages and Disadvantages */}
        <Card className="bg-card shadow-md">
          <CardHeader>
             <div className="flex items-center space-x-3">
              <Code className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Pros &amp; Cons of Arrays</CardTitle>
            </div>
            <CardDescription>A balanced view of when to use arrays and their limitations.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div>
              <h3 className="text-xl font-medium text-green-600 mb-3 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Advantages
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Fast Random Access:</strong> O(1) time to access elements if the index is known.</li>
                <li><strong>Cache Friendliness:</strong> Contiguous memory layout can lead to better CPU cache performance.</li>
                <li><strong>Simplicity:</strong> Easy to understand and use for storing ordered collections.</li>
                <li><strong>Memory Efficiency (for primitive types):</strong> Can be very memory efficient for storing large amounts of primitive data types directly.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-red-600 mb-3 flex items-center">
                <XCircle className="mr-2 h-5 w-5" /> Disadvantages
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Fixed Size (Static Arrays):</strong> Can lead to wasted space if oversized, or require complex resizing logic if undersized. Dynamic arrays mitigate this but add overhead.</li>
                <li><strong>Costly Insertions/Deletions:</strong> Inserting or deleting elements in the middle of an array requires shifting subsequent elements, an O(n) operation.</li>
                <li><strong>Homogeneity Requirement:</strong> Storing elements of different types can be cumbersome or require workarounds (like arrays of objects/pointers).</li>
                <li><strong>Search Inefficiency (Unsorted):</strong> Searching an unsorted array is O(n). Requires sorting for faster O(log n) binary search.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

