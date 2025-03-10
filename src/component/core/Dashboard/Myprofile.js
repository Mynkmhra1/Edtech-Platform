import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Myprofile = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center p-6 bg-pure-greys-900 min-h-screen">
            <h1 className="text-3xl text-white font-bold mb-6">My Profile</h1>
            
            {/* Profile Section */}
            <div className="bg-richblack-800 shadow-md rounded-lg p-6 w-10/12 flex flex-col md:flex-row justify-between items-center md:items-start">
                {/* Profile Image */}
                <img
                    className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                />
                
                {/* User Details */}
                <div className="flex flex-col text-white text-center md:text-left md:ml-6 flex-grow">
                    <p className="text-xl font-semibold">{user?.name}</p>
                    <p className="text-gray-600">{user?.email}</p>
                </div>

                {/* Edit Button */}
                <button 
                    className="px-4 py-2 bg-yellow-100 text-black rounded-lg hover:bg-yellow-200 mt-4 md:mt-0 self-end"
                    onClick={() => navigate("/dashboard/setting")}
                >
                    Edit
                </button>
            </div>

           {/* Personal Details Section */}
<div className="bg-richblack-800 shadow-md rounded-lg p-6 w-10/12 flex flex-col md:flex-row justify-between items-center md:items-start mt-6">
    {/* Personal Details Text */}
    <div className="flex flex-col flex-grow text-center md:text-left">
        <h2 className="text-2xl font-semibold text-white mb-4">Personal Details</h2>
        
        {/* Grid Layout for Proper Row Alignment */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <p className="text-white"><strong>Name:</strong> {user?.name}</p>
            <p className="text-white"><strong>Email:</strong> {user?.email}</p>
            <p className="text-white"><strong>Phone Number:</strong> {user?.phoneNumber || "Not provided"}</p>
            <p className="text-white"><strong>Account Type:</strong> {user?.accountType || "Standard"}</p>
        </div>
    </div>

    {/* Edit Button */}
    <button 
        className="px-4 py-2 bg-yellow-100 text-black rounded-lg hover:bg-yellow-200 mt-4 md:mt-0 self-end"
        onClick={() => navigate("/dashboard/setting")}
    >
        Edit
    </button>
</div>

        </div>
    );
};
