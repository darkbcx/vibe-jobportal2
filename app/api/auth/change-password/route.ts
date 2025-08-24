import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { users, sessions } from '../../../../database/schema';
import { AuthUtils } from '../../../../lib/auth-utils';
import { AuthResponse, ChangePasswordRequest } from '../../../../lib/types/auth';
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

    const body: ChangePasswordRequest = await request.json();
    const { currentPassword, newPassword, passwordConfirmation } = body;

    // Validation
    const errors: string[] = [];

    // Password confirmation
    if (newPassword !== passwordConfirmation) {
      errors.push('New passwords do not match');
    }

    // New password validation
    const passwordValidation = AuthUtils.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      errors.push(...passwordValidation.errors);
    }

    if (errors.length > 0) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors,
      }, { status: 400 });
    }

    // Get user data
    const userResults = await db.select().from(users)
      .where(eq(users.id, decoded.id))
      .limit(1);
    
    if (userResults.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'User not found',
        errors: ['User not found'],
      }, { status: 404 });
    }

    const user = userResults[0];

    // Verify current password
    const isCurrentPasswordValid = await AuthUtils.verifyPassword(currentPassword, user.passwordHash);
    
    if (!isCurrentPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Current password is incorrect',
        errors: ['Current password is incorrect'],
      }, { status: 401 });
    }

    // Check if new password is different from current password
    const isNewPasswordDifferent = await AuthUtils.verifyPassword(newPassword, user.passwordHash);
    
    if (isNewPasswordDifferent) {
      return NextResponse.json({
        success: false,
        message: 'New password must be different from current password',
        errors: ['New password must be different from current password'],
      }, { status: 400 });
    }

    // Hash new password
    const newPasswordHash = await AuthUtils.hashPassword(newPassword);

    // Update password in database
    await db.update(users)
      .set({ 
        passwordHash: newPasswordHash,
        updatedAt: new Date()
      })
      .where(eq(users.id, user.id));

    // Invalidate all existing sessions for this user
    await db.delete(sessions).where(eq(sessions.userId, user.id));

    // Return success response
    const response: AuthResponse = {
      success: true,
      message: 'Password changed successfully. Please login again with your new password.',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Password change error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      errors: ['An unexpected error occurred during password change'],
    }, { status: 500 });
  }
}
