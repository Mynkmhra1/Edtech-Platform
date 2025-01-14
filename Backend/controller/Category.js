const Category=require("../models/Category")
exports.createCategory=async (req,res)=>{
    try{
        const{name ,Description}=req.body;
        //validate
        if(!name||!Description){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }
        //create entry

        const Categorydata=await Category.create({
            name:name,
            Description:Description
        })
        //response

        return res.status(200).json({
            success:true,
            message:"successfully created the new tag"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:message.err
        })
    }
}


//get all Category 


exports.showallCategory=async(req,res)=>{
    try{
        const allCategory=await Category.find({},{name:true,Description:true});
        return res.status(200).json({
            success:true,
            message:"successfully returned all tags"
        })
    }catch(err){
        return res.status(200).json({
            success:false,
            message:"cant fetch all tags"
        })
    }
}