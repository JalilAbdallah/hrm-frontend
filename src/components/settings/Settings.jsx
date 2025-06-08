import ModulePlaceholder from '../common/ModulePlaceHolder';

const Settings = () => (
  <ModulePlaceholder 
    title="System Settings" 
    developer="Team Collaborative"
    description="System configuration, user management, and administrative settings."
    features={[
      "User role management",
      "System configuration",
      "Security settings",
      "Data export/import tools",
      "Audit logs and system monitoring"
    ]}
  />
);

export default Settings;