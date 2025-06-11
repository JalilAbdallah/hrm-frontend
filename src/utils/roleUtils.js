// utils/roleUtils.js
import { ROLES } from '../config/constants';

/**
 * Check if a user has permission to access a specific role-based feature
 * @param {string} userRole - The current user's role
 * @param {string} requiredRole - The required role for the feature
 * @returns {boolean} - Whether the user has access
 */
export const hasRoleAccess = (userRole, requiredRole) => {
  // If feature is available to all, grant access
  if (requiredRole === 'all') return true;
  
  // If user is admin, grant access to everything
  if (userRole === ROLES.ADMIN) return true;
  
  // Check if user role matches required role
  return userRole === requiredRole;
};

/**
 * Filter menu items based on user role
 * @param {Array} menuItems - Array of menu items
 * @param {string} userRole - The current user's role
 * @returns {Array} - Filtered menu items
 */
export const filterMenuByRole = (menuItems, userRole) => {
  return menuItems.filter(item => hasRoleAccess(userRole, item.role));
};

/**
 * Check if user is admin
 * @param {string} userRole - The current user's role
 * @returns {boolean} - Whether user is admin
 */
export const isAdmin = (userRole) => {
  return userRole === ROLES.ADMIN;
};

/**
 * Check if user is institution
 * @param {string} userRole - The current user's role
 * @returns {boolean} - Whether user is institution
 */
export const isInstitution = (userRole) => {
  return userRole === ROLES.INSTITUTION;
};

/**
 * Get role display name
 * @param {string} role - The role key
 * @returns {string} - Human readable role name
 */
export const getRoleDisplayName = (role) => {
  const roleNames = {
    [ROLES.ADMIN]: 'Administrator',
    [ROLES.INSTITUTION]: 'Institution User',
    'all': 'All Users'
  };
  return roleNames[role] || 'Unknown Role';
};

/**
 * Component wrapper for role-based rendering
 * @param {Object} props - Component props
 * @param {string} props.userRole - Current user's role
 * @param {string|Array} props.allowedRoles - Role(s) that can see this content
 * @param {React.Component} props.children - Content to conditionally render
 * @param {React.Component} props.fallback - Fallback content if access denied
 * @returns {React.Component} - Conditionally rendered content
 */
export const RoleBasedAccess = ({ userRole, allowedRoles, children, fallback = null }) => {
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  const hasAccess = roles.some(role => hasRoleAccess(userRole, role));
  
  return hasAccess ? children : fallback;
};

export default {
  hasRoleAccess,
  filterMenuByRole,
  isAdmin,
  isInstitution,
  getRoleDisplayName,
  RoleBasedAccess
};