const express=require("express");
const router=express.Router();

const {createGroup,deleteGroup,addtogroup, removemember}=require("../controller/Group");
const { tokenverify, isInstructor, isStudent, isAdmin } = require("../middleware/Auth")
router.post("/creategroup",tokenverify,createGroup)
router.post("/deletegroup",tokenverify,deleteGroup)
router.post("/addtogroup",tokenverify,addtogroup)
router.post("/removemember",tokenverify,removemember)
module.exports = router