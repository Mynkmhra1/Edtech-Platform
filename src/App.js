import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home"
import { useState } from "react";
import Login from "./pages/login"
import Signup from "./pages/signup";
import Navigation from "./component/core/common/Navigation";
import ForgotPassword from "./pages/forgotpassword"; 
import UpdatePassword from "./pages/UpdatePassword"
import VerifyMail from "./pages/Verifymail";
import { Aboutus } from "./pages/Aboutus";
import { Dashboard } from "./pages/Dashboard";
import { Myprofile } from "./component/core/Dashboard/Myprofile";
import { Enrolledcourses } from "./component/core/Dashboard/Enrolledcourses";
import { Setting } from "./component/core/Dashboard/setting";

function App() {
  
  return (
<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
<div >
      <Navigation />
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={ <Login  />} />
      <Route path="/Signup" element={ <Signup />} />
      <Route path="/forgotPassword" element={ <ForgotPassword/>} />
      <Route path="/update-Password/:token" element={<UpdatePassword />} />
      <Route path="/verify-email" element={ <VerifyMail/>} />
      <Route path="/about" element={ <Aboutus/>} />
      <Route
      element={<Dashboard/>}
      >
              <Route path="/dashboard/my-profile" element={<Myprofile/>} />
              <Route path="/dashboard/enrolled-courses" element={<Enrolledcourses/>} />  
              <Route path="/dashboard/setting" element={<Setting/>} /> 
      </Route>

    </Routes>
    </div>
  );
}

export default App;
