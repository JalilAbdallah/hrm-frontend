import React from 'react';
import { MapPin, Users, AlertTriangle, Clock, Calendar } from 'lucide-react';

const statusColors = {
  under_investigation: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 shadow-sm",
  active: "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 shadow-sm",
  closed: "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-slate-200 shadow-sm",
};

const priorityColors = {
  critical: "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg",
  high: "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md",
  medium: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md",
  low: "bg-gradient-to-r from-gray-400 to-slate-400 text-white shadow-sm",
};

const CaseCard = ({ caseData, onClick }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getVictimCount = (victims) => {
    if (!victims || victims.length === 0) return 0;
    return victims.reduce((total, victim) => total + (victim.count || 1), 0);
  };  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer transform hover:-translate-y-1 flex1 flex-col"
      onClick={() => onClick && onClick(caseData)}
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Priority Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${priorityColors[caseData.priority]}`}>
          {caseData.priority}
        </span>
      </div>      {/* Card Content */}
      <div className="relative p-6 flex-1 flex flex-col">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide">
              {caseData.case_id}
            </h3>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors min-h-[3.5rem]">
            {caseData.title}
          </h4>
          <p className="text-gray-600 line-clamp-3 leading-relaxed min-h-[4.5rem]">
            {caseData.description}
          </p>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold border ${statusColors[caseData.status]}`}>
            <div className="w-2 h-2 bg-current rounded-full mr-2"></div>
            {caseData.status.replace(/_/g, " ")}
          </span>
        </div>        {/* Info Grid */}
        <div className="space-y-3 mb-4 flex-shrink-0">
          {/* Location */}
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium">
              {caseData.location.region}, {caseData.location.country}
            </span>
          </div>

          {/* Victims */}
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="font-medium">
              {getVictimCount(caseData.victims)} victims affected
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium">
              {formatDate(caseData.created_at)}
            </span>
          </div>
        </div>        {/* Violation Types */}
        <div className="space-y-3 flex-1 min-h-[100px]">
          <div className="flex items-center gap-3 text-gray-700 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <span className="font-semibold text-sm">Violation Types:</span>
          </div>
          <div className="flex flex-wrap gap-2 ml-11">
            {caseData.violation_types.slice(0, 3).map((type, index) => (
              <span
                key={type}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 border border-indigo-200 hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 hover:scale-105 hover:shadow-md transform"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {type.replace(/_/g, " ")}
              </span>
            ))}
            {caseData.violation_types.length > 3 && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border border-gray-200 hover:from-gray-100 hover:to-slate-100 transition-all duration-200">
                +{caseData.violation_types.length - 3} more
              </span>
            )}
          </div>
        </div>{/* Perpetrator Info */}
        {caseData.perpetrators.length > 0 && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <div className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 rounded-xl p-4 border border-red-100 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                  Perpetrator Entity
                </span>
              </div>
              <p className="text-sm font-semibold text-red-800">
                {caseData.perpetrators[0].entity_name}
              </p>
              {caseData.perpetrators[0].entity_type && (
                <p className="text-xs text-red-600 mt-1 font-medium">
                  Type: {caseData.perpetrators[0].entity_type.replace(/_/g, " ")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
    }
export default CaseCard;
