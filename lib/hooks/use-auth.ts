'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      // Redirect based on user role
      if (session?.user?.role === 'company') {
        router.push('/company');
      } else if (session?.user?.role === 'jobseeker') {
        router.push('/jobseeker');
      } else {
        router.push('/dashboard');
      }
      return true;
    }

    return false;
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    role: 'jobseeker' | 'company';
  }) => {
    // You'll need to create a separate API endpoint for registration
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Auto-login after successful registration
      return await login(userData.email, userData.password);
    }

    return false;
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return {
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: status === 'loading',
    login,
    register,
    logout,
    status,
  };
};
