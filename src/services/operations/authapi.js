import toast from "react-hot-toast"
import { logout, setLoading } from "../../reducer/Slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endPoints } from "../Apis"
import { setToken } from "../../reducer/Slices/authSlice"
import {logoutProfile, setUser} from "../../reducer/Slices/profileslice"



export const sendotp=(email,navigate)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try{
      console.log("before api call to backend");
      
     const response=await apiConnector("POST", endPoints.SENDOTP_API,{email});
     console.log("after api call to backend",response);
     if(!response.data.success){
      throw new Error (response.data.message);
    }
      toast.success("mail sent successfully")
      navigate("/verify-email")

    }catch(err) {
      console.error("Error while sending OTP:", err.response ? err.response.data : err.message);
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
    
    dispatch(setLoading(false))
  }
}

export const signup=(firstName,lastName,password,email,confirmPassword,accountType,otp,navigate)=>{
  return async(dispatch)=>{
  setLoading(true)
  try{
    console.log("before api call for adding user");
    console.log("Sending Data:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber: null,
      otp,
    });
    const response= await apiConnector("POST",endPoints.VERIFY_API,{firstName,lastName,email,password,confirmPassword,accountType,contactNumber:null,otp})
    console.log("response is ",response);

    if(!response.data.success){
      throw new Error (response.data.message);
  }
  toast.success("user created successfully")
  navigate("/login")
    
  }catch(err){

  }
  setLoading(false)
}
}

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Set loading state to true

    try {
      console.log("Before backend call");

      const response = await apiConnector("POST", endPoints.LOGIN_API, { email, password });

      console.log("After backend call, response is:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      // Extract token & user details from response
      const token = response.data?.token;
      const user = response.data?.data?.user;

      console.log("Extracted token:", token);
      console.log("Extracted user:", user);

      if (!token) {
        throw new Error("Token is missing from response!");
      }
      // Store token & user in Redux state
      dispatch(setToken(token));
      localStorage.setItem("token", token);
      console.log("token is ",token);
      
      dispatch(setUser(user));

      toast.success("Logged in successfully!");

      // ✅ Redirect to Dashboard after successful login
      navigate("/dashboard/my-profile");  

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      dispatch(setLoading(false)); // Set loading state to false
    }
  };
};

export const getResetToken=(email, setEmailSent)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response= await apiConnector("POST",endPoints.RESETPASSTOKEN_API,{email} )
           
            console.log("response is ",response)

            if(!response.data.success){
                throw new Error (response.data.message);
            }
            toast.success("mail sent successfully")
            setEmailSent(true)
        }
        catch(e){
            console.log("error while resettoken sent",e);
        }
        dispatch(setLoading(false))
    }
}


export const resetpassword=(newpassword,confirmpassword,token,setConfirmPassword,setNewPassword,navigate)=>{

    return async(dispatch)=>{

        dispatch(setLoading(true))
        console.log("entered in first line");
        
    // Validate passwords

    if (newpassword !== confirmpassword) {
        toast.error("Passwords do not match!"); // Show error toast
        return;
      }

      console.log("checked for password match");
  
      // API Call Simulation (Replace with actual API)
      try {
        console.log("inside try of api call")
        const response=await apiConnector("POST", endPoints.RESETPASSWORD_API,{newpassword,confirmpassword,token})
        console.log("server response",response);
        
        // const data = await response.json();
  
        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to update password");
        }
  
        toast.success("Password updated successfully!"); // Show success toast
        setNewPassword("");
        setConfirmPassword("");
        navigate("/");
      } catch (error) {
        toast.error(error.message || "Something went wrong!"); // Show error toast
      }
      dispatch(setLoading(false))
}}

export const logOut=(navigate)=>{
  return async(dispatch)=>{
    dispatch(logout())
    dispatch(logoutProfile())
    navigate("/")
  }

}




export const updateProfile=(formData)=>{
  return async(dispatch)=>{
      dispatch(setLoading(true))
      try{
        console.log("image to be upload is ,", formData);
        
        console.log("BEFORE CALL TO BACKEND")
          const response= await apiConnector("PUT",endPoints.UPDATEPIC_API,formData )
         
          console.log("response is ",response)

          if(!response.data.success){
              throw new Error (response.data.message);
          }
          toast.success("Image updated successfully")
          dispatch(setUser({ ...response.data.data }));
      }
      catch(e){
          console.log("error while UPDATION OF PICTURE",e);
      }
      dispatch(setLoading(false))
  }
}


export const updateDetails=(dateOfBirth,contactNumber,about,gender)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      console.log(`data to be update is,dob=${dateOfBirth},number= ${contactNumber},about= ${about},gender= ${gender}`);
      const response= await apiConnector("PUT",endPoints.PROFILEDETAILS_API,{dateOfBirth,contactNumber,about,gender})
      console.log("the response is ",response);
      if(!response.data.success){
        throw new Error (response.data.message);
      }
      
      const updatedUser = response.data?.data?.user;
      if (updatedUser) {
        dispatch(setUser(updatedUser));
        toast.success("Profile updated successfully");
      } else {
        console.warn("User data missing after profile update.");
      }
    

    toast.success("Profile updated successfully")
}
catch(e){
    console.log("error while UPDATION OF Profile details",e);
}
    dispatch(setLoading(false));
  }
}