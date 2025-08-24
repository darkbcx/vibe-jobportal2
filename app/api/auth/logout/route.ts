import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { sessions } from '../../../../database/schema';
import { AuthUtils } from '../../../../lib/auth-utils';
import { AuthResponse } from '../../../../lib/types/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
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

    // Delete session from database
    await db.delete(sessions).where(eq(sessions.sessionToken, decoded.sessionToken));

    // Return success response
    const response: AuthResponse = {
      success: true,
      message: 'Logout successful',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during logout'],
    }, { status: 500 });
  }
}
