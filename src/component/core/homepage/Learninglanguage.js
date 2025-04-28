import compare from "../../../assets/Images/Compare_with_others.png"
import know from "../../../assets/Images/Know_your_progress.png"
import plan from "../../../assets/Images/Plan_your_lessons.png"
import CTAbutton from "./CTAbutton";

function Learninglanguage() {
    return (
        <div className="p-10">
            <div className=" flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">
                    <p>Your swiss knife to <span className="text-blue-100">"Break the ice"</span></p>
                </div>
                <div className="text-center w-[40%] mb-8 mx-auto">
                    <p>With Spin on Campus Connect, mastering multiple languages is easier than ever! Access 20+ languages with realistic voice-overs, track your progress, and set a custom learning schedule. Stay engaged with interactive lessons and seamless campus integration to enhance your learning experience</p>
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