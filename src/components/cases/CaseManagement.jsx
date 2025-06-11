import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { fetchCasesWithPagination, fetchArchivedCases, deleteCase, restoreCase } from '../../api/casesAPI';
import CaseHeader from './CaseHeader';
import CaseFilters from './CaseFilters';
import CaseGrid from './CaseGrid';
import CaseModal from './CaseModal';
import AddCaseModal from './AddCaseModal';


const CaseManagement = () => {
  const { userRole } = useDashboard();
  
  // State management
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);  const [selectedCase, setSelectedCase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showArchived, setShowArchived] = useState(false); // Toggle between active and archived cases
  const [filters, setFilters] = useState({
    violationType: "",
    country: "",
    region: "",
    status: "",
    priority: "",
    dateFrom: "",
    dateTo: "",
    search: "" // Search by title
  });

  // Fetch cases from backend
  const fetchCases = async () => {
    setLoading(true);
    try {
      const apiFilters = {};
      
      // Map filters to API parameters
      if (filters.search) apiFilters.search = filters.search;
      if (filters.violationType) apiFilters.violation_types = filters.violationType;
      if (filters.country) apiFilters.country = filters.country;
      if (filters.region) apiFilters.region = filters.region;
      if (filters.status) apiFilters.status = filters.status;
      if (filters.priority) apiFilters.priority = filters.priority;
      if (filters.dateFrom) apiFilters.date_from = filters.dateFrom;
      if (filters.dateTo) apiFilters.date_to = filters.dateTo;      
      let response;
      if (showArchived) {
        // Fetch archived cases
        response = await fetchArchivedCases(undefined, undefined, apiFilters); // Pass undefined for skip and limit
        console.log('API Response (Archived):', response); 
        // Map the archived cases data to match the expected format
        const mappedCases = (response.data || []).map(caseItem => ({
          _id: caseItem._id,
          case_id: caseItem.case_id, // Add case_id for CaseCard component
          title: caseItem.title,
          description: caseItem.description,
          violation_types: Array.isArray(caseItem.violation_types) ? caseItem.violation_types : [caseItem.violation_types],
          priority: caseItem.priority,
          status: 'archived',
          location: caseItem.location || {},
          victims: Array.isArray(caseItem.victims) ? caseItem.victims : (caseItem.victims ? [caseItem.victims] : []),
          perpetrators: (caseItem.perpetrators || []).map(perp => ({
            ...perp,
            entity_type: perp.type // Map type to entity_type if needed
          })),
          created_at: caseItem.created_at,
          updated_at: caseItem.updated_at,
          created_by: caseItem.created_by
        }));
        setCases(mappedCases);
      } else {
        // Fetch active cases
        response = await fetchCasesWithPagination(undefined, undefined, apiFilters); // Pass undefined for skip and limit
        console.log('API Response (Active):', response); 
        // Map the active cases data to match the expected format
        const mappedCases = (response.data || []).map(caseItem => ({
          _id: caseItem._id,
          case_id: caseItem.case_id, // Add case_id for CaseCard component
          title: caseItem.title,
          description: caseItem.description,
          violation_types: Array.isArray(caseItem.violation_types) ? caseItem.violation_types : [caseItem.violation_types],
          priority: caseItem.priority,
          status: caseItem.status || 'active',
          location: caseItem.location || {},
          victims: Array.isArray(caseItem.victims) ? caseItem.victims : (caseItem.victims ? [caseItem.victims] : []),
          perpetrators: (caseItem.perpetrators || []).map(perp => ({
            ...perp,
            entity_type: perp.type || perp.entity_type // Map type to entity_type if needed
          })),
          created_at: caseItem.created_at,
          updated_at: caseItem.updated_at,
          created_by: caseItem.created_by
        }));
        setCases(mappedCases);
      }
      
    } catch (error) {
      console.error('Error fetching cases:', error);
      // Show error message to user - you might want to add a toast notification here
      setCases([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cases when component mounts or when filters/pagination changes
  useEffect(() => {
    fetchCases();
  }, [showArchived]); // Removed currentPage and filters from dependency

  // Manual filter application
  const applyFilters = () => {
    fetchCases();
  };

  const totalCases = cases.length; // Use cases.length for total cases

  const handleToggleArchived = () => {
    setShowArchived(!showArchived);
  };

  const handleCaseClick = (caseData) => {
    setSelectedCase(caseData);
    setShowModal(true);
  };

  const handleArchiveCase = (caseId) => {
    deleteCase(caseId)
      .then(() => {
        // Optionally, you can show a success message here
        console.log(`Case ${caseId} archived successfully`);
        setShowArchived(true); // Switch to archived cases view
        // Update the local state to reflect the archived status
      })
      .catch(error => {
        console.error('Error archiving case:', error);
        // Show error message to user - you might want to add a toast notification here
      });
  };

  const handleRestoreCase = (caseId) => {
    restoreCase(caseId)
      .then(() => { 
        // Optionally, you can show a success message here
        console.log(`Case ${caseId} restored successfully`);
        setShowArchived(false); // Switch back to active cases view
      })
      .catch(error => {
        console.error('Error restoring case:', error);
        // Show error message to user - you might want to add a toast notification here
      });
  };

  const handleCreateCase = (newCaseData) => {
    // TODO: Replace with actual API call to create case
    console.log('Creating new case:', newCaseData);
    
    // For now, we'll just simulate success and refresh the cases
    // In the future, this should call an API endpoint like createCase(newCaseData)
    
    // Refresh the cases list to show the new case
    fetchCases();
  };

 
  const clearFilters = () => {
    setFilters({
      violationType: "",
      country: "",
      region: "",
      status: "",
      priority: "",
      dateFrom: "",
      dateTo: "",
      search: ""
    });
    fetchCases();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">      
    <CaseHeader 
        totalCases={totalCases}
        onShowFilters={() => setShowFilters(true)}
        userRole={userRole}
        showArchived={showArchived}
        onToggleArchived={handleToggleArchived}
        onCreateCase={() => setShowAddModal(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CaseGrid 
          cases={cases} 
          loading={loading} 
          onCaseClick={handleCaseClick}
        />
        
      </div>
      
      <CaseFilters
        visible={showFilters}
        onHide={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />      <CaseModal
        visible={showModal}
        onHide={() => setShowModal(false)}
        caseData={selectedCase}
        onArchiveCase={handleArchiveCase}
        onRestoreCase={handleRestoreCase}
      />

      <AddCaseModal
        visible={showAddModal}
        onHide={() => setShowAddModal(false)}
        onCreateCase={handleCreateCase}
      />
    </div>
  );
};

export default CaseManagement;