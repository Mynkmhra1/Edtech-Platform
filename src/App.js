import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from "./pages/Home"
import { useState } from "react";
import Login from "./pages/login"
import Signup from "./pages/signup";
import Navigation from "./component/core/common/Navigation";
function App() {
  const[isLoggedIn,setisLoggedIn]=useState(false)
  
  return (
<div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
<div >
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setisLoggedIn}/>
    </div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={ <Login setIsLoggedIn={setisLoggedIn} />} />
      <Route path="/Signup" element={ <Signup setIsLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn}/>} />

    </Routes>
    </div>
  );
}

export default App;
