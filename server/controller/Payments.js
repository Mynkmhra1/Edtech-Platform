const {instance}= require("../config/razorpay")
const User=require("../models/User")
const Course=require("../models/Course")
const courseEnrollmentEmail=require("../mail/template/courseEnrollmentEmail")
const mailSender=require("../utils/mailsender")
const { default: mongoose } = require("mongoose")


exports.capturePayment=async(req,res)=>{
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
        if(Course.StudentsEnrolled.some(studentId => studentId.equals(uid))){
            return res.status(400).json({
                success:false,
                message:"ALready enrolled"
            })
        }



    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant process payment"
        })
    }
   
    
    //order create
    const amount=coursedetails.price
    const currency="INR"
    const options={
        amount:amount*100,
        currency:currency,
        reciept:Math.random(Date.now().toString()),
        notes:{//that will be used while verifying the signature
            courseid:courseid,
            userid,
        }
    }
    try{
        const paymentresponse=await instance.orders.create(options);
        console.log(paymentresponse)
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant process order creation"
        })
    }
    //response
    return res.status(200).json({
        success:true,
        message:"successfully created order"
    })


    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}

//verify Signature

exports.verifySignature=async(req,res)=>{
    try{
        const webhooksecret="123456";

    //fetch encrypted key from razorpay ,,Passed in header
    const signature=req.header["x-razorpay-signature"];
    const shasum= crypto.createHmac("sha256",webhooksecret)
    shasum.update(JSON.stringify(req.body))
    const digest =shasum.digest("hex")

    if(digest === signature){
        const{courseid , userid}=req.body.payload.payment.entity.notes;
        //update course
        const enrolledcourse=await Course.findOneAndUpdate({_id:courseid},{$push:{StudentsEnrolled:userid},new:true})
        if(!enrolledcourse){
            return res.status(400).json({
                success:false,
                message:"cant update userid in enrolled courses"
            })
        }
        //update user
        const enrolleduser=await User.findOneAndUpdate({_id:userid},{$push:{courses:courseid},new:true});
        if(!enrolleduser){
            return res.status(400).json({
                success:false,
                message:"cant update courseid in enrolled user"
            })
        }

        //mailsend

        const emailresponse =await mailSender(enrolleduser.email,"successfully enrolled","successfully enrolled in studynotion website");
        return res.status(200).json({
            success:true,
            message:"successfully verified and course added"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"invalid secret key"
        })
    }
    }catch(err){
        return res.status(400).json({
            success:false,
            message:`cant verify, try again later ,${err.message}`
        })
    }

}