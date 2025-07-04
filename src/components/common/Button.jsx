import { Loader2 } from 'lucide-react'; // Assuming you have lucide-react installed
const Button = ({ 
  children, 
  type = "button", 
  variant = "primary", 
  size = "medium",
  className = "",
  disabled = false,
  onClick,
  isLoading = false,
  ...props 
}) => {
  const baseClasses = "font-semibold rounded-lg transition-all duration-200 focus:outline-none";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-2 focus:ring-blue-200 focus:ring-offset-2",
    secondary: "text-blue-600 hover:text-blue-700 hover:underline",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-200"
  };

  const sizes = {
    small: "h-8 px-3 text-sm",
    medium: "h-12 px-4 text-base",
    large: "h-14 px-6 text-lg"
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;