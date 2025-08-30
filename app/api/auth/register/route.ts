import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { users } from '../../../../database/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  role: 'jobseeker' | 'company';
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();
    const { email, password, passwordConfirmation, name, role } = body;

    // Validation
    const errors: string[] = [];

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }

    // Password validation
    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
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
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const [newUser] = await db.insert(users).values({
      email,
      name,
      passwordHash,
      role,
    }).returning();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
        },
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during registration'],
    }, { status: 500 });
  }
}
