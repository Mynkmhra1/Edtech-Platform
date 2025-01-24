const Course=require("../models/Course")
const Category=require("../models/Category")
const uploadimage=require("../utils/Image_uploader")
const User=require("../models/User")
const Section=require("../models/section")
const SubSection = require("../models/subSection")
require("dotenv").config()

//create courses

exports.createcourse=async(req,res)=>{
    try{
        //data fetch
    const{courseName,courseDescription,WhatYouWillLearn,price,Categoryid,tags}=req.body;
    //file fetch
    console.log("instructor details ",req.user.id);

    const thumbnail=req.files.thumbnailImage;
    //validation
    if(!courseName||!courseDescription||!WhatYouWillLearn||!price||!Categoryid){
        return res.status(400).json({
            success:false,
            message:"all details required"
        })
    }
    if (!req.files || !req.files.thumbnailImage) {
        return res.status(400).json({
            success: false,
            message: "Thumbnail image is required",
        });
    }

    //instructor validation
    const userId=req.user.id;
    const validate=await User.findById(userId);
    console.log("instructor details ",validate);


    if(!validate){
        return res.status(400).json({
            success:false,
            message:"no details found for instructor"
        })
    }

    //Category validation
    const Categorydetails=await Category.findById(Categoryid);
    console.log("Categorydetails details ",Categorydetails);
    if(!Categorydetails){
        return res.status(400).json({
            success:false,
            message:"no details found for tag"
        })
    }
    //upload in cloudinary
    const upload=await uploadimage.imageupload(thumbnail,process.env.FOLDER_NAME)
    console.log("uploaded ",upload);
    //create entry of course in user

    const newcourse=await Course.create({
        courseName:courseName,
        courseDescription:courseDescription,
        WhatYouWillLearn:WhatYouWillLearn,
        price,
        Instructor:req.user.id,
        Tags:tags,
        Category:Categoryid,
        thumbnail:upload.secure_url
    })
    console.log("course created");
    //add course entry in user
    await User.findByIdAndUpdate({_id:validate._id},
        {
        $push:{courses:newcourse._id}
    },{new:true})
    console.log("course added to user");

    //update Category schema
    await Category.findByIdAndUpdate({_id:Categorydetails._id},
        {
        $push:{Course:newcourse._id}
    },{new:true})
    console.log("course added to category");
//response
return res.status(200).json({
    success:true,
    message:"course created successfully"
})
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"course creation failed",
            error:err.message
        })      
    }

    
}

//fetch all courses

exports.getallcourses=async(req,res)=>{
    try{
        const allcourses= await Course.find({},{courseName:true,
            price:true,
            thumbnail:true,
            Instructor:true,
            RatingAndReviews:true
        }).populate("Instructor").exec();
        return res.status(200).json({
            success:true,
            data:allcourses,
            message:"successfully executed to show all courses"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

//get course details

exports.getcoursedetails=async(req,res)=>{
    try{
        //fetch courseid
    const {courseid}=req.body;

    if (!courseid) {
        return res.status(400).json({
            success: false,
            message: "Course ID is required",
        });
    }
    //populate details
    console.log("populating details")
    const coursedetails=await Course.findById(courseid)
    .populate(
        {
            path:"Instructor",
            populate:{
            path:("additionalDetails")
            }
        }
    )
    .populate(
        {
            path:"courseContent",
            populate:{
                path:("subSection"),
            }
        }
    )
    .populate("Category")
    .populate("RatingAndReviews")
    .exec()
    console.log("results populated")

    //validation
    if(!coursedetails){
        return res.status(400).json({
            success:false,
            message:"no course details found"
        })
    }

    //response
    return res.status(200).json({
        success:true,
        data:coursedetails,
        message:"successfully details found"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant populate the details",
            error:err.message
        })
    }
}

//delete course
exports.deletecourse=async(req,res)=>{
    try{
        //getid- assuming that id is getting from params
        
        const {courseId}=req.body
        console.log("courseid is ",courseId)

         // Fetch the course to validate existence
         const course = await Course.findById(courseId);
         if (!course) {
             return res.status(404).json({
                 success: false,
                 message: "Course not found",
             });
         }
        
        //delete from users
        await User.updateMany({courses:courseId},{
            $pull: { courses: courseId }
        },{new:true})
        
        
        //delete from category
        await Category.updateMany({Course:courseId},{
            $pull: { Course: courseId }
        },{new:true})

        //delete associated section subsection
        const sections = course.courseContent; // Assuming courseContent stores section IDs
        for (const sectionId of sections) {
            const section = await Section.findById(sectionId);

            // Remove all subsections linked to the section
            if (section) {
                await SubSection.deleteMany({ _id: { $in: section.subSection } });
                await Section.findByIdAndDelete(sectionId);
            }
        }


        //delete
        await Course.findByIdAndDelete(courseId)
        //response
        return res.status(200).json({
            success:true,
            message:"successfully deleted course"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't delete course ,try again",
            error:err.message
        }) 
    }
}
