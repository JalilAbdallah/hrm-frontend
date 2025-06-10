import { useAuth } from '../../context/AuthContext';
import InstitutionReports from './institution_reports/InstitutionReports';
import AdminReportModule from './admin_reports/AdminReportModule';

const ReportsModule = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;
  if (user.role === 'admin') return <AdminReportModule />;
  if (user.role === 'institution') return <InstitutionReports />;

  return <div>Unauthorized</div>;
};

export default ReportsModule;
