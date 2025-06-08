// src/components/auth/AuthHeader.jsx
import React from 'react';
import { Shield } from 'lucide-react';

const AuthHeader = ({ 
  title, 
  subtitle, 
  showLogo = true,
  logoText = "HRM" 
}) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      {subtitle && (
        <p className="text-gray-600 text-lg">{subtitle}</p>
      )}
    </div>
  );
};

export default AuthHeader;