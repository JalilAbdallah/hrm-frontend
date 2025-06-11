import { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, PieChart } from 'lucide-react';
import { fetchViolaitonTrends } from '../../api/analyticsAPI';

const ViolationsPieChart = () => {
  const [pieData, setPieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  // Debounce utility function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }  // Debounced fetch function with 1 second delay to let users finish typing
  const debouncedFetchData = useCallback(
    debounce(async (city, country) => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchViolaitonTrends(2015, 2025, city, country);
        setPieData(data);
      } catch (err) {
        console.error('Failed to fetch violation pie data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );
  useEffect(() => {
    const loadPieData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Corrected order: selectedCountry, then selectedCity
        const data = await fetchViolaitonTrends(2015, 2025, selectedCountry, selectedCity);
        setPieData(data);
      } catch (err) {
        console.error('Failed to fetch violation pie data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPieData();
  }, []);

  // Effect to fetch data when filters change
  useEffect(() => {
    // Corrected order: selectedCountry, then selectedCity
    debouncedFetchData(selectedCountry, selectedCity);
  }, [selectedCountry, selectedCity, debouncedFetchData]);
  // Handle filter changes
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading violation distribution data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
          <p className="text-red-700">Failed to load violation distribution: {error}</p>
        </div>
      </div>
    );
  }
  // Handle reset filters
  const handleResetFilters = () => {
    setSelectedCountry('');
    setSelectedCity('');
    // Fetch data with empty parameters
    debouncedFetchData('', '');
  };

  if (!pieData || !pieData.data || pieData.data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <PieChart className="w-7 h-7 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">Violation Type Distribution</h3>
          </div>
          <p className="text-gray-600">No violation data found for the current filters</p>
        </div>

        {/* Gray Circle Placeholder */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <svg width="500" height="500" className="drop-shadow-lg">
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="#9ca3af"
                stroke="white"
                strokeWidth="2"
                className="opacity-50"
              />
            </svg>
            
            {/* Center circle with message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-lg border-2 border-gray-200">
                <PieChart className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500 text-center px-2">No Data</span>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Reset Filters & Show All Data</span>
          </button>

          {/* Current Filters Display */}
          {(selectedCountry || selectedCity) && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Current Filters:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedCountry && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                    Country: {selectedCountry}
                  </span>
                )}
                {selectedCity && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    City: {selectedCity}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Color scheme for different violation types
  const colors = [
    '#ef4444', // red
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // purple
    '#6b7280', // gray
    '#ec4899', // pink
    '#06b6d4', // cyan
  ];

  // Label mapping for violation types
  const violationLabels = {
    attack_on_medical: 'Attack on Medical',
    attack_on_education: 'Attack on Education',
    war_crimes: 'War Crimes',
    civilian_targeting: 'Civilian Targeting',
    infrastructure_damage: 'Infrastructure Damage',
    other: 'Other'
  };

  // Calculate percentages and create pie segments
  const totalViolations = pieData.total_violations;
  let currentAngle = 0;
  
  const segments = pieData.data.map((item, index) => {
    const percentage = (item.count / totalViolations) * 100;
    const angle = (item.count / totalViolations) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      angle,
      startAngle,
      endAngle,
      color: colors[index % colors.length],
      label: violationLabels[item.violation_type] || item.violation_type
    };
  });

  // SVG dimensions
  const size = 500;
  const radius = 200;
  const center = size / 2;

  // Function to create SVG path for pie segment
  const createPieSlice = (segment) => {
    const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
    const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
    
    const x1 = center + radius * Math.cos(startAngleRad);
    const y1 = center + radius * Math.sin(startAngleRad);
    const x2 = center + radius * Math.cos(endAngleRad);
    const y2 = center + radius * Math.sin(endAngleRad);
    
    const largeArcFlag = segment.angle > 180 ? 1 : 0;
    
    return `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <PieChart className="w-7 h-7 text-purple-600" />
          <h3 className="text-2xl font-bold text-gray-900">Violation Type Distribution</h3>
        </div>
        <p className="text-gray-600">
          Distribution of {totalViolations} violations across {pieData.unique_types} violation types
        </p>
      </div>      {/* Filter Controls */}
    

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Pie Chart */}
        <div className="relative">
          <svg width={size} height={size} className="drop-shadow-lg">
            {segments.map((segment, index) => (
              <g key={segment.violation_type}>
                <path
                  d={createPieSlice(segment)}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="2"
                  className={`transition-all duration-200 cursor-pointer ${
                    hoveredSegment === index ? 'brightness-110 scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{
                    filter: hoveredSegment === index ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
                    transformOrigin: `${center}px ${center}px`
                  }}
                />
                
                {/* Percentage labels inside segments (for larger segments) */}
                {segment.percentage > 8 && (
                  <text
                    x={center + (radius * 0.7) * Math.cos((segment.startAngle + segment.angle/2 - 90) * Math.PI / 180)}
                    y={center + (radius * 0.7) * Math.sin((segment.startAngle + segment.angle/2 - 90) * Math.PI / 180)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-sm font-semibold pointer-events-none"
                  >
                    {segment.percentage.toFixed(1)}%
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Center circle with total */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg border-2 border-gray-100">
              <span className="text-2xl font-bold text-gray-900">{totalViolations}</span>
              <span className="text-xs text-gray-500">Total</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Legend</h4>
          {segments.map((segment, index) => (
            <div
              key={segment.violation_type}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                hoveredSegment === index ? 'bg-gray-50 scale-105' : 'hover:bg-gray-50'
              }`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: segment.color }}
              ></div>
              <div className="flex-1">
                <p className="font-medium text-gray-800">{segment.label}</p>
                <p className="text-sm text-gray-600">
                  {segment.count} violations ({segment.percentage.toFixed(1)}%)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-900">{pieData.unique_types}</div>
          <div className="text-sm text-purple-700">Violation Types</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-900">{totalViolations}</div>
          <div className="text-sm text-blue-700">Total Violations</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-900">
            {segments.length > 0 ? segments[0].label : 'N/A'}
          </div>
          <div className="text-sm text-green-700">Most Common Type</div>
        </div>
      </div>
    </div>
  );
};

export default ViolationsPieChart;
