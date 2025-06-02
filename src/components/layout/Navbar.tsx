
'use client';

import Link from 'next/link';
import { Code2, BarChart3, BrainCircuit, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  const wrapperAuthButtonClassName = "p-[1.5px] rounded-lg bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-600 shadow-lg shadow-accent/50 hover:shadow-xl hover:shadow-accent/70 transition-all duration-300 transform hover:scale-105";

  let authButtonInnerClasses = "";
  if (isLandingPage) {
    authButtonInnerClasses = "w-full bg-background/80 backdrop-blur-sm hover:bg-background/90 text-foreground font-semibold rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background/80 transition-colors duration-150";
  } else {
    authButtonInnerClasses = "w-full bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary transition-colors duration-150";
  }

  return (
    <header
      className={cn(
        isLandingPage
          ? 'fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8' // Fixed, transparent background for landing page
          : 'bg-primary text-primary-foreground shadow-md' // Original styling for other pages
      )}
    >
      <div
        className={cn(
          'flex justify-between items-center',
          isLandingPage ? 'w-full' : 'container mx-auto px-4 py-4' // Full width for landing, container for others
        )}
      >
        <Link
          href="/"
          className={cn(
            'text-2xl font-bold font-headline',
            isLandingPage ? 'text-primary' : 'text-primary-foreground' // Ensure visibility on transparent bg
          )}
        >
          VisART
        </Link>

        {isLandingPage ? (
          <div className={wrapperAuthButtonClassName}>
            <Button asChild className={authButtonInnerClasses}>
              <Link href="/auth">
                <CheckSquare className="mr-2 h-5 w-5" /> Sign Up / Sign In
              </Link>
            </Button>
          </div>
        ) : (
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
            <div className={wrapperAuthButtonClassName}>
              <Button asChild className={authButtonInnerClasses}>
                <Link href="/auth">
                  <CheckSquare className="mr-2 h-5 w-5" /> Sign Up / Sign In
                </Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
