
const contact=require("../models/Contact")
const mongoose=require("mongoose")

exports.createContact=async (req,res)=>{
    try{
        const {firstName,lastName,email,phone,countryCode,message}=req.body;

        //validation
        if (!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        
        const contactinfo=await contact.create({
            firstName,
            lastName,
            email,
            phone,
            countryCode,
            message
        })

        return res.status(200).json(
            {
                success:true,
                message:"successfully sent mail and created query"
            }
        )
        }catch(err){
            return res.status(400).json(
                {
                    success:false,
                    message:"cant create entry try again"
                }
            )
        }
    
}