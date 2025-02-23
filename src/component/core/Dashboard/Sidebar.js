import { sidebarLinks } from "../../../data/dashboard-links";
import { logOut } from "../../../services/operations/authapi";

import { useSelector } from "react-redux";
import { SidebarLink } from "./SIdebarlink";

export const Sidebar = () => {
    const { loading: authLoading } = useSelector((state) => state.auth ?? {});
    const { user ,loading: profileLoading } = useSelector((state) => state.profile ?? {});
  
    if(authLoading|| profileLoading){
      return(<div className="felx items-center justify-center">
          Loading....
      </div>)
    }

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      {
        sidebarLinks.map((link)=>{
            if(link.type && link.type !== user.accountType )return(null);
            return(
                <div>
                    <SidebarLink key={link.id}link={link} icon={link.icon} name={link.name} path={link.path}></SidebarLink>
                </div>
            )
        })
      }
      <button
        onClick={logOut}
        className="mt-4 bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};
