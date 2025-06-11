import { X, FileText, AlertTriangle, Users, TrendingUp } from 'lucide-react';

const StatusBreakdownDialog = ({ isOpen, onClose, title, data, type }) => {
  if (!isOpen) return null;

  const getStatusConfig = (status, type) => {
    const configs = {
      cases: {
        new: { color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50', label: 'New Cases' },
        under_investigation: { color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50', label: 'Under Investigation' },
        closed: { color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', label: 'Closed Cases' },
        resolved: { color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50', label: 'Resolved Cases' }
      },
      reports: {
        new: { color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50', label: 'New Reports' },
        open: { color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50', label: 'Open Reports' },
        closed: { color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', label: 'Closed Reports' }
      },
      victims: {
        low: { color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50', label: 'Low Risk' },
        moderate: { color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50', label: 'Moderate Risk' },
        high: { color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50', label: 'High Risk' }
      }
    };

    return configs[type]?.[status] || { 
      color: 'bg-gray-500', 
      textColor: 'text-gray-700', 
      bgColor: 'bg-gray-50', 
      label: status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) 
    };
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'cases':
        return <FileText className="w-6 h-6" />;
      case 'reports':
        return <AlertTriangle className="w-6 h-6" />;
      case 'victims':
        return <Users className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  const getTotalCount = () => {
    return data?.reduce((sum, item) => sum + (item.count || 0), 0) || 0;
  };

  const sortedData = data?.sort((a, b) => b.count - a.count) || [];

  return (
    <div className="fixed inset-0 bg-gray-300/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {getTypeIcon(type)}
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-blue-100 text-sm">Total: {getTotalCount()}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {sortedData.length > 0 ? (
            <div className="space-y-4">
              {sortedData.map((item, index) => {
                const config = getStatusConfig(item.status || item.risk_level, type);
                const percentage = getTotalCount() > 0 ? ((item.count / getTotalCount()) * 100).toFixed(1) : 0;
                
                return (
                  <div 
                    key={index} 
                    className={`${config.bgColor} p-4 rounded-xl border border-opacity-20 transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${config.color} rounded-full`}></div>
                        <div>
                          <p className={`font-semibold ${config.textColor}`}>
                            {config.label}
                          </p>
                          <p className="text-sm text-gray-600">
                            {percentage}% of total
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${config.textColor}`}>
                          {item.count}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                        <div 
                          className={`h-2 ${config.color} rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {getTypeIcon(type)}
              </div>
              <p className="text-gray-500 text-lg font-medium">No data available</p>
              <p className="text-gray-400 text-sm mt-1">No {type} found in the system</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusBreakdownDialog;
