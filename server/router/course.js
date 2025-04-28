const express=require("express");
const router=express.Router();

//Importing controllers

//Importing course controller

const {createcourse,getallcourses,getcoursedetails,deletecourse}=require("../controller/courses");

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

router.post('/createCourse',tokenverify,isInstructor,createcourse)

//delete course
router.delete("/deleteCourse/",tokenverify ,isInstructor,deletecourse)

//adding section
router.post("/addSection",tokenverify ,isInstructor,createsection)

//update a section
router.put("/updateSection",tokenverify ,isInstructor,updateSection)

//delete a section
router.delete("/deleteSection/:sectionid",tokenverify ,isInstructor,deletesection)

// Edit Sub Section
router.put("/updateSubSection", tokenverify, isInstructor, updatesubSection)
// Delete Sub Section
router.delete("/deleteSubSection", tokenverify, isInstructor, deleteSubsection)
// Add a Sub Section to a Section
router.post("/addSubSection", tokenverify, isInstructor, createsubsection)
// Get all Registered Courses
router.get("/getAllCourses", getallcourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getcoursedetails)

//-------------------------------------------------------------------------------------------------------------------
                                            //Category route by admin only
//-------------------------------------------------------------------------------------------------------------------


//Category can Only be Created by Admin

router.post("/createCategory", tokenverify, isAdmin, createCategory)
router.get("/showAllCategories", showallCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

//-------------------------------------------------------------------------------------------------------------------
                                            //rating route by student only
//-------------------------------------------------------------------------------------------------------------------

router.post("/createRating", tokenverify, isStudent, createRating)
router.post("/getAverageRating", getaveragerating)
router.get("/getReviews", getallratingsandreviews)

module.exports = router   