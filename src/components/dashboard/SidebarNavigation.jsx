import SidebarNavItem from './SidebarNavItem';

const SidebarNavigation = ({ 
  menuItems, 
  activeModule, 
  setActiveModule, 
  sidebarCollapsed 
}) => {
  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={activeModule === item.id}
            sidebarCollapsed={sidebarCollapsed}
            onClick={setActiveModule}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;