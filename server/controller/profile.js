const profile= require("../models/profile");
const user=require("../models/User");
const { imageupload } = require("../utils/Image_uploader");

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
        return res.status(200).json({
            success:true,
            message:"successfully updated profile",
            
        })

     }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant update profile ,try again later",
            error: err.message,
        })
     }
}

//delete profile

exports.deleteAccount=async(req,res)=>{
    try{
      console.log("successfully entered",req.user)
        //fetch user id
    const userid=req.user.id;
    console.log("successfully entered", userid)
    //fetch user details
    const userdetails=await user.findById(userid);
    console.log("successfully details are ",userdetails)
    //validate
    if(!userdetails){
        return res.status(400).json({
            success:false,
            message:"no user found"
        })
    }
    //delete  profile
    const deleteprofile=await profile.findByIdAndDelete(userdetails.additionalDetails) ;
    //delete account user
    const deleteuser=await user.findByIdAndDelete(userid)

    //response
    return res.status(200).json({
        success:true,
        message:"successfully deleted account"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't delete account ,try again later",
            error:err.message
        })
    }

}

//get all user details

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await user.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//update display picture

exports.updateDisplayPicture = async (req, res) => {
    try {
      console.log("Hii there")
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      console.log("userid is ",userId)
      console.log("userid is ",req.user)
      const image = await imageupload(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await user.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      ).populate("additionalDetails");
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: ("error message is ",error.message)
            })
    }
};

//get enrolled courses
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await user.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};