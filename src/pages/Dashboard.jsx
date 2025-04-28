import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {Sidebar} from "../component/core/Dashboard/Sidebar";

export const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth ?? {});
  const { loading: profileLoading } = useSelector((state) => state.profile ?? {});

  if(authLoading|| profileLoading){
    return(<div className="felx items-center justify-center">
        Loading....
    </div>)
  }

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 bg-black shadow-lg p-4">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-pure-greys-800 shadow-md rounded-lg p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

