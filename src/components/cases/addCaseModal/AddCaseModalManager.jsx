import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { listReports } from '../../../services/reportService';
import ReportSelectionStep from './ReportSelectionStep';
import CaseDetailsStep from './CaseDetailsStep';
import ReviewCompleteStep from './ReviewCompleteStep';
import { createCase } from '../../../api/casesAPI';
import { createVictimsWaitlist } from '../../../api/casesAPI';
import {useAuth} from '../../../context/AuthContext';
import {updateReportStatus} from '../../../services/reportService';

const AddCaseModalManager = ({ visible, onHide, onCreateCase }) => {
  const toast = useRef(null);
  const [currentView, setCurrentView] = useState('selection'); // 'selection', 'details', 'complete'
  const [selectedReports, setSelectedReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState('');  const [caseDetails, setCaseDetails] = useState({
    title: '',
    description: '',
    priority: 'medium',
    location: {
      country: '',
      region: ''
    },
    violation_types: [],
    perpetrators: []
  });
  const { user } = useAuth();

  // Fetch reports with status 'new' when modal opens
  useEffect(() => {
    const fetchReports = async () => {
      if (!visible) return;
      
      setLoading(true);
      try {
        const data = await listReports({ status: 'new' });
        console.log('Fetched reports:', data);
        // Ensure data is an array
        let reportsArray = data?.reports || [];

        setReports(reportsArray);
      } catch (error) {
        console.error('Error fetching reports:', error);
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load reports. Please try again later.',
          life: 3000
        });
        setReports([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [visible]);
  // Get unique violation types from selected reports
  const getAvailableViolationTypes = () => {
    const allViolationTypes = selectedReports.flatMap(report => 
      report.incident_details?.violation_types || []
    );
    return [...new Set(allViolationTypes)];
  };

  // Get unique coordinates from selected reports
  const getAvailableCoordinates = () => {
    const allCoordinates = selectedReports
      .map(report => report.location?.coordinates)
      .filter(coord => coord && coord.trim() !== '');
    return [...new Set(allCoordinates)];
  };
  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'bg-gray-400' },
    { value: 'medium', label: 'Medium', color: 'bg-blue-500' },
    { value: 'high', label: 'High', color: 'bg-orange-500' },
  ];

  const perpetratorTypeOptions = [
    { value: 'state_security_apparatus', label: 'State Security Apparatus' },
    { value: 'military_unit', label: 'Military Unit' },
    { value: 'intelligence_service', label: 'Intelligence Service' },
    { value: 'police_force', label: 'Police Force' },
    { value: 'paramilitary_group', label: 'Paramilitary Group' },
    { value: 'militia', label: 'Militia' },
    { value: 'armed_group', label: 'Armed Group' },
    { value: 'terrorist_organization', label: 'Terrorist Organization' },
    { value: 'criminal_organization', label: 'Criminal Organization' },
    { value: 'individual', label: 'Individual' }
  ];

  const handleReportSelect = (reportId) => {
    const report = reports.find(r => r.report_id === reportId);
    if (!report) return;
    
    setSelectedReports(prev => 
      prev.some(r => r.report_id === reportId)
        ? prev.filter(r => r.report_id !== reportId)
        : [...prev, report]
    );
  };

  const handleNext = () => {
    if (currentView === 'selection') {
      setCurrentView('details');
    } else if (currentView === 'details') {
      setCurrentView('complete');
    }
  };

  const handleBack = () => {
    if (currentView === 'details') {
      setCurrentView('selection');
    } else if (currentView === 'complete') {
      setCurrentView('details');
    }
  };  const handleCreateCase = async () => {
    // Create case without victims first
    const newCase = {
      ...caseDetails,
      source_reports: selectedReports.map(report => report._id),
      coordinates: selectedCoordinate || null,
      victims: [], // Keep victims empty in the case
      created_by: user.id
    };

    try {
      // Step 1: Create the case
      const caseResponse = await createCase(newCase);
      console.log('Case created successfully:', caseResponse);
      
      selectedReports.map(async (report) => {
        updateReportStatus(report.report_id, 'open');
      });
      // Get the case ID from the response
      const caseId = caseResponse.case._id;
      console.log('Case ID:', caseId);
      
      if (!caseId) {
        throw new Error('Case ID not found in response');
      }

      // Step 2: Collect all victims from selected reports
      const allVictims = selectedReports.flatMap(report => 
        Array.isArray(report.victims) ? report.victims : []
      );

      // Step 3: Create victims waitlist if there are victims
      if (allVictims.length > 0) {
        const victims_data = {
          case_id: caseId,
          victims: allVictims
        };

        const waitlistResponse = await createVictimsWaitlist(victims_data);
        console.log('Victims waitlist created successfully:', waitlistResponse);
      }

      // Call the parent function to update the UI
      if (onCreateCase) {
        onCreateCase({ ...newCase, _id: caseId });
      }

      toast.current.show({
        severity: 'success',
        summary: 'Case Created',
        detail: `Case "${caseDetails.title}" has been successfully created with ${allVictims.length} victims added to waitlist.`,
        life: 3000
      });

      handleCloseModal();
    } catch (error) {
      console.error('Error creating case or victims waitlist:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create case. Please try again later.',
        life: 3000
      });
    }
  };
  const handleCloseModal = () => {
    setCurrentView('selection');
    setSelectedReports([]);
    setSelectedCoordinate('');
    setCaseDetails({
      title: '',
      description: '',
      priority: 'medium',
      location: {
        country: '',
        region: ''
      },
      violation_types: [],
      perpetrators: []
    });
    onHide();
  };
  const handleViolationTypeToggle = (type) => {
    setCaseDetails(prev => ({
      ...prev,
      violation_types: prev.violation_types.includes(type)
        ? prev.violation_types.filter(t => t !== type)
        : [...prev.violation_types, type]
    }));
  };

  const handleAddPerpetrator = () => {
    setCaseDetails(prev => ({
      ...prev,
      perpetrators: [...prev.perpetrators, { entity_name: '', type: '' }]
    }));
  };

  const handleRemovePerpetrator = (index) => {
    setCaseDetails(prev => ({
      ...prev,
      perpetrators: prev.perpetrators.filter((_, i) => i !== index)
    }));
  };

  const handlePerpetratorChange = (index, field, value) => {
    setCaseDetails(prev => ({
      ...prev,
      perpetrators: prev.perpetrators.map((perp, i) => 
        i === index ? { ...perp, [field]: value } : perp
      )
    }));
  };

  const handleCaseDetailsChange = (field, value) => {
    setCaseDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCoordinateChange = (coordinate) => {
    setSelectedCoordinate(coordinate);
  };

  const getTotalVictims = () => {
    return selectedReports.reduce((total, report) => {
      return total + (Array.isArray(report.victims) ? report.victims.length : 0);
    }, 0);
  };

  const headerTemplate = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-lg font-bold text-green-600 uppercase tracking-wide">
          Create New Case
        </span>
      </div>
      <div className="text-sm text-gray-500">
        {currentView === 'selection' && 'Step 1: Select Reports'}
        {currentView === 'details' && 'Step 2: Case Details'}
        {currentView === 'complete' && 'Step 3: Review & Complete'}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentView) {
      case 'selection':
        return (
          <ReportSelectionStep
            reports={reports}
            selectedReports={selectedReports}
            loading={loading}
            onReportSelect={handleReportSelect}
            getTotalVictims={getTotalVictims}
          />
        );
      case 'details':        return (
          <CaseDetailsStep
            selectedReports={selectedReports}
            caseDetails={caseDetails}
            selectedCoordinate={selectedCoordinate}
            onCaseDetailsChange={handleCaseDetailsChange}
            onCoordinateChange={handleCoordinateChange}
            onViolationTypeToggle={handleViolationTypeToggle}
            getAvailableViolationTypes={getAvailableViolationTypes}
            getAvailableCoordinates={getAvailableCoordinates}
            getTotalVictims={getTotalVictims}
            priorityOptions={priorityOptions}
            perpetratorTypeOptions={perpetratorTypeOptions}
            onAddPerpetrator={handleAddPerpetrator}
            onRemovePerpetrator={handleRemovePerpetrator}
            onPerpetratorChange={handlePerpetratorChange}
          />
        );
      case 'complete':
        return (
          <ReviewCompleteStep
            selectedReports={selectedReports}
            caseDetails={caseDetails}
            selectedCoordinate={selectedCoordinate}
            getTotalVictims={getTotalVictims}
            onFinish={handleCreateCase}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={handleCloseModal}
        header={headerTemplate}
        style={{ width: '90vw', maxWidth: '1200px', maxHeight: '90vh' }}
        modal
        className="case-creation-modal"
        contentClassName="p-0"
        headerClassName="pb-4"
      >
        <div className="p-6">
          {renderCurrentStep()}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {currentView === 'selection' && `${selectedReports.length} reports selected`}
            {currentView === 'details' && `${getTotalVictims()} total victims from ${selectedReports.length} reports`}
            {currentView === 'complete' && `Ready to create case with ${selectedReports.length} reports`}
          </div>
          <div className="flex gap-3">
            {(currentView === 'details' || currentView === 'complete') && (
              <Button
                label="Back"
                icon="pi pi-arrow-left"
                onClick={handleBack}
                className="p-button-outlined"
              />
            )}
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={handleCloseModal}
              className="p-button-outlined"
            />            {currentView === 'selection' && (
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                onClick={handleNext}
                disabled={selectedReports.length === 0}
                className={selectedReports.length === 0 ? 'p-button-outlined' : 'p-button-success'}
                severity={selectedReports.length === 0 ? 'secondary' : 'success'}
              />
            )}
            {currentView === 'details' && (
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                onClick={handleNext}
                className="p-button-success"
                severity="success"
              />
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddCaseModalManager;
