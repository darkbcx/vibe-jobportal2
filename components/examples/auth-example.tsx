'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/hooks/use-auth';
import { LoginRequest, RegisterRequest } from '../../lib/types/auth';

export const AuthExample: React.FC = () => {
  const { user, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    name: '',
    role: 'jobseeker' as 'jobseeker' | 'company',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isLoginMode) {
      const loginData: LoginRequest = {
        email: formData.email,
        password: formData.password,
      };
      
      const success = await login(loginData, formData.rememberMe);
      if (success) {
        // Reset form
        setFormData({
          email: '',
          password: '',
          passwordConfirmation: '',
          name: '',
          role: 'jobseeker',
          rememberMe: false,
        });
      }
    } else {
      const registerData: RegisterRequest = {
        email: formData.email,
        password: formData.password,
        passwordConfirmation: formData.passwordConfirmation,
        name: formData.name,
        role: formData.role,
      };
      
      const success = await register(registerData, formData.rememberMe);
      if (success) {
        // Reset form
        setFormData({
          email: '',
          password: '',
          passwordConfirmation: '',
          name: '',
          role: 'jobseeker',
          rememberMe: false,
        });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
        <div className="mb-4">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex mb-6">
        <button
          onClick={() => setIsLoginMode(true)}
          className={`flex-1 py-2 px-4 border-b-2 transition-colors ${
            isLoginMode 
              ? 'border-blue-500 text-blue-500' 
              : 'border-gray-200 text-gray-500 hover:text-gray-700'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLoginMode(false)}
          className={`flex-1 py-2 px-4 border-b-2 transition-colors ${
            !isLoginMode 
              ? 'border-blue-500 text-blue-500' 
              : 'border-gray-200 text-gray-500 hover:text-gray-700'
          }`}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginMode && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {!isLoginMode && (
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="company">Company</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {!isLoginMode && (
          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          {isLoginMode ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLoginMode(!isLoginMode)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          {isLoginMode 
            ? "Don't have an account? Register here" 
            : "Already have an account? Login here"
          }
        </button>
      </div>
    </div>
  );
};
