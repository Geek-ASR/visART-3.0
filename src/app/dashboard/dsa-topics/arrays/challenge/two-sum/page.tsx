
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, UploadCloud, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface StarterCode {
  javascript: string;
  python: string;
  cpp: string;
  java: string;
}

const challengeDetails = {
  id: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  difficultyColor: 'bg-green-500 hover:bg-green-600', // Example color
  topic: 'Arrays',
  topicColor: 'bg-blue-500 hover:bg-blue-600', // Example color
  description: [
    { type: 'paragraph', content: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.' },
    { type: 'paragraph', content: 'You may assume that each input would have **exactly one solution**, and you may not use the same element twice.' },
    { type: 'paragraph', content: 'You can return the answer in any order.' },
  ],
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
      explanation: '',
    },
    {
      input: 'nums = [3,3], target = 6',
      output: '[0,1]',
      explanation: '',
    },
  ],
  constraints: [
    '`2 <= nums.length <= 10⁴`',
    '`-10⁹ <= nums[i] <= 10⁹`',
    '`-10⁹ <= target <= 10⁹`',
    '**Only one valid answer exists.**',
  ],
  starterCode: {
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Your code here
};`,
    python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
    cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> twoSum(std::vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`,
    java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[0];
    }
}`,
  } as StarterCode,
};

type LanguageKey = keyof StarterCode;

export default function TwoSumChallengePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>('javascript');
  const [userCode, setUserCode] = useState<string>(challengeDetails.starterCode.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [submissionResult, setSubmissionResult] = useState<string>('');
  const [activeOutputTab, setActiveOutputTab] = useState('test-cases');
  const { toast } = useToast();

  useEffect(() => {
    setUserCode(challengeDetails.starterCode[selectedLanguage]);
    setOutput('');
    setSubmissionResult('');
    setActiveOutputTab('test-cases');
  }, [selectedLanguage]);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running sample test cases...\n');
    setActiveOutputTab('console-output');
    setTimeout(() => {
      setOutput((prev) => prev + `Test Case 1 (nums = [2,7,11,15], target = 9): Passed\nExpected Output: [0,1]\nYour Output: [0,1] (Mocked)\n\n`);
      setOutput((prev) => prev + `Test Case 2 (nums = [3,2,4], target = 6): Passed\nExpected Output: [1,2]\nYour Output: [1,2] (Mocked)`);
      setIsRunning(false);
      toast({ title: 'Code Run (Mocked)', description: 'Sample tests executed.' });
    }, 1500);
  };

  const handleSubmitCode = () => {
    setIsSubmitting(true);
    setSubmissionResult('Submitting your solution...\n');
    setActiveOutputTab('submission-result');
    setTimeout(() => {
      // Simulate different outcomes
      const outcomes = [
        { status: 'Accepted', message: 'All hidden test cases passed! Runtime: 80ms (Mocked), Memory: 42.5MB (Mocked)', success: true },
        { status: 'Wrong Answer', message: 'Test Case 5 failed. Expected: [3,4], Got: [2,4] (Mocked)', success: false },
        { status: 'Time Limit Exceeded', message: 'Your solution took too long to execute on a large test case. (Mocked)', success: false },
      ];
      const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      setSubmissionResult(
        `Status: ${randomOutcome.status}\n${randomOutcome.message}`
      );
      setIsSubmitting(false);
      toast({
        title: `Submission ${randomOutcome.status} (Mocked)`,
        description: randomOutcome.message.split('.')[0],
        variant: randomOutcome.success ? 'default' : 'destructive',
      });
    }, 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]"> {/* Adjust height based on header */}
      {/* Header Bar */}
      <header className="flex items-center justify-between p-3 border-b bg-card sticky top-0 z-10">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/dsa-topics/arrays/exercises">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercises
          </Link>
        </Button>
        <h1 className="text-xl font-semibold text-foreground">{challengeDetails.title}</h1>
        <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={cn("capitalize", challengeDetails.difficultyColor, "text-white")}>
                {challengeDetails.difficulty}
            </Badge>
            <Badge variant="outline" className={cn("capitalize", challengeDetails.topicColor, "text-white border-transparent")}>
                {challengeDetails.topic}
            </Badge>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px overflow-hidden bg-border">
        {/* Left Pane: Problem Description */}
        <ScrollArea className="bg-card p-1 lg:p-0">
          <div className="p-4 lg:p-6 space-y-6">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Problem Description</h2>
              <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                {challengeDetails.description.map((item, index) => (
                  item.type === 'paragraph' && <p key={index} dangerouslySetInnerHTML={{ __html: item.content.replace(/`([^`]+)`/g, '<code class="font-mono bg-muted/50 px-1 py-0.5 rounded-sm text-foreground">\$1</code>').replace(/\*\*([^\*]+)\*\*/g, '<strong>\$1</strong>') }} />
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Examples</h2>
              {challengeDetails.examples.map((ex, index) => (
                <div key={index} className="mb-4 p-3 bg-background rounded-md border">
                  <p className="text-sm font-medium text-foreground mb-1">Example {index + 1}:</p>
                  <pre className="text-xs font-mono bg-muted/30 p-2 rounded-sm overflow-x-auto">
                    <span className="font-semibold">Input:</span> {ex.input}\n<span className="font-semibold">Output:</span> {ex.output}
                    {ex.explanation && `\n<span class="font-semibold">Explanation:</span> ${ex.explanation}`}
                  </pre>
                </div>
              ))}
            </section>

            <Separator />

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Constraints</h2>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm pl-4">
                {challengeDetails.constraints.map((constraint, index) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: constraint.replace(/`([^`]+)`/g, '<code class="font-mono bg-muted/50 px-1 py-0.5 rounded-sm text-foreground">\$1</code>').replace(/\*\*([^\*]+)\*\*/g, '<strong>\$1</strong>') }} />
                ))}
              </ul>
            </section>
          </div>
        </ScrollArea>

        {/* Right Pane: Editor and Output */}
        <div className="bg-card flex flex-col">
          <div className="p-3 border-b">
            <Label htmlFor="language-select" className="sr-only">Language</Label>
            <Select
              value={selectedLanguage}
              onValueChange={(value) => setSelectedLanguage(value as LanguageKey)}
              disabled={isRunning || isSubmitting}
            >
              <SelectTrigger id="language-select" className="w-[180px] h-9 text-xs">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="flex-1">
            <Textarea
              value={userCode}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setUserCode(e.target.value)}
              placeholder={`// Write your ${selectedLanguage} code here`}
              className="w-full h-full min-h-[300px] font-mono text-sm border-0 rounded-none focus-visible:ring-0 resize-none p-4"
              disabled={isRunning || isSubmitting}
            />
          </ScrollArea>
          
          <div className="p-3 border-t bg-background">
            <Tabs value={activeOutputTab} onValueChange={setActiveOutputTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-9 text-xs">
                <TabsTrigger value="test-cases" className="text-xs">Test Cases</TabsTrigger>
                <TabsTrigger value="console-output" className="text-xs">Console</TabsTrigger>
                <TabsTrigger value="submission-result" className="text-xs">Result</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[150px] mt-2 border rounded-md p-0">
                <TabsContent value="test-cases" className="m-0 p-3 text-xs font-mono text-muted-foreground">
                    <p className="font-semibold mb-1 text-foreground">Sample Test Cases:</p>
                    {challengeDetails.examples.map((ex, index) => (
                         <div key={index} className="mb-2 p-2 bg-muted/30 rounded-sm text-xs">
                           <p><span className="font-medium">Input:</span> {ex.input}</p>
                           <p><span className="font-medium">Expected Output:</span> {ex.output}</p>
                         </div>
                    ))}
                </TabsContent>
                <TabsContent value="console-output" className="m-0 p-3 text-xs font-mono">
                  <pre className="whitespace-pre-wrap">{output || 'Run your code to see output here.'}</pre>
                </TabsContent>
                <TabsContent value="submission-result" className="m-0 p-3 text-xs font-mono">
                  <pre className="whitespace-pre-wrap">{submissionResult || 'Submit your code to see the result.'}</pre>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          <CardFooter className="p-3 border-t bg-card flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRunCode}
              disabled={isRunning || isSubmitting}
              className="text-xs"
            >
              {isRunning ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Play className="mr-2 h-3 w-3" />}
              Run Code
            </Button>
            <Button 
              size="sm" 
              onClick={handleSubmitCode}
              disabled={isRunning || isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-xs"
            >
              {isSubmitting ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <UploadCloud className="mr-2 h-3 w-3" />}
              Submit
            </Button>
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
