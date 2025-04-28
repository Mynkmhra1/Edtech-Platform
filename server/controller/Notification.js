const Group= require("../models/Groups");
const Notification= require("../models/Notification")
exports.createNotification=async(req,res)=>{
    try{
        const{title,body, groupId}=req.body;

    const creation= await Notification.create({
        title,
        body,
        group:groupId
    })

    return res.status(200).json({
        success:true,
        message :"notification created"
    })

    }catch(err){
        return res.status(200).json({
            success:false,
            message :"cant create notification ,try again"
        })
    }
    

}