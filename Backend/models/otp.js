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
        expires:5*60*60
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

otpSchema.pre("save", async function (next) {
    try {
        if (this.otp && this.email) {
            console.log("Attempting to send verification email for:", this.email);
            await sendverificationmail(this.otp, this.email);
            console.log("Verification email sent successfully:", this.otp, this.email);
        } else {
            console.error("Missing OTP or email in pre-save hook");
        }
    } catch (err) {
        console.error("Error sending verification email:", err.message);
        // Pass the error to Mongoose if it's critical to handle
        return next(err);
    }
    // Always call next to proceed
    next();
});

module.exports=mongoose.model("Otp",otpSchema);