const express=require("express");
const router=express.Router();


const {createNotification}=require("../controller/Notification");
const { tokenverify, isInstructor, isStudent, isAdmin } = require("../middleware/Auth")
router.post("/createNotification",tokenverify,createNotification)
// router.post("/deletegroup",tokenverify,deleteGroup)
// router.post("/addtogroup",tokenverify,addtogroup)
// router.post("/removemember",tokenverify,removemember)
module.exports = router