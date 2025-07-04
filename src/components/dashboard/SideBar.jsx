import { useDashboard } from '../../context/DashboardContext';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import UserProfile from './UserProfile';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    activeModule, 
    setActiveModule, 
    menuItems,
    showUserMenu,
    setShowUserMenu
  } = useDashboard();

  const { user } = useAuth();
  const handleProfileSettings = () => {
    console.log('Opening profile settings...');
  };

  const handleLogout = () => {
    console.log('Logging out...');
  };

  return (
    <div className={`${
      sidebarCollapsed ? 'w-20' : 'w-72'
    } bg-white shadow-xl transition-all duration-300 flex flex-col relative z-30 border-r border-gray-200`}>
      
      <SidebarHeader 
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <SidebarNavigation 
        menuItems={menuItems}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarCollapsed={sidebarCollapsed}
      />
        <UserProfile 
        userName={user?.username || 'Guest'}
        onLogout={handleLogout}
      />
      
    </div>
  );
};

export default Sidebar;