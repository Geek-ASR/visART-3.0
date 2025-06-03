
import type { Metadata } from 'next';
import Link from 'next/link';
// Removed '../globals.css' import as it's in the root layout
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
    <>
      {/* WaveBackground can be here if it's specific to auth, or managed by RootLayout for global effect.
          Assuming it should be present on auth pages as per previous design. */}
      <WaveBackground />
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center bg-background/30 backdrop-blur-sm"> {/* Added bg and backdrop for visual consistency if wave is behind */}
        {/* Minimal Header with VisART Logo */}
        <header className="w-full py-6 px-4 md:px-8 absolute top-0 left-0 right-0 z-20 flex justify-center">
          <Link
            href="/"
            className="text-3xl font-bold font-headline text-primary hover:text-primary/80 transition-colors"
          >
            VisART
          </Link>
        </header>

        {/* Main content area adjusted for the header */}
        {/* This div ensures content is centered below the absolute positioned header */}
        <div className="flex flex-col flex-grow w-full items-center justify-center pt-24 pb-12 md:pt-32 px-4">
          {children}
        </div>
      </div>
      <Toaster />
    </>
  );
}
