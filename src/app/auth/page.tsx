
'use client';

import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthenticationPage() {
  // The AuthLayout now handles centering the form.
  // The py-12 for vertical spacing is also handled by the layout's main tag.
  return <AuthForm />;
}
