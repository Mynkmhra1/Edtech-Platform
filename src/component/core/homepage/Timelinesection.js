import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import Tag from "./Tag"
import timelineimage from "../../../assets/Images/TimelineImage.png"

function Timelinesection() {
    const logo=[{
        Logo:Logo1,
        heading:"Leadership",
        description:"fully commited to the success of company"
    },
    {
        Logo:Logo2,
        heading:"Responsibility",
        description:"students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is the most important skill"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution"
    },
]

    return (
        <div className="flex w-11/12 flex-row  justify-center">
            {/* left section */}
            <div className="flex  flex-col mr-3">
                {logo.map((item, index) => (
                    <Tag
                    key={index}
                    Logo={item.Logo}
                    heading={item.heading}
                    description={item.description}
                    showLine={index !== logo.length - 1} // Show line for all except last
                    />
                ))}
            </div>
            

    {/* right section  */}
            <div className="relative pb-20 ml-3 ">
                    <img src={`${timelineimage}`} alt="img"></img>
                    <div className="absolute flex bg-caribbeangreen-700 p-3   flex-row items-center left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row items-center justify-between pr-3 border-r border-caribbeangreen-200">
                            <p className="text-4xl pr-2 text-white">10</p>
                            <p className="text-lg text-white">Years of Excellence</p>
                        </div>
                        <div className="flex flex-row items-center pl-3 justify-between ">
                            <p className="text-4xl pr-2 text-white">250</p>
                            <p className="text-lg text-white">Types of courses</p>
                        </div>
                    </div>
            </div>
        </div>
    );
  }
  
  export default Timelinesection;