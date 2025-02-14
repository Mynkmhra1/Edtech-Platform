import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetpassword } from "../services/operations/authapi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons

const UpdatePassword = () => {
  const { token } = useParams();
  console.log("token is",token);
  
  const dispatch = useDispatch();
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetpassword(newpassword, confirmPassword, token, setConfirmPassword, setNewPassword));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-richblack-900 p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-start">
        <p className="text-3xl font-bold text-center text-pure-greys-50 mb-4">
          Create new Password
        </p>
        <p className="text-pure-greys-50">
        Almost done. Enter your new password and youre all set.
        </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium">New Password</label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text/password
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Toggle Password Visibility Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-10 right-3 text-gray-600"
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Toggle Confirm Password Visibility Button */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-10 right-3 text-gray-600"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
