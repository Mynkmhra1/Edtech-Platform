import compare from "../../../assets/Images/Compare_with_others.png"
import know from "../../../assets/Images/Know_your_progress.png"
import plan from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "./CTAbutton";

function Learninglanguage() {
    return (
        <div className="p-10">
            <div className=" flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">
                    <p>Your swiss knife for <span className="text-blue-300">learning any language</span></p>
                </div>
                <div className="text-center w-[40%] mb-8 mx-auto">
                    <p>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                </div>

                {/* image */}
                <div className="flex flex-row items-center w-10/12 justify-center relative">
                    <div className="relative">
                        <img src={know} alt="img" className="w-auto h-auto relative z-50" />
                    </div>
                    <div className="relative -ml-28">
                        <img src={compare} alt="img" className="w-auto h-auto relative z-50" />
                    </div>
                    <div className="relative -ml-32">
                        <img src={plan} alt="img" className="w-auto h-auto relative z-50" />
                    </div>
                </div>

                <CTAbutton active={true} tolink={"/login"}>Learn More</CTAbutton>
            </div>

      </div>
    );
  }
  
  export default Learninglanguage;