//otp generate
const otp=require("../models/otp");
const profile = require("../models/profile");
const User = require("../models/User")
const otpGenerator= require("otp-generator")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

 exports.generateotp=async(req,res)=>{
    try{
        const{email}=req.body;
        const isexist=await User.findOne({email});
        if(isexist){
            return res.status(400).json({
                success:false,
                message:"email already exists ",
                error:err
            });
        }
        //generate otp
        var otpgen=otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })
        const otpexist=await otp.findOne({otp: otpgen})

        while(otpexist){
            otpgen=otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            otpexist=await otp.findOne({otp: otpgen})
        }
    //creating payload

        const otppayload={email,otpgen};
    // sending payload to db
        const senddata=await otp.create(otppayload);
        console.log(senddata);
            res.status(200).json({
            success:true,
            message:"otp updated on db successfully!"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"OTP cant get updated in db !",
            error:err
        })
    }
}






//signup
exports.signup=async(req,res)=>{
    try{
        //fetch data
    const{firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;
    //validation for details availability
    if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
        return res.status(400).json({
            success:false,
            message:"please fill all details "
        })
    }
    //validate password and confirm password
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"both passwords are different "
        })
    }
    //check for availability in db
    const doexist=await User.findOne({email})
    if(doexist){
        return res.status(400).json({
            success:false,
            message:"account with this email already exists ",
        });
    }
    //else validate otp
    const recentOtp= await otp.findOne({email}).sort({createdAt:-1});
    if(recentOtp.lenght===0){
        return res.status(400).json({
            success:false,
            message:"didnt find otp in db "
        })
    }
    else if(recentOtp!==otp){
        return res.status(400).json({
            success:false,
            message:"otp did not match "
        })
    }
    //hash the password
    const hashedpass= await bcrypt.hash(password,10)
    //create the entry in databsase
    // but before that u have to make profile data to update in additional details
    const prof=await profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })
    //now create the entry
    const entry=await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedpass,
        accountType,
        additionalDetails:prof._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    res.status(200).json({
        success:true,
        message:"entry created successfully !"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant sign up please try again ",
            error:err
        })
    }
}

//login

exports.login=async(req,res)=>{
    try{
        //fetch data from body
    const{email,password}=req.body;
    //validate the data for not empty
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"please fill all details "
        })
    }
    
    //fetch password from db
    const user=await User.findOne({email}) 
    //compare the password
    if(await bcrypt.compare(password,user.password)){
        const payload={
            email:user.email,
            password:user.password
        }
        const token=jwt.sign(payload,JWT_SECRET,{expiresIn:"2h"})
        user.token=token;
        user.password=undefined;
        
        //create cookie
        res.cookie("token",token,{expires:Date.now()+ (3*24*60*60*1000)}).json({
            success:true,
            message:"cookie generated successfully"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"password do not match "
        }) 
    }
    }catch(err){
        res.status(400).json({
            success:false,
            message:"cant log you in ,please try again "
        }) 
    }
}


//changepassword
exports.changepassword=async(req,res)=>{
    try{
    //fetch data from body
    const{oldpassword,newpassword,confirmpassword}=req.body;
    //validate for data exist or not
    if(!oldpassword||!newpassword||!confirmpassword){
        return res.status(400).json({
            success:false,
            message:"please fill all details "
        })
    }

    //verify the old password
    const user=await User.findOne({email});
    if(! await bcrypt.compare(oldpassword,user.password)){
        return res.status(400).json({
            success:false,
            message:"current password do not match "
        })
    }
    //verify new passwords
    if(newpassword!==confirmpassword){
        return res.status(400).json({
            success:false,
            message:"new passwords are not matching "
        }) 
    }

    
    //bcrypt the password
    const hashedpass= await bcrypt.hash(newpassword,10)
    //create the entry in databsase
    // but before that u have to make profile data to update in additional details
    const prof=await profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })
    //now create the entry in database
    const entry=await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedpass,
        accountType,
        additionalDetails:prof._id,
        image
    })
    res.status(200).json({
        success:true,
        message:"successfully changed the data"
    })}catch(err){
        res.status(400).json({
            success:false,
            message:"cant change the password ,please try again "
        }) 
    }
   
}

