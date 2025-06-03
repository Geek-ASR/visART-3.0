
import type { Metadata } from 'next';
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
      <WaveBackground />
      {/* This div will center the AuthForm (children) on the page with some padding */}
      <div className="relative z-10 flex min-h-screen items-center justify-center bg-background/30 backdrop-blur-sm p-4">
        {/* The children (AuthForm component) is directly rendered here, centered by the parent div */}
        {children}
      </div>
      <Toaster />
    </>
  );
}
