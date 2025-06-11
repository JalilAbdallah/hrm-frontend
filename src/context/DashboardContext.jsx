// contexts/DashboardContext.js
import React, { createContext, useContext, useState } from 'react';
import { menuItems } from '../config/menuConfig';
import { useAuth } from './AuthContext';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
    const { user } = useAuth();
  const userRole = user?.role || 'institution'; // Default to 'institution' if no role
  const [activeModule, setActiveModule] = useState(user?.role== 'admin' ? 'overview' : 'reports'); // Default to 'overview' for admin, 'report' for others
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Get user role from AuthContext


  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    // Show items that are for 'all' roles
    if (item.role === 'all') return true;
    
    // Show items that match the user's role
    if (item.role === userRole) return true;
    
    // If user is admin, show all items (admin has access to everything)
    if (userRole === 'admin') return true;
    
    // Otherwise, hide the item
    return false;
  });

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