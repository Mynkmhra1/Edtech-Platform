const mongoose= require("mongoose");
const mailSender = require("../utils/mailsender");

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    CreatedAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }    
})


async function sendverificationmail(otp,email){
    try{
        const mailResponse=await mailSender("Verification mail from Mayank",otp,email);
        console.log("Email sent successfully ",mailResponse);
    }catch(err){
        console.log("unsuccessful on mail sending ");
    }
}

otp.pre("save",async function(next){
    await sendverificationmail(this.otp,this.email);
    next();
})
module.exports=mongoose.model("Otp",otpSchema);