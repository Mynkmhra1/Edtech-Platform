import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa";
import { CourseInformation } from "./CourseInformation/CourseInformation";
import { CourseBuilder } from "./courseBuilder/CourseBuilder";
import { useEffect } from "react";

export const Rendersteps = () => {
    const { step } = useSelector((state) => state.course);
  
    useEffect(() => {
      console.log("Rendersteps - current step:", step);
    }, [step]);
  
    const steps = [
      { id: 1, title: "Course Information" },
      { id: 2, title: "Course Builder" },
      { id: 3, title: "Publish" },
    ];
  
    return (
      <>
        <div className="flex flex-row gap-4 mb-4">
          {steps.map((item) => (
            <div key={item.id}>
              <div
                className={`px-4 py-2 rounded-full border-2 ${
                  step === item.id
                    ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : <div>{item.id}</div>}
              </div>
            </div>
          ))}
        </div>
  
        <div className="mb-4">
          {steps.map((item) => (
            <div key={item.id}>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
  
        <div>
          {step === 1 && <CourseInformation />}
          {step === 2 && <CourseBuilder />}
          {/* step === 3 render publish component if needed */}
        </div>
      </>
    );
  };
  