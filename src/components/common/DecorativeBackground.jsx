const DecorativeBackground = ({ variant = "blue" }) => {
  const variants = {
    blue: {
      element1: "top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl",
      element2: "bottom-20 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-lg",
      element3: "top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"
    },
    purple: {
      element1: "top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl",
      element2: "bottom-20 left-10 w-24 h-24 bg-purple-400/20 rounded-full blur-lg",
      element3: "top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-md"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute ${currentVariant.element1}`}></div>
      <div className={`absolute ${currentVariant.element2}`}></div>
      <div className={`absolute ${currentVariant.element3}`}></div>
    </div>
  );
};

export default DecorativeBackground;