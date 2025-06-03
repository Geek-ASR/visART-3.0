'use client';

import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px)-var(--footer-height,100px))] py-12">
      {/*
        The min-h class above uses CSS variables for navbar and footer height.
        Fallback values are provided: navbar-height = 80px, footer-height = 100px.
        The styled-jsx block that previously set these (potentially with different values for footer)
        was removed to resolve a Next.js runtime error related to its usage in App Router.
        If precise dynamic heights are needed, consider setting these variables globally
        or deriving them from the Navbar/Footer components.
      */}
      <AuthForm />
    </div>
  );
}
