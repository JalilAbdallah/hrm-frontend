import React from 'react';
import { CheckCircle, Circle, Plus, X } from 'lucide-react';

const CaseDetailsStep = ({ 
  selectedReports, 
  caseDetails, 
  selectedCoordinate, 
  onCaseDetailsChange, 
  onCoordinateChange, 
  onViolationTypeToggle, 
  getAvailableViolationTypes, 
  getAvailableCoordinates, 
  getTotalVictims, 
  priorityOptions,
  perpetratorTypeOptions,
  onAddPerpetrator,
  onRemovePerpetrator,
  onPerpetratorChange
}) => {
  return (
    <div className="space-y-6 max-h-[600px] overflow-y-auto">
      {/* Case Summary */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h3 className="text-md font-semibold text-blue-900 mb-2">Case Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">Reports Selected:</span>
            <span className="ml-2 text-blue-700">{selectedReports.length}</span>
          </div>
          <div>
            <span className="font-medium text-blue-800">Total Victims:</span>
            <span className="ml-2 text-blue-700">{getTotalVictims()}</span>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Case Title *
          </label>
          <input
            type="text"
            value={caseDetails.title}
            onChange={(e) => onCaseDetailsChange('title', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter case title..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={caseDetails.description}
            onChange={(e) => onCaseDetailsChange('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Provide a detailed description of the case..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={caseDetails.priority}
              onChange={(e) => onCaseDetailsChange('priority', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={caseDetails.location.country}
              onChange={(e) => onCaseDetailsChange('location', { 
                ...caseDetails.location, 
                country: e.target.value 
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Syria"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region
            </label>
            <input
              type="text"
              value={caseDetails.location.region}
              onChange={(e) => onCaseDetailsChange('location', { 
                ...caseDetails.location, 
                region: e.target.value 
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Aleppo"
            />
          </div>
        </div>

        {/* Violation Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Violation Types ({getAvailableViolationTypes().length > 0 ? 'from selected reports' : 'none available'})
          </label>
          {getAvailableViolationTypes().length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getAvailableViolationTypes().map((type) => (
                <div
                  key={type}
                  onClick={() => onViolationTypeToggle(type)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-sm ${
                    caseDetails.violation_types.includes(type)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {caseDetails.violation_types.includes(type) ? (
                      <CheckCircle size={16} className="text-blue-500" />
                    ) : (
                      <Circle size={16} className="text-gray-400" />
                    )}
                    <span className="font-medium">
                      {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">No violation types found in selected reports</p>
            </div>
          )}
        </div>        {/* Coordinates Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location Coordinates
          </label>
          {getAvailableCoordinates().length > 0 ? (
            <select
              value={selectedCoordinate}
              onChange={(e) => onCoordinateChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select coordinates from reports</option>
              {getAvailableCoordinates().map((coord, index) => (
                <option key={index} value={coord}>
                  {coord}
                </option>
              ))}
            </select>
          ) : (
            <select 
              disabled 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            >
              <option>No coordinates available in selected reports</option>
            </select>
          )}
        </div>

        {/* Perpetrators Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Perpetrators
            </label>
            <button
              type="button"
              onClick={onAddPerpetrator}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
              Add Perpetrator
            </button>
          </div>
          
          {caseDetails.perpetrators.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500 text-sm">No perpetrators added yet. Click "Add Perpetrator" to add one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {caseDetails.perpetrators.map((perpetrator, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Perpetrator {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => onRemovePerpetrator(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Entity Name *
                      </label>
                      <input
                        type="text"
                        value={perpetrator.entity_name}
                        onChange={(e) => onPerpetratorChange(index, 'entity_name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="e.g., 4th Armored Division"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Type *
                      </label>
                      <select
                        value={perpetrator.type}
                        onChange={(e) => onPerpetratorChange(index, 'type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value="">Select type...</option>
                        {perpetratorTypeOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsStep;
