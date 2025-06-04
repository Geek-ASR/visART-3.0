
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart as BarChartIcon, BookOpen, CheckCircle, ListChecks } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart as RechartsBarChart } from 'recharts';

const overallProgress = {
  problemsSolved: 23,
  totalProblems: 75,
  conceptsLearned: 12,
  totalConcepts: 30,
};

const topicProgressData = [
  { name: 'Strings', completed: 7, total: 12, color: 'hsl(var(--chart-1))' },
  { name: 'Arrays', completed: 5, total: 10, color: 'hsl(var(--chart-2))' },
  { name: 'Linked Lists', completed: 4, total: 8, color: 'hsl(var(--chart-3))' },
  { name: 'Binary Trees', completed: 3, total: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Graphs', completed: 2, total: 10, color: 'hsl(var(--chart-5))' },
  { name: 'Sorting', completed: 1, total: 10, color: 'hsl(var(--chart-1))' },
  { name: 'Dynamic Prog.', completed: 1, total: 10, color: 'hsl(var(--chart-2))' },
];

const chartConfig = {
  problems: {
    label: "Problems",
  },
  solved: {
    label: "Solved",
    color: "hsl(var(--primary))", 
  },
  remaining: {
    label: "Remaining",
    color: "hsl(var(--muted))", 
  }
};

const chartData = topicProgressData.map(topic => ({
  name: topic.name,
  solved: topic.completed,
  remaining: topic.total - topic.completed,
}));

export default function DashboardProgressPage() {
  const problemsProgressValue = (overallProgress.problemsSolved / overallProgress.totalProblems) * 100;
  const conceptsProgressValue = (overallProgress.conceptsLearned / overallProgress.totalConcepts) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md bg-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" /> Problems Solved
            </CardTitle>
            <CardDescription>
              You've solved {overallProgress.problemsSolved} out of {overallProgress.totalProblems} problems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={problemsProgressValue} aria-label={`${problemsProgressValue}% problems solved`} />
            <p className="text-right text-sm text-muted-foreground mt-2">{problemsProgressValue.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>

        <Card className="shadow-md bg-card">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="mr-2 h-5 w-5 text-accent" /> Concepts Mastered
            </CardTitle>
            <CardDescription>
              You've learned {overallProgress.conceptsLearned} out of {overallProgress.totalConcepts} key concepts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={conceptsProgressValue} aria-label={`${conceptsProgressValue}% concepts learned`} className="[&>*:first-child]:bg-accent" />
            <p className="text-right text-sm text-muted-foreground mt-2">{conceptsProgressValue.toFixed(0)}% Complete</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md bg-card">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BarChartIcon className="mr-2 h-5 w-5 text-primary" /> Progress by Topic
          </CardTitle>
          <CardDescription>Detailed breakdown of your problem-solving progress across different DSA topics.</CardDescription>
        </CardHeader>
        <CardContent className="h-[450px] w-full pr-6">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData} layout="vertical" margin={{ right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  width={100}
                  interval={0}
                />
                <ChartTooltip 
                  cursor={{fill: 'hsl(var(--muted)/0.3)'}}
                  content={<ChartTooltipContent />} 
                />
                <Bar dataKey="solved" stackId="a" fill="var(--color-solved)" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="remaining" stackId="a" fill="var(--color-remaining)" radius={[0, 4, 4, 0]} barSize={20} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-md bg-card">
        <CardHeader>
            <CardTitle className="flex items-center text-xl"><ListChecks className="mr-2 h-5 w-5 text-primary" />Recently Completed</CardTitle>
            <CardDescription>A quick look at your latest achievements.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-3">
                <li className="flex items-center p-3 bg-background rounded-md border">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-sm">Solved "Two Sum" problem from Arrays.</span>
                    <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">1 day ago</span>
                </li>
                <li className="flex items-center p-3 bg-background rounded-md border">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3 shrink-0" />
                    <span className="text-sm">Completed "Introduction to Linked Lists" theory module.</span>
                    <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">3 days ago</span>
                </li>
                 <li className="flex items-center p-3 bg-background rounded-md border">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-sm">Visualized "Bubble Sort" execution.</span>
                    <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">5 days ago</span>
                </li>
            </ul>
             <p className="text-center mt-6 text-sm text-muted-foreground">More activity will appear here as you progress.</p>
        </CardContent>
      </Card>

    </div>
  );
}
