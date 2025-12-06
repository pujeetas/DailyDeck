import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";

const DashboardRouter = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardRouter;
