import { Shield, Menu, X } from 'lucide-react';

const SidebarHeader = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">HRM System</h1>
              <p className="text-xs text-gray-500">Human Rights Monitor</p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg mx-auto">
            <Shield className="text-white" size={24} />
          </div>
        )}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;