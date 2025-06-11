import { useState } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import FormSection from './FormSection';

const LocationInput = ({ location, onLocationChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationSelect = async () => {
    if (!location.country || !location.city) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const query = `${location.city}, ${location.country}`;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'IncidentReportingApp/1.0' 
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        const coordinates = [parseFloat(result.lon), parseFloat(result.lat)];
        
        onLocationChange({
          ...location,
          coordinates: {
            type: "Point",
            coordinates: coordinates
          },
          displayName: result.display_name 
        });
      } else {
        setError('Location not found. Please check the city and country names.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setError('Failed to get coordinates. Please try again.');
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
      
      <div className="mt-4">
        <button
          type="button"
          onClick={handleLocationSelect}
          disabled={!location.country || !location.city || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
        >
          {isLoading ? 'Getting coordinates...' : 'Get Coordinates'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}
      
      {location.coordinates && !error && (
        <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">
                Coordinates: {location.coordinates.coordinates[1].toFixed(6)}, {location.coordinates.coordinates[0].toFixed(6)}
              </p>
              {location.displayName && (
                <p className="text-xs text-green-700 mt-1">
                  {location.displayName}
                </p>
              )}
            </div>
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