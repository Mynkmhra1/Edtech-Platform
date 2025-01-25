const  mongoose = require("mongoose");
const Course= require("../models/Course")
const RatingAndReview=require("../models/RatingAndReview")

//create rating and review
exports.createRating =async(req,res)=>{
    try{
            //fetch userid
    const userid=req.user.id
    console.log("userid id ",userid)
    //fetch rating review and courseid
    const{rating,review,courseid}=req.body;
    //verify
    if(!rating||!review||!courseid){
        return res.status(400).json({
            success:false,
            message:"fill all details"
        })
    }

    //check if user is enrolled or not
    const checkuser = await Course.findOne({
        _id: courseid,
        StudentsEnrolled: { $in: [userid] }, // Explicitly check if userid exists in the array
      });
      console.log("checkuser id ",checkuser)
    if(!checkuser){
        return res.status(400).json({
            success:false,
            message:"user not enrolled "
        })
    }
    //check if user already reviewed in the course
    const checkreviewed=await RatingAndReview.findOne({user:userid,
                                                   course:courseid 
    })
    if(checkreviewed){
        return res.status(400).json({
            success:false,
            message:"user already reviewed "
        })
    }
    //create rating and review
    const ratingreview=await RatingAndReview.create({
        rating,review,
        course:courseid,
        user:userid
    })
    //update course with the rating and review
    const updatecourse=await Course.findByIdAndUpdate(courseid,
        {$push:{
            RatingAndReviews:ratingreview._id
            }
        },{new:true}
    )
console.log(updatecourse);
    //return response
    return res.status(400).json({
        success:true,
        message:"successfully crated review rating"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

//get average rating

exports.getaveragerating=async(req,res)=>{
    try{
            //fetch courseid
    const {courseid}=req.body;
    console.log("courseid=",courseid)

    //fetch average
    const result = await RatingAndReview.aggregate([
        {
          $match: {
            course:new mongoose.Types.ObjectId(courseid),
          },
        },
        {
          $group: {
            _id: null,
            averageRating: { $avg: "$rating" },
          },
        },
      ]);

    console.log("average=",result)
    //return rating
    if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating
        })
    }

    else{
        return res.status(200).json({
            success:true,
            averageRating:0,
            message:"no response sent till now"
        })
    }

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

//all reviews

exports.getallratingsandreviews=async(req,res)=>{
    try{
        console.log("inside code")
        const allreview = await RatingAndReview.find({})
    .sort({ rating: "desc" })
    .populate({
        path: "user",
        select: "Firstname Lastname email image",
    })
    .populate({
        path: "course",
        select: "courseName",
    });
//response
return res.status(200).json({
    success:true,
    message:"successfully fetched data",
    data:allreview
})

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}