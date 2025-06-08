import { DashboardProvider } from "../../context/DashboardContext";
import Sidebar from "./SideBar";
import MainContent from "./MainContent";

const DashboardLayout = () => {
  return (
    <DashboardProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
