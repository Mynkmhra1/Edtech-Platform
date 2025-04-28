const Group = require("../models/Groups");
const User=require("../models/User")
const mongoose = require("mongoose");

exports.createGroup = async (req, res) => {
    try {
        const { groupName } = req.body;

        // Validation
        if (!groupName) {
            return res.status(400).json({
                success: false,
                message: "Group name is required"
            });
        }

        // Create new group with req.user.id as default member
        const newGroup = await Group.create({
            groupName,
            members: [req.user.id]
        });

        return res.status(200).json({
            success: true,
            message: "Group created successfully",
            group: newGroup
        });

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Group creation failed",
            error: err.message
        });
    }
};

exports.deleteGroup = async (req,res)=>{
    try{
        const {groupId}=req.body;
        
        const isexist=await Group.findById(groupId);

        if(!isexist){
            return res.status(400).json({
                success:false,
                message:"groupId does not exist"
            })
        }
        //delete from users group array
        await User.updateMany(
            {},
            { $pull: { groups: groupId } }
          );
          
          // 2. Delete the group itself
          await Group.findByIdAndDelete(groupId);
          
          res.status(200).json({
            success: true,
            message: "Group deleted and removed from all users"
          });


        
    }catch(err){
        return res.status(400).json({
            success: false,
            message: "Group deletion failed",
            error: err.message
        });
    }
}   

exports.addtogroup=async(req,res)=>{
    try{
        const{userId,groupId}=req.body;
        const isexist=await User.findById(userId);
        if(!isexist){
            return res.status(400).json({
                success:false,
                message:"userId does not exist"
            })
        }

        const addmember= await Group.updateOne({_id:groupId},
            { $addToSet: { members: userId } }
        )
        console.log(addmember)
        return res.status(200).json({
            success:true,
            message:"member added successfully"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant add member ,try again"
        })
    }
}

exports.removemember= async (req,res)=>{
    try{
        const{userId,groupId}=req.body;
        const isExist = await Group.findOne({
            _id: groupId,
            members: userId
          });
        if(!isExist){
            return res.status(400).json({
                success:false,
                message:"userId does not exist"
            })
        }

        const removemember= await Group.updateOne({_id:groupId},
            { $pull: { members: userId } }
        )

        // console.log(addmember)
        return res.status(200).json({
            success:true,
            message:"member removed successfully"
        })
    }catch(err){
        return res.status(400).json({
            success:false,
            message:"cant remove member ,try again"
        })
    }
}


