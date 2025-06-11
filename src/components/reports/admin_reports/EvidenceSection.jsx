import { useState } from 'react';
import { Camera, Video, FileText, File, Download, Eye, X, Play } from 'lucide-react';

const EvidenceSection = ({ evidence }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  if (!evidence || evidence.length === 0) return null;

  const getFullUrl = (url) => {
    if (url.startsWith('http')) return url;
    return `http://localhost:8000${url}`;
  };

  const getEvidenceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'photo':
      case 'image':
        return <Camera className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'document':
        return <FileText className="w-5 h-5 text-green-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const isImage = (type) => ['photo', 'image'].includes(type?.toLowerCase());
  const isVideo = (type) => type?.toLowerCase() === 'video';

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(getFullUrl(url));
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename || 'evidence';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download file');
    }
  };

  const getFilename = (url) => {
    return url.split('/').pop() || 'evidence';
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <Camera className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-gray-900">Evidence ({evidence.length})</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {evidence.map((evidenceItem, index) => (
            <div key={index} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-3">
                {getEvidenceIcon(evidenceItem.type)}
                <div>
                  <h4 className="font-medium text-purple-900">Evidence {index + 1}</h4>
                  <p className="text-sm text-purple-700 capitalize">{evidenceItem.type}</p>
                </div>
              </div>

              {isImage(evidenceItem.type) && (
                <div className="mb-4">
                  <div className="relative group cursor-pointer" onClick={() => setSelectedImage(getFullUrl(evidenceItem.url))}>
                    <img 
                      src={getFullUrl(evidenceItem.url)} 
                      
                      alt={evidenceItem.description}
                      className="w-full h-32 object-cover rounded-lg border border-purple-200"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center rounded-lg transition-all duration-200" style={{display: 'none'}}>
                      <div className="bg-purple-100 p-4 rounded-lg flex flex-col items-center">
                        <FileText className="w-8 h-8 text-purple-600 mb-2" />
                        <span className="text-sm text-purple-700">Failed to load image</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center rounded-lg transition-all duration-200">
                      <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                </div>
              )}

              {isVideo(evidenceItem.type) && (
                <div className="mb-4">
                  <div 
                    className="relative group cursor-pointer bg-gray-100 h-32 rounded-lg border border-purple-200 flex items-center justify-center"
                    onClick={() => setSelectedVideo(getFullUrl(evidenceItem.url))}
                  >
                    <div className="text-center">
                      <Play className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <span className="text-sm text-purple-700">Click to play video</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center rounded-lg transition-all duration-200">
                      <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-purple-700">Description:</span>
                  <p className="text-purple-900">{evidenceItem.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <span className="font-medium text-purple-700">File:</span>
                    <p className="text-purple-900 truncate">{getFilename(evidenceItem.url)}</p>
                  </div>
                  <button 
                    onClick={() => handleDownload(evidenceItem.url, getFilename(evidenceItem.url))}
                    className="ml-2 p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-200 rounded-lg transition-colors"
                    title="Download file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 p-2 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Evidence"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 bg-black bg-opacity-50 p-2 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              src={selectedVideo} 
              controls
              className="max-w-full max-h-full rounded-lg"
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EvidenceSection;