import { User, Building } from 'lucide-react';

const BasicInfoCard = ({ report }) => {
  return (
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
  );
};

export default BasicInfoCard;