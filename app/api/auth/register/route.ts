import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { users, sessions } from '../../../../database/schema';
import { AuthUtils } from '../../../../lib/auth-utils';
import { AuthResponse, RegisterRequest } from '../../../../lib/types/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest): Promise<NextResponse<AuthResponse>> {
  try {
    const body: RegisterRequest = await request.json();
    const { email, password, passwordConfirmation, name, role } = body;

    // Validation
    const errors: string[] = [];

    // Email validation
    if (!AuthUtils.isValidEmail(email)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    const passwordValidation = AuthUtils.validatePassword(password);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }

    // Password confirmation
    if (password !== passwordConfirmation) {
      errors.push('Passwords do not match');
    }

    // Name validation
    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    // Role validation
    if (!['jobseeker', 'company'].includes(role)) {
      errors.push('Invalid role selected');
    }

    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors,
      }, { status: 400 });
    }

    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Email already registered',
        errors: ['Email address is already in use'],
      }, { status: 409 });
    }

    // Hash password
    const passwordHash = await AuthUtils.hashPassword(password);

    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      name,
      passwordHash,
      role,
    }).returning();

    // Create session
    const sessionToken = AuthUtils.generateSessionToken();
    const expiredAt = AuthUtils.getSessionExpiry();
    const ipAddress = AuthUtils.getClientIP(request);
    const userAgent = AuthUtils.getUserAgent(request);

    await db.insert(sessions).values({
      sessionToken,
      userId: newUser.id,
      email: newUser.email,
      expiredAt,
      ipAddress,
      userAgent,
    });

    // Generate JWT
    const jwt = AuthUtils.generateJWT(newUser, sessionToken);

    // Return success response
    const response: AuthResponse = {
      success: true,
      message: 'User registered successfully',
      data: {
        jwt,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      },
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during registration'],
    }, { status: 500 });
  }
}
