'use client';

import { useState } from 'react';
import { Mail, Lock, User, UserPlus, Chrome } from 'lucide-react';
import Link from 'next/link';

// Import shadcn/ui components
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
import { toast } from 'sonner';

// Reusable Background Component for visual consistency
const Background = () => (
  <div
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1555529669-e69e7aa0ba9e?q=80&w=1920&auto=format&fit=crop)',
    }}
    className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm brightness-50"
  />
);

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // TODO: Replace with your tRPC mutation for sign-up
  // const { mutate: signUp, isLoading } = api.auth.signUp.useMutation({ ... });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // TODO: Use a toast notification for this error
      toast("Passwords don't match!");
      return;
    }
    // In a real app, you would call the mutation here:
    // signUp({ name, email, password });
    console.log('Sign up attempt with:', { name, email, password });
  };

  const isLoading = false; // Placeholder for tRPC `isLoading` state

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      <Background />
      <Card className="relative z-10 w-full max-w-md rounded-2xl border-gray-200/20 bg-white/10 text-white shadow-2xl backdrop-blur-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
          <CardDescription className="text-sm text-gray-300">
            Join us to start shopping for the best deals.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Input */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
            
            {/* Confirm Password Input */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pl-10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                'Creating Account...'
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Divider and Social Login */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-400">
              OR
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <Button variant="outline" className="w-full">
            <Chrome className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link
              href="/log-in"
              className="font-medium text-blue-400 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}