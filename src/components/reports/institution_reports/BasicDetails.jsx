import { AlertTriangle } from "lucide-react";
import FormSection from "./FormSection";

const VIOLATION_TYPES = [
  "attack_on_medical",
  "attack_on_education", 
  "war_crimes",
  "civilian_targeting",
  "infrastructure_damage",
  "other"
];

const BasicDetails = ({ formData, setFormData, handleViolationTypeChange }) => (
  <FormSection icon={AlertTriangle} title="Incident Details">
    <div className="space-y-6">
      <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-200">
        <input
          type="checkbox"
          id="anonymous"
          checked={formData.anonymous}
          onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="anonymous" className="ml-3 text-sm font-medium text-blue-900">
          Submit this report anonymously
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Incident Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.incident_details.title}
          onChange={(e) => setFormData({
            ...formData,
            incident_details: { ...formData.incident_details, title: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Brief title describing the incident"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          value={formData.incident_details.description}
          onChange={(e) => setFormData({
            ...formData,
            incident_details: { ...formData.incident_details, description: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          rows="5"
          placeholder="Provide a detailed description of what happened, including time, circumstances, and any relevant context..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Date & Time Occurred <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          required
          value={formData.incident_details.date_occurred}
          onChange={(e) => setFormData({
            ...formData,
            incident_details: { ...formData.incident_details, date_occurred: e.target.value }
          })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Violation Types <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VIOLATION_TYPES.map(type => (
            <label key={type} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.incident_details.violation_types.includes(type)}
                onChange={() => handleViolationTypeChange(type)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-3 text-sm font-medium text-gray-700 capitalize">
                {type.replace(/_/g, ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </FormSection>
);

export default BasicDetails;