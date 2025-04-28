import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/courseapi";
import ProgressBar from "@ramonak/react-progress-bar";

export const Enrolledcourses=()=>{
    const {token}= useSelector((state)=>state.auth);

    const[enrolledCourses, setEnrolledCourses]=useState(null);

    const getUserEnrolledCourses=async()=>{
        try{
            const response=await getEnrolledCourses(token);
            setEnrolledCourses(response);
        }catch(err){
            console.log("some error occured while making backend call from frontend page enrolledcourse");
        }
    }

    useEffect(()=>{
        getUserEnrolledCourses();
    },[])

    return (
        <div className="mt-20 text-white">
            {!enrolledCourses ? (
                <div>Loading....</div>
            ) : (
                <>
                    <h1>ENROLLED COURSES</h1>
                    {!enrolledCourses.length ? (
                        <div className="text-white mt-20">
                            <p>No courses enrolled yet</p>
                        </div>
                    ) : (
                        <div>
                            {/* Map over enrolled courses here */}
                            {enrolledCourses.map((course)=>(
                                <div>
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescription}</p>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        {course.totalDuration}
                                    </div>
                                   
                                   <div>
                                        <p>Progress: {course.progressPercentage ||0}%</p>
                                        <ProgressBar
                                        completed={course.progressPercentage ||0}
                                        height="8px"
                                        />
                                   </div>
                                </div>
                            ))
                            
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    );
}   