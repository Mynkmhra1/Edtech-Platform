const mongoose= require("mongoose");

const courseProgress= new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"subSection"
    }]
    
})
module.exports=mongoose.model("CourseProgress",courseProgress);