
import { AuthForm } from '@/components/auth/AuthForm';

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height,80px)-var(--footer-height,100px))] py-12">
      {/* Adjust min-h if navbar/footer heights are different or dynamic */}
      {/* For now, using estimated heights to push content down a bit from navbar and up from footer */}
      <style jsx global>{`
        :root {
          --navbar-height: 80px; /* Estimate, adjust if known */
          --footer-height: 150px; /* Estimate, adjust if known */
        }
      `}</style>
      <AuthForm />
    </div>
  );
}
