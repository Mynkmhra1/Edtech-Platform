import CTAbutton from "./CTAbutton"
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const Codeblocks = (
   { position, heading, btntext1, btntext2, subheading, CTAbutton1, CTAbutton2, codecontent, codecolor }
) => {
    return (
        <div className={`flex flex-col lg:flex-row ${position} justify-between my-10 lg:my-20 gap-6 lg:gap-10`}>

            {/* section1 */}
            <div className="w-full lg:w-[50%] flex flex-col p-5 border-spacing-1 shadow-md rounded-md">
                <div className="text-2xl lg:text-4xl mb-4 lg:mb-5">
                    {heading}
                </div>
                <div className="text-base lg:text-lg">
                    {subheading}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8 lg:mt-20">
                    <CTAbutton active={CTAbutton1.active} tolink={CTAbutton1.linkto}>
                        <div className="flex items-center">
                            {btntext1}
                            <span className="flex ml-2">
                                <FaArrowRight />
                            </span>
                        </div>
                    </CTAbutton>
                    <CTAbutton active={CTAbutton2.active} tolink={CTAbutton2.linkto}>
                        {btntext2}
                    </CTAbutton>
                </div>
            </div>

            {/* section2 */}
            <div className="h-fit flex flex-row w-full lg:w-[50%] max-w-full lg:max-w-[500px]">
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    {Array.from({ length: 11 }, (_, i) => <p key={i}>{i + 1}</p>)}
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-${codecolor} pr-2`}>
                    <TypeAnimation
                        sequence={[codecontent, 3000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block"
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>

        </div>
    )
}
export default Codeblocks;
