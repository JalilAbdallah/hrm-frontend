import { useEffect, useState } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Shield, 
  Clock, 
  FileText, 
  AlertTriangle, 
  Users, 
  Camera, 
  Video, 
  File,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Tag,
  Building
} from 'lucide-react';
import { updateReportStatus } from '../../services/reportService';

const ReportDetailDialog = ({ report, isOpen, onClose, onStatusUpdate }) => {
  const [status, setStatus] = useState(report?.status || 'new');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (report) {
      setStatus(report.status);
    }
  }, [report]);

  const handleStatusUpdate = async () => {
    if (!report || status === report.status) return;
    
    setIsUpdating(true);
    try {
      console.log('Updating report status:', report._id, 'to', status);
      await updateReportStatus(report.report_id, status);
      onStatusUpdate(report._id, status);
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update report status');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'new':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: <Eye className="w-4 h-4" />,
          label: 'New'
        };
      case 'open':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: <AlertTriangle className="w-4 h-4" />,
          label: 'Open'
        };
      case 'closed':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Closed'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: <XCircle className="w-4 h-4" />,
          label: 'Unknown'
        };
    }
  };

  const getEvidenceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'photo':
      case 'image':
        return <Camera className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'document':
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const getViolationTypeColor = (type) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-orange-100 text-orange-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800'
    ];
    return colors[type?.length % colors.length] || 'bg-gray-100 text-gray-800';
  };

  if (!isOpen || !report) return null;

  const statusConfig = getStatusConfig(report.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <FileText className="w-6 h-6 bg-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Report Details</h2>
                <p className="text-blue-100 text-sm">{report.report_id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.color} border`}>
                {statusConfig.icon}
                <span className="text-sm font-medium">{statusConfig.label}</span>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="p-6 space-y-8">
            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Update Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Status Management</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-700 mb-2">Update Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="new">New</option>
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isUpdating || status === report.status}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Update Status</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Basic Info Card */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Anonymous:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${report.anonymous ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {report.anonymous ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Institution:</span>
                    <span className="text-sm font-medium text-gray-900 truncate">{report.institution_id}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Timeline</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Created</span>
                    </div>
                    <p className="text-sm text-green-600 ml-6">{formatDate(report.created_at)}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-700">Updated</span>
                    </div>
                    <p className="text-sm text-green-600 ml-6">{formatDate(report.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Incident Details */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="text-xl font-bold text-gray-900">Incident Details</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <p className="text-gray-900 font-medium">{report.incident_details?.title || 'No title provided'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Occurred</label>
                    <div className="bg-gray-50 p-3 rounded-lg border flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-900">{formatDate(report.incident_details?.date_occurred)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="bg-gray-50 p-3 rounded-lg border flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-900">
                        {report.incident_details?.location?.city}, {report.incident_details?.location?.country}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Victims</label>
                    <div className="bg-gray-50 p-3 rounded-lg border flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-900 font-medium">{report.incident_details?.estimated_victims || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <div className="bg-gray-50 p-3 rounded-lg border min-h-[100px]">
                      <p className="text-gray-900 leading-relaxed">{report.incident_details?.description || 'No description provided'}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Violation Types</label>
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex flex-wrap gap-2">
                        {report.incident_details?.violation_types?.map((type, index) => (
                          <span
                            key={index}
                            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getViolationTypeColor(type)}`}
                          >
                            <Tag className="w-3 h-3" />
                            <span>{type.replace(/_/g, ' ').toUpperCase()}</span>
                          </span>
                        )) || <span className="text-gray-500">No violations listed</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Victims Section */}
            {report.victims && report.victims.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <Users className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Victims ({report.victims.length})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.victims.map((victim, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-orange-600" />
                        </div>
                        <h4 className="font-medium text-orange-900">Victim {index + 1}</h4>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-orange-700">Name:</span>
                          <span className="font-medium text-orange-900">{victim.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">Occupation:</span>
                          <span className="font-medium text-orange-900">{victim.occupation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">Gender:</span>
                          <span className="font-medium text-orange-900">{victim.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-orange-700">Age:</span>
                          <span className="font-medium text-orange-900">{victim.age}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evidence Section */}
            {report.evidence && report.evidence.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-6">
                  <Camera className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Evidence ({report.evidence.length})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {report.evidence.map((evidence, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-3 mb-3">
                        {getEvidenceIcon(evidence.type)}
                        <div>
                          <h4 className="font-medium text-purple-900">Evidence {index + 1}</h4>
                          <p className="text-sm text-purple-700 capitalize">{evidence.type}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium text-purple-700">Filename:</span>
                          <p className="text-purple-900 truncate">{evidence.filename}</p>
                        </div>
                        <div>
                          <span className="font-medium text-purple-700">Description:</span>
                          <p className="text-purple-900">{evidence.description}</p>
                        </div>
                        <div>
                          <span className="font-medium text-purple-700">URL:</span>
                          <div className="flex items-center justify-between">
                            <p className="text-purple-900 truncate flex-1">{evidence.url}</p>
                            <button className="ml-2 p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-200 rounded">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailDialog;