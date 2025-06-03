
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.79 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).optional(),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], // path to field that gets the error
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;

export function AuthForm() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('signin');

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSignUpSubmit = (data: SignUpFormValues) => {
    console.log('Sign Up Data:', data);
    // TODO: Implement Firebase Sign Up
    toast({ title: 'Sign Up Attempted', description: 'Check console for data. (Not implemented)' });
  };

  const onSignInSubmit = (data: SignInFormValues) => {
    console.log('Sign In Data:', data);
    // TODO: Implement Firebase Sign In
    toast({ title: 'Sign In Attempted', description: 'Check console for data. (Not implemented)' });
  };
  
  const handleGoogleAuth = (mode: 'signin' | 'signup') => {
    console.log(`Google ${mode} action`);
    // TODO: Implement Firebase Google Sign In/Up
    toast({ title: `Google ${mode === 'signin' ? 'Sign In' : 'Sign Up'}`, description: 'Not implemented.' });
  }

  return (
    <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-sm border-primary/20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-primary">
            {activeTab === 'signin' ? 'Welcome Back!' : 'Create Account'}
          </CardTitle>
          <CardDescription>
            {activeTab === 'signin' ? 'Sign in to access your VisART journey.' : 'Join VisART to start learning DSA interactively.'}
          </CardDescription>
          <TabsList className="grid w-full grid-cols-2 mt-4">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="signup">
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="signup-name">Name (Optional)</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signup-name" {...signUpForm.register('name')} placeholder="John Doe" className="pl-10" />
                </div>
                {signUpForm.formState.errors.name && <p className="text-xs text-destructive">{signUpForm.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signup-email" type="email" {...signUpForm.register('email')} placeholder="you@example.com" className="pl-10" />
                </div>
                {signUpForm.formState.errors.email && <p className="text-xs text-destructive">{signUpForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signup-password" type="password" {...signUpForm.register('password')} placeholder="••••••••" className="pl-10" />
                </div>
                {signUpForm.formState.errors.password && <p className="text-xs text-destructive">{signUpForm.formState.errors.password.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signup-confirmPassword" type="password" {...signUpForm.register('confirmPassword')} placeholder="••••••••" className="pl-10" />
                </div>
                {signUpForm.formState.errors.confirmPassword && <p className="text-xs text-destructive">{signUpForm.formState.errors.confirmPassword.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Create Account</Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" type="button" className="w-full" onClick={() => handleGoogleAuth('signup')}>
                <GoogleIcon className="mr-2 h-4 w-4" /> Sign Up with Google
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="signin">
          <form onSubmit={signInForm.handleSubmit(onSignInSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="signin-email">Email</Label>
                 <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signin-email" type="email" {...signInForm.register('email')} placeholder="you@example.com" className="pl-10" />
                </div>
                {signInForm.formState.errors.email && <p className="text-xs text-destructive">{signInForm.formState.errors.email.message}</p>}
              </div>
              <div className="space-y-1">
                <Label htmlFor="signin-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="signin-password" type="password" {...signInForm.register('password')} placeholder="••••••••" className="pl-10" />
                </div>
                {signInForm.formState.errors.password && <p className="text-xs text-destructive">{signInForm.formState.errors.password.message}</p>}
              </div>
              <div className="flex items-center justify-end">
                <Button variant="link" type="button" className="px-0 text-xs h-auto text-primary hover:text-primary/80">
                  Forgot password?
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Sign In</Button>
               <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" type="button" className="w-full" onClick={() => handleGoogleAuth('signin')}>
                <GoogleIcon className="mr-2 h-4 w-4" /> Sign In with Google
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
       <p className="px-6 pb-6 text-center text-xs text-muted-foreground">
        {activeTab === 'signin' ? "Don't have an account? " : "Already have an account? "}
        <Button
          variant="link"
          className="p-0 h-auto text-xs text-accent hover:text-accent/80"
          onClick={() => setActiveTab(activeTab === 'signin' ? 'signup' : 'signin')}
        >
          {activeTab === 'signin' ? 'Sign Up' : 'Sign In'}
        </Button>
      </p>
    </Card>
  );
}
