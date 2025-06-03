
'use client';

import type { Metadata } from 'next';
import Link from 'next/link';

// export const metadata: Metadata = { // Metadata should be handled by RootLayout or page.tsx
//   title: 'Sign In/Up - VisART',
//   description: 'Access your VisART account or create a new one to start your interactive DSA learning journey.',
// };

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This div centers the AuthForm (children) on the page.
    // It's placed directly inside the conditional rendering block of RootLayout.
    <div className="flex flex-col flex-grow items-center justify-center bg-background/30 backdrop-blur-sm p-4">
      <div className="mb-8 text-center">
        <Link href="/" className="text-4xl font-bold font-headline text-primary hover:text-primary/90 transition-colors">
          VisART
        </Link>
      </div>
      {children}
    </div>
  );
}
