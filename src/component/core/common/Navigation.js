import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCart } from "react-icons/im";
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { logout } from "../../../reducer/Slices/authSlice"; // Import logout action
import { useEffect, useState } from "react";
import { apiConnector } from "../../../services/apiconnector";
import {categories} from "../../../services/Apis"
import {logoutProfile} from "../../../reducer/Slices/profileslice"
import { logOut } from "../../../services/operations/authapi";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get state from Redux store
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const totalItems = useSelector((state) => state.cart.totalItems);
  
  //sublinks
  const[subLinks, setSubLinks]=useState([])

  const fetchsublinks =async ()=>{
    try{
      const result = await apiConnector("GET",categories.CATEGORIES_API)
      console.log(result.data.data.allCategory);
      
      setSubLinks(result.data.data.allCategory)
    }
    catch(err){
      console.log("could not fetch categories details",err);
    }
  }

  useEffect(()=>{
    fetchsublinks()
    console.log("re render while token changed",token);
      
  },[token])

  // Logout Handler
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logOut(navigate))
    };

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white border-b-[1px] border-b-richblack-700 shadow-md z-50">
      {/* Inner Container to Keep Content Centered */}
      <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-between p-4 sm:px-8">
        
        {/* Logo */}
        {/* <div>
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10" />
          </Link>
        </div> */}

        {/* Center Links */}
        <div className="flex-1 flex justify-center space-x-4 text-lg sm:text-xl flex-wrap">
          <Link to="/">Home</Link>
          <div className="relative group">
            <Link to="/" className="flex flex-row items-center">
              Catalog <RiArrowDropDownLine />
            </Link>

            {/* Dropdown - Appears on Hover */}
            <div className="absolute -left-24 mt-2 w-60 bg-white  shadow-lg rounded-lg p-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:block transition-all duration-300">
              <div className="text-black">
              {subLinks.map((link) => (
                  <div key={link.id}>{link.Name}</div>
              ))}

              </div>
            
            <div className="absolute top-0 left-44 -translate-x-1 -translate-y-2 lg:w-4 lg:h-4 rotate-45 bg-white"> </div>
          </div>
          </div>

          <Link to="/about">About</Link>
          <Link to="/contact">Support</Link>
        </div>

        {/* Buttons */}
        <div className="space-x-2 mt-4 sm:mt-0 flex flex-wrap justify-center">
          {!token ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-sm sm:text-base">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 text-sm sm:text-base">
                  Signup
                </button>
              </Link>
            </>
          ) : (

          <div className="flex flex-row items-center justify-center space-x-4">
            {/* Cart Button with Absolute Count */}
            { user && user?.accountType==="Student"&&
            <div className="relative">
              <Link to="/dashboard/cart">
                <button className="relative px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 text-sm sm:text-base">
                  <ImCart />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-[2px] rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>
              </Link>
            </div>
}
            {/* Dashboard Button */}
            <Link to="/dashboard/my-profile">
              <button className="px-4 py-2 bg-purple-500 rounded-lg hover:bg-purple-600 text-sm sm:text-base">
                Dashboard
              </button>
            </Link>
          
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-sm sm:text-base"
            >
              Logout
            </button>
          
            {/* Show User Name */}
            {user?.image ? (
                <img
                  src={user.image}  // Use the image URL from the user object
                  alt="User Profile"
                  className="w-10 h-10 rounded-full border border-white object-cover"
                />
              ) : (
                <span className="text-gray-300 text-sm sm:text-base">User</span>
              )}
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
