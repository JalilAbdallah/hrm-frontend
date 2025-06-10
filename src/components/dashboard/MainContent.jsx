import { Bell } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import Overview from '../overview/Overview';
import CaseManagement from '../cases/CaseManagement';
import Analytics from '../analytics/Analytics';
import Settings from '../settings/Settings';
import ReportsModule from '../reports/ReportsModule';
import VictimListPage from "../victims/VictimListPage.jsx";

const MainContent = () => {
  const { activeModule, menuItems } = useDashboard();

  const activeItem = menuItems.find(item => item.id === activeModule);

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return <Overview />;
      case 'cases':
        return <CaseManagement />;
      case 'reports':
        return <ReportsModule />;
      case 'victims':
        return <VictimListPage />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">

        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeItem?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                3
              </span>
              </button>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Today</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderModuleContent()}
          </div>
        </main>
      </div>
  );
};

export default MainContent;