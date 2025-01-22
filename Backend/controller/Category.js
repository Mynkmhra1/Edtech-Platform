const Category=require("../models/Category")
const Course=require("../models/Course")
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

//get filtered category

exports.categoryPageDetails=async(req,res)=>{
     try{
        // fetch category id
        const categorieid=req.body;
        // fetch category details
        const selectedcategory=await Category.findById(categorieid)
                                                .populate("Course")
                                                .exec()
        // fetch details for different categories
        const differentcategory=await Category.find({_id:{$ne:categorieid}})
                                                .populate("Course")
                                                .exec()
        // fetch top courses
        const topcourses=await Course.find({})
                                    .sort({StudentsEnrolled:-1})
                                    .limit(5)
                                    .exec()

        //if this not work then-->


        
        // const topCourses = await Course.aggregate([
        //     {
        //         $addFields: {
        //             enrollmentsCount: { $size: "$studentsEnrolled" }, // Calculate the array length
        //         },
        //     },
        //     {
        //         $sort: { enrollmentsCount: -1 }, // Sort by calculated enrollments count
        //     },
        //     {
        //         $limit: 5, // Limit to top 5 courses
        //     },
        // ]);



        //return response 
        return res.status(200).json({
            success:true,
            data:{
                selectedcategory,
                differentcategory,
                topcourses
            },
            message:"successfully returned courses category"
        })
     }catch(err){
        return res.status(200).json({
            success:false,
            message:"cant get filtered categories"
        })
     }
}