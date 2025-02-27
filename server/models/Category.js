const mongoose= require("mongoose");

const Category= new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true
    },
    Description:{
        type:String,
        trim:true
    },
    Course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }]    
})
module.exports=mongoose.model("Category",Category);