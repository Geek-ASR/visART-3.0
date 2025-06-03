
import type { Metadata } from 'next';
import Link from 'next/link'; // Import Link
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { WaveBackground } from '@/components/layout/WaveBackground';

export const metadata: Metadata = {
  title: 'Sign In/Up - VisART',
  description: 'Access your VisART account or create a new one to start your interactive DSA learning journey.',
};

export default function AuthLayout({
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
      <body className="font-body antialiased bg-background text-foreground" suppressHydrationWarning={true}>
        <WaveBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Minimal Header with VisART Logo */}
          <header className="w-full py-6 px-4 md:px-8 absolute top-0 left-0 right-0 z-20">
            <Link
              href="/"
              className="text-2xl font-bold font-headline text-primary hover:text-primary/80 transition-colors"
            >
              VisART
            </Link>
          </header>

          {/* Main content area adjusted for the header */}
          <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-12 md:pt-32">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
