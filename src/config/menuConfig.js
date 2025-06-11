// config/menuConfig.js
import { AlertTriangle, BarChart3, FileText, Home, Settings, Shield, Users } from 'lucide-react';

export const menuItems = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    role: 'admin',
    component: 'OverviewModule',
    description: 'Dashboard overview and quick stats'
  },
  {
    id: 'cases',
    label: 'Case Management',
    icon: FileText,
    role: 'admin',
    component: 'CaseManagement',
    description: 'Manage and track cases'
  },
  {
    id: 'reports',
    label: 'Incident Reports',
    icon: AlertTriangle,
    role: 'all',
    component: 'IncidentReports',
    description: 'View and create incident reports'
  },
  {
    id: 'victims',
    label: 'Victim Database',
    icon: Users,
    role: 'admin',
    component: 'VictimDatabase',
    description: 'Manage victim information (Admin only)'
  }, 
];

export const userRoles = {
  ADMIN: 'admin',
  INSTITUTION: 'institution',
};

export const defaultSettings = {
  theme: 'light',
  language: 'en',
  notifications: true,
  autoSave: true
};