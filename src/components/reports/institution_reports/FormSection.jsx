const FormSection = ({ icon: Icon, title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-8 ${className}`}>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

export default FormSection;