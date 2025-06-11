import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { fetchTrendData } from '../../api/analyticsAPI';

const ViolationTrendsChart = ({ data: initialData }) => {
  const [selectedViolations, setSelectedViolations] = useState(new Set(['all']));
  const [hoveredViolation, setHoveredViolation] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [yearRange, setYearRange] = useState([1950, 2025]);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  }

  const debouncedFetchData = useCallback(
    debounce(async (yearFrom, yearTo) => {
      try {
        setLoading(true);
        setError(null);
        const newData = await fetchTrendData(yearFrom, yearTo);
        setData(newData);
      } catch (err) {
        console.error('Failed to fetch trends data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (yearRange[0] !== 1950 || yearRange[1] !== 2025) {
      debouncedFetchData(yearRange[0], yearRange[1]);
    }
  }, [yearRange, debouncedFetchData]);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  if (!data) return null;

  const violationTypes = data.violation_types_included || [];
  const violationColors = {
    attack_on_medical: '#ef4444',
    attack_on_education: '#3b82f6',
    war_crimes: '#dc2626',
    civilian_targeting: '#f59e0b',
    infrastructure_damage: '#10b981',
    other: '#6b7280'
  };

  const violationLabels = {
    attack_on_medical: 'Attack on Medical',
    attack_on_education: 'Attack on Education',
    war_crimes: 'War Crimes',
    civilian_targeting: 'Civilian Targeting',
    infrastructure_damage: 'Infrastructure Damage',
    other: 'Other'
  };

  const chartData = data.data?.filter(yearData => yearData.total_violations > 0) || [];
  const maxViolations = Math.max(...chartData.map(year => year.total_violations), 1);
  
  const chartWidth = 1150;
  const chartHeight = 600;
  const padding = { top: -500, right: 60, bottom: 100, left: 80 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const toggleViolationType = (type) => {
    const newSelected = new Set(selectedViolations);
    if (type === 'all') {
      if (selectedViolations.has('all')) {
        newSelected.clear();
      } else {
        newSelected.clear();
        newSelected.add('all');
        violationTypes.forEach(vType => newSelected.add(vType));
      }
    } else {
      if (newSelected.has(type)) {
        newSelected.delete(type);
        newSelected.delete('all');
      } else {
        newSelected.add(type);
        if (newSelected.size === violationTypes.length) {
          newSelected.add('all');
        }
      }
    }
    setSelectedViolations(newSelected);
    
    if (type !== 'all') {
      setHoveredViolation(newSelected.has(type) ? type : null);
    }
  };

  const handleYearRangeChange = (index, value) => {
    const newRange = [...yearRange];
    newRange[index] = parseInt(value);
    
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1];
    }
    
    setYearRange(newRange);
  };

  const generatePath = (violationType) => {
    if (!selectedViolations.has(violationType) && !selectedViolations.has('all')) {
      return '';
    }

    const points = chartData.map((yearData, index) => {
      const violation = yearData.violations.find(v => v.violation_type === violationType);
      const count = violation ? violation.count : 0;
      
      const x = padding.left + (index / Math.max(chartData.length - 1, 1)) * plotWidth;
      const y = padding.top + plotHeight - (count / maxViolations) * plotHeight;
      
      return `${x},${y}`;
    });

    return `M ${points.join(' L ')}`;
  };

  const generatePoints = (violationType) => {
    if (!selectedViolations.has(violationType) && !selectedViolations.has('all')) {
      return [];
    }

    return chartData.map((yearData, index) => {
      const violation = yearData.violations.find(v => v.violation_type === violationType);
      const count = violation ? violation.count : 0;
      
      const x = padding.left + (index / Math.max(chartData.length - 1, 1)) * plotWidth;
      const y = padding.top + plotHeight - (count / maxViolations) * plotHeight;
      
      return { x, y, count, year: yearData.year };
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white">
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-slider {
            -webkit-appearance: none;
            height: 8px;
            border-radius: 4px;
            background: #e5e7eb;
            outline: none;
            cursor: pointer;
          }
          
          .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #8b5cf6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }
          
          .custom-slider::-webkit-slider-thumb:hover {
            background: #7c3aed;
            transform: scale(1.1);
          }
          
          .custom-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #8b5cf6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }
          
          .custom-slider::-moz-range-track {
            height: 8px;
            cursor: pointer;
            background: #e5e7eb;
            border-radius: 4px;
            border: none;
          }
          
          .custom-slider:focus::-webkit-slider-thumb {
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
          }
        `
      }} />

      <div className="text-center mb-10">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-900">Violation Trends Analysis</h2>
        </div>
        <p className="text-gray-600 text-lg">
          Total violations across {data.years_analyzed} years: {data.total_violations_all_years}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-700">Failed to load trends data: {error}</p>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Year Range</h3>
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
          <div className="flex items-center space-x-8">
            <div className="flex-1">
              <label className="block text-base text-gray-600 mb-3 font-medium">From Year</label>
              <input
                type="range"
                min="1950"
                max="2025"
                value={yearRange[0]}
                onChange={(e) => handleYearRangeChange(0, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer custom-slider"
                disabled={loading}
              />
              <div className="text-center text-xl font-semibold text-gray-700 mt-3">
                {yearRange[0]}
              </div>
            </div>
            <div className="text-gray-400 text-2xl">-</div>
            <div className="flex-1">
              <label className="block text-base text-gray-600 mb-3 font-medium">To Year</label>
              <input
                type="range"
                min="1950"
                max="2025"
                value={yearRange[1]}
                onChange={(e) => handleYearRangeChange(1, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer custom-slider"
                disabled={loading}
              />
              <div className="text-center text-xl font-semibold text-gray-700 mt-3">
                {yearRange[1]}
              </div>
            </div>
          </div>
          {loading && (
            <div className="text-center mt-6">
              <span className="text-xl text-purple-600 font-medium">Loading data...</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-6 text-center">Violation Types</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => toggleViolationType('all')}
            onMouseEnter={() => setHoveredViolation('all')}
            onMouseLeave={() => setHoveredViolation(null)}
            className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 ${
              selectedViolations.has('all')
                ? 'bg-purple-100 text-purple-700 border border-purple-300 shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:shadow-md hover:scale-105'
            }`}
          >
            All Types
          </button>
          {violationTypes.map(type => (
            <button
              key={type}
              onClick={() => toggleViolationType(type)}
              onMouseEnter={() => setHoveredViolation(type)}
              onMouseLeave={() => setHoveredViolation(null)}
              className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border ${
                selectedViolations.has(type) || selectedViolations.has('all')
                  ? 'text-white border-transparent shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 border-gray-300 hover:shadow-md hover:scale-105'
              } ${hoveredViolation === type ? 'ring-4 ring-opacity-50' : ''}`}
              style={{
                backgroundColor: (selectedViolations.has(type) || selectedViolations.has('all')) 
                  ? violationColors[type] 
                  : undefined,
                ringColor: hoveredViolation === type ? violationColors[type] : undefined
              }}
            >
              {violationLabels[type]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-8 overflow-x-auto relative mb-10">
        <svg width={chartWidth} height={chartHeight} className="w-full h-auto">
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
            <g key={ratio}>
              <line
                x1={padding.left}
                y1={padding.top + plotHeight * ratio}
                x2={padding.left + plotWidth}
                y2={padding.top + plotHeight * ratio}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 15}
                y={padding.top + plotHeight * ratio + 5}
                textAnchor="end"
                className="text-sm fill-gray-500"
              >
                {Math.round(maxViolations * (1 - ratio))}
              </text>
            </g>
          ))}

          {chartData.map((yearData, index) => (
            <text
              key={yearData.year}
              x={padding.left + (index / Math.max(chartData.length - 1, 1)) * plotWidth}
              y={chartHeight - 15}
              textAnchor="middle"
              className="text-sm fill-gray-600"
            >
              {yearData.year}
            </text>
          ))}

          {violationTypes.map(type => {
            const isVisible = selectedViolations.has(type) || selectedViolations.has('all');
            const isHovered = hoveredViolation === type || hoveredViolation === 'all';
            const isOtherHovered = hoveredViolation && hoveredViolation !== type && hoveredViolation !== 'all';
            
            return (
              <g key={type}>
                {isHovered && isVisible && (
                  <path
                    d={generatePath(type)}
                    fill="none"
                    stroke={violationColors[type]}
                    strokeWidth="8"
                    strokeOpacity="0.3"
                    filter="blur(3px)"
                  />
                )}
                
                <path
                  d={generatePath(type)}
                  fill="none"
                  stroke={violationColors[type]}
                  strokeWidth={isHovered ? "4" : "3"}
                  strokeOpacity={
                    isVisible ? 
                      (isOtherHovered ? 0.3 : 1) : 
                      0.1
                  }
                  className="transition-all duration-200"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 6px ${violationColors[type]}40)` : 'none'
                  }}
                />
                
                {generatePoints(type).map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? "6" : "5"}
                      fill={violationColors[type]}
                      fillOpacity={
                        isVisible ? 
                          (isOtherHovered ? 0.3 : 1) : 
                          0.1
                      }
                      stroke="white"
                      strokeWidth="3"
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => {
                        setHoveredPoint({
                          type,
                          data: point
                        });
                      }}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{
                        filter: isHovered ? `drop-shadow(0 0 6px ${violationColors[type]}60)` : 'none'
                      }}
                    />
                  </g>
                ))}
              </g>
            );
          })}

          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={padding.left + plotWidth}
            y2={padding.top + plotHeight}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#374151"
            strokeWidth="2"
          />
        </svg>
        
        {hoveredPoint && (
          <div 
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 pointer-events-none z-10"
            style={{
              left: Math.max(10, Math.min(hoveredPoint.data.x - 80, chartWidth - 160)),
              top: Math.max(10, hoveredPoint.data.y - 100),
              transform: 'translateY(-100%)'
            }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: violationColors[hoveredPoint.type] }}
              ></div>
              <span className="text-base font-semibold text-gray-800">
                {violationLabels[hoveredPoint.type]}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <div>Year: {hoveredPoint.data.year}</div>
              <div>Violations: {hoveredPoint.data.count}</div>
            </div>
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid white'
              }}
            ></div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <span className="text-base font-medium text-blue-700">Peak Year</span>
          </div>
          <p className="text-3xl font-bold text-blue-900 mt-2">
            {chartData.length > 0 
              ? chartData.reduce((max, current) => 
                  current.total_violations > max.total_violations ? current : max, 
                  chartData[0]
                ).year 
              : 'N/A'
            }
          </p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-base font-medium text-green-700">Total Types</span>
          </div>
          <p className="text-3xl font-bold text-green-900 mt-2">
            {violationTypes.length}
          </p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-purple-600" />
            <span className="text-base font-medium text-purple-700">Years Analyzed</span>
          </div>
          <p className="text-3xl font-bold text-purple-900 mt-2">
            {data.years_analyzed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViolationTrendsChart;
