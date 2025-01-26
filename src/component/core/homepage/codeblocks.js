import CTAbutton from "./CTAbutton"
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';


const Codeblocks=(
   {position,heading,subheading,CTAbutton1,CTAbutton2,codecontent,codecolor} 
)=>{
    return(
        <div className={`flex ${position} justify-between my-20 gap-10`}>

            {/* section1 */}

            <div className="w-[50%] flex  flex-col p-5  border-spacing-1 shadow-md rounded-md ">
                <div className="text-4xl mb-5">
                    {heading}
                </div>
                <div>
                    {subheading}
                </div>
                <div className="flex items-center gap-6 mt-20 ">
                    <CTAbutton active={CTAbutton1.active} tolink={CTAbutton1.linkto}>
                        Try it now
                        <span className="inline-block ml-2">
                        <FaArrowRight />
                        </span>
                    </CTAbutton>
                    <CTAbutton active={CTAbutton2.active} tolink={CTAbutton2.linkto}>
                        Learn More
                    </CTAbutton>
                </div>
            </div>


            {/* section2 */}

            <div className="h-fit flex flex-row w-[60%] lg:w-500px">
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono font-${codecolor} pr-2`}>
                <TypeAnimation
                sequence={[codecontent,3000,""]} 
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                    
                }
                omitDeletionAnimation={true}>

                </TypeAnimation>
                </div>
            </div>


        </div>
    )
}
export default Codeblocks