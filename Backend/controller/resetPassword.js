const mailSender = require("../utils/mailsender");
const User =require("../models/User")

//resetpasswordtoken
exports.resetPasswordToken=async(req,res)=>{
    try{
        //fetch mail
    const {email}=req.body;
    //verify email
    const isvalid=await User.findOne({email})
    if(!isvalid){
        return res.status(400).json({
            success:false,
            message:"user mail dosent exists"
        })
    }
    //create token
    const token=crypto.randomUUID();
    const updateddata=await User.findOneAndUpdate({email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+ 5*60*1000
        },{new:true}
    )
    //update url
    const url=`http://localhost:3000/update-Password/${token}`
    //send mail containing url

    await mailSender("Password updation link",`The link to update the password is ${url}`,email)

    return res.status(200).json({
        success:true,
        message:"Mail for reset is sent"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"failed while sending mail"
        })
    }
}

//resetpassword

exports.resetpassword=async(req,res)=>{
    try{
        //fetch data 
    const{newpassword,confirmpassword,token}=req.body
    //validate token
    const istoken=await User.findOne({token:token})
    if(!istoken){
        return res.status(400).json({
            success:false,
            message:"token not found"
        })
    }
    
    //expires validation of token
    if(istoken.resetPasswordExpires<Date.now()){
        return res.status(400).json({
            success:false,
            message:"token is expired"
        })
    }
    
    //validate passwords
    if(newpassword!==confirmpassword){
        return res.status(400).json({
            success:false,
            message:"passwords are not same"
        })
    }
    //bcrypt the password
    const hashedpass=await bcrypt.hash(newpassword,10)
    //update the password in db
    await User.findOneAndUpdate({token:token},{password:hashedpass},{new:true})
    return res.status(200).json({
        success:true,
        message:"password changed successfully"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"password cant be updated ,please try again"
        })
    }
}