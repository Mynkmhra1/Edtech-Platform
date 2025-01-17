const {instance}= require("../config/razorpay")
const User=require("../models/User")
const Course=require("../models/Course")
const courseEnrollmentEmail=require("../mail/template/courseEnrollmentEmail")
const mailSender=require("../config/mailsender")
const { default: mongoose } = require("mongoose")


exports.capturePayments=async(req,res)=>{
    try{
        //fetch courseid and userid
        const{courseid}=req.body
        const userid=req.user.id
    //validate
    //valid courseid

    if(!courseid){
        return res.status(400).json({
            success:false,
            message:"please provide course id"
        })
    }
    //valid course details
    try{
        const coursedetails=await Course.findById(courseid)
        if(!coursedetails){
            return res.status(400).json({
                success:false,
                message:"No course found with this detail"
            })
        }
        //user already paid for the course
        const uid=mongoose.Types.ObjectId(userid);
        if(Course.StudentsEnrolled.includes(uid)){
            return res.status(400).json({
                success:false,
                message:"ALready enrolled"
            })
        }

    }catch(err){

    }
   
    
    //order create
    //response
    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}