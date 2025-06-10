import React from 'react';
import CaseCard from './CaseCard';
import { FileText } from 'lucide-react';
import { Button } from 'primereact/button';

const CaseGrid = ({ cases, loading, onCaseClick }) => {  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 mt-4 font-medium">Loading cases...</p>
      </div>
    );
  }
  if (cases.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-100">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">No cases found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Try adjusting your filters or search criteria to find relevant cases, or create a new case to get started.
          </p>        
          <Button 
            label="Create First Case"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          />
        </div>
      </div>
    );
  }  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((caseItem, index) => (
        <div 
          key={caseItem._id} 
          className="case-card-enter"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CaseCard caseData={caseItem} onClick={onCaseClick} />
        </div>
      ))}
    </div>
  );
};

export default CaseGrid;
