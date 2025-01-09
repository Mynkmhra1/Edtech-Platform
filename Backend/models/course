const mongoose= require("mongoose");

const Courses= new mongoose.Schema({
    courseName:{
        type:String
    },
    courseDescription:{
        type:String
    },
    Instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    WhatYouWillLearn:{
        type:String
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    RatingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews"
    }],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    Tag:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    StudentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }]
    
})
module.exports=mongoose.model("Courses",Courses);