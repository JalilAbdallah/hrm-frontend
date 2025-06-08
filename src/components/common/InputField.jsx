const InputField = ({ 
  type = "text", 
  id, 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = "",
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full h-12 px-4 border border-gray-300 rounded-lg text-base placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 
                   transition-all duration-200 ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;