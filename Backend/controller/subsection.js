const { imageupload } = require("../config/Image_uploader");
const section=require("../models/section")
const subsection=require("../models/subSection")
require("dotenv").config()

//create subsections
exports.createsubsection=async(req,res)=>{
    try{
        //fetch data
    const {sectionid,title,description,timeDuration}=req.body;

    //fetch file
    const video=req.files.videofile
    //validation
    if(!sectionid||!title||!description||!timeDuration){
        return res.status(400).json({
            success:false,
            message:"enter all fields"
        })
    }
    //upload video to cloudinary
    const upload=await imageupload(video,process.env.FOLDER_NAME)
    //create subsection
    const newsubsection=await subsection.create({title:title,
        description:description,
        timeDuration:timeDuration,
        videoUrl:upload.secure_url
    })
    //update section
    const sectionup=await section.findByIdAndUpdate({_id:sectionid},{
        $push:{
            subSection:newsubsection._id
        }
    },{new:true}).populate("subSection").exec()

    //response
    return res.status(200).json({
        success:true,
        message:"successfully created subsection"
    })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't add subsection ,try again"
        }) 
    }
}


//update subsection

exports.updatesubSection=async(req,res)=>{
    try{
        //data fetch
        const {subSectionid,title,description,timeDuration}=req.body;
        //fetch file
        const video=req.files.videofile;
        //validate
        if(!subSectionid||!title||!description||!timeDuration){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        //upload video
        const upload=await imageupload(video,process.env.FOLDER_NAME);
        //update data
        const newdata=await subsection.findByIdAndUpdate(subSectionid,{
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:upload.secure_url
        },{new:true})
        
        //response
        return res.status(200).json({
            success:true,
            message:"successfully updated subsections"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't update  subsection ,try again"
        }) 
    }
}
//delete subsection

exports.deleteSubsection=async(req,res)=>{
    try{
        //getid- assuming that id is getting from params
        const {subSectionid}=req.params;
        //delete
        await subsection.findByIdAndDelete(subSectionid)
        //response
        return res.status(200).json({
            success:true,
            message:"successfully deleted subsections"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't delete subsection ,try again"
        }) 
    }
}