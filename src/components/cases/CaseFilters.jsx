import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Filter, X, Search } from 'lucide-react';
import { 
  violationTypes, 
  countries, 
  regions, 
  statuses, 
  priorities, 
  getFilterLabel 
} from '../../config/filterOptions';

const CaseFilters = ({ visible, onHide, filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const updateFilter = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };
  // Count active filters
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => value && value !== "").length;

return (
    <Sidebar 
        visible={visible} 
        position="right" 
        onHide={onHide}
        className="filter-sidebar"
        pt={{
            root: { 
                style: { 
                    width: '500px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderLeft: '2px solid #e2e8f0',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                } 
            },
            header: {
                style: {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    padding: '2rem',
                    borderBottom: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }
            }
        }}
    >  
        <div className="p-8 space-y-10 bg-gradient-to-b from-gray-50 via-white to-blue-50/30 min-h-full">
            {/* Quick Filter Stats */}
            <div className="bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40 rounded-3xl p-8 border-3 border-blue-100/80 shadow-2xl backdrop-blur-lg relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-purple-200/40 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-4">
                        <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl transform hover:rotate-6 transition-transform duration-300">
                        </div>
                        <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">Filter Summary</span>
                        {activeFilterCount > 0 && (
                            <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-full text-sm font-bold shadow-xl transition-transform">
                                {activeFilterCount} Active
                            </span>
                        )}
                    </h4>
                    
                    <div className="space-y-4">
                        {activeFilterCount === 0 ? (
                            <div className="flex items-center justify-center py-6">
                                <div className="text-center">
                                    <div className="w-13 h-13 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-4 opacity-70 transition-all duration-300 shadow-lg">
                                        <Filter className="w-8 h-8 text-gray-500" />
                                    </div>
                                    <p className="text-gray-600 font-semibold text-lg">No active filters</p>
                                    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">Use the filters below to refine your search and find specific cases</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-3">
                                {Object.entries(filters).filter(([key, value]) => value && value !== "").map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-blue-100/60 shadow-lg hover:shadow-xl transition-all duration-300 group hover:border-blue-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-full shadow-md"></div>
                                            <span className="text-sm font-bold text-gray-700 capitalize tracking-wide">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        </div>
                                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-blue-900 rounded-xl text-xs font-bold shadow-md group-hover:from-blue-200 group-hover:to-purple-200 transition-all">
                                            {getFilterLabel(key, value)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>            {/* Filter Sections */}
            {/* Search Field */}
            <div className="bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/40 rounded-3xl p-8 border-3 border-blue-100/80 shadow-2xl backdrop-blur-sm transition-all duration-300">
                <label className="block text-base font-bold text-gray-800 mb-5 flex items-center gap-4">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-300">
                        <Search className="w-2 h-2 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">Search by Title</span>
                </label>
                <InputText
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    placeholder="Enter case title to search..."
                    className="w-full enhanced-input transition-all duration-200"
                    style={{ 
                        borderRadius: '1rem', 
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        padding: '1rem 1.5rem',
                        fontSize: '1rem'
                    }}
                />
            </div>

            {[
                { key: 'violationType', label: 'Violation Type', options: violationTypes, color: 'from-blue-500 to-blue-700' },
                { key: 'country', label: 'Country', options: countries, color: 'from-emerald-500 to-emerald-700' },
                { key: 'region', label: 'Region', options: regions, color: 'from-purple-500 to-purple-700' },
                { key: 'status', label: 'Status', options: statuses, color: 'from-amber-500 to-amber-700' },
                { key: 'priority', label: 'Priority', options: priorities, color: 'from-red-500 to-red-700' }
            ].map((section) => (
                <div key={section.key} className="filter-section transition-all duration-300">
                    <label className="block text-base font-bold text-gray-800 mb-5 flex items-center gap-4">
                        <div className={`w-4 h-4 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-300`}>
                        </div>
                        <span className="bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent">{section.label}</span>
                    </label>
                    <Dropdown
                        value={filters[section.key]}
                        onChange={(e) => updateFilter(section.key, e.value)}
                        options={[
                            { label: `All ${section.label}s`, value: "" },
                            ...section.options
                        ]}
                        placeholder={`Select ${section.label.toLowerCase()}`}
                        className="w-full enhanced-dropdown transition-all duration-200"
                        pt={{
                            root: { style: { borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }
                        }}
                    />
                </div>
            ))}

            {/* Date Range */}
            <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 rounded-3xl p-8 border-3 border-indigo-100/80 shadow-2xl backdrop-blur-sm transition-all duration-300">
                <h4 className="text-xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-300">
                        <div className="w-4 h-4 bg-white rounded-lg shadow-sm"></div>
                    </div>
                    <span className="bg-gradient-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent">Date Range Filter</span>
                </h4>
                
                <div className="space-y-8">
                    <div className="date-field">
                        <label className="block text-base font-bold text-gray-700 mb-4 flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-md"></div>
                            <span>From Date</span>
                        </label>
                        <Calendar
                            value={filters.dateFrom ? new Date(filters.dateFrom) : null}
                            onChange={(e) => updateFilter('dateFrom', e.value ? e.value.toISOString().split('T')[0] : '')}
                            dateFormat="dd/mm/yy"
                            placeholder="Select start date"
                            className="w-full enhanced-calendar transition-all duration-200"
                            showIcon
                            pt={{
                                root: { style: { borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }
                            }}
                        />
                    </div>

                    <div className="date-field">
                        <label className="block text-base font-bold text-gray-700 mb-4 flex items-center gap-3">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-md"></div>
                            <span>To Date</span>
                        </label>
                        <Calendar
                            value={filters.dateTo ? new Date(filters.dateTo) : null}
                            onChange={(e) => updateFilter('dateTo', e.value ? e.value.toISOString().split('T')[0] : '')}
                            dateFormat="dd/mm/yy"
                            placeholder="Select end date"
                            className="w-full enhanced-calendar transition-all duration-200"
                            showIcon
                            pt={{
                                root: { style: { borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }
                            }}
                        />
                    </div>
                </div>
            </div>

            <Divider className="my-10 opacity-30" />
            
            {/* Action Buttons */}
            <div className="space-y-6">
                <div className="relative transition-all duration-300">
                    <Button
                        label="Clear All Filters"
                        onClick={onClearFilters}
                        className="w-full enhanced-clear-button"
                        icon={() => <X className="w-5 h-5 transition-transform duration-500" />}
                        outlined
                        disabled={activeFilterCount === 0}
                        pt={{
                            root: { 
                                style: { 
                                    borderRadius: '1.5rem', 
                                    padding: '1rem 2rem',
                                    boxShadow: activeFilterCount > 0 ? '0 10px 25px rgba(0,0,0,0.15)' : 'none',
                                    border: '2px solid',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                } 
                            }
                        }}
                    />
                    {activeFilterCount === 0 && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/90 to-gray-200/90 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                            <span className="text-sm text-gray-600 font-semibold">No filters to clear</span>
                        </div>
                    )}
                </div>                
                <div className="relative transition-all duration-300">
                    <Button
                        label={`Apply Filters ${activeFilterCount > 0 ? `(${activeFilterCount})` : ''}`}
                        onClick={() => {
                            onApplyFilters();
                            onHide();
                        }}
                        className="w-full enhanced-apply-button"
                        icon={() => <Filter className="w-5 h-5 transition-transform duration-300" />}
                        pt={{
                            root: {
                                style: {
                                    borderRadius: '1.5rem',
                                    padding: '1rem 2rem',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                                    border: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                                }
                            },
                            label: {
                                style: {
                                    fontWeight: 'bold'
                                }
                            }
                        }}
                    />
                    
                </div>
            </div>
        </div>
    </Sidebar>
);
};

export default CaseFilters;
