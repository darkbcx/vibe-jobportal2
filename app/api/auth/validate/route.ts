import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { users, sessions } from '../../../../database/schema';
import { AuthUtils } from '../../../../lib/auth-utils';
import { AuthResponse } from '../../../../lib/types/auth';
import { eq, and, gt } from 'drizzle-orm';

export async function GET(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
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

    // Check if session exists and is valid
    const sessionResults = await db.select().from(sessions)
      .where(eq(sessions.sessionToken, decoded.sessionToken))
      .limit(1);
    
    if (sessionResults.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid session, please login again',
        errors: ['Session not found'],
      }, { status: 401 });
    }

    const session = sessionResults[0];

    // Check if session has expired
    if (new Date() > session.expiredAt) {
      // Delete expired session
      await db.delete(sessions).where(eq(sessions.sessionToken, decoded.sessionToken));
      
      return NextResponse.json({
        success: false,
        message: 'Session expired, please login again',
        errors: ['Session has expired'],
      }, { status: 401 });
    }

    // Get user data
    const userResults = await db.select().from(users)
      .where(eq(users.id, session.userId))
      .limit(1);
    
    if (userResults.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        errors: ['User associated with session not found'],
      }, { status: 404 });
    }

    const user = userResults[0];

    // Extend session expiration by 24 hours
    const newExpiredAt = AuthUtils.getSessionExpiry();
    
    await db.update(sessions)
      .set({ expiredAt: newExpiredAt })
      .where(eq(sessions.sessionToken, decoded.sessionToken));

    // Generate new JWT with extended expiration
    const newJwt = AuthUtils.generateJWT(user, decoded.sessionToken);

    // Return success response with updated JWT
    const response: AuthResponse = {
      success: true,
      message: 'Session validated successfully',
      data: {
        jwt: newJwt,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Session validation error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during session validation'],
    }, { status: 500 });
  }
}
