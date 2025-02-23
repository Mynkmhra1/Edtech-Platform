import { NavLink, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";

export const SidebarLink = ({ name, path, icon }) => {
  const Icon = Icons[icon]; // Retrieve the icon dynamically
  const location = useLocation();
  const isActive = location.pathname === path; // Check if the route is active

  return (
    <NavLink
      to={path}
      className={`flex items-center gap-3 p-3 rounded-lg transition-all 
        ${isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"}`}
    >
      {Icon && (
        <Icon className={`text-xl transition-all ${isActive ? "text-blue-400" : "text-gray-400"}`} />
      )}
      <span>{name}</span>
    </NavLink>
  );
};