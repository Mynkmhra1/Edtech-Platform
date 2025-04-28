const jwt=require("jsonwebtoken")
require("dotenv").config()

const tokenverify=async (req,res,next)=>{
    try{
        //fetch token
        const token = req.cookies.token||req.body.token|| req.header("Authorization").replace("Bearer","");
        //verify token is missing or not

        if(!token){
            return res.status(400).json({
                success:false,
                message:"token not found during verification"
            })
        }
        try{
        //verify the token
        const decode= jwt.verify(token ,process.env.JWT_SECRET);
        req.user=decode;
        
        
        }catch(err){
            return res.status(403).json({
                success:false,
                message:"token verifification failed!!",
                error:err.message
            })
        }
        next();

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"failed while validating token",
            error:err.message
        })

    }
}

const isStudent=async (req,res,next)=>{
    try{
        //fetch role
        if(req.user.accountType!=="Student"){
            return res.status(403).json({
                success:false,
                message:"this is protected route for student"
            })
        }
        
    next();

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"failed while verifying student"
        })

    }
}

const isAdmin=async (req,res,next)=>{
    try{
        //fetch role
        if(req.user.accountType!=="Admin"){
            return res.status(403).json({
                success:false,
                message:"this is protected route for Admin"
            })
        }
        
    next();

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"failed while verifying admin"
        })

    }
}

const isInstructor=async (req,res,next)=>{
    try{
        //fetch role
        if(req.user.accountType!=="Instructor"){
            return res.status(403).json({
                success:false,
                message:"this is protected route for Instructor"
            })
        }
        
    next();

    }catch(err){
        return res.status(400).json({
            success:false,
            message:"failed while verifying Instructor"
        })

    }
}
module.exports = { tokenverify, isStudent, isAdmin, isInstructor };