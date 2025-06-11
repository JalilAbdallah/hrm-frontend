import { User, ChevronDown, Settings, LogOut } from 'lucide-react';
import DropdownMenu, { DropdownItem } from '../common/DropdownMenu';
import { useAuth } from '../../context/AuthContext';
import { useDashboard } from '../../context/DashboardContext';

const UserProfile = ({ 
  userName = "Admin User",
}) => {
  const { logout } = useAuth();
  const { showUserMenu, setShowUserMenu, sidebarCollapsed } = useDashboard();

  const handleProfileSettings = () => {
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout(); // Call the logout function from AuthContext
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="text-white" size={18} />
          </div>
          {!sidebarCollapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </>
          )}
        </button>
        
        <DropdownMenu 
          isOpen={showUserMenu && !sidebarCollapsed} 
          onClose={() => setShowUserMenu(false)}
        >
       
          <hr className="my-1" />
          <DropdownItem onClick={handleLogout} variant="danger">
            <LogOut size={16} />
            <span className="text-sm">Logout</span>
          </DropdownItem>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UserProfile;