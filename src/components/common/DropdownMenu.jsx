import { useEffect, useRef } from "react";
const DropdownMenu = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "",
  position = "bottom-full"
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const positionClasses = {
    'bottom-full': 'absolute bottom-full left-0 mb-2',
    'top-full': 'absolute top-full left-0 mt-2',
    'right-full': 'absolute right-full top-0 mr-2',
    'left-full': 'absolute left-full top-0 ml-2'
  };

  return (
    <div 
      ref={dropdownRef}
      className={`${positionClasses[position]} w-full bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownItem = ({ 
  children, 
  onClick, 
  className = "",
  variant = "default"
}) => {
  const variants = {
    default: "hover:bg-gray-50 text-gray-700",
    danger: "hover:bg-red-50 text-red-600"
  };

  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default DropdownMenu;