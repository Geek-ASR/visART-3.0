'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Zap, Code } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from '@/components/ui/scroll-area';

const sampleProblem = {
  id: 'reverseString',
  title: 'Reverse a String',
  description: 'Write a function that takes a string as input and returns the string reversed.',
  defaultCode: {
    javascript: 'function reverseString(str) {\n  // Your code here\n}',
    python: 'def reverse_string(s):\n  # Your code here\n  pass',
  },
  programmingLanguages: ['javascript', 'python'],
};

export default function SolvePage() {
  const { toast } = useToast();
  const [problem, setProblem] = useState(sampleProblem);
  const [userCode, setUserCode] = useState<string>(problem.defaultCode.javascript);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [output, setOutput] = useState<string>('');
  const [isLoadingRun, setIsLoadingRun] = useState<boolean>(false);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // @ts-ignore
    setUserCode(problem.defaultCode[value] || '');
    setOutput('');
  };

  const handleRunCode = () => {
    setIsLoadingRun(true);
    // Placeholder for actual code execution and basic test cases
    setOutput('Running code... (Test cases not implemented in this demo)\nYour output would appear here.');
    // Simulate execution time
    setTimeout(() => {
      setIsLoadingRun(false);
      toast({ title: "Code Execution", description: "Placeholder for code execution result."});
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Coding Playground</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Solve DSA problems and get feedback on your code.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><Code className="mr-2 h-6 w-6 text-primary" /> Problem: {problem.title}</CardTitle>
            <CardDescription>
              <ScrollArea className="h-[150px] pr-4">
                {problem.description}
              </ScrollArea>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="language-select">Language</Label>
                <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                  <SelectTrigger id="language-select">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {problem.programmingLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="code-editor">Your Code</Label>
                <Textarea
                  id="code-editor"
                  value={userCode}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserCode(e.target.value)}
                  placeholder={`// Write your ${selectedLanguage} code here`}
                  className="min-h-[300px] font-code text-sm"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Button onClick={handleRunCode} className="w-full sm:w-auto bg-primary hover:bg-primary/90" disabled={isLoadingRun}>
              <Zap className="mr-2 h-4 w-4" /> {isLoadingRun ? 'Running...' : 'Run Code'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>Results from your code execution will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[450px] bg-muted/30 rounded-md p-4">
              <pre className="whitespace-pre-wrap text-sm font-code">
                {output || "Output will be shown here..."}
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
