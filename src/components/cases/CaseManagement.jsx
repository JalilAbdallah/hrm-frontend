import ModulePlaceholder from '../common/ModulePlaceHolder';

const CaseManagement = () => (
  <ModulePlaceholder
    title="Case Management System" 
    developer="Student 1"
    description="CRUD operations for human rights cases, search/filter functionality, case status tracking, and file attachments."
    features={[
      "Create, read, update, delete cases",
      "Advanced search and filtering",
      "Case status tracking workflow",
      "Document and media attachments",
      "Case assignment and notifications"
    ]}
    endpoints={[
      "POST /cases/ - Create new case",
      "GET /cases/{case_id} - Get specific case",
      "GET /cases/ - List all cases with filters",
      "PATCH /cases/{case_id} - Update case status",
      "DELETE /cases/{case_id} - Archive case"
    ]}
  />
);

export default CaseManagement;