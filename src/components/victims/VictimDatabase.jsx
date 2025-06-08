import React from 'react';
import ModulePlaceholder from '../common/ModulePlaceHolder';

const VictimDatabase = () => (
  <ModulePlaceholder 
    title="Victim/Witness Database" 
    developer="Student 3"
    description="Secure database for victims and witnesses with role-based access and risk assessment tracking."
    features={[
      "Secure victim/witness profiles",
      "Role-based access control",
      "Risk assessment tracking",
      "Anonymity and pseudonym support",
      "Case linkage and relationship mapping"
    ]}
    endpoints={[
      "POST /victims/ - Add new victim/witness",
      "GET /victims/{victim_id} - Get victim details (restricted)",
      "PATCH /victims/{victim_id} - Update risk level",
      "GET /victims/case/{case_id} - List case victims"
    ]}
  />
);

export default VictimDatabase;