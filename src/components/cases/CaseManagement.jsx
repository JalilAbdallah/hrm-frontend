import React, { useState, useEffect } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Paginator } from 'primereact/paginator';
import CaseHeader from './CaseHeader';
import CaseFilters from './CaseFilters';
import CaseGrid from './CaseGrid';
import CaseModal from './CaseModal';

// Mock data based on the structure
const mockCases = [
  {
    _id: "6637238330071187944c6423",
    case_id: "HRM-2024-4901",
    title: "North-West Syria Medical Attack",
    description: "Coordinated attacks on clinics and ambulances in Idlib and Hama governorates",
    violation_types: ["attack_on_medical", "war_crimes"],
    status: "under_investigation",
    priority: "high",
    location: {
      country: "Syria",
      region: "North-West",
      coordinates: { type: "Point", coordinates: [36, 36] },
    },
    victims: [],
    perpetrators: [
      {
        entity_name: "4th Armored Division",
        type: "state_security_apparatus",
      },
    ],
    created_at: "Wed May 28 2025 17:53:54 GMT+0300",
    updated_at: "Wed May 28 2025 17:53:54 GMT+0300",
  },
  {
    _id: "6637238330071187944c6424",
    case_id: "HRM-2024-4902",
    title: "Detention Center Violations",
    description: "Reports of torture and inhumane conditions in detention facilities",
    violation_types: ["torture", "arbitrary_detention"],
    status: "active",
    priority: "high",
    location: {
      country: "Syria",
      region: "Damascus",
      coordinates: { type: "Point", coordinates: [33.5, 36.3] },
    },
    victims: [{ count: 15 }],
    perpetrators: [
      {
        entity_name: "Military Intelligence",
        type: "state_security_apparatus",
      },
    ],
    created_at: "Wed May 27 2025 14:22:10 GMT+0300",
    updated_at: "Wed May 28 2025 09:15:33 GMT+0300",
  },
  {
    _id: "6637238330071187944c6425",
    case_id: "HRM-2024-4903",
    title: "Civilian Infrastructure Attack",
    description: "Bombing of schools and residential areas in Aleppo province",
    violation_types: ["attack_on_civilians", "war_crimes", "marco_polo", "pretty_little_baby"],
    status: "closed",
    priority: "medium",
    location: {
      country: "Syria",
      region: "Aleppo",
      coordinates: { type: "Point", coordinates: [36.2, 37.1] },
    },
    victims: [{ count: 8 }],
    perpetrators: [
      {
        entity_name: "Syrian Air Force",
        type: "state_military",
      },
    ],
    created_at: "Wed May 25 2025 11:45:22 GMT+0300",
    updated_at: "Wed May 26 2025 16:30:15 GMT+0300",
  },
  {
    _id: "6637238330071187944c6426",
    case_id: "HRM-2024-4904",
    title: "Forced Displacement Operations",
    description: "Systematic displacement of civilians from opposition-held areas",
    violation_types: ["forced_displacement", "crimes_against_humanity"],
    status: "under_investigation",
    priority: "high",
    location: {
      country: "Syria",
      region: "Daraa",
      coordinates: { type: "Point", coordinates: [32.6, 36.1] },
    },
    victims: [{ count: 250 }],
    perpetrators: [
      {
        entity_name: "5th Corps",
        type: "state_military",
      },
    ],
    created_at: "Wed May 24 2025 08:12:45 GMT+0300",
    updated_at: "Wed May 27 2025 13:22:18 GMT+0300",
  },
  {
    _id: "6637238330071187944c6427",
    case_id: "HRM-2024-4905",
    title: "Chemical Weapons Usage",
    description: "Alleged use of chlorine gas in residential areas",
    violation_types: ["chemical_weapons", "war_crimes"],
    status: "active",
    priority: "critical",
    location: {
      country: "Syria",
      region: "Idlib",
      coordinates: { type: "Point", coordinates: [35.9, 36.6] },
    },
    victims: [{ count: 32 }],
    perpetrators: [
      {
        entity_name: "Syrian Air Force",
        type: "state_military",
      },
    ],
    created_at: "Wed May 23 2025 19:33:12 GMT+0300",
    updated_at: "Wed May 28 2025 10:45:27 GMT+0300",
  },
];

const CaseManagement = () => {
  const { userRole } = useDashboard();  const [cases, setCases] = useState(mockCases);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    violationType: "",
    country: "",
    region: "",
    status: "",
    priority: "",
    dateFrom: "",
    dateTo: "",
  });

  const casesPerPage = 6;

  // Filter cases based on applied filters
  const filteredCases = cases.filter(caseItem => {
    let matches = true;
    
    if (filters.violationType && !caseItem.violation_types.includes(filters.violationType)) {
      matches = false;
    }
    if (filters.country && caseItem.location.country !== filters.country) {
      matches = false;
    }
    if (filters.region && caseItem.location.region !== filters.region) {
      matches = false;
    }
    if (filters.status && caseItem.status !== filters.status) {
      matches = false;
    }
    if (filters.priority && caseItem.priority !== filters.priority) {
      matches = false;
    }
    
    return matches;
  });
  const totalCases = filteredCases.length;
  const totalPages = Math.ceil(totalCases / casesPerPage);
  const startIndex = currentPage * casesPerPage;
  const endIndex = startIndex + casesPerPage;
  const currentCases = filteredCases.slice(startIndex, endIndex);
  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  const handleCaseClick = (caseData) => {
    setSelectedCase(caseData);
    setShowModal(true);
  };

  const handleArchiveCase = (caseId) => {
    // Update the case status to archived or remove from the list
    setCases(prevCases => 
      prevCases.map(caseItem => 
        caseItem._id === caseId 
          ? { ...caseItem, status: 'archived' }
          : caseItem
      )
    );
  };

  const clearFilters = () => {
    setFilters({
      violationType: "",
      country: "",
      region: "",
      status: "",
      priority: "",      dateFrom: "",
      dateTo: "",
    });
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <CaseHeader 
        totalCases={totalCases}
        onShowFilters={() => setShowFilters(true)}
        userRole={userRole}
      />        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CaseGrid 
          cases={currentCases} 
          loading={loading} 
          onCaseClick={handleCaseClick}
        />
        
        {totalCases > casesPerPage && (
          <div className="mt-8 flex justify-center">
            <Paginator
              first={currentPage * casesPerPage}
              rows={casesPerPage}
              totalRecords={totalCases}
              onPageChange={onPageChange}
              template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} cases"
              className="bg-white rounded-lg border border-blue-100 shadow-sm"
            />
          </div>
        )}
      </div>      <CaseFilters
        visible={showFilters}
        onHide={() => setShowFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
      />

      <CaseModal
        visible={showModal}
        onHide={() => setShowModal(false)}
        caseData={selectedCase}
        onArchiveCase={handleArchiveCase}
      />
    </div>
  );
};

export default CaseManagement;