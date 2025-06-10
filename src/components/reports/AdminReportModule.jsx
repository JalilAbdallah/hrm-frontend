import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { listReports } from '../../services/reportService';
import ReportCard from './ReportCard';
import FilterPanel from './FilterPanel';
import ReportDetailDialog from './ReportDetailDialog';


const AdminReportModule = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    country: '',
    city: '',
    date_from: '',
    date_to: ''
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await listReports(filters);
      setReports(data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      country: '',
      city: '',
      date_from: '',
      date_to: ''
    });
  };

  const handleCardClick = (report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedReport(null);
  };

  const handleStatusUpdate = (reportId, newStatus) => {
    setReports(prevReports =>
      prevReports.map(report =>
        report._id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  return (
    <div className="min-h-scree p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage and review incident reports</h1>
          {/* <p className="text-gray-600">Manage and review incident reports</p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Reports Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {reports.map((report) => (
                  <ReportCard
                    key={report._id}
                    report={report}
                    onClick={handleCardClick}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </div>
        </div>
      </div>

      {/* Report Detail Dialog */}
      <ReportDetailDialog
        report={selectedReport}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminReportModule;