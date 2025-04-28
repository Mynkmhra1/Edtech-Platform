import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getResetToken } from "../services/operations/authapi";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getResetToken(email,setEmailSent));
  };

  const handleResend = () => {
    setEmailSent(false);
    setEmail(""); // Clear email input
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-richblack-900 px-4">
      {loading ? (
        <div className="text-lg font-semibold text-white">Loading...</div>
      ) : (
        <div className="bg-richblack-900 p-6 rounded-lg shadow-md text-start w-full max-w-md mx-auto">
          {emailSent ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-3">Check Your Email</h1>
              <p className="text-pure-greys-50 mt-2">
                We have sent a password reset link
              </p>
              <p className="text-pure-greys-50">
                to <strong className="text-white">{email}</strong>. Please check your inbox.
              </p>
              <button
                onClick={handleResend}
                className="mt-4 w-full bg-yellow-50 text-richblack-900 px-4 py-2 rounded-md hover:bg-yellow-600 transition font-semibold"
              >
                Resend Email
              </button>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-white mb-3">Reset your password</h1>
              <p className="text-pure-greys-50">
                Have no fear. We’ll email you instructions to reset your password. 
                If you don’t have access to your email, we can try account recovery.
              </p>
              <form onSubmit={handleSubmit} className="mt-4">
                <label className="block text-gray-400">Enter your email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="example@example.com"
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-yellow-50 text-richblack-900 py-2 rounded-md hover:bg-yellow-600 transition font-semibold"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}
          <div className="flex flex-row m-2 items-center text-white cursor-pointer">
            <IoIosArrowRoundBack />
            <p className="ml-1 text-white">Back to login</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
