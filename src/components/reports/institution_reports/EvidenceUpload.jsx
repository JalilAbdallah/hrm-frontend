import FormSection from './FormSection';
import EvidenceCard from './EvidenceCard';
import { FileText, Upload } from 'lucide-react';
import { useRef } from 'react';

const EvidenceUpload = ({ evidence, onEvidenceChange }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const newEvidence = {
        type: file.type.startsWith('image/') ? 'photo' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        filename: file.name,
        url: URL.createObjectURL(file),
        description: '',
        file: file
      };
      
      onEvidenceChange([...evidence, newEvidence]);
    });
    
    e.target.value = '';
  };

  const updateEvidenceDescription = (index, description) => {
    const updated = evidence.map((ev, i) => 
      i === index ? { ...ev, description } : ev
    );
    onEvidenceChange(updated);
  };

  const removeEvidence = (index) => {
    onEvidenceChange(evidence.filter((_, i) => i !== index));
  };

  return (
    <FormSection 
      icon={FileText} 
      title={`Evidence (${evidence.length})`}
    >
      <div className="mb-6">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Upload className="w-5 h-5" />
          Upload Evidence
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: Images, Videos, PDF, Word documents
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="space-y-4">
        {evidence.map((ev, index) => (
          <EvidenceCard
            key={index}
            evidence={ev}
            index={index}
            updateEvidenceDescription={updateEvidenceDescription}
            removeEvidence={removeEvidence}
          />
        ))}
        
        {evidence.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No evidence uploaded yet</p>
            <p className="text-gray-400 text-sm">Click "Upload Evidence" to add supporting files</p>
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default EvidenceUpload;

