import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../component/core/homepage/CTAbutton"
import Banner from "../assets/Images/banner.mp4"
import Codeblocks from "../component/core/homepage/codeblocks";
const Home=()=>{
    return(
        <div >
            {/* sectionn 1 */}
            <div className="realtive max-w-maxContent mx-auto mt-[50px] flex flex-col w-11/12 items-center text-white justify-between">
            <Link to="/signup">
                <div className="m-2 p-2 mx-auto rounded-full bg-richblack-800" >
                    <div className="flex items-center">
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>


            </Link>

            <div className="text-center text-4xl font-bold mt-4">
                <h2>Empower Your Future with <span className="text-blue-600 ">Coding Skills</span></h2>
            </div>

            <div className="w-[90%] text-lg text-center mt-2">
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors</p>
            </div>
            <div className="flex mt-5">
                    
                    <CTAbutton active={true} tolink={"/login"}>
                        Learn More
                    </CTAbutton>

                    <CTAbutton active={false} tolink={"/login"}>
                        Book a Demo
                    </CTAbutton>
            </div >
            <div className="m-12 drop-shadow-[10px_10px_15px_white] rounded-lg">
                <video muted loop autoPlay >
                    <source src={Banner}/>
                </video>
            </div>



            {/* Code section 1 */}
            <div>
                <Codeblocks position={"lg:flex-row"} 
                heading={<div>
                    Unlock your <span className= "text-blue-600">coding potential </span> with our online courses.
                </div>}
                subheading={<div>
                    Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                </div>}
                CTAbutton1={
                    {
                        active:true,
                        linkto:"/signup"
                    }
                }
                CTAbutton2={
                    {
                        active:false,
                        linkto:"/login"
                    }
                }
                codecontent={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                />
            </div>
                {/* codesection2 */}
            <div>
                <Codeblocks position={"lg:flex-row-reverse"} 
                heading={<div>
                    Unlock your <span className= "text-blue-600">coding potential </span> with our online courses.
                </div>}
                subheading={<div>
                    Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                </div>}
                CTAbutton1={
                    {
                        active:true,
                        linkto:"/signup"
                    }
                }
                CTAbutton2={
                    {
                        active:false,
                        linkto:"/login"
                    }
                }
                codecontent={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                />
            </div>
            </div>
            

        
            
            {/* section 2 */}
           

            {/* section 3 */}
            
            
            
            {/* section 4 */}
        </div>
    )
}
export default Home