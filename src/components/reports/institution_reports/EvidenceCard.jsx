import {Camera, FileText, Trash2} from 'lucide-react';

const EvidenceCard = ({ evidence, index, updateEvidenceDescription, removeEvidence }) => (
  <div className="p-6 border-2 border-gray-200 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-sm">
          {evidence.type === 'photo' && <Camera className="w-5 h-5 text-green-600" />}
          {evidence.type === 'video' && <FileText className="w-5 h-5 text-blue-600" />}
          {evidence.type === 'document' && <FileText className="w-5 h-5 text-gray-600" />}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{evidence.filename}</p>
          <p className="text-sm text-gray-500 capitalize">{evidence.type}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeEvidence(index)}
        className="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200 flex items-center justify-center"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
    
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
      <textarea
        value={evidence.description}
        onChange={(e) => updateEvidenceDescription(index, e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        rows="3"
        placeholder="Describe this evidence and its relevance to the incident..."
      />
    </div>

    {evidence.type === 'photo' && (
      <div className="rounded-xl overflow-hidden shadow-sm">
        <img 
          src={evidence.url} 
          alt={evidence.filename} 
          className="w-full h-48 object-cover" 
        />
      </div>
    )}
  </div>
);

export default EvidenceCard;