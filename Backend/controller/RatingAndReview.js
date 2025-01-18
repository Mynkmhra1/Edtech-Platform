const { default: mongoose } = require("mongoose");
const Course= require("../models/Course")
const RatingAndReview=require("../models/RatingAndReview")

//create rating and review
exports.createRating =async(req,res)=>{
    try{
            //fetch userid
    const userid=req.user.id
    //fetch rating review and courseid
    const{rating,review,courseid}=req.body;
    //check if user is enrolled or not
    const checkuser=await Course.findOne(
        {_id:courseid,
        StudentsEnrolled:{$elemMatch: {$eq:userid}}
        }
        )
    if(!checkuser){
        return req.status(400).json({
            success:false,
            message:"user not enrolled "
        })
    }
    //check if user already reviewed in the course
    const checkreviewed=await RatingAndReview.findOne({user:userid,
                                                   course:courseid 
    })
    if(!checkreviewed){
        return req.status(400).json({
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

    //return response
    return res.status(400).json({
        success:true,
        message:"successfully crated review rating"
    })
    }catch(err){
        return req.status(400).json({
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
    //calculate average
    const result=await RatingAndReview.aggregate([
        {
            $match:{
                course:mongoose.Types.ObjectId(courseid)
            }
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"}
            }
        }

    ])
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
        const allreview=await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate(
                                                {
                                                    path:"User",
                                                    select:"Firstname,Lastname,email,image"
                                                }
                                            )
                                            .populate({
                                                path:"Course",
                                                select:"courseName"
                                            })
                                            .exec();
//response
return res.status(200).json({
    success:true,
    message:"successfully fetched data"
})

    }catch{
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}