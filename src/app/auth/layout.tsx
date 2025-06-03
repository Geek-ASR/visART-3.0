
import type { Metadata } from 'next';
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
        {/* This div will allow the WaveBackground to show through and center the content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
