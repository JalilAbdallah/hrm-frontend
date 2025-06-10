import { useEffect } from 'react';
import { updateReportStatus } from '../../../services/reportService';
import DialogHeader from './DialogHeader';
import StatusCard from './StatusCard';
import BasicInfoCard from './BasicInfoCard';
import TimelineCard from './TimelineCard';
import IncidentDetailsCard from './IncidentDetailsCard';
import VictimsSection from './VictimsSection';
import EvidenceSection from './EvidenceSection';

const ReportDetailDialog = ({ report, isOpen, onClose, onStatusUpdate }) => {
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

  const handleStatusUpdate = async (reportId, status) => {
    console.log('Updating report status:', reportId, 'to', status);
    await updateReportStatus(report.report_id, status);
    onStatusUpdate(reportId, status);
    onClose();
  };

  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl">
        <DialogHeader report={report} onClose={onClose} />
        
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="p-6 space-y-8">
            {/* Key Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatusCard report={report} onStatusUpdate={handleStatusUpdate} />
              <BasicInfoCard report={report} />
              <TimelineCard report={report} formatDate={formatDate} />
            </div>

            <IncidentDetailsCard report={report} formatDate={formatDate} />
            <VictimsSection victims={report.victims} />
            <EvidenceSection evidence={report.evidence} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailDialog;