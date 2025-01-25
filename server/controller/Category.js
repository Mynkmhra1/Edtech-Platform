const Category=require("../models/Category")
const Course=require("../models/Course")
const mongoose=require("mongoose")
exports.createCategory=async (req,res)=>{
    try{
        const{name ,Description}=req.body;
        console.log("requ user is ",req.user)
        //validate
        if(!name||!Description){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }
        //create entry

        const Categorydata=await Category.create({
            Name:name,
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
            message:err.message
        })
    }
}


//get all Category 


exports.showallCategory=async(req,res)=>{
    try{
        const allCategory=await Category.find({},{Name:true,Description:true});
        console.log(allCategory)
        return res.status(200).json({
            success:true,
            message:"successfully returned all tags",
            data:{allCategory}
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
        const {categoryId}=req.body;
        console.log(categoryId);
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID",
            });
        }
        // fetch category details
        const selectedcategory=await Category.findById(categoryId)
                                                .populate("Course")
                                                .exec()
                                                console.log("selectedcategory",selectedcategory)
                                                

        // fetch details for different categories
        const differentcategory=await Category.find({_id:{$ne:categoryId}})
                                                .populate("Course")
                                                .exec()
                                                console.log("differentcategory",differentcategory)
        // fetch top courses
        const topcourses=await Course.find({})
                                    .sort({StudentsEnrolled:-1})
                                    .limit(5)
                                    .exec()
                                    console.log("topcourses",topcourses)

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
            message:"cant get filtered categories",
            err:err.message
        })
     }
}