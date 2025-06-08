const SidebarNavItem = ({ 
  item, 
  isActive, 
  sidebarCollapsed, 
  onClick 
}) => {
  const IconComponent = item.icon;
  
  return (
    <li>
      <button
        onClick={() => onClick(item.id)}
        className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
          isActive 
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
        }`}
        title={sidebarCollapsed ? item.label : ''}
      >
        <div className={`flex-shrink-0 ${sidebarCollapsed ? 'mx-auto' : ''}`}>
          <IconComponent 
            size={22} 
            className={`${isActive ? 'text-white' : 'group-hover:text-blue-600'}`} 
          />
        </div>
        {!sidebarCollapsed && (
          <div className="flex-1 flex items-center justify-between min-w-0">
            <span className="font-medium truncate">{item.label}</span>
            {item.developer && (
              <span className={`text-xs px-2 py-1 rounded-full text-nowrap ${
                isActive 
                  ? 'bg-blue-500 text-blue-100' 
                  : 'bg-gray-200 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700'
              }`}>
                {item.developer}
              </span>
            )}
          </div>
        )}
      </button>
    </li>
  );
};

export default SidebarNavItem;