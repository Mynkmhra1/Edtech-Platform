import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useDispatch } from "react-redux";
import {login} from "../../../services/operations/authapi"
function LoginForm( ) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  

  const setInput = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(loginData.email,loginData.password,navigate))
  };

  return (
    <div className="flex justify-center items-center bg-richblack-900 text-white">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg p-6 bg-richblack-900 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Email Input */}
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          onChange={setInput}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          required
          className="w-full mb-4 px-4 py-2 bg-pure-greys-500 text-white border border-pure-greys-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Field */}
        <label className="block text-gray-300 mb-1">Password</label>
        <div className="relative mb-6">
          <input
            onChange={setInput}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
