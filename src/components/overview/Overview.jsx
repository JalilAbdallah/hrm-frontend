import { 
  FileText, AlertTriangle, Users, Shield, Activity 
} from 'lucide-react';

const Overview = () => {
  const statsCards = [
    { title: 'Total Cases', value: '156', icon: FileText, color: 'blue', change: '+12 this week' },
    { title: 'Active Reports', value: '23', icon: AlertTriangle, color: 'orange', change: '+5 today' },
    { title: 'Victims Protected', value: '89', icon: Users, color: 'green', change: '+8 this month' },
    { title: 'Urgent Cases', value: '7', icon: Shield, color: 'red', change: '2 resolved today' }
  ];

  const recentActivities = [
    { id: 1, action: 'New case created', description: 'Forced displacement case #HRM-2025-0234', time: '2 hours ago', type: 'case' },
    { id: 2, action: 'Report submitted', description: 'Anonymous incident report from Aleppo', time: '4 hours ago', type: 'report' },
    { id: 3, action: 'Victim status updated', description: 'Risk assessment changed to HIGH', time: '6 hours ago', type: 'victim' },
    { id: 4, action: 'Case resolved', description: 'Arbitrary detention case closed', time: '1 day ago', type: 'case' }
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-blue-100',
            orange: 'bg-orange-500 text-orange-100',
            green: 'bg-green-500 text-green-100',
            red: 'bg-red-500 text-red-100'
          };
          
          return (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <IconComponent size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Status */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Activity size={16} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <FileText size={20} className="text-blue-600" />
              <span className="font-medium text-gray-700">Create New Case</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors text-left">
              <AlertTriangle size={20} className="text-orange-600" />
              <span className="font-medium text-gray-700">Submit Report</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left">
              <Users size={20} className="text-green-600" />
              <span className="font-medium text-gray-700">Add Victim/Witness</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;