import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {signup} from "../services/operations/authapi"

export default function VerifyMail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const{formData,loading}=useSelector((state)=>state.auth)

  const {firstname,lastname,password,email,confirmPassword,role}=formData

  const handleVerify = () => {
    console.log("Verifying OTP:", otp);
    dispatch(signup(firstname,lastname,password,email,confirmPassword,role,otp,navigate))
    // Call API to verify OTP
  };

  const handleResend = () => {
    console.log("Resending OTP...");
    // Call API to resend OTP
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 bg-gray-900 text-white">
      <p className="text-4xl font-semibold">Verify Your Email</p>

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span className="mx-2 text-lg">-</span>}
        renderInput={(props) => (
          <input
            {...props}
            className="w-12 h-12 text-center text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        )}
      />

      <div className="flex space-x-4">
        <button
          onClick={handleVerify}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Verify
        </button>
        <button
          onClick={handleResend}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
        >
          Resend OTP
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
