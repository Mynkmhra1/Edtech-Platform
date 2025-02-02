import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupForm({ setIsLoggedIn }) {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const setInput = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    alert("Signup successful!");
    setIsLoggedIn(true);
    navigate("/dashboard");

    setData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="flex justify-center items-center bg-richblack-700 text-white">
      <form
        onSubmit={submitHandler}
        className="w-full  p-6 bg-richblack-900 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {/* Two Inputs in One Line */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-1">First Name</label>
            <input
              onChange={setInput}
              type="text"
              name="firstname"
              placeholder="First Name"
              value={data.firstname}
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
              value={data.lastname}
              required
              className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <label className="block text-gray-300 mb-1">Email</label>
        <input
          onChange={setInput}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={data.email}
          required
          className="w-full mb-4 px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password and Confirm Password Fields Side-by-Side */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                onChange={setInput}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={data.password}
                required
                className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={togglePasswordVisibility}
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
                value={data.confirmPassword}
                required
                className="w-full px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>

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
