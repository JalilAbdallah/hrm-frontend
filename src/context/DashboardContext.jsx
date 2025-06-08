// contexts/DashboardContext.js
import React, { createContext, useContext, useState } from 'react';
import { menuItems } from '../config/menuConfig';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState('overview');
  const [userRole, setUserRole] = useState('admin');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item =>
    item.role === 'all' || item.role === userRole || userRole === 'admin'
  );

  // Helper functions
  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);
  const toggleUserMenu = () => setShowUserMenu(prev => !prev);
  const closeUserMenu = () => setShowUserMenu(false);

  const contextValue = {
    // State
    activeModule,
    userRole,
    sidebarCollapsed,
    showUserMenu,
    
    // Data
    menuItems: filteredMenuItems,
    
    // Actions
    setActiveModule,
    setUserRole,
    setSidebarCollapsed,
    setShowUserMenu,
    toggleSidebar,
    toggleUserMenu,
    closeUserMenu
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};