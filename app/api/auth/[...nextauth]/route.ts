import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '../../../../lib/db';
import { users } from '../../../../database/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.select().from(users).where(eq(users.email, credentials.email)).limit(1);

        if (!user || user.length === 0 || !user[0].passwordHash) {
          return null;
        }

        const userData = user[0];
        const isValidPassword = await bcrypt.compare(credentials.password, userData.passwordHash);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as 'jobseeker' | 'company' | 'admin';
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
