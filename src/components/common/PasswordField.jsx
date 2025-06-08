import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordField = ({ 
  id, 
  label = "Password", 
  value, 
  onChange, 
  placeholder = "Enter your password", 
  required = false,
  className = "",
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full h-12 px-4 pr-12 border border-gray-300 rounded-lg text-base placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                     transition-all duration-200 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 
                   transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;