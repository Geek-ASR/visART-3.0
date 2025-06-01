'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, BookOpen, CheckCircle, ListChecks, PieChartIcon } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, BarChart as RechartsBarChart } from '@/components/ui/chart';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const overallProgress = {
  problemsSolved: 15,
  totalProblems: 50,
  conceptsLearned: 8,
  totalConcepts: 20,
};

const topicProgress = [
  { name: 'Arrays & Strings', completed: 5, total: 10, color: 'hsl(var(--chart-1))' },
  { name: 'Linked Lists', completed: 3, total: 8, color: 'hsl(var(--chart-2))' },
  { name: 'Trees & Graphs', completed: 2, total: 12, color: 'hsl(var(--chart-3))' },
  { name: 'Sorting & Searching', completed: 4, total: 10, color: 'hsl(var(--chart-4))' },
  { name: 'Dynamic Programming', completed: 1, total: 10, color: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  problems: {
    label: "Problems",
  },
  solved: {
    label: "Solved",
    color: "hsl(var(--chart-1))",
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--muted))",
  }
};

const chartData = topicProgress.map(topic => ({
  name: topic.name,
  solved: topic.completed,
  remaining: topic.total - topic.completed,
}));


export default function ProgressPage() {
  const problemsProgressValue = (overallProgress.problemsSolved / overallProgress.totalProblems) * 100;
  const conceptsProgressValue = (overallProgress.conceptsLearned / overallProgress.totalConcepts) * 100;

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">Your Progress</h1>
        <p className="text-xl text-muted-foreground mt-2">
          Track your DSA learning journey and celebrate your achievements.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><CheckCircle className="mr-2 h-6 w-6 text-primary" /> Problems Solved</CardTitle>
            <CardDescription>
              You've solved {overallProgress.problemsSolved} out of {overallProgress.totalProblems} problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={problemsProgressValue} aria-label={`${problemsProgressValue}% problems solved`} />
            <p className="text-right text-sm text-muted-foreground mt-2">{problemsProgressValue.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><BookOpen className="mr-2 h-6 w-6 text-primary" /> Concepts Mastered</CardTitle>
            <CardDescription>
              You've learned {overallProgress.conceptsLearned} out of {overallProgress.totalConcepts} key concepts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={conceptsProgressValue} aria-label={`${conceptsProgressValue}% concepts learned`} className="[&>*]:bg-accent" />
            <p className="text-right text-sm text-muted-foreground mt-2">{conceptsProgressValue.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart className="mr-2 h-6 w-6 text-primary" /> Progress by Topic</CardTitle>
          <CardDescription>Detailed breakdown of your problem-solving progress across different DSA topics.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} layout="vertical" margin={{ right: 30, left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} strokeWidth={0} width={150} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="solved" stackId="a" fill="var(--color-solved)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="remaining" stackId="a" fill="var(--color-remaining)" radius={[0, 4, 4, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="flex items-center"><ListChecks className="mr-2 h-6 w-6 text-primary" />Recently Completed</CardTitle>
            <CardDescription>A quick look at your latest achievements.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Placeholder for recent activity */}
            <ul className="space-y-3">
                <li className="flex items-center p-3 bg-secondary/50 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Solved "Reverse a String" problem.</span>
                    <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
                </li>
                <li className="flex items-center p-3 bg-secondary/50 rounded-md">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                    <span>Completed "Arrays Introduction" module.</span>
                    <span className="ml-auto text-xs text-muted-foreground">3 days ago</span>
                </li>
                 <li className="flex items-center p-3 bg-secondary/50 rounded-md">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span>Solved "Find Max in Array" problem.</span>
                    <span className="ml-auto text-xs text-muted-foreground">5 days ago</span>
                </li>
            </ul>
             <p className="text-center mt-4 text-muted-foreground">More activity will appear here as you progress.</p>
        </CardContent>
      </Card>

    </div>
  );
}
