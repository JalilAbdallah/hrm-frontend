import React from 'react';
import { X, CheckCircle, Circle, FileText, Users, Calendar } from 'lucide-react';

const ReportSelectionStep = ({ 
  reports, 
  selectedReports, 
  loading, 
  onReportSelect, 
  getTotalVictims 
}) => {
  return (
    <div className="flex gap-6 h-[600px]">
      {/* Reports Grid */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Available Reports
        </h3>
        <div className="h-full overflow-y-auto border rounded-lg p-4 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reports...</p>
              </div>
            </div>
          ) : reports.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mb-4 text-gray-300 mx-auto" />
                <p>No reports with status "new" found</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reports.map((report) => (
                <div
                  key={report._id}
                  onClick={() => onReportSelect(report.report_id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedReports.some(r => r.report_id === report.report_id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{report.report_id}</h4>
                      <p className="text-sm text-gray-900 font-medium mb-1">{report.incident_details?.title}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {Array.isArray(report.victims) ? report.victims.length : 0} victims
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(report.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2">
                      {selectedReports.some(r => r.report_id === report.report_id) ? (
                        <CheckCircle className="text-blue-500" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Reports Box */}
      <div className="w-80">
        <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          Selected Reports ({selectedReports.length})
        </h3>
        <div className="h-full border rounded-lg p-4 bg-gray-50">
          {selectedReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText className="w-12 h-12 mb-4 text-gray-300" />
              <p className="text-center">No reports selected</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-green-800">Total Victims:</span>
                  <span className="font-bold text-green-900">{getTotalVictims()}</span>
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto max-h-96">
                {selectedReports.map((report) => {
                  return (
                    <div
                      key={report.report_id}
                      className="bg-white p-3 rounded border shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-800 text-sm">{report.report_id}</span>
                        <button
                          onClick={() => onReportSelect(report.report_id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{report?.incident_details?.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        {Array.isArray(report.victims) ? report.victims.length : 0} victims
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportSelectionStep;
