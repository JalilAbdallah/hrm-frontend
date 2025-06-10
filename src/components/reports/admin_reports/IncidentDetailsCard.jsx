import { AlertTriangle, Calendar, MapPin, Users, Tag } from 'lucide-react';

const IncidentDetailsCard = ({ report, formatDate }) => {
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

  return (
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
  );
};
export default IncidentDetailsCard;