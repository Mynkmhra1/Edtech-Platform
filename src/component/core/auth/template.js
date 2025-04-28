// Import the required components
import Signupform from "./signupform";
import Loginform from "./loginform";

function Template(props) {
  const setIsLoggedIn = props.setIsLoggedIn;

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-richblack-900 text-white">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-2/3 bg-richblack-900 rounded-lg shadow-lg p-6 md:p-10 space-y-6 md:space-y-0">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col pr-6 space-y-6">
          <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-center md:text-left">{props.title}</h1>
          
          <div className="text-center md:text-left">
            <p className="text-gray-300">{props.description1}</p>
            <p className="text-gray-300 mt-2">{props.description2}</p>
          </div>
          </div>

          {/* Form Section */}
          <div>
            {props.formType === "signup" ? (
              <Signupform />
            ) : (
              <Loginform />
            )}
          </div>

          {/* Signup with Google Button */}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Signup with Google
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 flex pl-6 justify-center ">
          <img
            src={props.image}
            alt="Template illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;
