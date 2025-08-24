# Authentication System Documentation

## Overview

This document describes the authentication system implemented for the Vibe Job Portal, which follows the specifications outlined in `feature-auth.md`.

## Architecture

### Components

1. **AuthProvider** (`app/providers/auth-provider.tsx`)
   - React Context provider that manages global authentication state
   - Handles login, logout, registration, and session validation
   - Provides authentication methods to child components

2. **API Routes** (`app/api/auth/`)
   - RESTful endpoints for authentication operations
   - JWT-based authentication with session management
   - Secure password handling with bcrypt

3. **Types** (`lib/types/auth.ts`)
   - TypeScript interfaces for authentication data
   - Ensures type safety across the application

4. **Utilities** (`lib/auth-utils.ts`)
   - Helper functions for JWT handling, password hashing, and validation
   - Cryptographically secure session token generation

5. **Client API** (`lib/api/auth.ts`)
   - Frontend functions for calling authentication endpoints
   - Handles token storage and retrieval

## Setup

### 1. Environment Variables

Add the following to your `.env.local` file:

```bash
JWT_SECRET=your-super-secret-jwt-key-here
```

**Important**: Use a strong, unique secret key in production.

### 2. Database Migration

Run the database migration to create the sessions table:

```bash
npm run db:migrate
```

### 3. Provider Setup

Wrap your app with the AuthProvider in your root layout:

```tsx
import { AuthProvider } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Usage

### Using the Auth Context

```tsx
import { useAuth } from '@/lib/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Authentication Methods

#### Login

```tsx
const { login } = useAuth();

const handleLogin = async () => {
  const success = await login({
    email: 'user@example.com',
    password: 'password123'
  }, true); // true for "remember me"
  
  if (success) {
    // Redirect or show success message
  }
};
```

#### Registration

```tsx
const { register } = useAuth();

const handleRegister = async () => {
  const success = await register({
    email: 'newuser@example.com',
    password: 'Password123',
    passwordConfirmation: 'Password123',
    name: 'John Doe',
    role: 'jobseeker'
  });
  
  if (success) {
    // Redirect or show success message
  }
};
```

#### Logout

```tsx
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  // User will be redirected to login page
};
```

#### Change Password

```tsx
const { changePassword } = useAuth();

const handleChangePassword = async () => {
  const success = await changePassword({
    currentPassword: 'oldPassword123',
    newPassword: 'newPassword123',
    passwordConfirmation: 'newPassword123'
  });
  
  if (success) {
    // User will be logged out and need to login again
  }
};
```

## API Endpoints

### Public Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/request-reset` - Request password reset

### Protected Endpoints

- `POST /api/auth/logout` - User logout
- `GET /api/auth/validate` - Validate session
- `POST /api/auth/change-password` - Change password
- `POST /api/auth/reset-password` - Complete password reset

### Request Headers

Protected endpoints require the JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## Security Features

### Password Security
- Passwords are hashed using bcrypt with 12 salt rounds
- Minimum 8 characters with uppercase, lowercase, and number requirements
- Password confirmation validation

### Session Security
- Cryptographically secure session tokens (32+ characters)
- 24-hour session expiration with automatic extension
- Session invalidation on password change
- IP address and user agent tracking

### JWT Security
- JWT tokens contain session tokens for additional security
- 24-hour expiration matching session expiration
- Secure token generation and validation

## Error Handling

The authentication system provides comprehensive error handling:

- **Validation Errors**: Form validation with specific error messages
- **Authentication Errors**: Clear messages for login/registration failures
- **Session Errors**: Proper handling of expired or invalid sessions
- **Server Errors**: Graceful fallback for unexpected errors

## State Management

The AuthProvider manages the following state:

- `user`: Current user information
- `isAuthenticated`: Authentication status
- `isLoading`: Loading state for async operations
- `error`: Current error message

## Token Storage

- **localStorage**: Used when "remember me" is selected
- **sessionStorage**: Used for temporary sessions
- Automatic cleanup on logout or session expiration

## Middleware

The system includes middleware that:
- Protects API routes requiring authentication
- Validates JWT tokens before allowing access
- Adds user information to request headers

## Future Enhancements

1. **Password Reset**: Implement email-based password reset functionality
2. **Account Lockout**: Add rate limiting for failed login attempts
3. **Multi-factor Authentication**: Support for 2FA
4. **Social Login**: Integration with OAuth providers
5. **Session Management**: User dashboard for managing active sessions

## Testing

To test the authentication system:

1. Start the development server: `npm run dev`
2. Navigate to `/api/auth/register` to test registration
3. Use the returned JWT token to test protected endpoints
4. Test session validation and expiration

## Troubleshooting

### Common Issues

1. **JWT_SECRET not set**: Ensure the environment variable is properly configured
2. **Database connection**: Verify database is running and accessible
3. **CORS issues**: Check if the API routes are accessible from your frontend
4. **Token expiration**: Tokens expire after 24 hours, implement refresh logic if needed

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
DEBUG=auth:*
```

## Support

For issues or questions about the authentication system, please refer to:
- The authentication specification in `feature-auth.md`
- The API documentation above
- The source code in the `app/providers/` and `app/api/auth/` directories
