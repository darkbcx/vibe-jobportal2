import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { users, sessions } from '../../../../database/schema';
import { AuthUtils } from '../../../../lib/auth-utils';
import { AuthResponse, LoginRequest } from '../../../../lib/types/auth';
import { eq, and, gt } from 'drizzle-orm';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: 'Email and password are required',
        errors: ['Email and password are required'],
      }, { status: 400 });
    }

    // Find user by email
    const userResults = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (userResults.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
        errors: ['Invalid email or password'],
      }, { status: 401 });
    }

    const user = userResults[0];

    // Verify password
    const isPasswordValid = await AuthUtils.verifyPassword(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
        errors: ['Invalid email or password'],
      }, { status: 401 });
    }

    // Invalidate existing sessions for this user
    await db.delete(sessions).where(eq(sessions.userId, user.id));

    // Create new session
    const sessionToken = AuthUtils.generateSessionToken();
    const expiredAt = AuthUtils.getSessionExpiry();
    const ipAddress = AuthUtils.getClientIP(request);
    const userAgent = AuthUtils.getUserAgent(request);

    await db.insert(sessions).values({
      sessionToken,
      userId: user.id,
      email: user.email,
      expiredAt,
      ipAddress,
      userAgent,
    });

    // Generate JWT
    const jwt = AuthUtils.generateJWT(user, sessionToken);

    // Return success response
    const response: AuthResponse = {
      success: true,
      message: 'Login successful',
      data: {
        jwt,
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
    console.error('Login error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during login'],
    }, { status: 500 });
  }
}
