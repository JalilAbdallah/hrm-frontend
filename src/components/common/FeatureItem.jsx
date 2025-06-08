const FeatureItem = ({ icon: IconComponent, title, description, iconBgClass = "bg-white/10" }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className={`${iconBgClass} p-3 rounded-lg flex-shrink-0`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-blue-100 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;