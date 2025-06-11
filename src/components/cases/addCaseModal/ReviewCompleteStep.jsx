import React, { useState, useRef } from 'react';
import { CheckCircle, Circle, User, Users, X } from 'lucide-react';
import { Toast } from 'primereact/toast';

const ReviewCompleteStep = ({ 
  selectedReports, 
  onFinish,
  caseDetails, 
  selectedCoordinate, 
  getTotalVictims 
}) => {
  const toast = useRef(null);
  const [selectedVictims, setSelectedVictims] = useState([]);

  // Get all victims from selected reports
  const getAllVictims = () => {
    const allVictims = [];
    selectedReports.forEach((report, reportIndex) => {
      if (report.victims && Array.isArray(report.victims)) {
        report.victims.forEach((victim, victimIndex) => {
          allVictims.push({
            ...victim,
            id: `${report.report_id}-${victimIndex}`, // Unique ID for each victim
            reportId: report.report_id,
            reportTitle: report.incident_details?.title || 'Untitled Report'
          });
        });
      }
    });
    return allVictims;
  };

  const allVictims = getAllVictims();

  const handleVictimSelect = (victimId) => {
    setSelectedVictims(prev => 
      prev.includes(victimId)
        ? prev.filter(id => id !== victimId)
        : [...prev, victimId]
    );
  };


  return (
    <>
      <Toast ref={toast} />
      <div className="flex gap-6 h-[600px]">
        {/* Victims Grid */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            All Victims from Selected Reports ({allVictims.length})
          </h3>
          <div className="h-full overflow-y-auto border rounded-lg p-4 bg-gray-50">
            {allVictims.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <Users className="w-12 h-12 mb-4 text-gray-300 mx-auto" />
                  <p>No victims found in selected reports</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allVictims.map((victim) => (
                  <div
                    key={victim.id}
                    onClick={() => handleVictimSelect(victim.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedVictims.includes(victim.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-4 h-4 text-purple-600" />
                          <h4 className="font-semibold text-gray-800">
                            {victim.name || 'Anonymous'}
                          </h4>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div><span className="font-medium">Occupation:</span> {victim.occupation || 'N/A'}</div>
                          <div><span className="font-medium">Gender:</span> {victim.gender || 'N/A'}</div>
                          <div><span className="font-medium">Age:</span> {victim.age || 'N/A'}</div>
                        </div>
                        <div className="mt-2 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                          From: {victim.reportId}
                        </div>
                      </div>
                      <div className="ml-2">
                        {selectedVictims.includes(victim.id) ? (
                          <CheckCircle className="text-purple-500" size={20} />
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

        {/* Selected Victims Sidebar */}
        <div className="w-80">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Selected Victims ({selectedVictims.length})
          </h3>
          <div className="h-full border rounded-lg p-4 bg-gray-50">
            {selectedVictims.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Users className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-center">No victims selected</p>
                <p className="text-center text-sm mt-2">You can still finish without selecting any victims</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-green-800">Selected Victims:</span>
                    <span className="font-bold text-green-900">{selectedVictims.length}</span>
                  </div>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-96">
                  {selectedVictims.map((victimId) => {
                    const victim = allVictims.find(v => v.id === victimId);
                    if (!victim) return null;
                    
                    return (
                      <div
                        key={victimId}
                        className="bg-white p-3 rounded border shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-800 text-sm">
                            {victim.name || 'Anonymous'}
                          </span>
                          <button
                            onClick={() => handleVictimSelect(victimId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {victim.occupation} • {victim.gender} • Age: {victim.age || 'N/A'}
                        </p>
                        <div className="text-xs text-purple-600">
                          From: {victim.reportId}
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

      {/* Finish Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onFinish}
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Finish & Create Case
        </button>
      </div>
    </>
  );
};

export default ReviewCompleteStep;
