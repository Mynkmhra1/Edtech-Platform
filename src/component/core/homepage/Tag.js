function Tag({ Logo, heading, description, showLine }) {
    return (
      <div className="flex flex-row m-2">
        {/* Left Section with Vertical Line */}
        <div className="flex flex-col items-center">
          <div className="w-[50px] h-[50px] justify-center flex items-center">
            <img src={Logo} alt="icon" />
          </div>
          {/* Vertical Line Below Image */}
          {showLine && <div className="w-[2px] h-10 border-l-2 border-dotted "></div>}
        </div>
  
        {/* Right Section */}
        <div className="flex flex-col pl-4">
          <h4 className="font-bold text-lg">{heading}</h4>
          <p>{description}</p>
        </div>
      </div>
    );
  }
export default Tag  