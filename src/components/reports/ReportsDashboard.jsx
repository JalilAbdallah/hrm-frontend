import React, { useState } from 'react';
import AdminReports from './AdminReports';

// Mock user for now - replace with actual auth
const mockUser = {
  id: "user123",
  type: "admin", // "admin" or "institution"
  name: "John Doe",
  email: "john@example.com"
};

const ReportsDashboard = () => {
  const [user] = useState(mockUser);

  // Decide which module to render based on user type
  const renderModule = () => {
    if (user.type === "admin") {
      return <AdminReports />;
    } else if (user.type === "institution") {
      return <></>;
    } else {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
            <p className="text-gray-600 mt-2">Invalid user type</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderModule()}
      </div>
    </div>
  );
};

export default ReportsDashboard;
