// src/components/auth/SecurityNotice.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SecurityNotice = () => {
  return (
    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800">
            <strong>Security Notice:</strong> This platform handles sensitive human rights data. 
            Please ensure you're using a secure connection and trusted device.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityNotice;