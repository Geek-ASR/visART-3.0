
'use client';

import { useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Play, RotateCcw, Shuffle, Eye, SquareStack, Trash2, SearchCode, Pointer } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type ArrayOperation = 'access' | 'insert' | 'delete' | 'search';

interface VisualElement {
  value: number;
  id: string; // For stable key during re-renders
  state?: 'normal' | 'highlighted' | 'focused' | 'ghost' | 'new';
}

export default function ArrayMemoryOperationsVisualizerPage() {
  const [arrayData, setArrayData] = useState<VisualElement[]>([]);
  const [inputString, setInputString] = useState<string>('5, 1, 8, 2, 7');
  const [operationLog, setOperationLog] = useState<string[]>([]);
  const [currentOperation, setCurrentOperation] = useState<ArrayOperation | ''>('');
  const [operationIndex, setOperationIndex] = useState<string>('');
  const [operationValue, setOperationValue] = useState<string>('');
  const { toast } = useToast();

  const MAX_ARRAY_SIZE = 15;
  const MAX_RANDOM_VALUE = 99;

  const addLog = (message: string) => {
    setOperationLog(prev => [message, ...prev.slice(0, 9)]); // Keep last 10 logs
  };

  const resetHighlights = (arr: VisualElement[] = arrayData) => {
    return arr.map(el => ({ ...el, state: 'normal' }));
  };

  const handleInitializeArray = () => {
    const numbers = inputString.split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));

    if (numbers.length > MAX_ARRAY_SIZE) {
      toast({ title: "Error", description: `Maximum array size is ${MAX_ARRAY_SIZE}.`, variant: "destructive" });
      return;
    }
    if (numbers.some(n => n > MAX_RANDOM_VALUE || n < -MAX_RANDOM_VALUE)) {
      toast({ title: "Error", description: `Values must be between -${MAX_RANDOM_VALUE} and ${MAX_RANDOM_VALUE}.`, variant: "destructive" });
      return;
    }
    
    setArrayData(numbers.map((val, idx) => ({ value: val, id: `${Date.now()}-${idx}`, state: 'normal' })));
    addLog(`Array initialized with: [${numbers.join(', ')}]`);
    setOperationIndex('');
    setOperationValue('');
  };

  const handleGenerateRandomArray = () => {
    const size = Math.floor(Math.random() * (MAX_ARRAY_SIZE - 3 + 1)) + 3; // Size between 3 and MAX_ARRAY_SIZE
    const randomNumbers = Array.from({ length: size }, () => Math.floor(Math.random() * (MAX_RANDOM_VALUE + 1)));
    setArrayData(randomNumbers.map((val, idx) => ({ value: val, id: `${Date.now()}-${idx}`, state: 'normal' })));
    setInputString(randomNumbers.join(', '));
    addLog(`Generated random array: [${randomNumbers.join(', ')}]`);
    setOperationIndex('');
    setOperationValue('');
  };

  const handlePerformOperation = () => {
    let newArrayData = resetHighlights(); // Start with a clean slate visually
    const idx = parseInt(operationIndex, 10);
    const val = parseInt(operationValue, 10);

    if (!currentOperation) {
      toast({ title: "No Operation", description: "Please select an operation.", variant: "destructive" });
      return;
    }

    if (['access', 'insert', 'delete'].includes(currentOperation) && (isNaN(idx) || operationIndex.trim() === '')) {
      toast({ title: "Invalid Index", description: "Please enter a valid index.", variant: "destructive" });
      return;
    }
     if (['insert', 'search'].includes(currentOperation) && (isNaN(val) || operationValue.trim() === '')) {
      toast({ title: "Invalid Value", description: "Please enter a valid value for insert/search.", variant: "destructive" });
      return;
    }

    switch (currentOperation) {
      case 'access':
        if (idx >= 0 && idx < newArrayData.length) {
          newArrayData[idx].state = 'highlighted';
          addLog(`Accessed element at index ${idx}. Value: ${newArrayData[idx].value}.`);
        } else {
          addLog(`Error: Index ${idx} out of bounds.`);
          toast({ title: "Error", description: `Index ${idx} out of bounds.`, variant: "destructive"});
        }
        break;
      
      case 'insert':
        if (newArrayData.length >= MAX_ARRAY_SIZE) {
            addLog(`Error: Array is full. Max size is ${MAX_ARRAY_SIZE}.`);
            toast({ title: "Error", description: `Array is full. Cannot insert.`, variant: "destructive"});
            break;
        }
        if (idx >= 0 && idx <= newArrayData.length) {
          const newElement: VisualElement = { value: val, id: `${Date.now()}-new`, state: 'new' };
          newArrayData.splice(idx, 0, newElement);
          addLog(`Inserted value ${val} at index ${idx}.`);
        } else {
          addLog(`Error: Index ${idx} out of bounds for insertion.`);
           toast({ title: "Error", description: `Index ${idx} out of bounds for insertion.`, variant: "destructive"});
        }
        break;

      case 'delete':
        if (idx >= 0 && idx < newArrayData.length) {
          const deletedValue = newArrayData[idx].value;
          newArrayData.splice(idx, 1);
          addLog(`Deleted value ${deletedValue} from index ${idx}.`);
          // Could add 'ghost' state for deleted element before removing if doing animations
        } else {
          addLog(`Error: Index ${idx} out of bounds for deletion.`);
          toast({ title: "Error", description: `Index ${idx} out of bounds for deletion.`, variant: "destructive"});
        }
        break;

      case 'search':
        let found = false;
        for (let i = 0; i < newArrayData.length; i++) {
          if (newArrayData[i].value === val) {
            newArrayData[i].state = 'focused'; // Highlight all occurrences
            found = true;
          }
        }
        if (found) {
          addLog(`Searched for value ${val}. Found at highlighted indices.`);
        } else {
          addLog(`Searched for value ${val}. Not found.`);
           toast({ title: "Not Found", description: `Value ${val} not found in the array.`});
        }
        break;
      default:
        addLog('Unknown operation.');
    }
    setArrayData(newArrayData);
    // Reset op fields for next operation if desired, or keep them for quick re-runs
    // setOperationIndex(''); 
    // setOperationValue('');
  };
  
  const getOperationIcon = (op: ArrayOperation | '') => {
    switch(op) {
      case 'access': return <Pointer className="mr-2 h-4 w-4" />;
      case 'insert': return <SquareStack className="mr-2 h-4 w-4" />;
      case 'delete': return <Trash2 className="mr-2 h-4 w-4" />;
      case 'search': return <SearchCode className="mr-2 h-4 w-4" />;
      default: return <Play className="mr-2 h-4 w-4" />;
    }
  };


  return (
    <div className="space-y-8 p-4 md:p-6">
      <Button asChild variant="outline" size="sm" className="mb-4 w-auto">
        <Link href="/dashboard/dsa-topics/arrays/exercises">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Array Exercises
        </Link>
      </Button>

      <header className="pb-2 space-y-2">
        <div className="flex items-center space-x-3">
          <Eye className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Array Visualization: Memory & Operations</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Interact with an array to understand its memory structure and how basic operations affect it.
        </p>
      </header>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Section */}
        <Card className="lg:col-span-1 bg-card shadow-md">
          <CardHeader>
            <CardTitle>Controls</CardTitle>
            <CardDescription>Set up the array and choose an operation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="array-input">Array Elements (comma-separated)</Label>
              <Input
                id="array-input"
                value={inputString}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputString(e.target.value)}
                placeholder="e.g., 1,2,3,4,5"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleInitializeArray} className="flex-1">Initialize Array</Button>
              <Button onClick={handleGenerateRandomArray} variant="secondary" className="flex-1">
                <Shuffle className="mr-2 h-4 w-4" /> Random
              </Button>
            </div>
            
            <Separator />

            <div>
              <Label htmlFor="operation-select">Operation</Label>
              <Select value={currentOperation} onValueChange={(val) => setCurrentOperation(val as ArrayOperation)}>
                <SelectTrigger id="operation-select">
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="access">Access Element</SelectItem>
                  <SelectItem value="insert">Insert Element</SelectItem>
                  <SelectItem value="delete">Delete Element</SelectItem>
                  <SelectItem value="search">Search for Element</SelectItem>
                </SelectContent>
              </Select>
            </div>

            { (currentOperation === 'access' || currentOperation === 'insert' || currentOperation === 'delete') && (
              <div>
                <Label htmlFor="operation-index">Index</Label>
                <Input
                  id="operation-index"
                  type="number"
                  value={operationIndex}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setOperationIndex(e.target.value)}
                  placeholder="Enter index"
                  min="0"
                />
              </div>
            )}
            { (currentOperation === 'insert' || currentOperation === 'search') && (
              <div>
                <Label htmlFor="operation-value">Value</Label>
                <Input
                  id="operation-value"
                  type="number"
                  value={operationValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setOperationValue(e.target.value)}
                  placeholder="Enter value"
                />
              </div>
            )}
             {currentOperation && (
                <Button onClick={handlePerformOperation} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  {getOperationIcon(currentOperation)}
                  Perform {currentOperation.charAt(0).toUpperCase() + currentOperation.slice(1)}
                </Button>
             )}
          </CardContent>
        </Card>

        {/* Visualization & Log Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle>Array Visualization</CardTitle>
              <CardDescription>Current state of the array. Max {MAX_ARRAY_SIZE} elements. Values up to {MAX_RANDOM_VALUE}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full pb-4">
                <div className="flex space-x-1 p-4 bg-muted rounded-md min-h-[120px] items-center justify-start overflow-x-auto">
                  {arrayData.map((item) => (
                    <div key={item.id} className="relative shrink-0 mx-1">
                      <div className={cn(
                        "w-14 h-14 border-2 border-primary bg-card flex items-center justify-center font-bold text-lg rounded transition-all duration-300",
                        item.state === 'highlighted' && "bg-yellow-400 border-yellow-600 text-black ring-2 ring-yellow-600 scale-110",
                        item.state === 'focused' && "bg-green-400 border-green-600 text-black ring-2 ring-green-600 scale-110",
                        item.state === 'new' && "bg-blue-400 border-blue-600 text-black animate-pulse",
                        item.state === 'ghost' && "opacity-50 bg-slate-300 border-slate-400"
                      )}>
                        {item.value}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                        [{arrayData.indexOf(item)}]
                      </div>
                    </div>
                  ))}
                  {arrayData.length === 0 && (
                    <p className="text-muted-foreground w-full text-center py-8">
                      Array is empty. Initialize or generate data using the controls.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-md">
            <CardHeader>
              <CardTitle>Operation Log</CardTitle>
              <CardDescription>Step-by-step actions and results.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] bg-muted/50 rounded-md p-3">
                {operationLog.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {operationLog.map((log, index) => (
                      <li key={index} className="font-mono text-muted-foreground border-b border-border/50 pb-1 mb-1">
                        {log}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-center py-4">Log will appear here...</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
