import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    role: 'jobseeker' | 'company' | 'admin';
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'jobseeker' | 'company' | 'admin';
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'jobseeker' | 'company' | 'admin';
  }
}
