import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from './lib/auth-utils';

export function middleware(request: NextRequest) {
  // Define protected routes
  const protectedRoutes = [
    '/api/auth/logout',
    '/api/auth/validate',
    '/api/auth/change-password',
  ];

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Extract JWT from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Authorization header required',
        errors: ['Authorization header with Bearer token is required'],
      }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify JWT
    const decoded = AuthUtils.verifyJWT(token);
    
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: 'Invalid authentication token',
        errors: ['Invalid or expired JWT token'],
      }, { status: 401 });
    }

    // Add user info to request headers for use in API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.id);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-session-token', decoded.sessionToken);

    // Continue with the request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // For non-protected routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/auth/:path*',
  ],
};
