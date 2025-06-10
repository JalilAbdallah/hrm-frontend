import React from 'react';
import { Filter, Plus, Archive, FolderOpen } from 'lucide-react';
import Button from '../common/Button'; // Updated import

const CaseHeader = ({ totalCases, onShowFilters, userRole, showArchived, onToggleArchived }) => {
  const canCreateCase = userRole === 'admin' || userRole === 'investigator';
  return (
    <div className="bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/50 border-b border-blue-100/60 shadow-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full translate-y-32 -translate-x-32"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center py-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-sm"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
                          <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-blue-100">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                  <span className="text-blue-700 font-bold text-sm">
                    {totalCases} {showArchived ? 'Archived' : 'Active'} Cases
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-4 py-2 shadow-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-600 font-medium text-sm">Live Monitoring</span>
                </div>
              </div>
            </div>
          </div>
          
            <div className="flex items-center space-x-4">
                <Button
              variant="outline"
              onClick={onShowFilters}
              className="text-blue-600 hover:text-blue-800 font-semibold px-6 py-3.5 rounded-2xl border-2 border-blue-300 hover:border-blue-400 bg-white/80 backdrop-blur-sm hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
               Filters
            </Button>
            <Button
              variant="outline"
              onClick={onToggleArchived}
              className={`font-semibold px-6 py-3.5 rounded-2xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center ${
                showArchived 
                  ? 'text-orange-600 hover:text-orange-800 border-orange-300 hover:border-orange-400 bg-orange-50 hover:bg-orange-100' 
                  : 'text-green-600 hover:text-green-800 border-green-300 hover:border-green-400 bg-green-50 hover:bg-green-100'
              }`}
            >
              {showArchived ? (
                <>
                  <FolderOpen className="w-4 h-4 mr-2" />
                  View Active Cases
                </>
              ) : (
                <>
                  <Archive className="w-4 h-4 mr-2" />
                  View Archived Cases
                </>
              )}
            </Button>
          
            {canCreateCase && (
              <Button
                onClick={() => console.log('Create new case')}
                className="text-white font-bold px-8 py-3.5 rounded-2xl tracking-wide bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Case
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseHeader;
