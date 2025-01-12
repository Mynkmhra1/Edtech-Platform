const Tags=require("../models/Tags")
exports.createtag=async (req,res)=>{
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

        const tagdata=await Tags.create({
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


//get all tags 


exports.showalltags=async(req,res)=>{
    try{
        const alltags=await Tags.find({},{name:true,Description:true});
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