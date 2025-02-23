import Instructor from "../../../assets/Images/Instructor.png"
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "./CTAbutton"
const Instructorsection=()=>{
    return(
        <div className="mt-20 ml-20 w-11/12 flex flex-row">
            <div className="drop-shadow-[-15px_-15px_20px_white] gap-7 mr-14">
                <img src={Instructor} />
            </div>  
            <div className="flex flex-col items-start m-40 w-[50%]">
                <div className="text-4xl text-white font-bold w-50%">
                    <p>Become a <span className="text-blue-100">Contributor</span></p>
                </div>
                <div className="text-pure-greys-400 text-center w-[50%]">
                    <p>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                </div>
                <CTAbutton active={true} tolink={"./signup"} ><div className="flex items-center">Start Today <span className="flex ml-2"><FaArrowRight/></span></div></CTAbutton>
            </div>
        </div>  
    )
}
export default Instructorsection