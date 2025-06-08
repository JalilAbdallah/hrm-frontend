import { FileText, TrendingUp, Activity } from 'lucide-react';

const ModulePlaceholder = ({ title, developer, description, features = [], endpoints = [] }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <FileText size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-blue-100 mt-2">Assigned to: {developer}</p>
            </div>
          </div>
          <p className="text-blue-100 text-lg">{description}</p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">

            {features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="mr-2 text-green-600" size={20} />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {endpoints.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Activity className="mr-2 text-blue-600" size={20} />
                  API Endpoints
                </h3>
                <ul className="space-y-3">
                  {endpoints.map((endpoint, index) => (
                    <li key={index} className="font-mono text-sm bg-gray-50 p-3 rounded-lg border">
                      {endpoint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-blue-900">Ready for Development</span>
            </div>
            <p className="text-blue-700 mt-2">
              This module is ready to be implemented. The developer can start working on the assigned features and API endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePlaceholder;