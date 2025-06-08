const CheckboxField = ({ 
  id, 
  label, 
  checked, 
  onChange, 
  className = "",
  ...props 
}) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 
                 focus:ring-blue-200 focus:ring-offset-0 transition-all duration-200"
        {...props}
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;