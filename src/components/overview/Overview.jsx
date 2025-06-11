import { 
  FileText, AlertTriangle, Users, Shield, Activity, TrendingUp 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchDashboardData, fetchTrendData } from '../../api/analyticsAPI';
import StatusBreakdownDialog from './StatusBreakdownDialog';
import ViolationTrendsChart from './ViolationTrendsChart';

const Overview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    data: [],
    type: ''
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const loadTrendsData = async () => {
      try {
        setTrendsLoading(true);
        const data = await fetchTrendData();
        setTrendsData(data);
      } catch (err) {
        console.error('Failed to fetch trends data:', err);
        setError(err.message);
      } finally {
        setTrendsLoading(false);
      }
    };

    loadDashboardData();
    loadTrendsData();
  }, []);

  const openBreakdownDialog = (type, title, data) => {
    setDialogState({
      isOpen: true,
      title,
      data,
      type
    });
  };  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      title: '',
      data: [],
      type: ''
    });
  };

  const statsCards = [
    { 
      title: 'Total Cases', 
      value: loading ? '...' : (dashboardData?.total_cases?.toString() || '0'), 
      icon: FileText, 
      color: 'blue', 
      clickable: true,
      onClick: () => openBreakdownDialog('cases', 'Cases by Status', dashboardData?.cases_by_status || [])
    },
    { 
      title: 'Total Reports', 
      value: loading ? '...' : (dashboardData?.total_reports?.toString() || '0'), 
      icon: AlertTriangle, 
      color: 'orange', 
      clickable: true,
      onClick: () => openBreakdownDialog('reports', 'Reports by Status', dashboardData?.reports_by_status || [])
    },
    { 
      title: 'Total Victims', 
      value: loading ? '...' : (dashboardData?.total_victims?.toString() || '0'), 
      icon: Users, 
      color: 'green', 
      clickable: true,
      onClick: () => openBreakdownDialog('victims', 'Victims by Risk Level', dashboardData?.victims_by_risk || [])
    },
    
      
  ];

  const recentActivities = [
    { id: 1, action: 'New case created', description: 'Forced displacement case #HRM-2025-0234', time: '2 hours ago', type: 'case' },
    { id: 2, action: 'Report submitted', description: 'Anonymous incident report from Aleppo', time: '4 hours ago', type: 'report' },
    { id: 3, action: 'Victim status updated', description: 'Risk assessment changed to HIGH', time: '6 hours ago', type: 'victim' },
    { id: 4, action: 'Case resolved', description: 'Arbitrary detention case closed', time: '1 day ago', type: 'case' }
  ];  return (
    <div className="space-y-8">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-700">Failed to load dashboard data: {error}</p>
          </div>
        </div>      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-5xl mx-auto">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon;          const colorClasses = {
            blue: 'bg-blue-500 text-blue-100',
            orange: 'bg-orange-500 text-orange-100',
            green: 'bg-green-500 text-green-100',
            red: 'bg-red-500 text-red-100',
            purple: 'bg-purple-500 text-purple-100'
          };
          
          const CardWrapper = stat.clickable ? 'button' : 'div';
          
          return (
            <CardWrapper 
              key={index} 
              className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-200 w-full text-left ${
                stat.clickable 
                  ? 'hover:shadow-lg hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={stat.clickable ? stat.onClick : undefined}
              disabled={loading}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                  {stat.clickable && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">Click to view breakdown</p>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <IconComponent size={24} />
                </div>
              </div>
            </CardWrapper>
          );
        })}
      </div>        
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      </div>

      {/* Violation Trends Chart */}
      {trendsData && !trendsLoading && (
        <ViolationTrendsChart data={trendsData} />
      )}

      {/* Trends Loading State */}
      {trendsLoading && (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading violation trends data...</p>
        </div>
      )}

      {/* Status Breakdown Dialog */}
      <StatusBreakdownDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        title={dialogState.title}
        data={dialogState.data}
        type={dialogState.type}
      />
    </div>
  );
};

export default Overview;