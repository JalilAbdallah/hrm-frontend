import { useState } from 'react';
import { MapPin } from 'lucide-react';
import FormSection from './FormSection';

const LocationInput = ({ location, onLocationChange }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSelect = async () => {
    if (!location.country || !location.city) return;
    
    setIsLoading(true);
    try {
      const mockCoordinates = {
        "Idlib, Syria": [36.6561, 36.8731],
        "Aleppo, Syria": [36.2021, 37.1343],
        "Damascus, Syria": [33.5138, 36.2765],
        "Gaza, Palestine": [34.4668, 31.5017],
        "Beirut, Lebanon": [35.5018, 33.8938]
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
    <FormSection icon={MapPin} title="Incident Location">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location.country}
            onChange={(e) => onLocationChange({ ...location, country: e.target.value })}
            onBlur={handleLocationSelect}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., Syria"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={location.city}
            onChange={(e) => onLocationChange({ ...location, city: e.target.value })}
            onBlur={handleLocationSelect}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., Idlib"
          />
        </div>
      </div>
      
      {location.coordinates && (
        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Coordinates: {location.coordinates.coordinates[1]}, {location.coordinates.coordinates[0]}
            </p>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Getting coordinates...</span>
        </div>
      )}
    </FormSection>
  );
};

export default LocationInput;