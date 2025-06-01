import Link from 'next/link';
import { Code2, BarChart3, BrainCircuit, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-headline">
          AlgoVisuals
        </Link>
        <nav className="space-x-4 flex items-center">
          <Button variant="ghost" asChild>
            <Link href="/visualizer" className="hover:text-accent-foreground/80 transition-colors">
              <BrainCircuit className="mr-2 h-5 w-5" /> Visualizer
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/solve" className="hover:text-accent-foreground/80 transition-colors">
              <Code2 className="mr-2 h-5 w-5" /> Solve Problems
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/progress" className="hover:text-accent-foreground/80 transition-colors">
              <BarChart3 className="mr-2 h-5 w-5" /> My Progress
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="#">
              <CheckSquare className="mr-2 h-5 w-5" /> Sign Up
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
