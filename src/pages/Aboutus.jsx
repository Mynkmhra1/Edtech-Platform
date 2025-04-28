import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import foundingstory from "../assets/Images/FoundingStory.png";
import { Abouttags } from "../component/core/about/Abouttags";
import { Statscomponent } from "../component/core/about/Statscomponent";
import CTAbutton from "../component/core/homepage/CTAbutton"
import { Greycard } from "../component/core/about/Greycard";
import {Blackcard} from "../component/core/about/Blackcard";
import { TouchForm } from "../component/core/about/Touchform";
import FooterContent from "../component/core/homepage/Footercontent";

export const Aboutus = () => {
  return (
    <div className="relative w-full">
      {/* Section 1 */}
      <div className="bg-richblack-800 relative z-10 pb-72">
        <div className="flex flex-col pt-32 items-center w-11/12 md:w-3/5 mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Driving Innovation in Online Education for a
          </h1>
          <span className="text-3xl md:text-4xl font-bold text-blue-100">
            Brighter Future
          </span>
          <p className="text-pure-greys-50 font-inter text-sm md:text-base mt-4">
          Campus Connect is redefining the future of education by bringing innovation to online learning. With cutting-edge courses, the latest technology, and a thriving campus community, we empower students to grow, connect, and succeed in their academic journey.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mt-10 absolute left-1/2 -translate-x-1/2 -bottom-32 sm:-bottom-36 z-20 w-full">
          <img src={img1} alt="About Us 1" className="w-1/3 sm:w-1/4 rounded-lg shadow-lg" />
          <img src={img2} alt="About Us 2" className="w-1/3 sm:w-1/4 rounded-lg shadow-lg" />
          <img src={img3} alt="About Us 3" className="w-1/3 sm:w-1/4 rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-gray-900 px-6 py-16 md:p-32 flex items-center justify-center mt-28">
        <div className="w-full sm:w-2/3 text-center">
          <RiDoubleQuotesL className=" text-3xl md:text-5xl items-center justify-center text-white inline-block mr-2" />
          <p className="text-pure-greys-200 leading-relaxed font-bold text-xl sm:text-2xl md:text-4xl inline">
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <span className="text-blue-100"> combines technology,</span>
            <span className="text-pink-500"> expertise,</span> and community to create an
            <span className="text-yellow-25"> unparalleled Community experience.</span>
          </p>
          <RiDoubleQuotesR className="text-3xl md:text-5xl items-center text-white inline-block ml-2" />
        </div>
      </div>
      <div className="min-w-full h-[1px] bg-pure-greys-100"></div>

      {/* SECTION 3 */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:p-20 gap-8 md:gap-[98px]">
        {/* Left Side - Text Section */}
        <div className="lg:w-1/3 md:w-1/2">
          <p className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text">
            Our Founding Story
          </p>
          <div className="text-pure-greys-50 text-base md:text-lg leading-relaxed">
            <p>
            Our community-driven learning platform was built on a shared vision of making education more accessible, flexible, and engaging. It all started with a passionate group of educators, technologists, and lifelong learners dedicated to fostering a supportive environment where knowledge thrives, connections grow, and learning never stops.            </p>
            <p className="mt-4">
            As passionate educators, we have seen the challenges of traditional education firsthand. Learning should not be limited by classroom walls or geographical barriers. That’s why we built a community-driven platform that breaks these boundaries—empowering individuals from all backgrounds to connect, grow, and reach their full potential.            </p>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div className="w-1/3 md:w-1/3 flex justify-center relative">
          {/* Oval Background */}
          <div className="absolute top-1/2 -translate-y-1/2 w-64 h-40 sm:w-80 sm:h-52 md:w-[400px] md:h-[300px] bg-pink-400 blur-3xl rounded-full opacity-50"></div>

          {/* Image */}
          <img src={foundingstory} alt="Founding Story" className="rounded-lg shadow-lg w-full max-w-sm sm:max-w-md relative" />
        </div>
        
      </div>
      <div className="min-w-full h-[1px] bg-pure-greys-100"></div>

      {/* section 4 */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 md:p-20 gap-8 md:gap-[98px]">
        <div className="w-full md:w-1/3 text-center">
          <Abouttags 
            heading="Our Vision"  
            content="Driven by our vision, we embarked on a journey to revolutionize learning. Our dedicated team crafted a community-focused platform that blends cutting-edge technology with engaging, interactive content—creating an inclusive space where learners connect, grow, and thrive together." 
            color="yellow-25"
          />
        </div>
        <div className="w-full md:w-1/3 text-center">
          <Abouttags 
            heading="Our Mission" 
            content="Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities." 
            color="blue-100"
          />
        </div>
      </div>

      {/* section 5 */}
      <div className="">
        <Statscomponent></Statscomponent>
      </div>

      {/* Section 6 */}
<div className="flex flex-col items-center w-full ">
  {/* First Row: Text & Two Cards */}
  <div className="flex flex-row items-stretch mt-10 justify-between w-10/12">
    {/* Left Section: Text & CTA Button */}
    <div className="flex flex-col items-start w-1/2 pr-20 h-full flex-grow">
      <p className="text-4xl p-5 mx-5 font-bold text-white">
        World-Class Learning for <span className="text-blue-100">Anyone, Anywhere</span>
      </p>
      <p className="text-pure-greys-100 p-5 mb-8 mx-5 ">
        Studynotion partners with more than 275+ leading universities and companies to bring 
        flexible, affordable, job-relevant online learning to individuals and organizations worldwide.
      </p>
      <CTAbutton active={true} tolink={"/login"}>Learn More</CTAbutton>
    </div>

    {/* Right Section: Two Cards (1/4 each) */}
    <div className="flex w-1/2 h-full flex-grow">
      <Greycard heading={"Curriculum Based on Industry Needs"} 
                content={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
                className="w-1/2 h-full flex-grow"/>

      <Blackcard heading={"Curriculum Based on Industry Needs"} 
                content={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
                className="w-1/2 h-full flex-grow" />
    </div>
</div>


  {/* Second Row: Three Cards with Empty Space on the Left */}
  <div className="flex w-10/12 justify-center">
    <div className="w-1/2"></div> {/* Empty Space to Align */}
    
    <Greycard heading={"Curriculum Based on Industry Needs"} 
              content={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
              className="w-1/6" />

    <Blackcard heading={"Curriculum Based on Industry Needs"} 
              content={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
              className="w-1/6" />

    <Greycard heading={"Curriculum Based on Industry Needs"} 
              content={"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."} 
              className="w-1/6" />
  </div>
</div>

{/* section 7 */}

      <div>
          <TouchForm/>
      </div>
{/* section footer */}
      <div>
        <FooterContent/>
      </div>
    </div>
  );
};
