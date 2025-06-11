import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Filter, MapPin, AlertTriangle, Loader2 } from 'lucide-react';
import { getGeodata } from '../../services/analyticsService';
import 'leaflet/dist/leaflet.css';

const GeoMapVisualization = () => {
  const [geodata, setGeodata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    violation_type: '',
    country: ''
  });

  const violationColors = {
    'attack_on_medical': 'red',
    'attack_on_education': 'orange',
    'war_crimes': 'blue',
    'civilian_targeting': 'green',
    'infrastructure_damage': 'amber',
    'other': 'gray'
  };

  const violationLabels = {
    'attack_on_medical': 'Attack on Medical',
    'attack_on_education': 'Attack on Education',
    'war_crimes': 'War Crimes',
    'civilian_targeting': 'Civilian Targeting',
    'infrastructure_damage': 'Infrastructure Damage',
    'other': 'Other'
  };

  const fetchGeodata = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getGeodata(filters);
      setGeodata(response.data || []);
    } catch (err) {
      setError('Failed to fetch geodata');
      console.error('Error fetching geodata:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeodata();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      violation_type: '',
      country: ''
    });
  };

  const getMarkerColor = (violationTypes) => {
    if (!violationTypes || violationTypes.length === 0) return violationColors.other;
    
    const priorityOrder = ['war_crimes', 'civilian_targeting', 'attack_on_medical', 'attack_on_education', 'infrastructure_damage', 'other'];
    
    for (const priority of priorityOrder) {
      if (violationTypes.includes(priority)) {
        return violationColors[priority];
      }
    }
    
    return violationColors.other;
  };

  const getMarkerSize = (incidentCount) => {
    const baseSize = 8;
    const scaleFactor = 3;
    return Math.min(baseSize + (incidentCount * scaleFactor), 30);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 mx-auto mb-4 text-red-600" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchGeodata}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Geographic Violations Map</h1>
          </div>
          <div className="text-sm text-gray-600">
            {geodata.length} locations found
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.violation_type}
            onChange={(e) => handleFilterChange('violation_type', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Violation Types</option>
            <option value="attack_on_medical">Attack on Medical</option>
            <option value="attack_on_education">Attack on Education</option>
            <option value="war_crimes">War Crimes</option>
            <option value="civilian_targeting">Civilian Targeting</option>
            <option value="infrastructure_damage">Infrastructure Damage</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            placeholder="Filter by country..."
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {(filters.violation_type || filters.country) && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border-b p-4">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Legend:</span>
          {Object.entries(violationColors).map(([type, color]) => (
            <div key={type} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-xs text-gray-600">{violationLabels[type]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <MapContainer
          center={[35.0, 35.0]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {geodata.map((item, index) => (
            <CircleMarker
              key={index}
              center={[item.location.lat, item.location.lng]}
              radius={getMarkerSize(item.incident_count)}
              fillColor={getMarkerColor(item.violation_types)}
              color="white"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg mb-2">{item.region}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.country}</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Incidents:</span> {item.incident_count}
                    </p>
                    <div>
                      <span className="font-medium text-sm">Violation Types:</span>
                      <ul className="mt-1">
                        {item.violation_types.map((violation, idx) => (
                          <li key={idx} className="text-xs text-gray-700 flex items-center space-x-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: violationColors[violation] }}
                            ></div>
                            <span>{violationLabels[violation]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeoMapVisualization;