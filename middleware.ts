import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Redirect based on user role
    if (pathname.startsWith('/company') && token?.role !== 'company') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    if (pathname.startsWith('/jobseeker') && token?.role !== 'jobseeker') {
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/company/:path*', '/jobseeker/:path*'],
};
