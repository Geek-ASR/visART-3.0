'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, RotateCcw, StepForward, Binary } from 'lucide-react';

const algorithms = [
  { id: 'bubbleSort', name: 'Bubble Sort', category: 'Sorting' },
  { id: 'quickSort', name: 'Quick Sort', category: 'Sorting' },
  { id: 'binarySearch', name: 'Binary Search', category: 'Searching' },
  { id: 'dfs', name: 'Depth-First Search (DFS)', category: 'Graph Traversal' },
  { id: 'bfs', name: 'Breadth-First Search (BFS)', category: 'Graph Traversal' },
];

export default function VisualizerPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>(algorithms[0].id);
  const [inputData, setInputData] = useState<string>('');
  const [visualizationSteps, setVisualizationSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleAlgorithmChange = (value: string) => {
    setSelectedAlgorithm(value);
    setInputData('');
    setVisualizationSteps([]);
    setCurrentStep(0);
  };

  const handleVisualize = (e: FormEvent) => {
    e.preventDefault();
    // Placeholder: In a real app, this would trigger the visualization logic
    setVisualizationSteps([
      `Initializing ${algorithms.find(a => a.id === selectedAlgorithm)?.name || 'Algorithm'} with data: ${inputData}`,
      'Step 1: Processing data...',
      'Step 2: Intermediate state...',
      'Step 3: Final result.',
    ]);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Algorithm Visualizer</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Watch algorithms come to life. Enter your data and see how they work.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><Binary className="mr-2 h-6 w-6 text-primary" /> Controls</CardTitle>
            <CardDescription>Select an algorithm and provide input data.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVisualize} className="space-y-6">
              <div>
                <Label htmlFor="algorithm-select">Algorithm</Label>
                <Select value={selectedAlgorithm} onValueChange={handleAlgorithmChange}>
                  <SelectTrigger id="algorithm-select">
                    <SelectValue placeholder="Select an algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map((algo) => (
                      <SelectItem key={algo.id} value={algo.id}>
                        {algo.name} ({algo.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="input-data">Input Data</Label>
                <Input
                  id="input-data"
                  type="text"
                  value={inputData}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInputData(e.target.value)}
                  placeholder="e.g., 5,1,4,2,8 for sorting"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Format depends on the selected algorithm.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Play className="mr-2 h-4 w-4" /> Visualize
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setInputData('');
                    setVisualizationSteps([]);
                    setCurrentStep(0);
                  }}
                >
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle>Visualization Area</CardTitle>
            <CardDescription>
              Algorithm: {algorithms.find(a => a.id === selectedAlgorithm)?.name || 'None selected'}
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] bg-muted/30 rounded-md p-4 flex items-center justify-center">
            {/* Placeholder for actual visualization */}
            {visualizationSteps.length > 0 ? (
              <div className="text-center">
                <p className="text-lg font-medium">{visualizationSteps[currentStep]}</p>
                {currentStep < visualizationSteps.length -1 && (
                   <Button 
                     variant="secondary" 
                     className="mt-4"
                     onClick={() => setCurrentStep(prev => Math.min(prev + 1, visualizationSteps.length - 1))}
                   >
                     <StepForward className="mr-2 h-4 w-4" /> Next Step
                   </Button>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select an algorithm and input data to start visualization.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-4">
             <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {visualizationSteps.length || 1}
              </p>
          </CardFooter>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Explanation</CardTitle>
          <CardDescription>Step-by-step details of the algorithm execution.</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[150px]">
          {visualizationSteps.length > 0 ? (
            <ul className="space-y-2">
              {visualizationSteps.map((step, index) => (
                <li key={index} className={`p-2 rounded ${index === currentStep ? 'bg-accent/20 text-accent-foreground font-semibold' : 'text-muted-foreground'}`}>
                  {index + 1}. {step}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Detailed explanation will appear here as the algorithm visualizes.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
