const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    Firstname:{
        type:String,
        required:true,
        trim:true
    },
    Lastname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    accounttype:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    additionaldetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }],
    image:{
        type:String,
        required:true
    },
    courseprogress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]
    
})
module.exports=mongoose.model("User",userSchema);