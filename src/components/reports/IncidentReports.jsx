import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  FileText, 
  Camera, 
  Upload,
  Eye,
  Edit3,
  AlertTriangle,
  Users,
  Globe,
  Clock,
  ChevronDown,
  X,
  CheckCircle,
  AlertCircle,
  Pause
} from 'lucide-react';


// Dummy data for reports
const dummyReports = [
  {
    _id: "683722ca3007118794dc6420",
    report_id: "IR-2024-3001",
    institution_id: "68371bae3007118794dc641e",
    anonymous: false,
    incident_details: {
      title: "Clinic Hit by Artillery Shell",
      description: "A civilian-run clinic was damaged by an overnight artillery strike.",
      date_occurred: "2025-05-28T14:50:50.000Z",
      location: {
        country: "Syria",
        city: "Idlib",
        coordinates: {
          type: "Point",
          coordinates: [36.6561, 36.8731]
        }
      },
      violation_types: ["attack_on_medical", "war_crimes"],
      estimated_victims: 2
    },
    victims: [
      { name: "Nurse A", occupation: "nurse", gender: "female", age: 29 },
      { name: "Patient B", occupation: "civilian", gender: "male", age: 45 }
    ],
    evidence: [
      {
        type: "photo",
        filename: "idlib_clinic_damage1.jpg",
        url: "/evidence/ir3001-1.jpg",
        description: "Exterior shot showing crater by entrance"
      }
    ],
    assigned_admin: null,
    linked_case_id: null,
    created_at: "2025-05-28T14:50:50.000Z",
    updated_at: "2025-05-28T14:50:50.000Z",
    status: "new"
  },
  {
    _id: "683722ca3007118794dc6421",
    report_id: "IR-2024-3002",
    institution_id: "68371bae3007118794dc641e",
    anonymous: true,
    incident_details: {
      title: "Forced Displacement of Civilians",
      description: "Family forced to leave their home by armed groups.",
      date_occurred: "2025-05-27T10:30:00.000Z",
      location: {
        country: "Syria",
        city: "Aleppo",
        coordinates: {
          type: "Point",
          coordinates: [37.1612, 36.2013]
        }
      },
      violation_types: ["forced_displacement", "intimidation"],
      estimated_victims: 5
    },
    victims: [
      { name: "Anonymous", occupation: "civilian", gender: "mixed", age: null }
    ],
    evidence: [],
    assigned_admin: "68371bdf3007118794dc641f",
    linked_case_id: null,
    created_at: "2025-05-27T10:30:00.000Z",
    updated_at: "2025-05-29T08:15:00.000Z",
    status: "under_review"
  },
  {
    _id: "683722ca3007118794dc6422",
    report_id: "IR-2024-3003",
    institution_id: "68371bae3007118794dc641f",
    anonymous: false,
    incident_details: {
      title: "Arbitrary Detention",
      description: "Student activist detained without charges for 3 days.",
      date_occurred: "2025-05-26T15:45:00.000Z",
      location: {
        country: "Syria",
        city: "Damascus",
        coordinates: {
          type: "Point",
          coordinates: [36.2765, 33.5138]
        }
      },
      violation_types: ["arbitrary_detention", "violation_of_rights"],
      estimated_victims: 1
    },
    victims: [
      { name: "Student X", occupation: "student", gender: "male", age: 22 }
    ],
    evidence: [
      {
        type: "document",
        filename: "detention_notice.pdf",
        url: "/evidence/ir3003-1.pdf",
        description: "Official detention notice"
      }
    ],
    assigned_admin: "68371bdf3007118794dc641f",
    linked_case_id: "case-001",
    created_at: "2025-05-26T15:45:00.000Z",
    updated_at: "2025-05-30T12:20:00.000Z",
    status: "resolved"
  }
];

const violationTypes = [
  'attack_on_medical',
  'war_crimes',
  'forced_displacement',
  'intimidation',
  'arbitrary_detention',
  'violation_of_rights',
  'torture',
  'killing',
  'disappearance',
  'sexual_violence'
];

const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  { value: 'under_review', label: 'Under Review', color: 'bg-yellow-100 text-yellow-800', icon: Pause },
  { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: X }
];

