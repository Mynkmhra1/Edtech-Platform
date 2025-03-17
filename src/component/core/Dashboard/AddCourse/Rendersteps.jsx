import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa";
import { CourseInformation } from "./CourseInformation/CourseInformation";


export const Rendersteps=()=>{
    
    const {step}= useSelector((state)=>state.course)

    console.log("Redux Step:", step);
    console.log("Comparison with 1:", step === 1);

    const steps=[{
        id:1,
        title:"course Information"

    },{
        id:2,
        title:"course Builder"

    },{
        id:3,
        title:"Publish"

    }]
    return(
        <>
            <div className="flex flex-row">
                {steps.map((item)=>(
                    <div>
                        <div className ={`${step === item.id ?"bg-yellow-900 border-yellow-50 text-yellow-50  ":"border-richblack-700 bg-richblack-800 text-rickblack-300" }`}>
                            {
                                step>item.id?(<FaCheck/>):(<div>{item.id}</div>)
                            }
                        </div>
                    </div>
                ))}
            </div>

            <div>
                {steps.map((item)=>(
                    <div>
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
            <div>
                {step === 1 && <CourseInformation/>}
            </div>
        </>
    )
}