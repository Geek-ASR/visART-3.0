
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, Sparkles, CheckCircle, XCircle, Code, Layers3, Zap, AreaChart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function VectorTheoryPage() {
  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/vectors/exercises">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Vector Exercises
        </Link>
      </Button>

      {/* Header */}
      <header className="pb-2 space-y-2">
        <div className="flex items-center space-x-3">
           <Layers3 className="h-8 w-8 text-primary" />
           <h1 className="text-3xl font-bold tracking-tight text-foreground">Vectors / Dynamic Arrays: Concepts, Uses & Analysis</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Delve into dynamic arrays, their resizable nature, performance characteristics, and practical applications.
        </p>
      </header>

      <Separator />

      {/* Main Content Sections */}
      <div className="space-y-10">
        {/* Introduction to Vectors (Theory) */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Lightbulb className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Understanding Vectors (Dynamic Arrays)</CardTitle>
            </div>
            <CardDescription>The foundational knowledge about these flexible array structures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">What is a Vector/Dynamic Array?</h3>
              <p className="text-muted-foreground leading-relaxed">
                A vector, often called a dynamic array or resizable array, is a data structure that can grow or shrink in size during runtime. Like static arrays, it stores elements in a contiguous block of memory, allowing for efficient indexed access. However, unlike static arrays, its capacity can be automatically adjusted when elements are added or removed.
              </p>
            </div>
            
            <div className="text-center">
              <Image 
                src="https://placehold.co/600x250.png" 
                alt="Dynamic Array Resizing Diagram" 
                width={600} 
                height={250}
                className="rounded-md border shadow-sm mx-auto"
                data-ai-hint="array resize"
              />
              <p className="text-xs text-muted-foreground mt-2">Fig 1: Conceptual diagram of a dynamic array resizing to accommodate more elements.</p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">Key Characteristics</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Resizable:</strong> Can automatically increase or decrease its capacity.</li>
                <li><strong>Indexed Access:</strong> Elements are accessed via numerical indices (O(1) time complexity).</li>
                <li><strong>Contiguous Memory:</strong> Elements are stored sequentially, promoting cache efficiency.</li>
                <li><strong>Homogeneous Elements:</strong> Typically stores elements of the same data type.</li>
                <li><strong>Capacity vs. Size:</strong> Has a `capacity` (allocated memory) and a `size` (number of elements currently stored). `size <= capacity`.</li>
              </ul>
            </div>
            
             <div>
              <h3 className="text-xl font-medium text-foreground mb-2">How it Differs from Static Arrays</h3>
              <p className="text-muted-foreground leading-relaxed">
                The primary difference is size flexibility. Static arrays have a fixed size determined at compile time. Dynamic arrays manage their own memory, reallocating and copying elements to a new, larger (or smaller) block of memory when needed. This provides convenience but introduces performance considerations for resize operations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Amortized Analysis */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Zap className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Amortized Analysis: The Magic of Appending</CardTitle>
            </div>
            <CardDescription>Understanding why adding elements to a dynamic array is "on average" very fast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-base">
             <div>
              <h3 className="text-xl font-medium text-foreground mb-2">The Cost of Resizing</h3>
              <p className="text-muted-foreground leading-relaxed">
                When a dynamic array is full (its `size` equals its `capacity`) and a new element needs to be added, it must resize. This typically involves:
              </p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground pl-4 mt-2">
                <li>Allocating a new, larger block of memory (e.g., double the current capacity).</li>
                <li>Copying all existing elements from the old block to the new block (an O(N) operation, where N is the current size).</li>
                <li>Deallocating the old memory block.</li>
                <li>Adding the new element.</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed mt-2">
                If this O(N) operation happened every time we added an element, appends would be very slow.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-foreground mb-2">The Doubling Strategy & Amortization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dynamic arrays often use a strategy like doubling the capacity each time a resize is needed. While a single resize is expensive, these expensive operations are infrequent.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-2">
                <strong>Amortized analysis</strong> looks at the average cost of an operation over a sequence of operations.
                Consider adding N elements to an initially empty dynamic array that doubles its capacity:
              </p>
               <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-4 mt-2">
                <li>Most appends are O(1) (just add to an existing slot).</li>
                <li>Resizes happen at sizes 1, 2, 4, 8, ..., N/2. The cost of these resizes is proportional to their size at that moment.</li>
                <li>The total cost of copying during all resizes up to N elements is roughly N + N/2 + N/4 + ... + 1, which sums to approximately 2N.</li>
                <li>So, N appends cost O(N) for the actual insertions plus O(N) for all copying due to resizes. The total cost is O(N).</li>
                <li>The average cost per append operation is O(N) / N = O(1).</li>
              </ul>
              <p className="text-muted-foreground font-semibold leading-relaxed mt-3">
                Therefore, the amortized time complexity for appending an element to a dynamic array is O(1).
              </p>
            </div>
             <div className="text-center">
              <Image 
                src="https://placehold.co/600x200.png" 
                alt="Amortized Analysis Cost Graph" 
                width={600} 
                height={200}
                className="rounded-md border shadow-sm mx-auto"
                data-ai-hint="amortized analysis graph"
              />
              <p className="text-xs text-muted-foreground mt-2">Fig 2: Conceptual graph showing infrequent expensive operations but low average cost.</p>
            </div>
          </CardContent>
        </Card>

        {/* Applications of Vectors */}
        <Card className="bg-card shadow-md">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Sparkles className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Vectors in Action: Practical Applications</CardTitle>
            </div>
            <CardDescription>Where and how dynamic arrays are commonly used.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-base">
            <ul className="list-disc list-inside space-y-3 text-muted-foreground pl-4">
              <li><strong>Implementing Stacks:</strong> The `push` and `pop` operations of a stack can be efficiently implemented using the end of a dynamic array.</li>
              <li><strong>Storing Collections of Unknown Size:</strong> Ideal when the number of items is not known in advance, e.g., reading user input, processing file contents.</li>
              <li><strong>Buffers:</strong> Used in I/O operations, network programming, and data streaming where data chunks arrive unpredictably.</li>
              <li><strong>Default List Types in Languages:</strong> Python's `list`, Java's `ArrayList`, C++'s `std::vector` are all implementations of dynamic arrays.</li>
              <li><strong>Building Blocks for Other Structures:</strong> Can be used internally in more complex data structures.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Advantages and Disadvantages */}
        <Card className="bg-card shadow-md">
          <CardHeader>
             <div className="flex items-center space-x-3">
              <Code className="h-7 w-7 text-primary" />
              <CardTitle className="text-2xl font-semibold">Pros & Cons of Vectors</CardTitle>
            </div>
            <CardDescription>A balanced view of dynamic array tradeoffs.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
            <div>
              <h3 className="text-xl font-medium text-green-600 mb-3 flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Advantages
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Dynamic Sizing:</strong> Automatically adjusts size, offering flexibility.</li>
                <li><strong>Fast Random Access:</strong> O(1) time to access elements by index.</li>
                <li><strong>Amortized O(1) Appends:</strong> Adding to the end is efficient on average.</li>
                <li><strong>Good Cache Locality:</strong> Contiguous memory generally leads to better cache performance than linked lists.</li>
                <li><strong>Ease of Use:</strong> Simpler to manage than manual memory allocation for resizable collections.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium text-red-600 mb-3 flex items-center">
                <XCircle className="mr-2 h-5 w-5" /> Disadvantages
              </h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-4">
                <li><strong>Costly Middle Insertions/Deletions:</strong> O(N) for operations not at the end, due to element shifting.</li>
                <li><strong>Occasional Expensive Resizes:</strong> While amortized, a single resize operation can be slow and noticeable.</li>
                <li><strong>Potential Wasted Space:</strong> If capacity is much larger than the current size, memory can be underutilized.</li>
                <li><strong>Reallocation Overhead:</strong> Copying elements during resize takes time and resources.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
