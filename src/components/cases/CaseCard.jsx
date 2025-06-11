import React from 'react';
import { MapPin, Users, AlertTriangle, Clock, Calendar, Archive, Lock } from 'lucide-react';

const statusColors = {
  under_investigation: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-300 shadow-md",
  new: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-300 shadow-md",
  closed: "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-300 shadow-md",
  archived: "bg-gradient-to-r from-gray-800 to-gray-900 text-red-400 border-gray-700 shadow-lg",
};
const priorityColors = {
  high: "bg-red-500 text-white shadow-md",
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
  };

  const isArchived = caseData.status === 'archived';  return (
    <div 
      className={`group relative rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border cursor-pointer transform hover:-translate-y-1 flex1 flex-col ${
        isArchived 
          ? 'bg-gray-900 border-gray-700 hover:border-red-400' 
          : 'bg-white border-gray-100 hover:border-blue-200'
      }`}
      onClick={() => onClick && onClick(caseData)}
    >
      {/* Archived Overlay */}
      {isArchived && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/95 to-gray-900/95 z-20 flex items-center justify-center">
          <div className="absolute top-4 right-4">
            <Lock className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <Archive className="w-12 h-12 text-red-400 mx-auto mb-2 opacity-50" />
            <div className="text-red-400 text-xs font-bold uppercase tracking-wider">ARCHIVED</div>
            <div className="text-red-400 text-xs font-bold uppercase tracking-wider">{caseData.case_id}</div>
            <div className="text-gray-400 text-xs mt-1">Classified Case</div>

          </div>
        </div>
      )}

      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isArchived 
          ? 'bg-gradient-to-r from-red-500/20 via-gray-500/20' 
          : 'bg-gradient-to-r from-blue-500/10 via-purple-500/10'
      }`}></div>
      
      {/* Priority Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${priorityColors[caseData.priority]}`}>
          {caseData.priority}
        </span>
      </div>      {/* Card Content */}
      <div className="relative p-6 flex-1 flex flex-col">        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wide">
              {caseData.case_id}
            </h3>
          </div>
          <h4 className={`text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors min-h-[3.5rem] ${
            isArchived ? 'blur-sm' : ''
          }`}>
            {caseData.title}
          </h4>
          <p className={`text-gray-600 line-clamp-3 leading-relaxed min-h-[4.5rem] ${
            isArchived ? 'blur-sm' : ''
          }`}>
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
        <div className={`space-y-3 mb-4 flex-shrink-0 ${isArchived ? 'blur-sm' : ''}`}>
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

          {/* Date - NOT BLURRED for archived cases */}
          <div className="flex items-center gap-3 text-gray-700">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-purple-600" />
            </div>
            <span className="font-medium">
              {formatDate(caseData.created_at)}
            </span>
          </div>
        </div>        {/* Violation Types */}
        <div className={`space-y-3 flex-1 min-h-[100px] ${isArchived ? 'blur-sm' : ''}`}>
          <div className="flex items-center gap-3 text-gray-700 mb-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <span className="font-semibold text-sm">Violation Types:</span>
          </div>          <div className="flex flex-wrap gap-2 ml-11">
            {caseData.violation_types.slice(0, 2).map((type, index) => (
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
            {caseData.violation_types.length > 2 && (
              <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 border border-gray-200 hover:from-gray-100 hover:to-slate-100 transition-all duration-200">
                +{caseData.violation_types.length - 2}
              </span>
            )}
          </div>
        </div>        {/* Perpetrator Info */}
        {caseData.perpetrators.length > 0 && (
          <div className={`mt-5 pt-5 border-t border-gray-100 ${isArchived ? 'blur-sm' : ''}`}>
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
