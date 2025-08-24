import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWTPayload, User } from './types/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SESSION_EXPIRY_HOURS = 24;

export class AuthUtils {
  /**
   * Hash password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Verify password against hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT token
   */
  static generateJWT(user: User, sessionToken: string): string {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      sessionToken,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (SESSION_EXPIRY_HOURS * 60 * 60),
    };

    return jwt.sign(payload, JWT_SECRET);
  }

  /**
   * Verify and decode JWT token
   */
  static verifyJWT(token: string): JWTPayload | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * Calculate session expiration time
   */
  static getSessionExpiry(): Date {
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + SESSION_EXPIRY_HOURS);
    return expiry;
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate password requirements
   */
  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
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

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generate cryptographically secure session token
   */
  static generateSessionToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Extract IP address from request
   */
  static getClientIP(req: any): string | undefined {
    return req.headers['x-forwarded-for'] || 
           req.headers['x-real-ip'] || 
           req.connection?.remoteAddress || 
           req.socket?.remoteAddress;
  }

  /**
   * Get user agent from request
   */
  static getUserAgent(req: any): string | undefined {
    return req.headers['user-agent'];
  }
}
