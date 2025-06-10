import { X, FileText, Eye, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const DialogHeader = ({ report, onClose }) => {
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

  const statusConfig = getStatusConfig(report.status);

  return (
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
  );
};

export default DialogHeader;