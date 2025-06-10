import { AlertCircle, Calendar, MapPin, Users } from "lucide-react";

const ReportCard = ({ report, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'open': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={() => onClick(report)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {report.incident_details?.title || 'Untitled Report'}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
          {report.status?.toUpperCase() || 'UNKNOWN'}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{report.incident_details?.location?.city}, {report.incident_details?.location?.country}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{formatDate(report.incident_details?.date_occurred)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <Users className="w-4 h-4 mr-2" />
          <span>{report.victims?.length || 0} victim(s)</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span>{report.incident_details?.violation_types?.join(', ') || 'No violations listed'}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          Report ID: {report.report_id}
        </div>
      </div>
    </div>
  );
};
export default ReportCard;