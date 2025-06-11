import { Users, User } from 'lucide-react';

const VictimsSection = ({ victims }) => {
  if (!victims || victims.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Users className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">Victims ({victims.length})</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {victims.map((victim, index) => (
          <div key={index} className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <h4 className="font-medium text-orange-900">Victim {index + 1}</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-orange-700">Name:</span>
                <span className="font-medium text-orange-900">{victim.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-700">Occupation:</span>
                <span className="font-medium text-orange-900">{victim.occupation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-700">Gender:</span>
                <span className="font-medium text-orange-900">{victim.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-700">Age:</span>
                <span className="font-medium text-orange-900">{victim.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default VictimsSection;