import { useState } from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const StatusCard = ({ report, onStatusUpdate }) => {
  const [status, setStatus] = useState(report?.status || 'new');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async () => {
    if (!report || status === report.status) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(report._id, status);
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update report status');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
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
  );
};

export default StatusCard;