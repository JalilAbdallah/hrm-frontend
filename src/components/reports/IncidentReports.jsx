import React from 'react';
import ModulePlaceholder from '../common/ModulePlaceHolder';

const IncidentReports = () => (
  <ModulePlaceholder 
    title="Incident Reporting System" 
    developer="Student 2"
    description="Secure incident reporting with anonymous options, media uploads, and geolocation features."
    features={[
      "Secure incident report forms",
      "Anonymous reporting capabilities",
      "Media upload (photos, videos, documents)",
      "Geolocation tagging with maps",
      "Report status management"
    ]}
    endpoints={[
      "POST /reports/ - Submit new incident report",
      "GET /reports/ - List reports with filters",
      "PATCH /reports/{report_id} - Update report status",
      "GET /reports/analytics - Report analytics"
    ]}
  />
);

export default IncidentReports;