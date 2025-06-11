import { Trash2 } from 'lucide-react';

const GENDER_OPTIONS = ["male", "female"];
const OCCUPATION_OPTIONS = ["civilian", "doctor", "nurse", "teacher", "student", "aid_worker", "journalist", "other"];

const VictimCard = ({ victim, index, updateVictim, removeVictim }) => (
  <div className="p-6 border-2 border-gray-200 rounded-2xl relative bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
    <button
      type="button"
      onClick={() => removeVictim(index)}
      className="absolute top-4 right-4 w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
    >
      <Trash2 className="w-4 h-4" />
    </button>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={victim.name}
          onChange={(e) => updateVictim(index, 'name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Victim name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
        <select
          value={victim.occupation}
          onChange={(e) => updateVictim(index, 'occupation', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          {OCCUPATION_OPTIONS.map(occ => (
            <option key={occ} value={occ} className="capitalize">{occ}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
        <select
          value={victim.gender}
          onChange={(e) => updateVictim(index, 'gender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          {GENDER_OPTIONS.map(gender => (
            <option key={gender} value={gender} className="capitalize">{gender}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
        <input
          type="number"
          value={victim.age}
          onChange={(e) => updateVictim(index, 'age', parseInt(e.target.value) || '')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          placeholder="Age"
          min="0"
          max="150"
        />
      </div>
    </div>
  </div>
);

export default VictimCard;