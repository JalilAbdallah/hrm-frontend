// src/components/auth/AuthLayout.jsx
import React from 'react';
import AuthBranding from './AuthBranding';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex bg-gray-50">
      {/* Branding Side */}
      <AuthBranding />
      
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;