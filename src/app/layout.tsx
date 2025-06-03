
'use client';

import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { WaveBackground } from '@/components/layout/WaveBackground';
import { usePathname } from 'next/navigation';

// Note: Metadata here is static for client components.
// For dynamic metadata with client components, you'd use the metadata export in page.tsx or child layouts.
// However, for general site metadata, this is often fine.
// export const metadata: Metadata = { // This static export won't work directly in a 'use client' file like this for dynamic parts.
// title: 'VisART - Master DSA Interactively',
// description: 'Learn, Visualize, and Code Data Structures and Algorithms with VisART.',
// };
// Instead, we'll keep the static metadata object and use it if needed, or rely on page-specific metadata.


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth';

  return (
    <html lang="en">
      <head>
        {/* Title will be handled by page.tsx or specific layouts for better SEO in client components */}
        <title>VisART</title>
        <meta name="description" content="Learn, Visualize, and Code Data Structures and Algorithms with VisART." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <WaveBackground />
        
        {isAuthPage ? (
          <div className="relative z-10 flex flex-col min-h-screen">
            {/* Auth pages get a simpler structure, children (AuthLayout) will define its own full-page feel */}
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
