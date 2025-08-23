# Authentication Features Specification

## User Management

### User Data Structure
- User data is stored in the `user` table
- User fields include: `id`, `email`, `password_hash`, `role`, `created_at`, `updated_at`
- User roles include: `jobseeker`, `company`, and `admin`
- Email addresses must be unique and validated for proper format
- Passwords are hashed using bcrypt (not MD5 for security reasons) and stored in `password_hash` field
- User authentication is performed using email address

### User Registration
- New users can register via registration page
- Registration requires: email, password, password confirmation
- Email validation ensures proper format and uniqueness
- Password requirements: minimum 8 characters, at least one uppercase, one lowercase, one number
- Password confirmation must match the original password
- Upon successful registration, user is automatically logged in

## Authentication Flow

### JWT Workflow
- Backend creates session token and stores it in `session` table
- Backend generates JWT containing: `id`, `email`, and `session_token`
- JWT is sent to client in API response
- Client stores JWT in localStorage/sessionStorage
- For subsequent requests, client sends JWT in Authorization header
- Backend decodes JWT to extract session token for validation
- Session token is used to verify session in database

### Login Process
- Users access the system via login page
- Login form requires email and password
- Form submission sends credentials to backend via secure API endpoint
- Backend validation process:
  1. Check if email exists in `user` table
  2. If email exists, verify password using bcrypt comparison
  3. If credentials match, create new session and return JWT response
  4. If credentials don't match, return authentication error
- JWT response contains: `id`, `email`, and `session_token`
- Client stores JWT in secure storage (localStorage/sessionStorage)
- Failed login attempts are logged for security monitoring

### Session Management

#### Session Data Structure
- Sessions are stored in the `session` table
- Session fields: `session_token`, `user_id`, `email`, `created_at`, `expired_at`, `ip_address`, `user_agent`
- Session tokens are cryptographically secure random strings (32+ characters)
- Session expiration: 1440 minutes (24 hours) from creation
- `expired_at` is stored as ISO 8601 datetime format

#### Session Creation
- New session is created upon successful login
- Before creating new session, check for existing sessions for the same user
- If existing session found, invalidate it and create fresh session
- Session token is generated using cryptographically secure random generator
- Session record includes IP address and user agent for security tracking

#### Session Validation
- Client can validate session via dedicated API endpoint using JWT
- Client extracts session token from JWT and sends it to validation endpoint
- Validation process:
  1. Client decodes JWT to retrieve session token
  2. Check if session token exists in `session` table
  3. If session not found, return authentication error
  4. If session found, verify expiration by comparing `expired_at` with current time
  5. If session expired, return authentication error
  6. If session valid, extend expiration by 24 hours and return updated JWT
- Client-side session handling:
  - On validation error: clear JWT from storage and redirect to login
  - On validation success: update JWT in storage with new token

## Security Features

### Password Security
- Passwords are hashed using bcrypt with salt rounds of 12
- Password change requires current password verification
- Password reset functionality available via email verification
- Account lockout after 5 failed login attempts (15-minute lockout period)

### Session Security
- Session tokens are cryptographically secure and stored in database
- JWT contains session token, user ID, and email for client-side access
- Sessions are invalidated on password change
- Sessions can be invalidated from multiple devices
- Session activity is logged for security monitoring
- JWT expiration is set to 24 hours to match session expiration

## User Actions

### Logout Process
- Users can logout via API endpoint using JWT
- Backend process:
  1. Client sends JWT in request header
  2. Backend decodes JWT to extract session token
  3. Validate session token exists in database
  4. Delete session record from `session` table
  5. Return success response

## Technical Implementation

### Component Architecture
- **Server Components**: Use `page.tsx` as server component wrapper for metadata and initial data
- **Client Components**: Use `page-client.tsx` for interactive authentication forms
- **Component Organization**: Place auth components in `components/pages/auth/`
- **Shared Components**: Use components from `components/shared/` for cross-page functionality

### State Management
- **Tanstack Query**: For managing authentication state and API calls
- **Context Provider**: For global authentication state across the application
- **Local Storage**: For persisting JWT tokens securely

### API Layer
- **Client-side API functions**: Create functions in `lib/api/auth.ts` for authentication calls
- **Frontend calls**: Frontend must call these functions, not API endpoints directly
- **Error handling**: Proper error handling with user-friendly messages

### Type Safety
- **Shared Types**: Use types from `@types/user` and `@types/auth` for consistency
- **Type Extensions**: Extend, pick, omit, or make partial from existing types rather than creating new ones
- **Interface consistency**: Maintain consistent prop interfaces across all auth components

### Styling & UX
- **Tailwind CSS**: Use Tailwind classes for consistent styling
- **shadcn/ui**: Use shadcn/ui components for form elements and UI consistency
- **Framer Motion**: For smooth authentication flow transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with proper breakpoints
- Client-side process:
  1. Clear JWT from storage (localStorage/sessionStorage)
  2. Clear user state from application
  3. Redirect to login page

### Password Management

#### Password Change
- Users can change password while logged in using JWT
- Process requires: current password, new password, password confirmation
- Backend validation:
  1. Client sends JWT in request header
  2. Backend decodes JWT to extract session token and user info
  3. Verify current password matches stored hash
  4. Validate new password meets requirements
  5. Ensure new password differs from current password
  6. Update password hash in database
- Security measures:
  - Invalidate all existing sessions for the user
  - Force user to login again with new credentials
  - Log password change event for security audit

#### Password Reset
- Users can request password reset via email
- Process flow:
  1. User requests reset via email address
  2. System generates secure reset token with expiration (1 hour)
  3. Reset link sent to user's email
  4. User clicks link and enters new password
  5. System validates reset token and updates password
  6. All existing sessions are invalidated

## Error Handling

### Authentication Errors
- Invalid credentials: "Invalid email or password"
- Account locked: "Account temporarily locked due to failed attempts"
- Session expired: "Session expired, please login again"
- Invalid session: "Invalid session, please login again"
- Invalid JWT: "Invalid authentication token"
- JWT expired: "Authentication token expired"

### Validation Errors
- Email format: "Please enter a valid email address"
- Password requirements: "Password must be at least 8 characters with uppercase, lowercase, and number"
- Password confirmation: "Passwords do not match"

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration (returns JWT)
- `POST /api/auth/login` - User login (returns JWT)
- `POST /api/auth/logout` - User logout (requires JWT in header)
- `GET /api/auth/validate` - Session validation (requires JWT in header)
- `POST /api/auth/change-password` - Password change (requires JWT in header)
- `POST /api/auth/request-reset` - Request password reset
- `POST /api/auth/reset-password` - Complete password reset

### Request Headers
Protected endpoints require JWT in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### JWT Structure
JWT payload contains user authentication data:
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "session_token": "cryptographically_secure_session_token",
  "iat": "issued_at_timestamp",
  "exp": "expiration_timestamp"
}
```

### Response Format
All authentication endpoints return consistent JSON responses:
```json
{
  "success": boolean,
  "message": "string",
  "data": {
    "jwt": "encoded_jwt_token",
    "user": {
      "id": "user_id",
      "email": "user@example.com"
    }
  },
  "errors": array
}
```