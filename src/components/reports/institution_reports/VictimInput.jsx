import { Plus, Users } from "lucide-react";
import VictimCard from "./VictimCard";
import FormSection from "./FormSection";

const VictimInput = ({ victims, onVictimsChange }) => {
  const addVictim = () => {
    const newVictim = { name: '', occupation: 'civilian', gender: 'unknown', age: '' };
    onVictimsChange([...victims, newVictim]);
  };

  const updateVictim = (index, field, value) => {
    const updated = victims.map((victim, i) => 
      i === index ? { ...victim, [field]: value } : victim
    );
    onVictimsChange(updated);
  };

  const removeVictim = (index) => {
    onVictimsChange(victims.filter((_, i) => i !== index));
  };

  return (
    <FormSection 
      icon={Users} 
      title={`Victims (${victims.length})`}
    >
      <div className="mb-6">
        <button
          type="button"
          onClick={addVictim}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Add Victim
        </button>
      </div>

      <div className="space-y-4">
        {victims.map((victim, index) => (
          <VictimCard
            key={index}
            victim={victim}
            index={index}
            updateVictim={updateVictim}
            removeVictim={removeVictim}
          />
        ))}
        
        {victims.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No victims added yet</p>
            <p className="text-gray-400 text-sm">Click "Add Victim" to begin adding victim information</p>
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default VictimInput;