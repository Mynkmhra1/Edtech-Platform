 // Import the required modules
 const express = require("express")
 const router = express.Router()
 
 // Import the required controllers and middleware functions
 const {
   login,
   signup,
   sendotp,
   changepassword,
 } = require("../controller/Auth")
 const {
   resetPasswordToken,
   resetpassword,
 } = require("../controller/resetPassword")
 
 const { tokenverify } = require("../middleware/Auth")

 //****************************************************************************************************************
                                        //Authentication Route
 //****************************************************************************************************************
// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

// Route for Changing the password
router.post("/changepassword", tokenverify, changepassword)

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetpassword)

// Export the router for use in the main application
module.exports = router