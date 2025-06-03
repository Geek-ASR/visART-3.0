
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart2, BookOpen, CheckCircle, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Placeholder data - replace with actual user data
  const userName = "Learner"; 
  const progress = {
    overallCompletion: 65,
    lastActivity: "Solved 'Binary Search Tree Insertion'",
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Welcome back, {userName}!
          </h1>
          <p className="text-lg text-muted-foreground mt-1">
            Continue your DSA learning journey.
          </p>
        </div>
        <div className="flex space-x-2">
            <Button variant="outline" asChild>
                <Link href="/settings"> {/* Placeholder for settings page */}
                    <Settings className="mr-2 h-4 w-4" /> Account
                </Link>
            </Button>
            <Button variant="destructive" onClick={() => { /* TODO: Implement Logout */ console.log("Logout clicked")}}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BarChart2 className="mr-3 h-6 w-6 text-primary" />
              Your Progress
            </CardTitle>
            <CardDescription>An overview of your learning achievements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-accent mb-2">{progress.overallCompletion}%</div>
            <p className="text-sm text-muted-foreground">Overall Completion</p>
            <Button variant="link" className="px-0 text-primary hover:text-primary/80 mt-3" asChild>
                <Link href="/progress">View Detailed Progress</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="mr-3 h-6 w-6 text-primary" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off or start a new topic.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Last activity: <span className="font-semibold text-foreground">{progress.lastActivity}</span>
            </p>
            <div className="space-y-2">
                <Button className="w-full bg-accent hover:bg-accent/90" asChild>
                    <Link href="/solve">Solve Problems</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/visualizer">Explore Visualizers</Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <CheckCircle className="mr-3 h-6 w-6 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Jump right into common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-muted/50" asChild>
                <Link href="/#features">Review Features</Link> 
            </Button>
            <Button variant="ghost" className="w-full justify-start text-left hover:bg-muted/50" asChild>
                <Link href="/community">Join Community</Link> {/* Placeholder for community page */}
            </Button>
             <Button variant="ghost" className="w-full justify-start text-left hover:bg-muted/50" asChild>
                <Link href="/feedback">Provide Feedback</Link> {/* Placeholder for feedback page */}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Announcements & Updates</CardTitle>
          <CardDescription>Stay informed about the latest additions and news.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for announcements */}
          <div className="p-4 bg-secondary/50 rounded-md">
            <h3 className="font-semibold text-primary">New Module Added: Advanced Graph Algorithms!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Explore complex graph theories and challenge yourself with new problems. Available now in the 'Solve Problems' section.
            </p>
          </div>
          <p className="text-center mt-4 text-sm text-muted-foreground">No new announcements right now.</p>
        </CardContent>
      </Card>

    </div>
  );
}
