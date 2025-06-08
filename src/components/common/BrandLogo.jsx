import { Shield } from 'lucide-react';

const BrandLogo = ({ 
  size = "large", 
  color = "white", 
  showText = true, 
  text = "Human Rights Monitor",
  className = "" 
}) => {
  const sizes = {
    small: { icon: "w-6 h-6", text: "text-lg" },
    medium: { icon: "w-8 h-8", text: "text-xl" },
    large: { icon: "w-12 h-12", text: "text-3xl" },
    xlarge: { icon: "w-16 h-16", text: "text-4xl" }
  };

  const colors = {
    white: "text-white",
    blue: "text-blue-600",
    gray: "text-gray-800"
  };

  const currentSize = sizes[size];
  const currentColor = colors[color];

  return (
    <div className={`flex items-center ${className}`}>
      <Shield className={`${currentSize.icon} ${currentColor} ${showText ? 'mr-4' : ''}`} />
      {showText && (
        <h1 className={`${currentSize.text} font-bold ${currentColor}`}>
          {text}
        </h1>
      )}
    </div>
  );
};

export default BrandLogo;