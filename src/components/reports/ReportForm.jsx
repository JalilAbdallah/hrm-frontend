import React, { useState, useRef } from 'react';
import { MapPin, Upload, Plus, Trash2, Calendar, AlertTriangle, Users, FileText, Camera } from 'lucide-react';

// Mock report service
const createReport = async (reportData) => {
  console.log('Submitting report:', reportData);
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, reportId: `IR-2024-${Math.floor(Math.random() * 9999)}` });
    }, 1000);
  });
};

// Constants
const INSTITUTION_ID = "68371bae3007118794dc641e";
const VIOLATION_TYPES = [
  "attack_on_medical",
  "attack_on_education", 
  "war_crimes",
  "civilian_targeting",
  "infrastructure_damage",
  "other"
];

const GENDER_OPTIONS = ["male", "female", "other", "unknown"];
const OCCUPATION_OPTIONS = ["civilian", "doctor", "nurse", "teacher", "student", "aid_worker", "journalist", "other"];

// Location Input Component
const LocationInput = ({ location, onLocationChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = async () => {
    if (!location.country || !location.city) return;
    
    setIsLoading(true);
    try {
      // Mock coordinates for demonstration
      const mockCoordinates = {
        "Idlib, Syria": [36.6561, 36.8731],
        "Aleppo, Syria": [36.2021, 37.1343],
        "Damascus, Syria": [36.2765, 33.5138],
        "Gaza, Palestine": [31.5017, 34.4668],
        "Beirut, Lebanon": [33.8938, 35.5018]
      };
      
      const key = `${location.city}, ${location.country}`;
      const coords = mockCoordinates[key] || [0, 0];
      
      onLocationChange({
        ...location,
        coordinates: {
          type: "Point",
          coordinates: coords
        }
      });
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Incident Location</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            type="text"
            value={location.country}
            onChange={(e) => onLocationChange({ ...location, country: e.target.value })}
            onBlur={handleLocationSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Syria"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={location.city}
            onChange={(e) => onLocationChange({ ...location, city: e.target.value })}
            onBlur={handleLocationSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Idlib"
          />
        </div>
      </div>
      
      {location.coordinates && (
        <div className="mt-3 p-3 bg-green-50 rounded-md">
          <p className="text-sm text-green-700">
            📍 Coordinates: {location.coordinates.coordinates[1]}, {location.coordinates.coordinates[0]}
          </p>
        </div>
      )}
      
      {isLoading && (
        <div className="mt-3 text-sm text-blue-600">Getting coordinates...</div>
      )}
    </div>
  );
};

// Victim Input Component
const VictimInput = ({ victims, onVictimsChange }) => {
  const addVictim = () => {
    const newVictim = { name: '', occupation: 'civilian', gender: 'unknown', age: '' };
    onVictimsChange([...victims, newVictim]);
  };

  const updateVictim = (index, field, value) => {
    const updated = victims.map((victim, i) => 
      i === index ? { ...victim, [field]: value } : victim
    );
    onVictimsChange(updated);
  };

  const removeVictim = (index) => {
    onVictimsChange(victims.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Victims ({victims.length})</h3>
        </div>
        <button
          type="button"
          onClick={addVictim}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Victim
        </button>
      </div>

      <div className="space-y-4">
        {victims.map((victim, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
            <button
              type="button"
              onClick={() => removeVictim(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={victim.name}
                  onChange={(e) => updateVictim(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Victim name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                <select
                  value={victim.occupation}
                  onChange={(e) => updateVictim(index, 'occupation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {OCCUPATION_OPTIONS.map(occ => (
                    <option key={occ} value={occ}>{occ}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={victim.gender}
                  onChange={(e) => updateVictim(index, 'gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {GENDER_OPTIONS.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={victim.age}
                  onChange={(e) => updateVictim(index, 'age', parseInt(e.target.value) || '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Age"
                  min="0"
                  max="150"
                />
              </div>
            </div>
          </div>
        ))}
        
        {victims.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No victims added yet. Click "Add Victim" to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Evidence Upload Component
const EvidenceUpload = ({ evidence, onEvidenceChange }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const newEvidence = {
        type: file.type.startsWith('image/') ? 'photo' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        filename: file.name,
        url: URL.createObjectURL(file), // In real app, upload to server first
        description: '',
        file: file
      };
      
      onEvidenceChange([...evidence, newEvidence]);
    });
    
    e.target.value = '';
  };

  const updateEvidenceDescription = (index, description) => {
    const updated = evidence.map((ev, i) => 
      i === index ? { ...ev, description } : ev
    );
    onEvidenceChange(updated);
  };

  const removeEvidence = (index) => {
    onEvidenceChange(evidence.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Evidence ({evidence.length})</h3>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Upload className="h-4 w-4" />
          Upload Evidence
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="space-y-4">
        {evidence.map((ev, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {ev.type === 'photo' && <Camera className="h-5 w-5 text-green-600" />}
                {ev.type === 'video' && <FileText className="h-5 w-5 text-blue-600" />}
                {ev.type === 'document' && <FileText className="h-5 w-5 text-gray-600" />}
                <div>
                  <p className="font-medium">{ev.filename}</p>
                  <p className="text-sm text-gray-500 capitalize">{ev.type}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeEvidence(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={ev.description}
                onChange={(e) => updateEvidenceDescription(index, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
                placeholder="Describe this evidence..."
              />
            </div>

            {ev.type === 'photo' && (
              <div className="mt-3">
                <img src={ev.url} alt={ev.filename} className="max-w-xs h-32 object-cover rounded" />
              </div>
            )}
          </div>
        ))}
        
        {evidence.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Upload className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No evidence uploaded yet. Click "Upload Evidence" to add files.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Report Form Component
const ReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    anonymous: false,
    incident_details: {
      title: '',
      description: '',
      date_occurred: '',
      location: {
        country: '',
        city: '',
        coordinates: null
      },
      violation_types: []
    },
    victims: [],
    evidence: []
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Calculate estimated victims
      const estimated_victims = formData.victims.length;

      // Prepare report data
      const reportData = {
        institution_id: INSTITUTION_ID,
        anonymous: formData.anonymous,
        incident_details: {
          ...formData.incident_details,
          estimated_victims
        },
        victims: formData.victims,
        evidence: formData.evidence.map(ev => ({
          type: ev.type,
          filename: ev.filename,
          url: ev.url,
          description: ev.description
        })),
        assigned_admin: null,
        linked_case_id: null,
        status: "new",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const result = await createReport(reportData);
      console.log('Report submitted successfully:', result);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          anonymous: false,
          incident_details: {
            title: '',
            description: '',
            date_occurred: '',
            location: { country: '', city: '', coordinates: null },
            violation_types: []
          },
          victims: [],
          evidence: []
        });
      }, 3000);

    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViolationTypeChange = (violationType) => {
    const currentTypes = formData.incident_details.violation_types;
    const updatedTypes = currentTypes.includes(violationType)
      ? currentTypes.filter(type => type !== violationType)
      : [...currentTypes, violationType];
    
    setFormData({
      ...formData,
      incident_details: {
        ...formData.incident_details,
        violation_types: updatedTypes
      }
    });
  };

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Report Submitted Successfully</h2>
          <p className="text-green-700">Your incident report has been submitted and will be reviewed by our team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Incident Report</h1>
        <p className="text-gray-600">Report incidents and violations for investigation and documentation.</p>
      </div>

      <div className="space-y-6">
        {/* Basic Details */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Incident Details</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                Submit anonymously
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Incident Title *</label>
              <input
                type="text"
                required
                value={formData.incident_details.title}
                onChange={(e) => setFormData({
                  ...formData,
                  incident_details: { ...formData.incident_details, title: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief title describing the incident"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                required
                value={formData.incident_details.description}
                onChange={(e) => setFormData({
                  ...formData,
                  incident_details: { ...formData.incident_details, description: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Detailed description of what happened..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Occurred *</label>
              <input
                type="datetime-local"
                required
                value={formData.incident_details.date_occurred}
                onChange={(e) => setFormData({
                  ...formData,
                  incident_details: { ...formData.incident_details, date_occurred: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Violation Types *</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {VIOLATION_TYPES.map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.incident_details.violation_types.includes(type)}
                      onChange={() => handleViolationTypeChange(type)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {type.replace(/_/g, ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <LocationInput
          location={formData.incident_details.location}
          onLocationChange={(location) => setFormData({
            ...formData,
            incident_details: { ...formData.incident_details, location }
          })}
        />

        {/* Victims */}
        <VictimInput
          victims={formData.victims}
          onVictimsChange={(victims) => setFormData({ ...formData, victims })}
        />

        {/* Evidence */}
        <EvidenceUpload
          evidence={formData.evidence}
          onEvidenceChange={(evidence) => setFormData({ ...formData, evidence })}
        />

        {/* Submit Button */}
        <div className="flex justify-end pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
              </div>
    </div>
  );
};

export default ReportForm;