const Course=require("../models/Course")
const Category=require("../models/Category")
const uploadimage=require("../config/Image_uploader")
const User=require("../models/User")
require("dotenv").config()

//create courses

exports.createcourse=async(req,res)=>{
    try{
        //data fetch
    const{courseName,courseDescription,WhatYouWillLearn,price,Category}=req.body;
    //file fetch
    const thumbnail=req.files.thumbnailImage;
    //validation
    if(!courseName||!courseDescription||!WhatYouWillLearn||!price||!Category){
        return res.status(400).json({
            success:false,
            message:"all details required"
        })
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
    const Categorydetails=await Category.findById(Category);
    if(!Categorydetails){
        return res.status(400).json({
            success:false,
            message:"no details found for tag"
        })
    }
    //upload in cloudinary
    const upload=await uploadimage.imageupload(thumbnail,process.env.FOLDER_NAME)
    //create entry of course in user

    const newcourse=await Course.create({
        courseName:courseName,
        courseDescription:courseDescription,
        WhatYouWillLearn:WhatYouWillLearn,
        price,
        Category:Category,
        thumbnail:upload.secure_url
    })
    //add course entry in user
    await User.findByIdAndUpdate({_id:validate._id},
        {
        $push:{courses:newcourse._id}
    },{new:true})

    //update Category schema
    await Category.findByIdAndUpdate({_id:Categorydetails._id},
        {
        $push:{Course:newcourse._id}
    },{new:true})
//response
return res.status(200).json({
    success:true,
    message:"course updated successfully"
})
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
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
        return res.status(500).json({
            success:true,
            message:"successfully executed to show all courses"
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}