const Section =require("../models/section")
const course=require("../models/Course");


exports.createsection= async(req,res)=>{
   try{
        //fetch data
        const {sectionName,courseId}=req.body;
        //validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        //create section
        const sectiondata= await Section.create({sectionName})
     
        //update course
        const updatecourse=await course.findOne(courseId,{
            $push:{
                courseContent:sectiondata._id
            }
        }).populate({
            path: 'courseContent', // Populate sections in courseContent
            populate: {
              path: 'subSections', // Nested population for subsections in sections
            },
          });
        //response
       
        return res.status(200).json({
            success:true,
            message:"successfully created sections and updated course"
        })
   }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't update category on section ,try again"
        }) 
   }

}


exports.updateSection=async(req,res)=>{
    try{
        //data fetch
        const {sectionName,sectionid}=req.body;
        //validate
        if(!sectionName||!sectionid){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        }
        //update data
        const newdata=await Section.findByIdAndUpdate(sectionid,{sectionName},{new:true})
        //response
        return res.status(200).json({
            success:true,
            message:"successfully updated sections and course"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't update category on section ,try again"
        }) 
    }
}

//delete section

exports.deletesection=async(req,res)=>{
    try{
        //getid- assuming that id is getting from params
        const {sectionid}=req.params;
        //delete
        await Section.findByIdAndDelete(sectionid)
        //response
        return res.status(200).json({
            success:true,
            message:"successfully deleted sections"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't delete section ,try again"
        }) 
    }
}
