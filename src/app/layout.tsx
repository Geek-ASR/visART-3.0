
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { WaveBackground } from '@/components/layout/WaveBackground';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';
  const isDashboardPage = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <head>
        <title>VisArt</title>
        <meta name="description" content="Learn, Visualize, and Code Data Structures and Algorithms with VisArt." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <WaveBackground />
        
        {isAuthPage ? (
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        ) : isDashboardPage ? (
          // Dashboard pages have their own layout, no global Navbar/Footer here
          <div className="relative z-0 flex flex-col min-h-screen bg-background">
            {children}
          </div>
        ) : (
          <div className="relative z-0 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}

