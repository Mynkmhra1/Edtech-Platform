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
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required:true
    },
    accountType:{
        type:String,
        enum:["Admin","Student","Instructor"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    groups:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    }],
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }],
    image:{
        type:String,
        required:true
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
    
})
module.exports=mongoose.model("User",userSchema);