const express = require("express")
const router = express.Router()
const { tokenverify } = require("../middleware/Auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
} = require("../controller/profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile",tokenverify, deleteAccount)
router.put("/updateProfile", tokenverify, updateProfile)
router.get("/getUserDetails", tokenverify, getAllUserDetails)
// Get Enrolled Courses
router.get("/getEnrolledCourses", tokenverify, getEnrolledCourses)
router.put("/updateDisplayPicture", tokenverify, updateDisplayPicture)

module.exports = router