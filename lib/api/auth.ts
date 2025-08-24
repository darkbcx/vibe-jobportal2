import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  ChangePasswordRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  User 
} from '../types/auth';

const API_BASE = '/api/auth';

export class AuthAPI {
  /**
   * User registration
   */
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * User login
   */
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * User logout
   */
  static async logout(): Promise<AuthResponse> {
    const token = this.getStoredToken();
    
    const response = await fetch(`${API_BASE}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.json();
  }

  /**
   * Validate session
   */
  static async validateSession(): Promise<AuthResponse> {
    const token = this.getStoredToken();
    
    if (!token) {
      return {
        success: false,
        message: 'No authentication token found',
        errors: ['No token provided'],
      };
    }

    const response = await fetch(`${API_BASE}/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.json();
  }

  /**
   * Change password
   */
  static async changePassword(data: ChangePasswordRequest): Promise<AuthResponse> {
    const token = this.getStoredToken();
    
    const response = await fetch(`${API_BASE}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(data: PasswordResetRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/request-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * Complete password reset
   */
  static async resetPassword(data: PasswordResetConfirmRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  /**
   * Get stored JWT token
   */
  static getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  /**
   * Store JWT token
   */
  static storeToken(token: string, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;
    
    if (rememberMe) {
      localStorage.setItem('auth_token', token);
    } else {
      sessionStorage.setItem('auth_token', token);
    }
  }

  /**
   * Clear stored JWT token
   */
  static clearStoredToken(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  /**
   * Get stored user data
   */
  static getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userData = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Store user data
   */
  static storeUser(user: User, rememberMe: boolean = false): void {
    if (typeof window === 'undefined') return;
    
    if (rememberMe) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      sessionStorage.setItem('auth_user', JSON.stringify(user));
    }
  }

  /**
   * Clear stored user data
   */
  static clearStoredUser(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_user');
  }
}
