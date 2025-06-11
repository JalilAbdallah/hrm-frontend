import { Clock, Calendar } from 'lucide-react';

const TimelineCard = ({ report, formatDate }) => {
  return (
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
  );
};
export default TimelineCard;