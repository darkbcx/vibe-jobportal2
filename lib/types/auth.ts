export interface User {
  id: string;
  email: string;
  name: string;
  role: 'jobseeker' | 'company' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  sessionToken: string;
  userId: string;
  email: string;
  createdAt: Date;
  expiredAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface JWTPayload {
  id: string;
  email: string;
  sessionToken: string;
  iat: number;
  exp: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    jwt: string;
    user: Omit<User, 'passwordHash'>;
  };
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  role: 'jobseeker' | 'company';
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  resetToken: string;
  newPassword: string;
  passwordConfirmation: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
