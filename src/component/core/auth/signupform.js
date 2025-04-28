import { useState } from "react";
import { sendotp } from "../../../services/operations/authapi";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../reducer/Slices/authSlice"; // Import action

function SignupForm() {
  const dispatch = useDispatch();
  const [showPassword,setShowPassword]=useState(true)
  const [showConfirmPassword,setShowConfirmPassword]=useState(true)
  const formData = useSelector((state) => state.auth.formData); // Get stored form data from Redux

  const navigate = useNavigate();

  const setInput = (event) => {
    const { name, value } = event.target;
    dispatch(setFormData({ [name]: value })); // Dispatch form data update
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Signup Data:", formData);
    dispatch(sendotp(formData.email, navigate)); // Use Redux state instead of local state
  };

  return (
    <div className="flex justify-center items-center bg-richblack-700 text-white">
      <form
        onSubmit={submitHandler}
        className="w-full p-6 bg-richblack-900 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-1">First Name</label>
            <input
              onChange={setInput}
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname || ""}
              required
              className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Last Name</label>
            <input
              onChange={setInput}
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname || ""}
              required
              className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Email */}
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          onChange={setInput}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email || ""}
          required
          className="w-full mb-4 px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Role Selection */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Select Role</label>

          <div className="relative w-full max-w-xs mx-auto bg-pure-greys-500 rounded-full p-1 flex items-center justify-between">
            {["Student", "Instructor", "Admin"].map((role) => (
              <button
                key={role}
                onClick={() => dispatch(setFormData({ role }))}
                className={`relative flex-1 text-center py-2 px-4 rounded-full transition-all duration-300 ${
                  formData.role === role ? "text-black" : "text-pure-greys-25"
                }`}
              >
                {role}
              </button>
            ))}

            {/* Sliding effect */}
            <div
              className="absolute top-0 bottom-0 bg-pure-greys-600 rounded-full transition-all duration-300"
              style={{
                width: "33%",
                left:
                  formData.role === "Student"
                    ? "0%"
                    : formData.role === "Instructor"
                    ? "33%"
                    : "66%",
              }}
            ></div>
          </div>
        </div>

        {/* Password & Confirm Password */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                onChange={setInput}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password || ""}
                required
                className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                onChange={setInput}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword || ""}
                required
                className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>


        {/* Signup Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
