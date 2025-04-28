const Section =require("../models/section")
const course=require("../models/Course");



exports.createsection= async(req,res)=>{
   try{
        //fetch data
        const {sectionName,courseId}=req.body;
        console.log("sectionname and course id", sectionName,courseId)
        //validation
        if(!sectionName||!courseId){
            return res.status(400).json({
                success:false,
                message:"enter all fields"
            })
        } 
        console.log("validation complete")
        //create section
        const sectiondata= await Section.create({sectionName})
        console.log("created section",sectiondata)
     
        // Update course
        const updatecourse = await course.findOneAndUpdate(
            { _id: courseId }, // Use _id to query the course
            {
                $push: {
                    courseContent: sectiondata._id, // Push the new section ID to courseContent
                },
            },
            { new: true } // Ensure the updated document is returned
        ).populate({
            path: 'courseContent', // Populate sections in courseContent
            populate: {
                path: 'subSection', // Nested population for subsections in sections
            },
        });

        console.log("Updated course:", updatecourse);

        //response
       
        return res.status(200).json({
            success:true,
            message:"successfully created sections and updated course",
            data:updatecourse
        })
   }catch(err){
        return res.status(400).json({
            success:false,
            message:"can't update category on section ,try again",
            error:err.message
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
            message:"successfully updated sections and course",
            data:newdata
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
        const {courseId}=req.body
        console.log("sectionid is ",req.params)
        //delete
        await Section.findByIdAndDelete(sectionid)
        //delete from course
        await course.findByIdAndUpdate(courseId,{
            $pull: { courseContent: sectionid }
        },{new:true})
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
