import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ImCart } from "react-icons/im";
import Logo from "../../../assets/Logo/Logo-Full-Light.png";
import { logout } from "../../../reducer/Slices/authSlice"; // Import logout action

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get state from Redux store
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);
  const totalItems = useSelector((state) => state.cart.totalItems);


  // Logout Handler
  const handleLogout = () => {
    dispatch(logout());  // Clears the token in Redux
    navigate("/")
    };

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white border-b-[1px] border-b-richblack-700 shadow-md z-50">
      {/* Inner Container to Keep Content Centered */}
      <div className="max-w-[1000px] mx-auto flex flex-wrap items-center justify-between p-4 sm:px-8">
        
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Center Links */}
        <div className="flex-1 flex justify-center space-x-4 text-lg sm:text-xl flex-wrap">
          <Link to="/">Home</Link>
          <Link to="/" className="flex flex-row items-center">
            Catalog <RiArrowDropDownLine />
          </Link>
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
            { user && user?.accountType=="Student"&&
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
            <Link to="/dashboard">
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
            <p className="text-gray-300 text-sm sm:text-base">{user?.name || "User"}</p>
          </div>
          
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
