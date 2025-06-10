import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminReports from './AdminReports';
import InstitutionReports from './InstitutionReports';

const ReportsModule = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;
  if (user.role === 'admin') return <AdminReports />;
  if (user.role === 'institution') return <InstitutionReports />;

  return <div>Unauthorized</div>;
};

export default ReportsModule;
