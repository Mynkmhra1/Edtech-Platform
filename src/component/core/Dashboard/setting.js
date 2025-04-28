import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, updateDetails } from "../../../services/operations/authapi"; // Separate API calls

export const Setting = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    

    // State for profile updates
    const [profileData, setProfileData] = useState({
        displayPicture: user?.image || null,
    });

    // State for other details
    const [detailsData, setDetailsData] = useState({
        gender: user?.additionalDetails.gender || "Other",
        dob: user?.additionalDetails?.dateOfBirth || "",
        contactNumber: user?.additionalDetails?.phoneNumber || "",
        about: user?.additionalDetails?.about || "",
    });


    useEffect(() => {
        setProfileData((prev) => ({
            ...prev,
            displayPicture: user?.image || "/default-avatar.png",
        }));
    
        setDetailsData((prev) => ({
            ...prev,  // Keep previous data
            gender: user?.additionalDetails?.gender || "",
            dob: user?.additionalDetails?.dateOfBirth || "",
            contactNumber: user?.additionalDetails?.contactNumber || "",
            about: user?.additionalDetails?.about || "",
        }));
    }, [user]);


    

    // Handle input change for details updates
    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setDetailsData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file); // Temporary preview
            setProfileData((prevData) => {
                const updatedData = {
                    ...prevData,
                    displayPicture: file,  // Actual file for upload
                    previewImage: imageURL // Temporary preview for UI update
                };
                console.log("Updated Profile Data:", updatedData);
                return updatedData;
            });
    }};

    // Submit handler for profile update (name, email, profile image)
    const handleProfileSubmit = (e) => {
        e.preventDefault();
    
        if (!profileData.displayPicture) {
            console.error("No image selected.");
            return;
        }
    
        const formData = new FormData();

        formData.append("displayPicture", profileData.displayPicture); // Match backend key
    
        console.log("Uploading file:", profileData.displayPicture);
    
        dispatch(updateProfile( formData));
    };

    // Submit handler for details update (gender, DOB, contact number, about)
    const handleDetailsSubmit = (e) => {
        e.preventDefault();
        dispatch(updateDetails(detailsData.dob,detailsData.contactNumber,detailsData.about,detailsData.gender));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-10/12 md:w-2/3 lg:w-1/2">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Settings</h2>

                {/* Profile Update Form */}
                <form onSubmit={handleProfileSubmit} className="space-y-4 border-b pb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>

                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center">
                    <img
                        src={profileData.previewImage || profileData.displayPicture || "/default-avatar.png"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
                    />

                        <input 
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-sm text-gray-500"
                        />
                    </div>

                    {/* Name Input */}
                    <div>
                        {profileData.name}
                    </div>

                   

                    {/* Save Button for Profile */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </form>

                {/* Other Details Update Form */}
                <form onSubmit={handleDetailsSubmit} className="space-y-4 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800">Personal Details</h3>

                    {/* Gender Selection */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Gender</label>
                        <select
                            name="gender"
                            value={detailsData?.gender || ""}
                            onChange={handleDetailsChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={detailsData.dob}
                            onChange={handleDetailsChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Phone Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={detailsData.contactNumber}
                            onChange={handleDetailsChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* About Section */}
                    <div>
                        <label className="block text-gray-700 font-semibold">About</label>
                        <textarea
                            name="about"
                            value={detailsData.about}
                            onChange={handleDetailsChange}
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Tell us about yourself..."
                        ></textarea>
                    </div>

                    {/* Save Button for Other Details */}
                    <button
                        type="submit"
                        className="w-full bg-pure-greys-600 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                        Update Details
                    </button>
                </form>
            </div>
        </div>
    );
};
