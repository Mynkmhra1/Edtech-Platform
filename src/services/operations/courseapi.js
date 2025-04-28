import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { coursespoint } from "../Apis";

export const getEnrolledCourses=async (token)=>{
    
        let result=[];
        try{
            const response= await apiConnector("GET",
                coursespoint.ENROLLEDCOURSES_API,
                null,
                {
                    Authorization:`Bearer ${token}`
                }
            )

            if (!response.data.success){
                throw new Error (response.data.message);
            }

            toast.success("courses data fetched successfully")
            result=response.data.data;
            
        }catch(err){
            console.error("Error while fetching courses:",err);
            toast.error("COuld not get enrolled courses");
        }
        
        return result;
}