const IncidentReports = () => {
  const [userType, setUserType] = useState('admin'); // 'admin' or 'institution'
  const [activeView, setActiveView] = useState('list'); // 'list' or 'create'
  const [reports, setReports] = useState(dummyReports);
  const [filteredReports, setFilteredReports] = useState(dummyReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Form state for creating new reports
  const [newReport, setNewReport] = useState({
    anonymous: false,
    incident_details: {
      title: '',
      description: '',
      date_occurred: '',
      location: {
        country: '',
        city: '',
        coordinates: { type: 'Point', coordinates: [0, 0] }
      },
      violation_types: [],
      estimated_victims: 0
    },
    victims: [],
    evidence: []
  });

  // Filter reports based on search and status
  useEffect(() => {
    let filtered = reports;

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.report_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.incident_details.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.incident_details.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter);
    }

    setFilteredReports(filtered);
  }, [reports, searchTerm, statusFilter]);

  const updateReportStatus = (reportId, newStatus) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report._id === reportId
          ? { ...report, status: newStatus, updated_at: new Date().toISOString() }
          : report
      )
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status) => {
    return statusOptions.find(option => option.value === status) || statusOptions[0];
  };

  const addVictim = () => {
    setNewReport(prev => ({
      ...prev,
      victims: [...prev.victims, { name: '', occupation: '', gender: '', age: '' }]
    }));
  };

  const updateVictim = (index, field, value) => {
    setNewReport(prev => ({
      ...prev,
      victims: prev.victims.map((victim, i) =>
        i === index ? { ...victim, [field]: value } : victim
      )
    }));
  };

  const removeVictim = (index) => {
    setNewReport(prev => ({
      ...prev,
      victims: prev.victims.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    
    // Generate report ID
    const year = new Date().getFullYear();
    const reportNumber = (reports.length + 1).toString().padStart(4, '0');
    const reportId = `IR-${year}-${reportNumber}`;

    const report = {
      _id: Date.now().toString(),
      report_id: reportId,
      institution_id: "current_institution_id",
      ...newReport,
      assigned_admin: null,
      linked_case_id: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'new'
    };

    setReports(prev => [report, ...prev]);
    setActiveView('list');
    
    setNewReport({
      anonymous: false,
      incident_details: {
        title: '',
        description: '',
        date_occurred: '',
        location: {
          country: '',
          city: '',
          coordinates: { type: 'Point', coordinates: [0, 0] }
        },
        violation_types: [],
        estimated_victims: 0
      },
      victims: [],
      evidence: []
    });
  };

  const toggleViolationType = (type) => {
    setNewReport(prev => ({
      ...prev,
      incident_details: {
        ...prev.incident_details,
        violation_types: prev.incident_details.violation_types.includes(type)
          ? prev.incident_details.violation_types.filter(t => t !== type)
          : [...prev.incident_details.violation_types, type]
      }
    }));
  };

  if (activeView === 'create' && userType === 'institution') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Submit New Incident Report</h2>
            <p className="text-gray-600 mt-1">Report human rights violations securely and confidentially</p>
          </div>
          <button
            onClick={() => setActiveView('list')}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Back to Reports
          </button>
        </div>

        <form onSubmit={handleSubmitReport} className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Basic Information */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newReport.anonymous}
                  onChange={(e) => setNewReport(prev => ({ ...prev, anonymous: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Submit anonymously</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Incident Title *
                </label>
                <input
                  type="text"
                  required
                  value={newReport.incident_details.title}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev,
                    incident_details: { ...prev.incident_details, title: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief title describing the incident"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Occurred *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={newReport.incident_details.date_occurred}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev,
                    incident_details: { ...prev.incident_details, date_occurred: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={newReport.incident_details.description}
                onChange={(e) => setNewReport(prev => ({
                  ...prev,
                  incident_details: { ...prev.incident_details, description: e.target.value }
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of what happened..."
              />
            </div>
          </div>

          {/* Location */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <input
                  type="text"
                  required
                  value={newReport.incident_details.location.country}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev,
                    incident_details: {
                      ...prev.incident_details,
                      location: { ...prev.incident_details.location, country: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={newReport.incident_details.location.city}
                  onChange={(e) => setNewReport(prev => ({
                    ...prev,
                    incident_details: {
                      ...prev.incident_details,
                      location: { ...prev.incident_details.location, city: e.target.value }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Violation Types */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Violation Types</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {violationTypes.map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newReport.incident_details.violation_types.includes(type)}
                    onChange={() => toggleViolationType(type)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {type.replace(/_/g, ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Victims */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Victims Information</h3>
              <button
                type="button"
                onClick={addVictim}
                className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Victim
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Total Victims
              </label>
              <input
                type="number"
                min="0"
                value={newReport.incident_details.estimated_victims}
                onChange={(e) => setNewReport(prev => ({
                  ...prev,
                  incident_details: { ...prev.incident_details, estimated_victims: parseInt(e.target.value) || 0 }
                }))}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {newReport.victims.map((victim, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Victim {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeVictim(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Name (optional if anonymous)"
                    value={victim.name}
                    onChange={(e) => updateVictim(index, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Occupation"
                    value={victim.occupation}
                    onChange={(e) => updateVictim(index, 'occupation', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={victim.gender}
                    onChange={(e) => updateVictim(index, 'gender', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="mixed">Mixed</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Age"
                    value={victim.age}
                    onChange={(e) => updateVictim(index, 'age', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Evidence Upload */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Evidence Upload</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">Upload photos, videos, or documents</p>
              <p className="text-sm text-gray-500">Supported formats: JPG, PNG, MP4, PDF, DOC</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Choose Files
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="p-6">
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={() => setActiveView('list')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incident Reports</h2>
          <p className="text-gray-600 mt-1">
            {userType === 'admin' 
              ? 'Manage and review incident reports'
              : 'Track your submitted incident reports'
            }
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* User Type Toggle (for demo) */}
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="admin">Admin View</option>
            <option value="institution">Institution View</option>
          </select>
          
          {userType === 'institution' && (
            <button
              onClick={() => setActiveView('create')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              <span>New Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            {filteredReports.length} of {reports.length} reports
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Victims
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => {
                const statusInfo = getStatusInfo(report.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={report._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {report.report_id}
                        </div>
                        {report.anonymous && (
                          <div className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            Anonymous
                          </div>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {report.incident_details.title}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {report.incident_details.violation_types.slice(0, 2).map(type => (
                          <span key={type} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {type.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {report.incident_details.violation_types.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{report.incident_details.violation_types.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        <div>
                          <div>{report.incident_details.location.city}</div>
                          <div className="text-xs text-gray-500">{report.incident_details.location.country}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        <div>{formatDate(report.incident_details.date_occurred)}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userType === 'admin' ? (
                        <select
                          value={report.status}
                          onChange={(e) => updateReportStatus(report._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-blue-500 ${statusInfo.color}`}
                        >
                          {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon size={12} className="mr-1" />
                          {statusInfo.label}
                        </div>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users size={16} className="text-gray-400 mr-2" />
                        <div>{report.incident_details.estimated_victims}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowReportModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {userType === 'admin' && (
                          <button
                            onClick={() => {
                              // Handle edit action
                              console.log('Edit report', report._id);
                            }}
                            className="text-gray-600 hover:text-gray-800 p-1 rounded"
                            title="Edit Report"
                          >
                            <Edit3 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search criteria'
                : userType === 'institution'
                ? 'Submit your first incident report to get started'
                : 'No incident reports have been submitted yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {showReportModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Report Details: {selectedReport.report_id}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Submitted on {formatDate(selectedReport.created_at)}
                  </p>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedReport.status).color}`}>
                    {React.createElement(getStatusInfo(selectedReport.status).icon, { size: 16, className: "mr-2" })}
                    {getStatusInfo(selectedReport.status).label}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Report Type</div>
                  <div className="text-sm font-medium text-gray-900">
                    {selectedReport.anonymous ? 'Anonymous' : 'Identified'}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Estimated Victims</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {selectedReport.incident_details.estimated_victims}
                  </div>
                </div>
              </div>

              {/* Incident Details */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Incident Information</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Title</div>
                    <div className="text-gray-900">{selectedReport.incident_details.title}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Description</div>
                    <div className="text-gray-900 whitespace-pre-wrap">
                      {selectedReport.incident_details.description}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Date Occurred</div>
                      <div className="flex items-center text-gray-900">
                        <Calendar size={16} className="text-gray-400 mr-2" />
                        {formatDate(selectedReport.incident_details.date_occurred)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Location</div>
                      <div className="flex items-center text-gray-900">
                        <MapPin size={16} className="text-gray-400 mr-2" />
                        {selectedReport.incident_details.location.city}, {selectedReport.incident_details.location.country}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Violation Types</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.incident_details.violation_types.map(type => (
                        <span key={type} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                          {type.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Victims Information */}
              {selectedReport.victims.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Victims Information</h4>
                  <div className="space-y-3">
                    {selectedReport.victims.map((victim, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Name:</div>
                            <div className="font-medium">{victim.name || 'Anonymous'}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Occupation:</div>
                            <div className="font-medium">{victim.occupation || 'N/A'}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Gender:</div>
                            <div className="font-medium capitalize">{victim.gender || 'N/A'}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Age:</div>
                            <div className="font-medium">{victim.age || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence */}
              {selectedReport.evidence.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Evidence</h4>
                  <div className="space-y-3">
                    {selectedReport.evidence.map((evidence, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <Camera size={20} className="text-gray-400 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900">{evidence.filename}</div>
                            <div className="text-sm text-gray-600">{evidence.description}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 capitalize">
                          {evidence.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Administrative Info (Admin Only) */}
              {userType === 'admin' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Administrative Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Institution ID:</div>
                      <div className="font-medium font-mono">{selectedReport.institution_id}</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Assigned Admin:</div>
                      <div className="font-medium">
                        {selectedReport.assigned_admin ? selectedReport.assigned_admin : 'Unassigned'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Linked Case:</div>
                      <div className="font-medium">
                        {selectedReport.linked_case_id || 'No linked case'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Last Updated:</div>
                      <div className="font-medium">{formatDate(selectedReport.updated_at)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Summary (Admin Only) */}
      {userType === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'new' || r.status === 'under_review').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.status === 'resolved').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Victims</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.reduce((total, report) => total + report.incident_details.estimated_victims, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentReports;