const express=require("express");
const router=express.Router();

//Importing controllers

//Importing course controller

const {createcourse,getallcourses,getcoursedetails}=require("../controller/courses");

//Importing section controller

const{createsection,updateSection,deletesection}=require("../controller/section");

//Importing category controller
const{createCategory,showallCategory,categoryPageDetails}=require("../controller/Category");

//Importing subsection controller
const{createsubsection,updatesubSection,deleteSubsection}=require("../controller/subsection");

//Importing rating controller route
const{createRating,getaveragerating,getallratingsandreviews}=require("../controller/RatingAndReview");

//Importing middleware route
const{tokenverify,isStudent,isAdmin,isInstructor}=require("../middleware/Auth");

//-------------------------------------------------------------------------------------------------------------------
                                            //course route bu instructor only
//-------------------------------------------------------------------------------------------------------------------

//course creation by instructor only
router.post("/createCourse",tokenverify,isInstructor,createcourse)

//adding section
router.post("/addSection",auth ,isInstructor,createsection)

//update a section
router.post("/updateSection",auth ,isInstructor,updateSection)

//delete a section
router.post("/deleteSection",auth ,isInstructor,deletesection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updatesubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createsubsection)
// Get all Registered Courses
router.get("/getAllCourses", getallcourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getcoursedetails)

//-------------------------------------------------------------------------------------------------------------------
                                            //Category route by admin only
//-------------------------------------------------------------------------------------------------------------------


//Category can Only be Created by Admin

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showallCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

//-------------------------------------------------------------------------------------------------------------------
                                            //rating route by student only
//-------------------------------------------------------------------------------------------------------------------

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getaveragerating)
router.get("/getReviews", getallratingsandreviews)

module.exports = router 