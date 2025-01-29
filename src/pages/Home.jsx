import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from "../component/core/homepage/CTAbutton"
import Banner from "../assets/Images/banner.mp4"
import Codeblocks from "../component/core/homepage/codeblocks";
import Footercontent from "../component/core/homepage/Footercontent"
import Learninglanguage from "../component/core/homepage/Learninglanguage"
import Timelinesection from "../component/core/homepage/Timelinesection"

const Home=()=>{
    return(
        <div className="overflow-x-hidden">
        <div >
            {/* sectionn 1 */}
            <div className="realtive overflow-x-hidden max-w-maxContent mx-auto mt-[50px] flex flex-col w-11/12 items-center text-white justify-between">
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
                heading={<div className= "font-bold">
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
                btntext1={"Try it Now"}
                btntext2={"Learn More"}
                />
            </div>
                {/* codesection2 */}
            <div>
                <Codeblocks position={"lg:flex-row-reverse"} 
                heading={<div className= "font-bold">
                    Start <span className= " text-blue-600">coding in seconds </span> .
                </div>}
                subheading={<div>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.   
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
                codecontent={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\nbody>\nh1><ahref="/">Header</a></h1>nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                btntext1={"Start Teaching"}
                btntext2={"Learn More"}
                />
            </div>
            </div>
        </div>    

        
            
            {/* section 2 */}
                <div className="bg-white">
                    <div className="bg-[url('./assets/Images/bghome.svg')] flex flex-row items-center justify-center h-[333px] w-full"> 
                       
                    <CTAbutton active={true} tolink={"/signup"}>
                        <div className="flex items-center">
                            Eplore full Catalog
                            <span className="flex ml-2">
                                <FaArrowRight />
                            </span>
                        </div>
                    </CTAbutton>
                       
                        <div className="flex text-white">
                            <CTAbutton active={false} tolink={"/login"}>
                                Learn More
                            </CTAbutton>
                        </div>
                    </div>
                    <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
                        <div className="flex flex-row gap-5 mb-10 mt-[90px]">
                            <h1 className="text-4xl font-semibold">Get the skills you need for a <span className="text-blue-600">Job that is in demand</span></h1>
                            <div className="flex flex-col items-start">
                                <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                                <CTAbutton active={true} tolink={"/signup"} className="flex">Learn More</CTAbutton>
                            </div>
                        </div>
                    </div>
                    <Timelinesection>

                    </Timelinesection>
                    <Learninglanguage></Learninglanguage>
                </div>

           

            {/* section 3 */}
            
            
            
            {/* section 4 */}
        <div className="bg-richblack-700">
                <div>
                    <Footercontent></Footercontent>
                </div>



        </div>        


    </div>    
    )
}
export default Home