'use client';

import { useState } from 'react';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// In a real app, you would use the Next.js <Image /> component
// For this example, we use a div with a background image for simplicity


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Replace with your tRPC mutation
  // const { mutate: login, isLoading } = api.auth.login.useMutation({ ... });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would call the mutation here:
    // login({ email, password });
    console.log('Login attempt with:', { email, password });
  };

  const isLoading = false; // Placeholder for tRPC `isLoading` state

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-gray-200/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-300">
              Sign in to continue to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-200"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700/50 py-2.5 pl-10 pr-3 lg:h-12 text-white placeholder-gray-400 transition  focus:outline-none focus:ring-2 "
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-200"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password" // TODO: Create this page
                  className="text-sm  hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-600 lg:h-12 bg-gray-700/50 py-2.5 pl-10 pr-3 text-white placeholder-gray-400 transition  focus:outline-none focus:ring-2 "
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg  px-4 py-2.5 text-sm font-semibold  transition  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  'Signing In...'
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Divider and Social Login */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-400">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          <div>
            <button
              type="button"
              // TODO: Add onClick handler for Google Sign-In
              className="flex w-full items-center justify-center rounded-lg border border-gray-600 bg-gray-700/50 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Sign in with Google
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center text-sm text-gray-300">
            Don&apos;t have an account?{' '}
            <Link
              href="/sign-up"
              className="font-medium hover:underline"
            >
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}