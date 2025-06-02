
import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'AlgoVisuals - Master DSA Interactively',
  description: 'Learn, Visualize, and Code Data Structures and Algorithms with AlgoVisuals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        {/* Global Wave Background */}
        <div aria-hidden="true" className="fixed inset-0 z-[-1] overflow-hidden">
          <div
            className="absolute rounded-full transform
                       top-[-80vh] left-[-50vw]
                       w-[200vw] h-[200vh]
                       bg-primary/20 
                       rotate-[-40deg]"
          />
          <div
            className="absolute rounded-full transform
                       bottom-[-70vh] right-[-60vw]
                       w-[220vw] h-[180vh]
                       bg-accent/20 
                       rotate-[30deg]"
          />
          <div
            className="absolute rounded-full transform
                       top-[0vh] left-[-70vw]
                       w-[250vw] h-[150vh]
                       bg-foreground/10
                       rotate-[-55deg]"
          />
        </div>
        
        {/* Main Content Wrapper - Now transparent by default, waves will show through */}
        <div className="relative z-0 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
