//otp generate
const Otp=require("../models/otp");
const profile = require("../models/profile");
const User = require("../models/User")
const otpGenerator= require("otp-generator")
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

 exports.sendotp=async(req,res)=>{
    try{

        console.log("hii started")
        const{email}=req.body;
        const isexist=await User.findOne({email});
        console.log(isexist)
        if(isexist){
            return res.status(400).json({
                success:false,
                message:"email already exists ",
            });
        }
        console.log("checked isexist")
        //generate otp
        var otpgen= otpGenerator.generate(6,{
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
            specialChars:false
        })
        console.log(`otp created ${otpgen}`)
        const otpexist=await Otp.findOne({otp: otpgen})

        while(otpexist){
            otpgen=otpGenerator.generate(6,{
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false,
                specialChars:false
            })
            otpexist=await Otp.findOne({otp: otpgen})
        }
    //creating payload

        const otppayload={email,otp:otpgen};
    //  sending otp email
        const senddata=await Otp.create(otppayload);
        console.log(senddata);
            res.status(200).json({
            success:true,
            message:"otp sent successfully!"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"OTP cant get updated in db !",
            error:err.message
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
    console.log(`recent otp is`)
    const recentOtp= await Otp.findOne({email}).sort({CreatedAt:-1});
    console.log(`recent otp is ${recentOtp.otp}`)
    //validation

    if (!recentOtp) {
        return res.status(400).json({
            success: false,
            message: "No OTP found for this email",
        });
    }

    console.log(`recent otp is ${recentOtp.otp}`)
    if(recentOtp.otp.length===0){
        return res.status(400).json({
            success:false,
            message:"didnt find otp in db "
        })
    }
    else if(recentOtp.otp!==otp){
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
        Firstname:firstName,
        Lastname:lastName,
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
            error:err.message
        })
    }
}

//login

exports.login=async(req,res)=>{
    try{
        //fetch data from body
    const{email,password}=req.body;
    console.log(`email=> ${email}, password=>${password}`)
    //validate the data for not empty
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"please fill all details "
        })
    }
    
    //fetch password from db
    const user=await User.findOne({email})
    .populate("additionalDetails")
    .populate("courses")
    .exec();

    console.log("user details are =>",user);
    

    console.log(`USER details=> ${user}`)
    //compare the password
    if(await bcrypt.compare(password,user.password)){
        console.log(`inside password match statement`)
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        console.log(`payload =`,payload)
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})
        console.log(`token=> ${token}`)
        user.token=token;
        user.password=undefined;
        
        //create cookies
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).status(200).json({
            success: true,
            message: "Login successful and cookie generated",
            token:token,
            data: {
                user: {
                    name:`${user.Firstname} ${user.Lastname}`,
                    email: user.email,
                    id: user._id,
                    accountType: user.accountType,
                    image: user.image,
                    additionalDetails: user.additionalDetails,
                    courses:user.courses
                },
            },
        });
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

        // Step 3: Validate the new password (Example: minimum length 8)
        if (newpassword.length < 8) {
            return res.status(400).json({ message: 'New password must be at least 8 characters long' });
          }
      

    
    //bcrypt the password
    const hashedpass= await bcrypt.hash(newpassword,10)
    
    //now update and change the entry in database
    user.password=hashedpass;
    await user.save();
    
    //response
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

