'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthAPI } from '../../lib/api/auth';
import { AuthState, User, LoginRequest, RegisterRequest, ChangePasswordRequest } from '../../lib/types/auth';

interface AuthContextType extends AuthState {
  login: (data: LoginRequest, rememberMe?: boolean) => Promise<boolean>;
  register: (data: RegisterRequest, rememberMe?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  changePassword: (data: ChangePasswordRequest) => Promise<boolean>;
  validateSession: () => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedUser = AuthAPI.getStoredUser();
      const storedToken = AuthAPI.getStoredToken();

      if (storedUser && storedToken) {
        // Validate session with backend
        const isValid = await validateSession();
        if (!isValid) {
          // Clear invalid stored data
          AuthAPI.clearStoredToken();
          AuthAPI.clearStoredUser();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const validateSession = async (): Promise<boolean> => {
    try {
      const response = await AuthAPI.validateSession();
      
      if (response.success && response.data) {
        const { user, jwt } = response.data;
        
        // Update stored data
        AuthAPI.storeToken(jwt);
        AuthAPI.storeUser(user);
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        // Clear invalid data
        AuthAPI.clearStoredToken();
        AuthAPI.clearStoredUser();
        
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: response.message,
        });
        
        return false;
      }
    } catch (error) {
      console.error('Session validation error:', error);
      setState(prev => ({ ...prev, error: 'Failed to validate session' }));
      return false;
    }
  };

  const login = async (data: LoginRequest, rememberMe: boolean = false): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await AuthAPI.login(data);
      
      if (response.success && response.data) {
        const { user, jwt } = response.data;
        
        // Store authentication data
        AuthAPI.storeToken(jwt, rememberMe);
        AuthAPI.storeUser(user, rememberMe);
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Login failed',
        }));
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred during login',
      }));
      return false;
    }
  };

  const register = async (data: RegisterRequest, rememberMe: boolean = false): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await AuthAPI.register(data);
      
      if (response.success && response.data) {
        const { user, jwt } = response.data;
        
        // Store authentication data
        AuthAPI.storeToken(jwt, rememberMe);
        AuthAPI.storeUser(user, rememberMe);
        
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Registration failed',
        }));
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred during registration',
      }));
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      // Call logout API
      await AuthAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear stored data regardless of API response
      AuthAPI.clearStoredToken();
      AuthAPI.clearStoredUser();
      
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  const changePassword = async (data: ChangePasswordRequest): Promise<boolean> => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await AuthAPI.changePassword(data);
      
      if (response.success) {
        // Password change successful, user needs to login again
        await logout();
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Password change failed',
        }));
        return false;
      }
    } catch (error) {
      console.error('Password change error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An unexpected error occurred during password change',
      }));
      return false;
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    changePassword,
    validateSession,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
