// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './AuthHeader';
import InputField from '../common/InputField';
import PasswordField from '../common/PasswordField';
import CheckboxField from '../common/CheckboxField';
import Button from '../common/Button';
import {useAuth} from '../../context/AuthContext'; // Assuming you have an auth API module

const LoginForm = ({ onSwitchToRegister }) => {
  
  const { isLoading, login } = useAuth(); // Custom hook to access auth context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData);
      console.log('Login successful:', response);
      if (response.success) {
        // Redirect to dashboard on successful login
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleInputChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AuthHeader 
        title="Welcome Back"
        subtitle="Sign in to access your dashboard"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          type="email"
          id="email"
          label="Email Address"
          value={formData.email}
          onChange={handleInputChange('email')}
          placeholder="Enter your email address"
          required
        />

        <PasswordField
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleInputChange('password')}
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center justify-between pt-2">
          <CheckboxField
            id="rememberMe"
            label="Remember me"
            checked={formData.rememberMe}
            onChange={handleInputChange('rememberMe')}
          />
          
          <Button 
            variant="secondary"
            size="small"
          >
            Forgot password?
          </Button>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="medium"
            className="w-full"
            isLoading={isLoading} // Show loading state
          >
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 text-base">
          Don't have an account?
          <Button
            variant="secondary"
            size="small"
            onClick={onSwitchToRegister}
            className="ml-2"
          >
            Sign up
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;