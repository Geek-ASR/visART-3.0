
import type { Metadata } from 'next';

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
    // WaveBackground and Toaster are now handled by RootLayout.
    // This div centers the AuthForm (children) on the page.
    // It's placed directly inside the conditional rendering block of RootLayout.
    <div className="flex flex-grow items-center justify-center bg-background/30 backdrop-blur-sm p-4">
      {children}
    </div>
  );
}
