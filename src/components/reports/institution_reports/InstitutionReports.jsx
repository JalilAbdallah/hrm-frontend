import { useState } from 'react';
import { createReport } from '../../../services/reportService';
import BasicDetails from './BasicDetails';
import LocationInput from './LocationInput';
import VictimInput from './VictimInput';
import EvidenceUpload from './EvidenceUpload';
import SuccessMessage from './SuccessMessage';


const INSTITUTION_ID = "68371bae3007118794dc641e";




const InstitutionReports = () => {
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
    if (!formData.incident_details.title || !formData.incident_details.description || !formData.incident_details.date_occurred) {
      alert('Please fill in all required fields.');
      return;
    }

    if (formData.incident_details.violation_types.length === 0) {
      alert('Please select at least one violation type.');
      return;
    }

    if (!formData.incident_details.location.country || !formData.incident_details.location.city) {
      alert('Please provide the incident location.');
      return;
    }

    setIsSubmitting(true);

    try {
      const dateOccurred = new Date(formData.incident_details.date_occurred);
      
      const reportData = {
        institution_id: INSTITUTION_ID,
        anonymous: formData.anonymous,
        incident_details: {
          title: formData.incident_details.title,
          description: formData.incident_details.description,
          date_occurred: dateOccurred,
          location: {
            country: formData.incident_details.location.country,
            city: formData.incident_details.location.city,
            coordinates: formData.incident_details.location.coordinates
          },
          violation_types: formData.incident_details.violation_types,
          estimated_victims: formData.victims.length
        },
        victims: formData.victims.map(victim => ({
          name: victim.name || '',
          occupation: victim.occupation,
          gender: victim.gender,
          age: victim.age ? parseInt(victim.age) : null
        })),
        evidence: formData.evidence.map(ev => ({
          type: ev.type,
          url: "ir-2025-116",
          description: ev.description || ''
        }))
      };
      console.log('Submitting report data:', reportData);
      
      const result = await createReport(reportData);
      console.log('Report submitted successfully:', result);
      setSubmitSuccess(true);

    } catch (error) {
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

  const resetForm = () => {
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
  };

  if (submitSuccess) {
    return <SuccessMessage onReset={resetForm} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="space-y-8">
          <BasicDetails 
            formData={formData} 
            setFormData={setFormData} 
            handleViolationTypeChange={handleViolationTypeChange} 
          />

          <LocationInput
            location={formData.incident_details.location}
            onLocationChange={(location) => setFormData({
              ...formData,
              incident_details: { ...formData.incident_details, location }
            })}
          />

          <VictimInput
            victims={formData.victims}
            onVictimsChange={(victims) => setFormData({ ...formData, victims })}
          />

          <EvidenceUpload
            evidence={formData.evidence}
            onEvidenceChange={(evidence) => setFormData({ ...formData, evidence })}
          />

          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionReports;