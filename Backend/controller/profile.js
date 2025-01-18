const profile= require("../models/profile");
const user=require("../models/User")

//update profile
exports.updateProfile=async(req,res)=>{
     try{
        //fetch data
        const{dateOfBirth="",contactNumber,about="",gender}=req.body;
        //get userid
        const userid=req.user.id;
        //validate
        if(!contactNumber||!gender){
            return res.status(400).json({
                success:false,
                message:"details required"
            })
        }
        //find profile
        const userdetails=await user.findById(userid);
        const profiledetails=await profile.findById(userdetails.additionalDetails)
        //update profile
        profiledetails.dateOfBirth=dateOfBirth,
        profiledetails.contactNumber=contactNumber,
        profiledetails.about=about,
        profiledetails.gender=gender
        await profiledetails.save()
        //response
        return res.status(400).json({
            success:true,
            message:"successfully updated profile"
        })

     }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant update profile ,try again later"
        })
     }
}

//delete profile

exports.deleteAccount=async(req,res)=>{
    try{
        //fetch user id
    const userid=req.user.id;
    //fetch user details
    const userdetails=await user.findById(userid);
    //validate
    if(!userdetails){
        return res.status(400).json({
            success:false,
            message:"no user found"
        })
    }
    //delete  profile
    const deleteprofile=profile.findByIdAndDelete(userdetails.additionalDetails) ;
    //delete account user
    const deleteuser=user.findByIdAndDelete(userid)

    //response
    return res.status(400).json({
        success:true,
        message:"successfully deleted account"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't delete account ,try again later"
        })
    }

}