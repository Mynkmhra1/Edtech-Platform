const Card = ({ heading, description, level, lessionnumber }) => {
    return (
        <div className="flex flex-col  bg-richblack-600 m-10 h-[250px] w-[250px]  p-4 bg-gray-800 ">
            {/* Top Section */}
            <div className="flex flex-col gap-2">
                <div className="text-2xl text-white">
                    <p>{heading}</p>
                </div>
                <div className="text-center text-white text-sm">
                    <p>{description}</p>
                </div>
            </div>

            {/* Push this div to the bottom */}
            <div className="flex flex-row justify-between text-white mt-auto">
                <p>{level}</p>
                <p>{lessionnumber} Lessons</p>
            </div>
        </div>
    );
};

export default Card;
